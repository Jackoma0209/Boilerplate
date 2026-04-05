import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/guards";
import { agentSchema } from "@/lib/agents/schema";
import { createAgent, listMyAgents } from "@/lib/agents/service";

export async function GET() {
  const user = await requireUser();
  const agents = await listMyAgents(user.id);
  return NextResponse.json({ agents });
}

export async function POST(request: Request) {
  const user = await requireUser();
  const json = await request.json();
  const parsed = agentSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const agent = await createAgent(user.id, parsed.data);
  return NextResponse.json({ agent }, { status: 201 });
}
