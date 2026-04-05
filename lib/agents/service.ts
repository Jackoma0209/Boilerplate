import { nanoid } from "nanoid";
import { createClient } from "@/lib/supabase/server";
import { toSlug } from "@/lib/utils";
import type { AgentInput } from "@/lib/agents/schema";
import type { Database } from "@/types/database";

type AgentRow = Database["public"]["Tables"]["agents"]["Row"];
type TemplateRow = Database["public"]["Tables"]["agent_templates"]["Row"];

export async function listMyAgents(userId: string): Promise<AgentRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("agents")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as AgentRow[];
}

export async function createAgent(userId: string, input: AgentInput): Promise<AgentRow> {
  const supabase = await createClient();
  const slug = `${toSlug(input.name)}-${nanoid(6)}`;

  const payload = {
    user_id: userId,
    name: input.name,
    description: input.description || null,
    slug,
    system_prompt: input.systemPrompt,
    tools_config: input.toolsConfig,
    is_public: input.isPublic,
  };

  const { data, error } = await supabase.from("agents").insert(payload).select("*").single();
  if (error || !data) throw error || new Error("Failed to create agent");
  return data as AgentRow;
}

export async function getAgentForUser(agentId: string, userId: string): Promise<AgentRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("agents")
    .select("*")
    .eq("id", agentId)
    .eq("user_id", userId)
    .single();
  if (error || !data) throw error || new Error("Agent not found");
  return data as AgentRow;
}

export async function updateAgent(agentId: string, userId: string, input: AgentInput): Promise<AgentRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("agents")
    .update({
      name: input.name,
      description: input.description || null,
      system_prompt: input.systemPrompt,
      tools_config: input.toolsConfig,
      is_public: input.isPublic,
      updated_at: new Date().toISOString(),
    })
    .eq("id", agentId)
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error || !data) throw error || new Error("Failed to update agent");
  return data as AgentRow;
}

export async function deleteAgent(agentId: string, userId: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("agents").delete().eq("id", agentId).eq("user_id", userId);
  if (error) throw error;
}

export async function listPublicTemplates(): Promise<TemplateRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("agent_templates").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as TemplateRow[];
}
