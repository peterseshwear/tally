"use client";

import { money, pillClass, useTally, type DisplayPayment } from "@/state/tally";

export default function PaymentRow({ payment, table }: { payment: DisplayPayment; table?: boolean }) {
  const { openDetail } = useTally();
  return (
    <div className={`prow${table ? " prow--table" : ""}`} onClick={() => openDetail(payment.id)}>
      <span className="prow-amount">{money(payment.cents)}</span>
      <span className="prow-desc">{payment.desc}</span>
      <span className={pillClass(payment.status)}>{payment.status}</span>
      <span className="prow-when">{payment.time}</span>
    </div>
  );
}
