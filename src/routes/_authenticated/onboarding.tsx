import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type ComponentType, type ReactNode } from "react";
import {
  Sparkles,
  CheckCircle2,
  Building2,
  ShieldCheck,
  ShoppingBag,
  CreditCard,
  Layout,
  FlaskConical,
  Rocket,
  ArrowRight,
  Clock,
  BookOpen,
  PlayCircle,
  LifeBuoy,
  CalendarDays,
  ChevronRight,
  Store,
  ShoppingCart,
  Layers,
  Code2,
  Trophy,
  Check,
  X,
  PartyPopper,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/onboarding")({
  component: OnboardingPage,
  head: () => ({
    meta: [
      { title: "Welcome to Tally — Onboarding" },
      { name: "description", content: "Go from zero to your first payment in about 5 minutes." },
      { property: "og:title", content: "Welcome to Tally" },
      {
        property: "og:description",
        content: "Set up your workspace and accept payments worldwide.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
});

/* -------------------------- Tokens -------------------------- */
const C = {
  bg: "#FAFBFF",
  card: "#FFFFFF",
  border: "#ECECEC",
  hairline: "#F3F4F6",
  text: "#0B0B0F",
  textMuted: "#5B6472",
  textFaint: "#9AA1AB",
  blue: "#2563EB",
  violet: "#7C3AED",
  green: "#10B981",
  amber: "#F59E0B",
  pink: "#EC4899",
};

const KF = `
@keyframes ob-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes ob-pop { 0% { transform: scale(.6); opacity: 0 } 60% { transform: scale(1.08); opacity: 1 } 100% { transform: scale(1); opacity: 1 } }
@keyframes ob-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
@keyframes ob-shine { 0% { background-position: -220px 0 } 100% { background-position: 220px 0 } }
@keyframes ob-progress { from { width: 0% } }
@keyframes ob-fade { from { opacity: 0 } to { opacity: 1 } }
`;

/* -------------------------- Types -------------------------- */
type StepKey =
  "workspace" | "business" | "kyc" | "store" | "provider" | "checkout" | "test" | "live";

type Step = {
  key: StepKey;
  n: number;
  title: string;
  desc: string;
  why: string;
  eta: string;
  cta: string;
  icon: ComponentType<{ className?: string }>;
  accent: string;
};

const STEPS: Step[] = [
  {
    key: "workspace",
    n: 1,
    title: "Create workspace",
    desc: "Your workspace has been created successfully.",
    why: "This is your team's home for payments, disputes and analytics.",
    eta: "Done",
    cta: "Review workspace",
    icon: Sparkles,
    accent: C.green,
  },
  {
    key: "business",
    n: 2,
    title: "Complete business information",
    desc: "Add your legal business details so we can prepare your account.",
    why: "Required to activate payouts and comply with financial regulations.",
    eta: "2 min",
    cta: "Complete profile",
    icon: Building2,
    accent: C.blue,
  },
  {
    key: "kyc",
    n: 3,
    title: "Verify your identity",
    desc: "Complete KYC verification to unlock payouts.",
    why: "Verification protects your funds and unlocks daily bank transfers.",
    eta: "3 min",
    cta: "Start verification",
    icon: ShieldCheck,
    accent: C.violet,
  },
  {
    key: "store",
    n: 4,
    title: "Connect your ecommerce platform",
    desc: "Sync products, orders and customers from your store.",
    why: "Bring your existing catalog and history to Tally in one click.",
    eta: "1 min",
    cta: "Choose a platform",
    icon: ShoppingBag,
    accent: C.pink,
  },
  {
    key: "provider",
    n: 5,
    title: "Connect your payment provider",
    desc: "Route payments through the acquirer that fits your business.",
    why: "Best-in-class routing means higher approval rates and lower fees.",
    eta: "2 min",
    cta: "Pick a provider",
    icon: CreditCard,
    accent: C.blue,
  },
  {
    key: "checkout",
    n: 6,
    title: "Configure your checkout",
    desc: "Customize colors, fonts and payment methods.",
    why: "A branded checkout increases conversion by up to 18%.",
    eta: "3 min",
    cta: "Open checkout builder",
    icon: Layout,
    accent: C.violet,
  },
  {
    key: "test",
    n: 7,
    title: "Create your first payment",
    desc: "Run a sandbox payment to verify your setup end-to-end.",
    why: "Confirms webhooks, receipts and reporting are wired correctly.",
    eta: "1 min",
    cta: "Create test payment",
    icon: FlaskConical,
    accent: C.amber,
  },
  {
    key: "live",
    n: 8,
    title: "Go live",
    desc: "You're ready to start accepting payments.",
    why: "Flip the switch and process your first real transaction.",
    eta: "1 min",
    cta: "Launch dashboard",
    icon: Rocket,
    accent: C.green,
  },
];

type Achievement = {
  key: StepKey;
  label: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
};
const ACHIEVEMENTS: Achievement[] = [
  { key: "workspace", label: "Workspace Created", icon: Sparkles, color: C.green },
  { key: "kyc", label: "Business Verified", icon: ShieldCheck, color: C.violet },
  { key: "store", label: "Store Connected", icon: ShoppingBag, color: C.pink },
  { key: "checkout", label: "Checkout Published", icon: Layout, color: C.blue },
  { key: "test", label: "First Payment", icon: FlaskConical, color: C.amber },
  { key: "live", label: "Go Live", icon: Trophy, color: C.green },
];

/* -------------------------- Page -------------------------- */
function OnboardingPage() {
  // Workspace is done automatically for a new merchant. Everything else empty.
  const [done, setDone] = useState<Record<StepKey, boolean>>({
    workspace: true,
    business: false,
    kyc: false,
    store: false,
    provider: false,
    checkout: false,
    test: false,
    live: false,
  });
  const [modal, setModal] = useState<null | "store" | "provider" | "celebration">(null);
  const [expanded, setExpanded] = useState<StepKey | null>("business");

  const completedCount = useMemo(() => Object.values(done).filter(Boolean).length, [done]);
  const pct = Math.round((completedCount / STEPS.length) * 100);

  const nextStep = STEPS.find((s) => !done[s.key]);

  const complete = (k: StepKey) =>
    setDone((d) => {
      const next = { ...d, [k]: true };
      if (k === "live") setModal("celebration");
      // auto-open next
      const nextK = STEPS.find((s) => !next[s.key])?.key ?? null;
      setExpanded(nextK);
      return next;
    });

  return (
    <div className="min-h-screen w-full" style={{ background: C.bg, color: C.text }}>
      <style>{KF}</style>
      <Backdrop />

      {/* Top bar */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <span
            className="grid h-8 w-8 place-items-center rounded-lg text-white text-[13px] font-bold"
            style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.violet})` }}
          >
            T
          </span>
          <span className="text-[15px] font-semibold tracking-tight">Tally</span>
        </div>
        <Link
          to="/app"
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12.5px] font-semibold transition-colors"
          style={{ color: C.textMuted }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
        >
          Skip for now <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </header>

      <main className="relative z-10 mx-auto grid max-w-7xl gap-8 px-6 pb-24 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* LEFT — Hero + checklist */}
        <div className="min-w-0 space-y-8">
          <Hero
            pct={pct}
            completedCount={completedCount}
            total={STEPS.length}
            nextTitle={nextStep?.title ?? "You're all set"}
          />

          <ol className="space-y-3">
            {STEPS.map((s, i) => (
              <StepCard
                key={s.key}
                step={s}
                index={i}
                done={done[s.key]}
                expanded={expanded === s.key}
                onToggle={() => setExpanded(expanded === s.key ? null : s.key)}
                onAction={() => {
                  if (s.key === "store") {
                    setModal("store");
                    return;
                  }
                  if (s.key === "provider") {
                    setModal("provider");
                    return;
                  }
                  complete(s.key);
                }}
              />
            ))}
          </ol>
        </div>

        {/* RIGHT — Help + achievements */}
        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <AchievementsCard done={done} />
          <HelpCard />
          <TimeCard eta="≈ 5 minutes" />
        </aside>
      </main>

      {modal === "store" && (
        <PickerModal
          onClose={() => setModal(null)}
          onPick={() => {
            setModal(null);
            complete("store");
          }}
          title="Connect your ecommerce platform"
          subtitle="Sync products, orders and customers automatically."
          items={[
            {
              name: "Shopify",
              tag: "Most popular",
              desc: "One-click sync for stores of any size.",
              icon: ShoppingBag,
              color: C.green,
            },
            {
              name: "WooCommerce",
              tag: "WordPress",
              desc: "Official plugin, install in seconds.",
              icon: Store,
              color: C.violet,
            },
            {
              name: "Magento",
              tag: "Adobe",
              desc: "Enterprise grade catalog and orders.",
              icon: ShoppingCart,
              color: C.pink,
            },
            {
              name: "BigCommerce",
              tag: "SaaS",
              desc: "Native integration with your storefront.",
              icon: Layers,
              color: C.blue,
            },
            {
              name: "Custom API",
              tag: "Developers",
              desc: "Use our REST or GraphQL API.",
              icon: Code2,
              color: C.textMuted,
            },
          ]}
        />
      )}
      {modal === "provider" && (
        <PickerModal
          onClose={() => setModal(null)}
          onPick={() => {
            setModal(null);
            complete("provider");
          }}
          title="Connect your payment provider"
          subtitle="Route transactions through the acquirer that fits your business."
          items={[
            {
              name: "Stripe",
              tag: "Recommended",
              desc: "Global acquirer with best-in-class APIs.",
              icon: CreditCard,
              color: C.violet,
            },
            {
              name: "Adyen",
              tag: "Enterprise",
              desc: "High-volume routing and local methods.",
              icon: CreditCard,
              color: C.blue,
            },
            {
              name: "Checkout.com",
              tag: "Global",
              desc: "Direct acquiring in 40+ markets.",
              icon: CreditCard,
              color: C.pink,
            },
            {
              name: "Worldpay",
              tag: "Enterprise",
              desc: "Legacy-ready with modern rails.",
              icon: CreditCard,
              color: C.amber,
            },
            {
              name: "Custom",
              tag: "BYO",
              desc: "Bring your own acquirer via our API.",
              icon: Code2,
              color: C.textMuted,
            },
          ]}
        />
      )}
      {modal === "celebration" && <CelebrationModal onClose={() => setModal(null)} />}
    </div>
  );
}

/* -------------------------- Backdrop -------------------------- */
function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-70"
        style={{ background: `radial-gradient(closest-side, ${C.blue}22, transparent 70%)` }}
      />
      <div
        className="absolute -top-20 right-[-120px] h-[420px] w-[520px] rounded-full opacity-70"
        style={{ background: `radial-gradient(closest-side, ${C.violet}22, transparent 70%)` }}
      />
      <svg
        className="absolute inset-0 h-full w-full opacity-[.4]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="ob-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill={C.border} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ob-grid)" />
      </svg>
    </div>
  );
}

/* -------------------------- Hero -------------------------- */
function Hero({
  pct,
  completedCount,
  total,
  nextTitle,
}: {
  pct: number;
  completedCount: number;
  total: number;
  nextTitle: string;
}) {
  return (
    <section
      className="relative overflow-hidden rounded-3xl p-8 md:p-10"
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        boxShadow: "0 20px 60px -30px rgba(37,99,235,.25), 0 2px 8px rgba(17,17,17,.04)",
        animation: "ob-rise .5s ease-out both",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full"
        style={{ background: `radial-gradient(closest-side, ${C.violet}22, transparent)` }}
      />
      <span
        className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold"
        style={{ borderColor: C.border, color: C.textMuted, background: C.hairline }}
      >
        <Sparkles className="h-3 w-3" style={{ color: C.violet }} /> Onboarding
      </span>
      <h1 className="mt-4 flex flex-wrap items-center gap-2 text-[34px] font-semibold tracking-tight md:text-[42px]">
        Welcome to Tally
        <span className="inline-block" style={{ animation: "ob-float 3s ease-in-out infinite" }}>
          👋
        </span>
      </h1>
      <p className="mt-2 max-w-2xl text-[15px]" style={{ color: C.textMuted }}>
        Let's get your business ready to accept payments and grow worldwide. You're one focused
        session away from your first successful transaction.
      </p>

      {/* Progress */}
      <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="min-w-0">
          <div
            className="flex items-center justify-between text-[12.5px]"
            style={{ color: C.textMuted }}
          >
            <span className="font-semibold" style={{ color: C.text }}>
              {pct}% complete
            </span>
            <span>
              {completedCount} of {total} steps
            </span>
          </div>
          <div
            className="relative mt-2 h-2 w-full overflow-hidden rounded-full"
            style={{ background: C.hairline }}
          >
            <div
              className="relative h-full rounded-full transition-[width] duration-700 ease-out"
              style={{
                width: `${pct}%`,
                background: `linear-gradient(90deg, ${C.blue}, ${C.violet})`,
              }}
            >
              <span
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent)",
                  backgroundSize: "220px 100%",
                  animation: "ob-shine 1.8s linear infinite",
                }}
              />
            </div>
            {[12, 25, 50, 75, 100].map((mark) => (
              <span
                key={mark}
                className="absolute top-0 h-full w-px"
                style={{ left: `${mark}%`, background: "#ffffff88" }}
              />
            ))}
          </div>
          <div
            className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px]"
            style={{ color: C.textFaint }}
          >
            {[0, 12, 25, 50, 75, 100].map((m) => (
              <span
                key={m}
                className={pct >= m ? "font-semibold" : ""}
                style={{ color: pct >= m ? C.text : C.textFaint }}
              >
                {m}%
              </span>
            ))}
          </div>
        </div>
        <div
          className="flex items-center gap-2 rounded-2xl px-4 py-3"
          style={{ background: C.hairline, border: `1px solid ${C.border}` }}
        >
          <Clock className="h-4 w-4" style={{ color: C.blue }} />
          <div className="leading-tight">
            <p className="text-[11px]" style={{ color: C.textFaint }}>
              Estimated setup time
            </p>
            <p className="text-[13px] font-semibold">Approximately 5 minutes</p>
          </div>
        </div>
      </div>

      {/* Next step nudge */}
      <div
        className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3"
        style={{
          background: `linear-gradient(90deg, ${C.blue}0d, ${C.violet}0d)`,
          border: `1px dashed ${C.border}`,
        }}
      >
        <div className="flex items-center gap-2 text-[12.5px]" style={{ color: C.text }}>
          <span
            className="grid h-6 w-6 place-items-center rounded-full text-white text-[11px] font-bold"
            style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.violet})` }}
          >
            {completedCount + 1 <= total ? completedCount + 1 : "★"}
          </span>
          <span className="font-semibold">Next up:</span>
          <span style={{ color: C.textMuted }}>{nextTitle}</span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- Step Card -------------------------- */
function StepCard({
  step,
  index,
  done,
  expanded,
  onToggle,
  onAction,
}: {
  step: Step;
  index: number;
  done: boolean;
  expanded: boolean;
  onToggle: () => void;
  onAction: () => void;
}) {
  const auto = step.key === "workspace";
  return (
    <li
      className="group"
      style={{ animation: "ob-rise .45s ease-out both", animationDelay: `${index * 55}ms` }}
    >
      <div
        className="overflow-hidden rounded-3xl transition-all"
        style={{
          background: C.card,
          border: `1px solid ${done ? `${step.accent}55` : C.border}`,
          boxShadow: expanded
            ? "0 20px 40px -24px rgba(17,17,17,.15), 0 2px 6px rgba(17,17,17,.05)"
            : "0 1px 2px rgba(17,17,17,.04)",
        }}
      >
        <button
          onClick={onToggle}
          className="flex w-full items-center gap-4 px-5 py-5 text-left transition-colors"
          onMouseEnter={(e) => {
            if (!expanded) e.currentTarget.style.background = C.bg;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <StepIcon step={step} done={done} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
                style={{ background: C.hairline, color: C.textMuted }}
              >
                Step {step.n}
              </span>
              <h3 className="text-[15px] font-semibold" style={{ color: C.text }}>
                {step.title}
              </h3>
              {done ? (
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold"
                  style={{
                    background: `${C.green}18`,
                    color: C.green,
                    animation: "ob-pop .3s ease-out both",
                  }}
                >
                  <Check className="h-3 w-3" /> {auto ? "Done automatically" : "Completed"}
                </span>
              ) : (
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold"
                  style={{ background: C.hairline, color: C.textMuted }}
                >
                  <Clock className="h-3 w-3" /> {step.eta}
                </span>
              )}
            </div>
            <p className="mt-1 truncate text-[12.5px]" style={{ color: C.textMuted }}>
              {step.desc}
            </p>
          </div>
          <ChevronRight
            className="h-4 w-4 shrink-0 transition-transform"
            style={{ color: C.textFaint, transform: expanded ? "rotate(90deg)" : "rotate(0deg)" }}
          />
        </button>

        {expanded && (
          <div className="px-5 pb-5" style={{ animation: "ob-fade .25s ease-out both" }}>
            <div
              className="grid gap-4 rounded-2xl p-5 md:grid-cols-3"
              style={{ background: C.bg, border: `1px solid ${C.border}` }}
            >
              <Detail label="Why it matters" value={step.why} />
              <Detail
                label="What happens next"
                value={
                  done
                    ? "This step is complete. You can revisit it anytime."
                    : "You'll be guided step by step and can save progress."
                }
              />
              <Detail label="Time required" value={step.eta} />
            </div>

            {!done && !auto && (
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={onAction}
                  className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-white transition-all hover:brightness-110 hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${C.blue}, ${C.violet})`,
                    boxShadow: "0 8px 20px -8px rgba(37,99,235,.55)",
                  }}
                >
                  {step.cta} <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={onToggle}
                  className="rounded-xl px-3 py-2.5 text-[12.5px] font-semibold transition-colors"
                  style={{ color: C.textMuted }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
                >
                  I'll do this later
                </button>
              </div>
            )}
            {done && auto && (
              <div
                className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2 text-[12.5px]"
                style={{
                  background: `${C.green}0d`,
                  border: `1px solid ${C.green}33`,
                  color: C.text,
                }}
              >
                <CheckCircle2 className="h-4 w-4" style={{ color: C.green }} />
                Your workspace is ready. Everything below will save automatically as you progress.
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

function StepIcon({ step, done }: { step: Step; done: boolean }) {
  return (
    <div
      className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition-transform group-hover:scale-105"
      style={{
        background: done ? `${step.accent}18` : C.hairline,
        color: done ? step.accent : C.text,
        border: `1px solid ${done ? `${step.accent}44` : C.border}`,
      }}
    >
      {done ? (
        <CheckCircle2 className="h-5 w-5" style={{ animation: "ob-pop .35s ease-out both" }} />
      ) : (
        <step.icon className="h-5 w-5" />
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        className="text-[10.5px] font-semibold uppercase tracking-wider"
        style={{ color: C.textFaint }}
      >
        {label}
      </p>
      <p className="mt-1 text-[12.5px]" style={{ color: C.text }}>
        {value}
      </p>
    </div>
  );
}

/* -------------------------- Aside cards -------------------------- */
function AchievementsCard({ done }: { done: Record<StepKey, boolean> }) {
  const unlocked = ACHIEVEMENTS.filter((a) => done[a.key]).length;
  return (
    <div
      className="rounded-3xl p-5"
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        boxShadow: "0 1px 2px rgba(17,17,17,.04)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="grid h-8 w-8 place-items-center rounded-xl"
            style={{ background: `${C.amber}18`, color: C.amber }}
          >
            <Trophy className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[13.5px] font-semibold">Achievements</p>
            <p className="text-[11px]" style={{ color: C.textFaint }}>
              {unlocked} of {ACHIEVEMENTS.length} unlocked
            </p>
          </div>
        </div>
      </div>
      <ul className="mt-4 grid grid-cols-3 gap-2">
        {ACHIEVEMENTS.map((a) => {
          const on = done[a.key];
          return (
            <li
              key={a.key}
              className="flex flex-col items-center gap-1.5 rounded-2xl p-3 text-center transition-all"
              style={{
                background: on ? `${a.color}0d` : C.bg,
                border: `1px solid ${on ? `${a.color}55` : C.border}`,
                animation: on ? "ob-pop .35s ease-out both" : undefined,
              }}
            >
              <div
                className="grid h-9 w-9 place-items-center rounded-full"
                style={{
                  background: on ? a.color : C.hairline,
                  color: on ? "#fff" : C.textFaint,
                  filter: on ? undefined : "grayscale(1)",
                  transition: "all .25s ease",
                }}
              >
                <a.icon className="h-4 w-4" />
              </div>
              <span
                className="text-[10.5px] font-semibold leading-tight"
                style={{ color: on ? C.text : C.textFaint }}
              >
                {a.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function HelpCard() {
  const items = [
    { icon: BookOpen, label: "Read documentation", desc: "Guides, API reference and examples." },
    { icon: PlayCircle, label: "Watch quick tutorial", desc: "3-minute product tour." },
    { icon: LifeBuoy, label: "Contact support", desc: "Reply within 4 hours." },
    { icon: CalendarDays, label: "Book an onboarding call", desc: "Free 30 min with an expert." },
  ];
  return (
    <div
      className="rounded-3xl p-5"
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        boxShadow: "0 1px 2px rgba(17,17,17,.04)",
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="grid h-8 w-8 place-items-center rounded-xl"
          style={{ background: `${C.blue}18`, color: C.blue }}
        >
          <LifeBuoy className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[13.5px] font-semibold">Need help?</p>
          <p className="text-[11px]" style={{ color: C.textFaint }}>
            We're with you at every step
          </p>
        </div>
      </div>
      <ul className="mt-3 space-y-1">
        {items.map((i) => (
          <li key={i.label}>
            <button
              className="group flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.background = C.bg)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div
                className="grid h-8 w-8 place-items-center rounded-lg"
                style={{ background: C.hairline, color: C.text }}
              >
                <i.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] font-semibold">{i.label}</p>
                <p className="text-[11px]" style={{ color: C.textMuted }}>
                  {i.desc}
                </p>
              </div>
              <ChevronRight
                className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                style={{ color: C.textFaint }}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TimeCard({ eta }: { eta: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl p-5 text-white"
      style={{
        background: `linear-gradient(135deg, ${C.blue}, ${C.violet})`,
        boxShadow: "0 20px 40px -20px rgba(124,58,237,.45)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full"
        style={{ background: "rgba(255,255,255,.15)" }}
      />
      <p className="text-[11px] uppercase tracking-wider opacity-80">Estimated time</p>
      <p className="mt-1 text-[26px] font-semibold">{eta}</p>
      <p className="mt-1 text-[12px] opacity-90">from zero to your first accepted payment</p>
    </div>
  );
}

/* -------------------------- Picker Modal -------------------------- */
type PickerItem = {
  name: string;
  tag: string;
  desc: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
};

function PickerModal({
  title,
  subtitle,
  items,
  onClose,
  onPick,
}: {
  title: string;
  subtitle: string;
  items: PickerItem[];
  onClose: () => void;
  onPick: (name: string) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center px-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0"
        style={{ background: "rgba(11,11,15,.5)" }}
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-3xl rounded-3xl p-6"
        style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          boxShadow: "0 40px 80px -20px rgba(17,17,17,.35)",
          animation: "ob-rise .28s ease-out both",
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: C.textFaint }}
            >
              Choose one
            </p>
            <h3 className="mt-1 text-[20px] font-semibold">{title}</h3>
            <p className="mt-1 text-[13px]" style={{ color: C.textMuted }}>
              {subtitle}
            </p>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg"
            style={{ color: C.textMuted }}
            onMouseEnter={(e) => (e.currentTarget.style.background = C.hairline)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {items.map((it, i) => (
            <li
              key={it.name}
              className="group flex items-center gap-3 rounded-2xl p-4 transition-all hover:-translate-y-0.5"
              style={{
                background: C.bg,
                border: `1px solid ${C.border}`,
                animation: "ob-rise .3s ease-out both",
                animationDelay: `${i * 40}ms`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 12px 28px -14px rgba(17,17,17,.18)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <div
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                style={{
                  background: `${it.color}18`,
                  color: it.color,
                  border: `1px solid ${it.color}33`,
                }}
              >
                <it.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[13.5px] font-semibold">{it.name}</p>
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
                    style={{ background: C.hairline, color: C.textMuted }}
                  >
                    {it.tag}
                  </span>
                </div>
                <p className="mt-0.5 text-[12px]" style={{ color: C.textMuted }}>
                  {it.desc}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <button
                  onClick={() => onPick(it.name)}
                  className="rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white transition-transform hover:scale-105"
                  style={{ background: C.text }}
                >
                  Connect
                </button>
                <button
                  className="text-[11px] font-semibold"
                  style={{ color: C.textFaint }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.textFaint)}
                >
                  Learn more
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* -------------------------- Celebration -------------------------- */
function CelebrationModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center px-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0"
        style={{ background: "rgba(11,11,15,.55)" }}
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl p-8 text-center"
        style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          boxShadow: "0 40px 80px -20px rgba(17,17,17,.35)",
          animation: "ob-pop .35s ease-out both",
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24"
          style={{ background: `linear-gradient(180deg, ${C.blue}22, transparent)` }}
        />
        <div
          className="mx-auto grid h-16 w-16 place-items-center rounded-2xl text-white"
          style={{
            background: `linear-gradient(135deg, ${C.blue}, ${C.violet})`,
            animation: "ob-float 2.4s ease-in-out infinite",
          }}
        >
          <PartyPopper className="h-7 w-7" />
        </div>
        <h3 className="mt-5 text-[22px] font-semibold">You're ready to accept payments</h3>
        <p className="mt-2 text-[13.5px]" style={{ color: C.textMuted }}>
          Your workspace is fully configured. Time to open the dashboard and watch your first orders
          flow in.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <Link
            to="/app"
            className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-white transition-all hover:brightness-110"
            style={{
              background: `linear-gradient(135deg, ${C.blue}, ${C.violet})`,
              boxShadow: "0 8px 20px -8px rgba(37,99,235,.55)",
            }}
          >
            Launch dashboard <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={onClose}
            className="rounded-xl px-3 py-2.5 text-[12.5px] font-semibold"
            style={{ color: C.textMuted }}
          >
            Stay here
          </button>
        </div>
      </div>
    </div>
  );
}
