/**
 * Processor-agnostic payments interface (the handoff's "routing abstraction").
 * Stripe is the first rail; Adyen can be added later as a second implementation
 * without touching the API routes or the UI.
 */
export interface CreatePaymentInput {
  cents: number;
  description: string;
}

export interface PaymentResult {
  /** Processor-side id (e.g. Stripe PaymentIntent id). */
  id: string;
  status: "succeeded" | "failed";
}

export interface RefundResult {
  id: string;
  status: "succeeded" | "pending" | "failed";
}

export interface PaymentProcessor {
  readonly name: string;
  /** True when credentials are present and usable. */
  isConfigured(): boolean;
  /** Create and confirm a card-present style test payment. */
  createPayment(input: CreatePaymentInput): Promise<PaymentResult>;
  /** Refund a payment in full. */
  refundPayment(paymentId: string): Promise<RefundResult>;
}
