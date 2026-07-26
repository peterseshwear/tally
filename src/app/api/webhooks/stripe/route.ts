import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripeClient } from "@/server/payments/stripe";
import { getSupabaseAdmin } from "@/server/supabaseAdmin";

/**
 * Stripe webhook: the source of truth for payment status.
 * - payment_intent.succeeded → upsert the payment row (attributed to the
 *   merchant via the PaymentIntent's metadata.merchant_id, set at creation).
 * - charge.refunded → mark the payment Refunded.
 *
 * Requires STRIPE_WEBHOOK_SECRET (whsec_...) and SUPABASE_SERVICE_ROLE_KEY.
 * Upserts are keyed on processor_id, so optimistic client inserts and webhook
 * events never duplicate rows.
 */
export async function POST(req: Request) {
  const stripe = getStripeClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "webhook-not-configured" }, { status: 501 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "missing-signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "invalid-signature" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    // Acknowledge so Stripe doesn't retry forever; nothing to record into.
    console.warn("webhook received but Supabase admin is not configured");
    return NextResponse.json({ received: true, recorded: false });
  }

  try {
    if (event.type === "payment_intent.succeeded") {
      const intent = event.data.object;
      const merchantId = intent.metadata?.merchant_id || null;
      await supabase.from("payments").upsert(
        {
          merchant_id: merchantId,
          cents: intent.amount,
          description: intent.description ?? "Online checkout",
          method: "Online checkout",
          status: "Paid",
          processor_id: intent.id,
        },
        { onConflict: "processor_id", ignoreDuplicates: true },
      );
    } else if (event.type === "charge.refunded") {
      const charge = event.data.object;
      const intentId = typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
      if (intentId) {
        await supabase.from("payments").update({ status: "Refunded" }).eq("processor_id", intentId);
      }
    }
  } catch (err) {
    console.error("webhook handling failed:", err);
    return NextResponse.json({ error: "handler-error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
