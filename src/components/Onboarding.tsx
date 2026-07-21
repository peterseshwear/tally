"use client";

import { BIZ_TYPES, OB_STEP_LABELS, useTally } from "@/state/tally";

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input placeholder={placeholder} />
    </div>
  );
}

export default function Onboarding() {
  const { obStep, biz, pickBiz, obNext, obBack } = useTally();

  return (
    <div className="ob-wrap">
      <div className="ob-card">
        <div className="brand">
          <div className="brand-mark">T</div>
          <span className="brand-name">TALLY</span>
          <span className="ob-step-label">
            Step {obStep + 1} of 4 · {OB_STEP_LABELS[obStep]}
          </span>
        </div>
        <div className="ob-bars">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`ob-bar${i <= obStep ? " ob-bar--done" : ""}`} />
          ))}
        </div>

        {obStep === 0 && (
          <>
            <div className="ob-heading">
              <div className="ob-title">Let&apos;s get you paid</div>
              <div className="ob-sub">Set up takes about 4 minutes. You can start taking payments today.</div>
            </div>
            <div className="ob-fields">
              <Field label="Business name" placeholder="Oat & Ivy Café" />
              <Field label="Your email" placeholder="june@oatandivy.com" />
            </div>
          </>
        )}

        {obStep === 1 && (
          <>
            <div className="ob-heading">
              <div className="ob-title">Tell us what you sell</div>
              <div className="ob-sub">This helps us verify your business and set the right payout schedule.</div>
            </div>
            <div className="choice-list">
              {BIZ_TYPES.map((b, i) => (
                <div key={b.name} className={`choice${i === biz ? " choice--on" : ""}`} onClick={() => pickBiz(i)}>
                  <div className="choice-radio" />
                  <div className="choice-text">
                    <span className="choice-name">{b.name}</span>
                    <span className="choice-hint">{b.hint}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {obStep === 2 && (
          <>
            <div className="ob-heading">
              <div className="ob-title">Verify your identity</div>
              <div className="ob-sub">
                Federal law requires us to confirm who&apos;s behind the business. Encrypted, never sold.
              </div>
            </div>
            <div className="ob-fields">
              <Field label="Legal name" placeholder="June Delgado" />
              <div className="ob-fields-row">
                <Field label="Date of birth" placeholder="MM / DD / YYYY" />
                <Field label="SSN (last 4)" placeholder="••••" />
              </div>
            </div>
          </>
        )}

        {obStep === 3 && (
          <>
            <div className="ob-heading">
              <div className="ob-title">Where should we send your money?</div>
              <div className="ob-sub">Daily payouts, free. You can change this anytime.</div>
            </div>
            <div className="ob-fields">
              <Field label="Routing number" placeholder="021000021" />
              <Field label="Account number" placeholder="•••• •••• 4821" />
              <div className="note-panel">
                <b>Your setup:</b> {BIZ_TYPES[biz].name} · 2.6% + 10¢ per payment · daily payouts, next-business-day
                arrival.
              </div>
            </div>
          </>
        )}

        <div className="ob-footer">
          <div className="btn-dark" onClick={obNext}>
            {obStep < 3 ? "Continue" : "Open my Tally account"}
          </div>
          {obStep > 0 && (
            <div className="ob-back" onClick={obBack}>
              ← Back
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
