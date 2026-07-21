import Stripe from "stripe";
import type { PaymentProcessor, CreatePaymentInput, PaymentResult, RefundResult } from "./types";

/**
 * Test-mode-only guard: this demo must never run live charges, so anything
 * other than an sk_test_ key is treated as not configured.
 */
function testModeKey(): string | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || !key.startsWith("sk_test_")) return null;
  return key;
}

let client: Stripe | null = null;

function getClient(): Stripe | null {
  const key = testModeKey();
  if (!key) return null;
  if (!client) client = new Stripe(key);
  return client;
}

export const stripeProcessor: PaymentProcessor = {
  name: "stripe",

  isConfigured() {
    return testModeKey() !== null;
  },

  async createPayment({ cents, description }: CreatePaymentInput): Promise<PaymentResult> {
    const stripe = getClient();
    if (!stripe) throw new Error("Stripe is not configured");
    // pm_card_visa is Stripe's test payment method — stands in for the card
    // that Tap to Pay would tokenize on a real device.
    const intent = await stripe.paymentIntents.create({
      amount: cents,
      currency: "usd",
      description,
      payment_method: "pm_card_visa",
      confirm: true,
      automatic_payment_methods: { enabled: true, allow_redirects: "never" },
    });
    return { id: intent.id, status: intent.status === "succeeded" ? "succeeded" : "failed" };
  },

  async refundPayment(paymentId: string): Promise<RefundResult> {
    const stripe = getClient();
    if (!stripe) throw new Error("Stripe is not configured");
    const refund = await stripe.refunds.create({ payment_intent: paymentId });
    const status = refund.status === "succeeded" ? "succeeded" : refund.status === "pending" ? "pending" : "failed";
    return { id: refund.id, status };
  },
};
