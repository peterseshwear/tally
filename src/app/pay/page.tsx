"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { money } from "@/state/tally";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

const appearance = {
  variables: {
    colorPrimary: "#2a66b3",
    colorText: "#2b2521",
    colorBackground: "#ffffff",
    colorDanger: "#a8452e",
    fontFamily: "Figtree, system-ui, sans-serif",
    borderRadius: "10px",
  },
};

function CheckoutForm({ cents, onPaid }: { cents: number; onPaid: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const pay = async () => {
    if (!stripe || !elements || busy) return;
    setBusy(true);
    setError(null);
    const result = await stripe.confirmPayment({ elements, redirect: "if_required" });
    setBusy(false);
    if (result.error) {
      setError(result.error.message ?? "Payment failed — please try again.");
    } else {
      onPaid();
    }
  };

  return (
    <>
      <PaymentElement />
      {error && <div className="auth-error">{error}</div>}
      <div className={`btn-dark${busy ? " btn-dark--disabled" : ""}`} onClick={pay}>
        {busy ? "Processing…" : `Pay ${money(cents)} (test)`}
      </div>
      <div className="pay-hint">
        Test mode — use card 4242 4242 4242 4242, any future date, any CVC and ZIP.
      </div>
    </>
  );
}

function PayPageInner() {
  const params = useSearchParams();
  const cents = Math.min(Math.max(parseInt(params.get("a") ?? "0", 10) || 0, 0), 99999999);
  const desc = params.get("d") || "Tally checkout";
  const merchantId = params.get("m");

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [paid, setPaid] = useState(false);

  const body = useMemo(
    () => JSON.stringify({ cents, description: desc, merchantId: merchantId ?? undefined }),
    [cents, desc, merchantId],
  );

  useEffect(() => {
    if (cents <= 0 || !stripePromise) return;
    fetch("/api/payment-intents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { clientSecret?: string } | null) =>
        data?.clientSecret ? setClientSecret(data.clientSecret) : setFailed(true),
      )
      .catch(() => setFailed(true));
  }, [cents, body]);

  return (
    <div className="ob-wrap">
      <div className="ob-card pay-card">
        <div className="brand">
          <div className="brand-mark">T</div>
          <span className="brand-name">TALLY</span>
          <span className="pill-due pay-badge">SANDBOX</span>
        </div>

        {paid ? (
          <div className="charge-done">
            <div className="check-circle check-circle--lg">✓</div>
            <div className="charge-done-amount">{money(cents)} paid</div>
            <div className="charge-done-note">Thanks! A receipt is on its way.</div>
          </div>
        ) : (
          <>
            <div className="ob-heading">
              <div className="ob-title">{desc}</div>
              <div className="ob-sub">Amount due: {money(cents)}</div>
            </div>
            {cents <= 0 && <div className="auth-error">This payment link has no amount. Ask the sender for a new one.</div>}
            {failed && <div className="auth-error">Checkout is unavailable right now — please try again later.</div>}
            {cents > 0 && !failed && !clientSecret && <div className="pay-hint">Loading secure payment form…</div>}
            {clientSecret && stripePromise && (
              <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                <CheckoutForm cents={cents} onPaid={() => setPaid(true)} />
              </Elements>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={null}>
      <PayPageInner />
    </Suspense>
  );
}
