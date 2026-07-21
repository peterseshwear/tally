import { NextResponse } from "next/server";
import { getProcessor } from "@/server/payments";

const MAX_CENTS = 99999999;

export async function POST(req: Request) {
  let cents: unknown, description: unknown;
  try {
    ({ cents, description } = await req.json());
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }
  if (typeof cents !== "number" || !Number.isInteger(cents) || cents <= 0 || cents > MAX_CENTS) {
    return NextResponse.json({ error: "invalid-amount" }, { status: 400 });
  }
  const desc = typeof description === "string" ? description.slice(0, 200) : "Tally charge";

  const processor = getProcessor();
  if (!processor.isConfigured()) {
    return NextResponse.json({ error: "processor-not-configured" }, { status: 501 });
  }
  try {
    const result = await processor.createPayment({ cents, description: desc });
    if (result.status !== "succeeded") {
      return NextResponse.json({ error: "payment-failed" }, { status: 502 });
    }
    return NextResponse.json({ id: result.id, processor: processor.name });
  } catch (err) {
    console.error("createPayment failed:", err);
    return NextResponse.json({ error: "processor-error" }, { status: 502 });
  }
}
