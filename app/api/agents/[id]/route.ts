import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/guards";
import { agentSchema } from "@/lib/agents/schema";
import { deleteAgent, getAgentForUser, updateAgent } from "@/lib/agents/service";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const agent = await getAgentForUser(id, user.id);
  return NextResponse.json({ agent });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const json = await request.json();
  const parsed = agentSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const agent = await updateAgent(id, user.id, parsed.data);
  return NextResponse.json({ agent });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  await deleteAgent(id, user.id);
  return NextResponse.json({ ok: true });
}
