import { NextResponse } from "next/server";
import { getStripeClient } from "@/server/payments/stripe";

const MAX_CENTS = 99999999;

/**
 * Creates an *unconfirmed* PaymentIntent for the customer-facing checkout
 * page (/pay) — the customer confirms it in the browser with Stripe Elements.
 * Optional merchantId is carried in metadata so the webhook can attribute
 * the payment to a merchant account.
 */
export async function POST(req: Request) {
  let cents: unknown, description: unknown, merchantId: unknown;
  try {
    ({ cents, description, merchantId } = await req.json());
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }
  if (typeof cents !== "number" || !Number.isInteger(cents) || cents <= 0 || cents > MAX_CENTS) {
    return NextResponse.json({ error: "invalid-amount" }, { status: 400 });
  }
  const desc = typeof description === "string" && description ? description.slice(0, 200) : "Tally checkout";

  const stripe = getStripeClient();
  if (!stripe) {
    return NextResponse.json({ error: "processor-not-configured" }, { status: 501 });
  }
  try {
    const intent = await stripe.paymentIntents.create({
      amount: cents,
      currency: "usd",
      description: desc,
      automatic_payment_methods: { enabled: true },
      metadata: typeof merchantId === "string" && merchantId ? { merchant_id: merchantId } : undefined,
    });
    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch (err) {
    console.error("payment-intent create failed:", err);
    return NextResponse.json({ error: "processor-error" }, { status: 502 });
  }
}
