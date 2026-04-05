import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/guards";
import { getStripe } from "@/lib/billing/stripe";

export async function POST() {
  const user = await requireUser();

  if (!process.env.STRIPE_PRICE_PRO) {
    return NextResponse.json({ error: "Stripe price is not configured" }, { status: 400 });
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
