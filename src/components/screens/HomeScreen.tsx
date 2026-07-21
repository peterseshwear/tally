"use client";

import { money, PAYOUT_CENTS, PAYOUT_INSTANT_NET_CENTS, useTally } from "@/state/tally";
import PaymentRow from "../PaymentRow";

const WEEK_BARS = [
  { day: "Mon", h: "45%" },
  { day: "Tue", h: "62%" },
  { day: "Wed", h: "54%" },
  { day: "Thu", h: "70%" },
  { day: "Fri", h: "92%" },
  { day: "Sat", h: "78%" },
  { day: "Sun", h: "38%" },
];

export default function HomeScreen() {
  const { payments, go, instantDone, dispSubmitted } = useTally();

  const todayTotal = payments
    .filter((p) => (p.time.includes("AM") || p.time === "Just now") && p.status === "Paid")
    .reduce((sum, p) => sum + p.cents, 0);

  return (
    <div className="page page--home">
      <div className="page-head">
        <h1>Good morning, June</h1>
        <span className="page-date">Sun, Jul 19 · All systems normal</span>
      </div>

      <div className="stats">
        <div className="stat stat--dark stat--click" onClick={() => go("payouts")}>
          <div className="stat-label">On the way to your bank</div>
          <div className="stat-value">{money(instantDone ? PAYOUT_INSTANT_NET_CENTS : PAYOUT_CENTS)}</div>
          <div className="stat-note">{instantDone ? "Sent — arriving in minutes" : "Arrives Tue, Jul 21"}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Today so far</div>
          <div className="stat-value">{money(todayTotal)}</div>
          <div className="stat-note stat-note--green">▲ 12% vs last Sunday</div>
        </div>
        <div className="stat stat--click" onClick={() => go("disputes")}>
          <div className="stat-label">Needs your attention</div>
          <div className="stat-value">{dispSubmitted ? "0 items" : "1 dispute"}</div>
          <div className="stat-note stat-note--accent">
            {dispSubmitted ? "All clear — nice work" : "Respond by Jul 26 → we'll help"}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <span className="card-title">This week</span>
          <span className="card-sub">Mon Jul 13 – Sun Jul 19</span>
        </div>
        <div className="chart">
          {WEEK_BARS.map((w, i) => (
            <div key={w.day} className="chart-col">
              <div className={`chart-bar${i === 6 ? " chart-bar--today" : ""}`} style={{ height: w.h }} />
              <span className="chart-day">{w.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="list-card">
        <div className="list-head">
          <span className="card-title">Recent payments</span>
          <span className="link" onClick={() => go("payments")}>
            View all →
          </span>
        </div>
        {payments.slice(0, 4).map((p) => (
          <PaymentRow key={p.id} payment={p} />
        ))}
      </div>
    </div>
  );
}
