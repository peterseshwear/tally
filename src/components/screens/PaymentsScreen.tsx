"use client";

import { useTally } from "@/state/tally";
import PaymentRow from "../PaymentRow";

export default function PaymentsScreen() {
  const { payments } = useTally();

  return (
    <div className="page">
      <h1>Payments</h1>
      <div className="list-card">
        <div className="cols-head">
          <span>Amount</span>
          <span>Description</span>
          <span style={{ textAlign: "center" }}>Status</span>
          <span style={{ textAlign: "right" }}>When</span>
        </div>
        {payments.map((p) => (
          <PaymentRow key={p.id} payment={p} table />
        ))}
      </div>
    </div>
  );
}
