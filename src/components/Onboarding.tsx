"use client";

import { useState } from "react";
import { BIZ_TYPES, OB_STEP_LABELS, useTally } from "@/state/tally";
import { HeroSection } from "./marketing/HeroSection";

type AuthScreen = "welcome" | "signup" | "signin";

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input placeholder={placeholder} />
    </div>
  );
}

function MarketingHome({
  onCreateAccount,
  onSignIn,
}: {
  onCreateAccount: () => void;
  onSignIn: () => void;
}) {
  return (
    <div className="home">
      <nav className="home-nav">
        <div className="brand">
          <div className="brand-mark">T</div>
          <span className="brand-name">TALLY</span>
        </div>
        <div className="home-nav-right">
          <a className="home-link" href="#contact">
            Contact us
          </a>
          <div className="btn-blue" onClick={onCreateAccount}>
            Create Account
          </div>
        </div>
      </nav>

      <HeroSection
        title="Trusted by small businesses everywhere"
        subtitle={{ regular: "Payments that ", gradient: "make sense." }}
        description="Tally lets small businesses take payments in person and online, see their money clearly, and get paid out daily — one simple fee, no jargon."
        ctaText="Create Account"
        onCtaClick={onCreateAccount}
        secondaryText="Sign in"
        onSecondaryClick={onSignIn}
      />

      <section className="home-features-grid">
        <div className="home-feature-card">
          <div className="feature-dot feature-dot--lg">✓</div>
          <div className="home-feature-title">Accept payments anywhere</div>
          <div className="home-feature-text">
            Tap-to-pay on your phone, payment links, QR codes, online checkout.
          </div>
        </div>
        <div className="home-feature-card">
          <div className="feature-dot feature-dot--lg">✓</div>
          <div className="home-feature-title">See your money clearly</div>
          <div className="home-feature-text">
            Plain-English dashboard, explicit payout dates, disputes without the legalese.
          </div>
        </div>
        <div className="home-feature-card">
          <div className="feature-dot feature-dot--lg">✓</div>
          <div className="home-feature-title">One simple fee</div>
          <div className="home-feature-text">2.6% + 10¢ per payment, daily payouts included.</div>
        </div>
      </section>

      <footer className="home-footer" id="contact">
        <span>© {new Date().getFullYear()} Tally</span>
        <a className="home-link" href="mailto:hello@tally.com">
          Contact us
        </a>
      </footer>
    </div>
  );
}

function AuthFlow({
  screen,
  setScreen,
}: {
  screen: "signup" | "signin";
  setScreen: (next: AuthScreen) => void;
}) {
  const { signUp, signIn } = useTally();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const canSubmit = email.includes("@") && password.length >= 6 && !busy;

  const submit = async (isSignup: boolean) => {
    if (!canSubmit) return;
    setBusy(true);
    setError(null);
    const message = await (isSignup ? signUp(email, password) : signIn(email, password));
    setBusy(false);
    if (message) setError(message);
  };

  const switchScreen = (next: AuthScreen) => {
    setScreen(next);
    setError(null);
  };

  const isSignup = screen === "signup";
  return (
    <>
      <div className="ob-heading">
        <div className="ob-title">{isSignup ? "Create your account" : "Welcome back"}</div>
        <div className="ob-sub">
          {isSignup ? "Free to start — you only pay when you get paid." : "Sign in to your Tally dashboard."}
        </div>
      </div>
      <div className="ob-fields">
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="june@oatandivy.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="auth-error">{error}</div>}
      </div>
      <div className="ob-footer">
        <div className={`btn-dark${canSubmit ? "" : " btn-dark--disabled"}`} onClick={() => submit(isSignup)}>
          {busy ? "One moment…" : isSignup ? "Create account" : "Sign in"}
        </div>
        <div className="auth-switch">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <span className="link" onClick={() => switchScreen("signin")}>
                Sign in
              </span>
            </>
          ) : (
            <>
              New to Tally?{" "}
              <span className="link" onClick={() => switchScreen("signup")}>
                Sign up
              </span>
            </>
          )}
        </div>
        <div className="ob-back" onClick={() => switchScreen("welcome")}>
          ← Back
        </div>
      </div>
    </>
  );
}

function QuestionSteps() {
  const { obStep, biz, bizName, setBizName, pickBiz, obNext, obBack } = useTally();

  return (
    <>
      <div className="ob-bars">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`ob-bar${i <= obStep ? " ob-bar--done" : ""}`} />
        ))}
      </div>

      {obStep === 0 && (
        <>
          <div className="ob-heading">
            <div className="ob-title">Let&apos;s get you paid</div>
            <div className="ob-sub">A few quick questions and you can start taking payments today.</div>
          </div>
          <div className="ob-fields">
            <div className="field">
              <label>Business name</label>
              <input
                placeholder="Oat & Ivy Café"
                value={bizName}
                onChange={(e) => setBizName(e.target.value)}
              />
            </div>
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
            <Field label="Date of birth" placeholder="MM / DD / YYYY" />
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
              <b>Your setup:</b> {bizName.trim() || "Your business"} · {BIZ_TYPES[biz].name} · 2.6% + 10¢ per payment ·
              daily payouts, next-business-day arrival.
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
    </>
  );
}

export default function Onboarding() {
  const { authed, obStep } = useTally();
  const [screen, setScreen] = useState<AuthScreen>("welcome");

  if (!authed && screen === "welcome") {
    return <MarketingHome onCreateAccount={() => setScreen("signup")} onSignIn={() => setScreen("signin")} />;
  }

  return (
    <div className="ob-wrap">
      <div className="ob-card">
        <div className="brand">
          <div className="brand-mark">T</div>
          <span className="brand-name">TALLY</span>
          {authed && (
            <span className="ob-step-label">
              Step {obStep + 1} of 4 · {OB_STEP_LABELS[obStep]}
            </span>
          )}
        </div>
        {authed ? <QuestionSteps /> : <AuthFlow screen={screen as "signup" | "signin"} setScreen={setScreen} />}
      </div>
    </div>
  );
}
