import { createClient } from "@/lib/supabase/server";
import type { Database, Json } from "@/types/database";

type EventRow = Database["public"]["Tables"]["analytics_events"]["Row"];

export async function trackEvent(userId: string | null, eventName: string, metadata: Record<string, unknown> = {}) {
  const supabase = await createClient();
  await supabase.from("analytics_events").insert({
    user_id: userId,
    event_name: eventName,
    metadata: metadata as Json,
  });
}

export async function getDashboardAnalytics(userId: string): Promise<{
  agentsCount: number;
  chatsCount: number;
  messagesCount: number;
  tokensCount: number;
  recentEvents: EventRow[];
}> {
  const supabase = await createClient();

  const [agentsRes, chatsRes, messagesRes, eventsRes] = await Promise.all([
    supabase.from("agents").select("id", { count: "exact", head: true }).eq("user_id", userId),
    supabase.from("chats").select("id", { count: "exact", head: true }).eq("user_id", userId),
    supabase.from("messages").select("id, token_count, chats!inner(user_id)").eq("chats.user_id", userId),
    supabase
      .from("analytics_events")
      .select("event_name, created_at, id, user_id, metadata")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20),
  ]);

  const totalTokens = (messagesRes.data || []).reduce((sum, msg) => sum + (msg.token_count || 0), 0);

  return {
    agentsCount: agentsRes.count || 0,
    chatsCount: chatsRes.count || 0,
    messagesCount: messagesRes.data?.length || 0,
    tokensCount: totalTokens,
    recentEvents: (eventsRes.data ?? []) as EventRow[],
  };
}
