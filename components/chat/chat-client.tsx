"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ChatClient({ agentId }: { agentId: string }) {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: {
        agentId,
      },
    }),
  });

  async function onSubmit(formData: FormData) {
    const text = String(formData.get("prompt") || "").trim();
    if (!text) return;
    sendMessage({ text });
  }

  return (
    <div className="flex h-[70vh] flex-col rounded-xl border border-zinc-200 bg-white">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 ? <p className="text-sm text-zinc-500">Start a conversation.</p> : null}
        {messages.map((msg) => (
          <div key={msg.id} className={msg.role === "user" ? "text-right" : "text-left"}>
            <div
              className={`inline-block max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                msg.role === "user" ? "bg-black text-white" : "bg-zinc-100 text-zinc-900"
              }`}
            >
              {msg.parts
                .filter((part) => part.type === "text")
                .map((part, index) => (
                  <p key={index}>{part.type === "text" ? part.text : ""}</p>
                ))}
            </div>
          </div>
        ))}
      </div>
      <form action={onSubmit} className="flex gap-2 border-t border-zinc-200 p-3">
        <Input name="prompt" placeholder="Send a message..." disabled={status !== "ready"} />
        <Button type="submit" disabled={status !== "ready"}>
          {status === "streaming" ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
