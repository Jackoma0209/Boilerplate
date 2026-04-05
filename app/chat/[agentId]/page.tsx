import { notFound } from "next/navigation";
import { ChatClient } from "@/components/chat/chat-client";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/guards";

export default async function AgentChatPage({ params }: { params: Promise<{ agentId: string }> }) {
  const user = await requireUser();
  const { agentId } = await params;
  const supabase = await createClient();

  const { data: agent } = await supabase
    .from("agents")
    .select("id, name")
    .eq("id", agentId)
    .or(`user_id.eq.${user.id},is_public.eq.true`)
    .single();

  if (!agent) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 space-y-4">
      <h1 className="text-2xl font-semibold">Chat with {agent.name}</h1>
      <ChatClient agentId={agentId} />
    </main>
  );
}
