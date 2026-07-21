"use client";

import { money, useTally } from "@/state/tally";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "⌫"];

export default function ChargeModal() {
  const { chargeStage, cents, closeCharge, tapKey, tapToPay, newSale } = useTally();

  return (
    <div className="overlay">
      <div className="modal">
        {chargeStage === "amount" && (
          <>
            <div className="modal-head">
              <span className="modal-title">New charge</span>
              <span className="close-x" onClick={closeCharge}>
                ✕
              </span>
            </div>
            <div className="amount-wrap">
              <div className="amount-label">Amount</div>
              <div className="amount-big">{money(cents)}</div>
            </div>
            <div className="keypad">
              {KEYS.map((k) => (
                <div key={k} className="key" onClick={() => tapKey(k)}>
                  {k}
                </div>
              ))}
            </div>
            <div className={`btn-tap${cents > 0 ? " btn-tap--ready" : ""}`} onClick={tapToPay}>
              Tap to Pay
            </div>
          </>
        )}

        {chargeStage === "processing" && (
          <div className="charge-processing">
            <div className="spinner" />
            <div className="charge-processing-amount">{money(cents)}</div>
            <div className="charge-processing-note">Hold the card near the phone…</div>
          </div>
        )}

        {chargeStage === "done" && (
          <>
            <div className="charge-done">
              <div className="check-circle check-circle--lg">✓</div>
              <div className="charge-done-amount">{money(cents)} paid</div>
              <div className="charge-done-note">Visa •• 4242 · receipt sent</div>
            </div>
            <div className="charge-done-actions">
              <div className="btn-outline" onClick={newSale}>
                New sale
              </div>
              <div className="btn-dark btn-dark--half" onClick={closeCharge}>
                Done
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
