import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/guards";
import { getStripe } from "@/lib/billing/stripe";

function assertStripeTestMode() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is missing");
  if (!key.startsWith("sk_test_")) {
    throw new Error("Stripe test mode is required (use an sk_test_ key)");
  }
}

export async function POST() {
  const user = await requireUser();

  if (!process.env.STRIPE_PRICE_PRO) {
    return NextResponse.json({ error: "Stripe price is not configured" }, { status: 400 });
  }

  try {
    assertStripeTestMode();
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Stripe test mode validation failed" },
      { status: 400 },
    );
  }

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: process.env.STRIPE_PRICE_PRO, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?canceled=1`,
    client_reference_id: user.id,
  });

  return NextResponse.json({ url: session.url });
}
