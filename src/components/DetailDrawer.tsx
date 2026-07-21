"use client";

import { feeCents, money, pillClass, useTally } from "@/state/tally";

export default function DetailDrawer() {
  const { payments, selId, closeDetail, refundSelected } = useTally();
  const sel = payments.find((p) => p.id === selId);
  if (!sel) return null;

  return (
    <>
      <div className="scrim" onClick={closeDetail} />
      <div className="drawer">
        <div className="drawer-head">
          <span className="section-label">Payment</span>
          <span className="close-x" onClick={closeDetail}>
            ✕
          </span>
        </div>
        <div className="drawer-amount-wrap">
          <div className="drawer-amount">{money(sel.cents)}</div>
          <span className={`${pillClass(sel.status)} pill--inline`}>{sel.status}</span>
        </div>
        <div className="kv-card">
          <div className="kv">
            <span className="kv-k">Description</span>
            <span className="kv-v">{sel.desc}</span>
          </div>
          <div className="kv">
            <span className="kv-k">Method</span>
            <span className="kv-v">{sel.method}</span>
          </div>
          <div className="kv">
            <span className="kv-k">When</span>
            <span className="kv-v">{sel.time}</span>
          </div>
          <div className="kv">
            <span className="kv-k">Fee</span>
            <span className="kv-v">{money(feeCents(sel.cents))}</span>
          </div>
        </div>
        {sel.status === "Paid" && (
          <div className="btn-refund" onClick={refundSelected}>
            Refund this payment
          </div>
        )}
        <div className="drawer-foot">
          Refunds return to the customer&apos;s card in 5–10 business days. The processing fee is returned to you.
        </div>
      </div>
    </>
  );
}
