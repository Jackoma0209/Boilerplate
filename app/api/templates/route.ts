import { NextResponse } from "next/server";
import { listPublicTemplates } from "@/lib/agents/service";

export async function GET() {
  const templates = await listPublicTemplates();
  return NextResponse.json({ templates });
}
