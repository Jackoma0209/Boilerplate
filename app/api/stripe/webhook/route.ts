import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getStripe } from "@/lib/billing/stripe";
import { createClient } from "@/lib/supabase/server";

function getPeriodEndIso(subscription: unknown): string | null {
  if (
    typeof subscription === "object" &&
    subscription !== null &&
    "current_period_end" in subscription &&
    typeof (subscription as { current_period_end?: unknown }).current_period_end === "number"
  ) {
    const seconds = (subscription as { current_period_end: number }).current_period_end;
    return new Date(seconds * 1000).toISOString();
  }

  return null;
}

export async function POST(request: Request) {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook secret missing" }, { status: 400 });
  }

  const sig = (await headers()).get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  const body = await request.text();
  const stripe = getStripe();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = await createClient();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (session.client_reference_id) {
      await supabase.from("subscriptions").upsert({
        user_id: session.client_reference_id,
        stripe_customer_id: session.customer ? String(session.customer) : null,
        stripe_subscription_id: typeof session.subscription === "string" ? session.subscription : null,
        status: "active",
      });
    }
  }

  if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
    const subscription = event.data.object;
    await supabase
      .from("subscriptions")
      .update({
        status: subscription.status,
        current_period_end: getPeriodEndIso(subscription),
        updated_at: new Date().toISOString(),
      })
      .eq("stripe_subscription_id", subscription.id);
  }

  return NextResponse.json({ received: true });
}
