import { z } from "zod";

export const agentSchema = z.object({
  name: z.string().min(2).max(80),
  description: z.string().max(240).optional().or(z.literal("")),
  systemPrompt: z.string().min(20).max(8000),
  toolsConfig: z.array(z.string()).default([]),
  isPublic: z.boolean().default(false),
});

export type AgentInput = z.infer<typeof agentSchema>;
