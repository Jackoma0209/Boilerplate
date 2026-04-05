import { convertToModelMessages, streamText, UIMessage } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import { trackEvent } from "@/lib/analytics/service";
import type { Database } from "@/types/database";

type AgentRow = Database["public"]["Tables"]["agents"]["Row"];
type ChatInsert = Database["public"]["Tables"]["chats"]["Insert"];
type MessageInsert = Database["public"]["Tables"]["messages"]["Insert"];

export async function POST(request: Request) {
  const user = await requireUser();
  const { messages, agentId, chatId }: { messages: UIMessage[]; agentId: string; chatId?: string } = await request.json();

  const supabase = await createClient();
  const { data: agentData, error: agentError } = await supabase
    .from("agents")
    .select("*")
    .eq("id", agentId)
    .or(`user_id.eq.${user.id},is_public.eq.true`)
    .single();

  const agent = agentData as AgentRow | null;
  if (agentError || !agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  async function resolveChatId(): Promise<string> {
    if (chatId) return chatId;
    const chatInsert: ChatInsert = { user_id: user.id, agent_id: agentId, title: "New Chat" };
    const { data: chat, error: chatError } = await supabase.from("chats").insert(chatInsert).select("id").single();

    if (chatError || !chat) {
      throw new Error("Failed to create chat");
    }

    return chat.id;
  }

  let finalChatId: string;
  try {
    finalChatId = await resolveChatId();
  } catch {
    return NextResponse.json({ error: "Failed to create chat" }, { status: 500 });
  }

  const latest = messages[messages.length - 1];
  if (latest?.parts?.[0]?.type === "text") {
    const userMessage: MessageInsert = {
      chat_id: finalChatId,
      role: "user",
      content: latest.parts[0].text,
    };
    await supabase.from("messages").insert(userMessage);
  }

  const result = streamText({
    model: openai(process.env.OPENAI_MODEL || "gpt-4o-mini"),
    system: agent.system_prompt,
    messages: await convertToModelMessages(messages),
  });

  const response = result.toUIMessageStreamResponse({
    originalMessages: messages,
    onFinish: async ({ messages: outputMessages }) => {
      const lastAssistant = outputMessages[outputMessages.length - 1];
      const content = lastAssistant.parts
        .filter((part) => part.type === "text")
        .map((part) => (part.type === "text" ? part.text : ""))
        .join("\n");

      if (content.trim()) {
        const assistantMessage: MessageInsert = {
          chat_id: finalChatId,
          role: "assistant",
          content,
        };
        await supabase.from("messages").insert(assistantMessage);
      }

      await trackEvent(user.id, "chat.completed", {
        agentId,
        chatId: finalChatId,
      });
    },
  });

  response.headers.set("x-chat-id", finalChatId);
  return response;
}
