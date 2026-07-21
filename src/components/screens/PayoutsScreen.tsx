"use client";

import { money, PAYOUT_CENTS, PAYOUT_INSTANT_NET_CENTS, useTally } from "@/state/tally";

const PAYOUT_HISTORY = [
  { amount: "$1,192.30", desc: "Daily payout · Jul 17" },
  { amount: "$986.14", desc: "Daily payout · Jul 16" },
  { amount: "$1,405.88", desc: "Daily payout · Jul 15" },
  { amount: "$744.02", desc: "Daily payout · Jul 14" },
  { amount: "$1,038.66", desc: "Daily payout · Jul 13" },
];

export default function PayoutsScreen() {
  const { instantDone, sendInstant } = useTally();

  return (
    <div className="page page--760">
      <h1>Payouts</h1>
      <div className="payout-hero">
        <div className="payout-hero-text">
          <div className="payout-label">{instantDone ? "Instant payout sent" : "On the way to your bank"}</div>
          <div className="payout-amount">{money(instantDone ? PAYOUT_INSTANT_NET_CENTS : PAYOUT_CENTS)}</div>
          <div className="payout-eta">
            {instantDone ? "Sent — arriving in minutes" : "Arrives Tue, Jul 21"} · to Chase •• 4821
          </div>
        </div>
        {!instantDone && (
          <div className="btn-instant" onClick={sendInstant}>
            Get it today for 1% ($12.84)
          </div>
        )}
      </div>
      <div className="list-card">
        <div className="list-head">
          <span className="card-title">Payout history</span>
        </div>
        {PAYOUT_HISTORY.map((o) => (
          <div key={o.desc} className="orow">
            <span className="prow-amount">{o.amount}</span>
            <span className="prow-desc">{o.desc}</span>
            <span className="pill pill--paid">Paid out</span>
          </div>
        ))}
      </div>
    </div>
  );
}
