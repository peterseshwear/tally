import type { PaymentProcessor } from "./types";
import { stripeProcessor } from "./stripe";

/**
 * Routing layer stub: today there is one rail (Stripe). When Adyen lands,
 * this is where per-transaction routing (cost, geography, uptime) plugs in.
 */
export function getProcessor(): PaymentProcessor {
  return stripeProcessor;
}
