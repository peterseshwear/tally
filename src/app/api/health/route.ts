import { NextResponse } from "next/server";
import { getProcessor } from "@/server/payments";

/**
 * Deployment diagnostics. Deliberately exposes only the key *prefix*
 * (e.g. "sk_test_" / "sk_live_" / "rk_test_"), never key material.
 */
export async function GET() {
  const key = process.env.STRIPE_SECRET_KEY;
  return NextResponse.json({
    processor: getProcessor().name,
    configured: getProcessor().isConfigured(),
    hasSecretKeyVar: typeof key === "string" && key.length > 0,
    secretKeyPrefix: key ? key.slice(0, 8) : null,
    hasPublishableKeyVar: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  });
}
