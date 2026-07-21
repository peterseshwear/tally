import { NextResponse } from "next/server";
import { getProcessor } from "@/server/payments";

export async function POST(req: Request) {
  let paymentId: unknown;
  try {
    ({ paymentId } = await req.json());
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }
  if (typeof paymentId !== "string" || !paymentId.startsWith("pi_")) {
    return NextResponse.json({ error: "invalid-payment-id" }, { status: 400 });
  }

  const processor = getProcessor();
  if (!processor.isConfigured()) {
    return NextResponse.json({ error: "processor-not-configured" }, { status: 501 });
  }
  try {
    const result = await processor.refundPayment(paymentId);
    if (result.status === "failed") {
      return NextResponse.json({ error: "refund-failed" }, { status: 502 });
    }
    return NextResponse.json({ id: result.id, status: result.status });
  } catch (err) {
    console.error("refundPayment failed:", err);
    return NextResponse.json({ error: "processor-error" }, { status: 502 });
  }
}
