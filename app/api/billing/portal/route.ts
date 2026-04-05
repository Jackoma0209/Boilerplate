import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/guards";
import { getStripe } from "@/lib/billing/stripe";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type SubscriptionRow = Database["public"]["Tables"]["subscriptions"]["Row"];

export async function POST() {
  const user = await requireUser();
  const supabase = await createClient();

  const { data } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  const sub = data as Pick<SubscriptionRow, "stripe_customer_id"> | null;

  if (!sub?.stripe_customer_id) {
    return NextResponse.json({ error: "No billing profile found" }, { status: 400 });
  }

  const stripe = getStripe();
  const session = await stripe.billingPortal.sessions.create({
    customer: sub.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
  });

  return NextResponse.json({ url: session.url });
}
