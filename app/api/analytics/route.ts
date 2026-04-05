import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/guards";
import { getDashboardAnalytics, trackEvent } from "@/lib/analytics/service";

export async function GET() {
  const user = await requireUser();
  const analytics = await getDashboardAnalytics(user.id);
  return NextResponse.json({ analytics });
}

export async function POST(request: Request) {
  const user = await requireUser();
  const body = await request.json();
  await trackEvent(user.id, body.eventName, body.metadata || {});
  return NextResponse.json({ ok: true });
}
