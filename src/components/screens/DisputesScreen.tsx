"use client";

import { useTally } from "@/state/tally";

const EVIDENCE_ITEMS = [
  { label: "Receipt & order details", hint: "Auto-attached from the payment" },
  { label: "Delivery / fulfillment proof", hint: "Pickup signature, tracking, or timestamps" },
  { label: "Customer communication", hint: "Emails or texts about the order" },
];

export default function DisputesScreen() {
  const { evidence, toggleEvidence, dispSubmitted, submitDispute } = useTally();
  const allChecked = evidence.every(Boolean);

  return (
    <div className="page page--760">
      <h1>Disputes</h1>

      {!dispSubmitted ? (
        <div className="dispute-card">
          <div className="dispute-head">
            <div className="dispute-head-text">
              <div className="dispute-title">$120.00 — &quot;I didn&apos;t make this purchase&quot;</div>
              <div className="dispute-meta">Online checkout · Mastercard •• 8830 · paid Jul 12</div>
            </div>
            <span className="pill-due">Respond by Jul 26</span>
          </div>
          <div className="note-panel note-panel--13">
            The cardholder&apos;s bank reversed this payment while they investigate. <b>You don&apos;t owe anything
            yet.</b> Send evidence below and we&apos;ll build your response — merchants win about half of these.
          </div>
          <div className="evidence">
            <div className="section-label">Evidence checklist</div>
            {EVIDENCE_ITEMS.map((e, i) => (
              <div
                key={e.label}
                className={`choice choice--check${evidence[i] ? " choice--on" : ""}`}
                onClick={() => toggleEvidence(i)}
              >
                <div className="choice-box">{evidence[i] ? "✓" : ""}</div>
                <div className="choice-text">
                  <span className="choice-name">{e.label}</span>
                  <span className="choice-hint">{e.hint}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={`btn-submit${allChecked ? " btn-submit--ready" : ""}`} onClick={submitDispute}>
            {allChecked ? "Submit response" : "Check all three items to submit"}
          </div>
        </div>
      ) : (
        <div className="dispute-done">
          <div className="check-circle">✓</div>
          <div className="dispute-done-title">Response submitted</div>
          <div className="dispute-done-note">
            We sent your evidence to the cardholder&apos;s bank. Decisions usually take 60–75 days — we&apos;ll email
            you the moment there&apos;s news.
          </div>
        </div>
      )}
    </div>
  );
}
