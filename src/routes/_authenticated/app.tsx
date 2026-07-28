import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  LayoutGrid,
  ArrowLeftRight,
  Users,
  ShoppingCart,
  BarChart3,
  CreditCard,
  Banknote,
  ShieldAlert,
  Code2,
  Settings,
  Search,
  Bell,
  HelpCircle,
  Plus,
  ArrowUpRight,
  Store,
  KeyRound,
  UserPlus,
  Link2,
  BookOpen,
  Sparkles,
  Globe2,
  Wallet,
  TrendingUp,
  Receipt,
  Activity,
  Command,
  ChevronRight,
  ChevronDown,
  Zap,
  Boxes,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  Download,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { NAV_GROUPS as SHARED_NAV_GROUPS } from "@/components/app/nav";

export const Route = createFileRoute("/_authenticated/app")({
  component: AppHome,
  head: () => ({
    meta: [
      { title: "Overview — Tally" },
      { name: "description", content: "Your Tally merchant dashboard." },
      { property: "og:title", content: "Overview — Tally" },
      { property: "og:description", content: "Your Tally merchant dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

/* ============================================================
   DESIGN TOKENS
   ============================================================ */

const T = {
  bg: "#FAFBFC",
  card: "#FFFFFF",
  border: "#ECECEC",
  borderStrong: "#E0E0E3",
  text: "#111111",
  textMuted: "#6B7280",
  textFaint: "#9CA3AF",
  hairline: "#F3F4F6",
  blue: "#2563EB",
  violet: "#7C3AED",
  green: "#10B981",
  red: "#EF4444",
  amber: "#F59E0B",
  pink: "#EC4899",
};

const SHADOW_SOFT = "0 1px 2px rgba(17,17,17,0.04), 0 1px 3px rgba(17,17,17,0.03)";
const SHADOW_LIFT = "0 10px 30px rgba(17,17,17,0.07), 0 2px 6px rgba(17,17,17,0.04)";

/* ============================================================
   NAV DATA
   ============================================================ */

type NavItem = { label: string; icon: typeof LayoutGrid; key: string; to?: string; badge?: string };
type NavGroup = { title?: string; items: NavItem[] };

const NAV_GROUPS: NavGroup[] = SHARED_NAV_GROUPS;

/* ============================================================
   ROOT
   ============================================================ */

function AppHome() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [active, setActive] = useState("overview");
  const [range, setRange] = useState<"7D" | "30D" | "90D" | "YTD" | "ALL">("30D");
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      } else if (e.key === "Escape") {
        setCmdOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const initials = (email ?? "M").split("@")[0].slice(0, 2).toUpperCase();

  return (
    <div className="min-h-dvh font-manrope antialiased" style={{ background: T.bg, color: T.text }}>
      <style>{ANIM_CSS}</style>

      <a
        href="#dash-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[#111111] focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <TopNav
        email={email}
        initials={initials}
        onOpenCmd={() => setCmdOpen(true)}
        onSignOut={handleSignOut}
      />

      <div className="flex">
        <Sidebar active={active} setActive={setActive} />

        <main id="dash-main" className="min-w-0 flex-1 px-4 py-8 sm:px-8 sm:py-10">
          <div className="mx-auto max-w-[1280px]">
            {/* 12-column grid, luxurious gap */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <Breadcrumbs active={active} />
              </div>
              <div className="col-span-12">
                <Welcome />
              </div>

              <div className="col-span-12">
                <KpiRow />
              </div>

              <div className="col-span-12">
                <AnalyticsCard range={range} setRange={setRange} />
              </div>

              <div className="col-span-12">
                <SecondaryInsights />
              </div>

              <div className="col-span-12 lg:col-span-7">
                <TopCountries />
              </div>
              <div className="col-span-12 lg:col-span-5">
                <PaymentMethods />
              </div>

              <div className="col-span-12">
                <RecentTransactions />
              </div>

              <div className="col-span-12 lg:col-span-7">
                <LiveActivity />
              </div>
              <div className="col-span-12 lg:col-span-5">
                <QuickActions />
              </div>

              <div className="col-span-12">
                <p className="pb-6 text-center text-xs" style={{ color: T.textMuted }}>
                  Signed in as <span style={{ color: T.text }}>{email ?? "…"}</span>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {cmdOpen && <CommandPalette onClose={() => setCmdOpen(false)} />}
    </div>
  );
}

/* ============================================================
   TOP NAV
   ============================================================ */

function TopNav({
  email,
  initials,
  onOpenCmd,
  onSignOut,
}: {
  email: string | null;
  initials: string;
  onOpenCmd: () => void;
  onSignOut: () => void;
}) {
  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-xl"
      style={{ borderBottom: `1px solid ${T.border}`, background: "rgba(255,255,255,0.75)" }}
    >
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 pr-2">
          <div
            className="grid h-8 w-8 place-items-center rounded-xl text-white"
            style={{
              background: `linear-gradient(135deg, ${T.text} 0%, #2a2a2a 100%)`,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <Sparkles className="h-4 w-4" aria-hidden />
          </div>
          <span className="font-sora text-[15px] font-semibold tracking-tight">Tally</span>
        </Link>

        <button
          className="hidden items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition md:flex"
          style={{ color: T.text }}
          onMouseEnter={(e) => (e.currentTarget.style.background = T.hairline)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <span
            className="grid h-5 w-5 place-items-center rounded-md text-[9px] font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.violet})` }}
          >
            A
          </span>
          Acme Store
          <ChevronDown className="h-3 w-3" style={{ color: T.textMuted }} aria-hidden />
        </button>

        <div className="mx-auto hidden max-w-[520px] flex-1 md:block">
          <button
            onClick={onOpenCmd}
            className="group flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-left text-sm transition"
            style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMuted }}
          >
            <Search className="h-4 w-4" aria-hidden />
            <span className="flex-1 truncate">
              Search transactions, customers, orders, API, docs…
            </span>
            <kbd
              className="inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium"
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.textMuted }}
            >
              <Command className="h-2.5 w-2.5" aria-hidden />K
            </kbd>
          </button>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <LiveBadge />
          <IconBtn label="Notifications">
            <span className="relative">
              <Bell className="h-4 w-4" aria-hidden />
              <span
                className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full"
                style={{ background: T.blue }}
                aria-hidden
              />
            </span>
          </IconBtn>
          <IconBtn label="Help">
            <HelpCircle className="h-4 w-4" aria-hidden />
          </IconBtn>
          <button
            onClick={onSignOut}
            className="ml-1 grid h-9 w-9 place-items-center rounded-full text-xs font-semibold text-white transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              background: `linear-gradient(135deg, ${T.blue} 0%, ${T.violet} 100%)`,
              outlineColor: T.blue,
            }}
            aria-label="Profile menu — sign out"
            title={email ?? "Account"}
          >
            {initials}
          </button>
        </div>
      </div>
    </header>
  );
}

function LiveBadge() {
  return (
    <span
      className="hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium sm:flex"
      style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
      aria-label="Live status"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
          style={{ background: T.green }}
        />
        <span
          className="relative inline-flex h-1.5 w-1.5 rounded-full"
          style={{ background: T.green }}
        />
      </span>
      Live
    </span>
  );
}

function IconBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-xl transition"
      style={{ color: T.textMuted }}
      onMouseEnter={(e) => (e.currentTarget.style.background = T.hairline)}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {children}
    </button>
  );
}

/* ============================================================
   SIDEBAR
   ============================================================ */

function Sidebar({
  active: _a,
  setActive: _s,
}: {
  active: string;
  setActive: (k: string) => void;
}) {
  return (
    <aside
      className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-[240px] shrink-0 px-3 py-5 md:block"
      style={{ borderRight: `1px solid ${T.border}`, background: T.card }}
      aria-label="Primary"
    >
      <nav className="flex flex-col gap-4">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className="flex flex-col gap-0.5">
            {group.title && (
              <p
                className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: T.textFaint }}
              >
                {group.title}
              </p>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = item.to === "/app";
              return (
                <Link
                  key={item.key}
                  to={item.to!}
                  className="group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-150"
                  style={{
                    background: isActive ? T.hairline : "transparent",
                    color: isActive ? T.text : T.textMuted,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = T.bg;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {isActive && (
                    <span
                      className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-r-full"
                      style={{ background: `linear-gradient(180deg, ${T.blue}, ${T.violet})` }}
                      aria-hidden
                    />
                  )}
                  <Icon
                    className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
                    aria-hidden
                  />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span
                      className="rounded-full px-1.5 text-[10px] font-semibold"
                      style={{ background: T.hairline, color: T.textMuted }}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div
        className="mt-6 overflow-hidden rounded-2xl p-4"
        style={{
          background: `linear-gradient(140deg, rgba(37,99,235,0.06) 0%, rgba(124,58,237,0.06) 100%)`,
          border: `1px solid ${T.border}`,
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="grid h-6 w-6 place-items-center rounded-md text-white"
            style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.violet})` }}
          >
            <Zap className="h-3 w-3" aria-hidden />
          </div>
          <p className="text-[11px] font-semibold" style={{ color: T.text }}>
            Test mode
          </p>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed" style={{ color: T.textMuted }}>
          Fresh workspace. Switch to live once your store is connected.
        </p>
        <button
          className="mt-3 inline-flex h-8 items-center gap-1 rounded-full px-3 text-[11px] font-medium text-white transition hover:opacity-90"
          style={{ background: T.text }}
        >
          Go live <ArrowUpRight className="h-3 w-3" aria-hidden />
        </button>
      </div>
    </aside>
  );
}

/* ============================================================
   BREADCRUMBS + WELCOME
   ============================================================ */

function Breadcrumbs({ active }: { active: string }) {
  const label =
    NAV_GROUPS.flatMap((g) => g.items).find((i) => i.key === active)?.label ?? "Overview";
  return (
    <nav className="flex items-center gap-1.5 text-[12px]" aria-label="Breadcrumb">
      <span style={{ color: T.textMuted }}>Acme Store</span>
      <ChevronRight className="h-3 w-3" style={{ color: T.textFaint }} aria-hidden />
      <span style={{ color: T.text }} className="font-medium">
        {label}
      </span>
    </nav>
  );
}

function Welcome() {
  return (
    <Card className="relative overflow-hidden p-6 sm:p-8">
      {/* soft gradient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(1000px 300px at 100% 0%, rgba(124,58,237,0.05), transparent 60%), radial-gradient(700px 220px at 0% 100%, rgba(37,99,235,0.05), transparent 60%)`,
        }}
      />
      <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
        <div className="min-w-0">
          <Badge>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: T.blue }} aria-hidden />
            New workspace
          </Badge>
          <h1 className="mt-3 font-sora text-3xl font-semibold tracking-tight sm:text-[36px]">
            Welcome to Tally
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed" style={{ color: T.textMuted }}>
            Your workspace is ready. Connect your ecommerce platform and start accepting payments in
            minutes.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <PrimaryButton>
              <Store className="h-4 w-4" aria-hidden /> Connect Store
            </PrimaryButton>
            <SecondaryButton>
              <BookOpen className="h-4 w-4" aria-hidden /> Explore Documentation
            </SecondaryButton>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {[
              { label: "Create account", done: true },
              { label: "Connect store", done: false },
              { label: "Configure checkout", done: false },
              { label: "Invite team", done: false },
            ].map((step, i) => (
              <div
                key={step.label}
                className="rounded-xl p-3"
                style={{
                  background: step.done ? "rgba(16,185,129,0.06)" : T.bg,
                  border: `1px solid ${step.done ? "rgba(16,185,129,0.22)" : T.border}`,
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="grid h-4 w-4 place-items-center rounded-full text-[9px] font-bold text-white"
                    style={{ background: step.done ? T.green : T.borderStrong }}
                  >
                    {step.done ? "✓" : i + 1}
                  </span>
                  <span className="text-[11px] font-medium" style={{ color: T.text }}>
                    {step.label}
                  </span>
                </div>
                <div
                  className="mt-2 h-1 w-full overflow-hidden rounded-full"
                  style={{ background: T.hairline }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: step.done ? "100%" : "0%",
                      background: `linear-gradient(90deg, ${T.blue}, ${T.violet})`,
                      transition: "width 900ms ease",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <OnboardingIllustration />
      </div>
    </Card>
  );
}

function OnboardingIllustration() {
  return (
    <div className="relative mx-auto hidden h-[220px] w-full max-w-[320px] lg:block">
      {/* backdrop card */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `linear-gradient(140deg, ${T.blue}0f, ${T.violet}0f)`,
          border: `1px solid ${T.border}`,
        }}
      />
      {/* main "receipt" card */}
      <div
        className="absolute left-6 top-6 w-[220px] rounded-2xl p-4 anim-float-slow"
        style={{ background: T.card, border: `1px solid ${T.border}`, boxShadow: SHADOW_LIFT }}
      >
        <div className="flex items-center gap-2">
          <div
            className="grid h-7 w-7 place-items-center rounded-lg text-white"
            style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.violet})` }}
          >
            <Wallet className="h-3.5 w-3.5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold" style={{ color: T.text }}>
              Payout ready
            </p>
            <p className="text-[9px]" style={{ color: T.textMuted }}>
              Current period
            </p>
          </div>
          <span
            className="rounded-full px-1.5 text-[9px] font-semibold"
            style={{ background: "rgba(16,185,129,0.1)", color: "#047857" }}
          >
            Live
          </span>
        </div>
        <p className="mt-3 font-sora text-lg font-semibold tabular-nums">€0.00</p>
        {/* mini bars */}
        <div className="mt-2 flex items-end gap-1">
          {[10, 14, 8, 16, 12, 18, 22].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: h,
                background: `linear-gradient(180deg, ${T.blue}, ${T.violet})`,
                opacity: 0.15 + i * 0.08,
              }}
            />
          ))}
        </div>
      </div>
      {/* floating "connected" badge */}
      <div
        className="absolute bottom-4 right-2 flex items-center gap-2 rounded-full px-3 py-1.5 anim-float"
        style={{ background: T.card, border: `1px solid ${T.border}`, boxShadow: SHADOW_LIFT }}
      >
        <ShieldCheck className="h-3.5 w-3.5" style={{ color: T.green }} aria-hidden />
        <span className="text-[10px] font-semibold" style={{ color: T.text }}>
          PCI DSS Ready
        </span>
      </div>
      {/* platform chips */}
      <div
        className="absolute bottom-16 left-2 flex items-center gap-1.5 rounded-full px-2 py-1 anim-float-slow"
        style={{ background: T.card, border: `1px solid ${T.border}`, boxShadow: SHADOW_SOFT }}
      >
        <span
          className="grid h-4 w-4 place-items-center rounded-full text-[8px] font-bold text-white"
          style={{ background: "#95BF47" }}
        >
          S
        </span>
        <span
          className="grid h-4 w-4 place-items-center rounded-full text-[8px] font-bold text-white"
          style={{ background: "#7F54B3" }}
        >
          W
        </span>
        <span className="pr-1 text-[10px] font-semibold" style={{ color: T.text }}>
          Ready to connect
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   PRIMITIVES
   ============================================================ */

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl ${className}`}
      style={{ background: T.card, border: `1px solid ${T.border}`, boxShadow: SHADOW_SOFT }}
    >
      {children}
    </div>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium text-white transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        background: T.text,
        outlineColor: T.blue,
        boxShadow: "0 1px 2px rgba(17,17,17,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-all active:scale-[0.98]"
      style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
      onMouseEnter={(e) => (e.currentTarget.style.background = T.bg)}
      onMouseLeave={(e) => (e.currentTarget.style.background = T.card)}
    >
      {children}
    </button>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
      style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMuted }}
    >
      {children}
    </span>
  );
}

function StatusPill({
  tone = "muted",
  children,
}: {
  tone?: "muted" | "success" | "info" | "warning" | "danger";
  children: React.ReactNode;
}) {
  const toneMap: Record<string, { bg: string; fg: string; dot: string }> = {
    muted: { bg: T.hairline, fg: T.textMuted, dot: T.textFaint },
    success: { bg: "rgba(16,185,129,0.08)", fg: "#047857", dot: T.green },
    info: { bg: "rgba(37,99,235,0.08)", fg: "#1d4ed8", dot: T.blue },
    warning: { bg: "rgba(245,158,11,0.1)", fg: "#b45309", dot: T.amber },
    danger: { bg: "rgba(239,68,68,0.08)", fg: "#b91c1c", dot: T.red },
  };
  const c = toneMap[tone];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold"
      style={{ background: c.bg, color: c.fg }}
    >
      <span className="h-1 w-1 rounded-full" style={{ background: c.dot }} aria-hidden />
      {children}
    </span>
  );
}

/* ============================================================
   ANIMATED COUNTER
   ============================================================ */

function useCountUp(target: number, decimals = 0, duration = 900) {
  const [value, setValue] = useState(0);
  const start = useRef<number | null>(null);
  useEffect(() => {
    let raf = 0;
    const step = (t: number) => {
      if (start.current === null) start.current = t;
      const p = Math.min(1, (t - start.current) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value.toFixed(decimals);
}

/* ============================================================
   KPI ROW
   ============================================================ */

function KpiRow() {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        label="Total Revenue"
        prefix="€"
        target={0}
        decimals={2}
        icon={Wallet}
        accent={T.blue}
      />
      <KpiCard label="Orders" target={0} icon={Receipt} accent={T.violet} />
      <KpiCard
        label="Conversion Rate"
        target={0}
        decimals={1}
        suffix="%"
        icon={TrendingUp}
        accent={T.green}
      />
      <KpiCard
        label="Average Order Value"
        prefix="€"
        target={0}
        decimals={2}
        icon={Boxes}
        accent={T.amber}
      />
    </section>
  );
}

function KpiCard({
  label,
  target,
  decimals = 0,
  prefix = "",
  suffix = "",
  icon: Icon,
  accent,
}: {
  label: string;
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  icon: typeof Wallet;
  accent: string;
}) {
  const val = useCountUp(target, decimals);
  return (
    <div
      className="group relative overflow-hidden rounded-3xl p-5 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: `linear-gradient(180deg, ${T.card} 0%, ${T.card} 60%, ${accent}05 100%)`,
        border: `1px solid ${T.border}`,
        boxShadow: SHADOW_SOFT,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = SHADOW_LIFT)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = SHADOW_SOFT)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `${accent}33` }}
      />
      <div className="relative flex items-center justify-between">
        <div
          className="grid h-9 w-9 place-items-center rounded-xl transition-transform duration-200 group-hover:scale-105"
          style={{ background: `${accent}14`, color: accent }}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </div>
        <StatusPill tone="success">No activity yet</StatusPill>
      </div>
      <p
        className="relative mt-5 text-[11px] font-medium uppercase tracking-wider"
        style={{ color: T.textMuted }}
      >
        {label}
      </p>
      <p className="relative mt-1 font-sora text-[28px] font-semibold tracking-tight tabular-nums">
        {prefix}
        {val}
        {suffix}
      </p>
      <Sparkline accent={accent} />
    </div>
  );
}

function Sparkline({ accent }: { accent: string }) {
  return (
    <svg
      viewBox="0 0 120 28"
      className="relative mt-3 h-7 w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <line
        x1="0"
        y1="20"
        x2="120"
        y2="20"
        stroke={T.border}
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />
      <circle cx="60" cy="20" r="6" fill={accent} opacity="0.15">
        <animate attributeName="r" values="4;8;4" dur="2.4s" repeatCount="indefinite" />
        <animate
          attributeName="opacity"
          values="0.25;0.05;0.25"
          dur="2.4s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="60" cy="20" r="2.5" fill={accent} />
    </svg>
  );
}

/* ============================================================
   ANALYTICS CARD
   ============================================================ */

function AnalyticsCard({
  range,
  setRange,
}: {
  range: "7D" | "30D" | "90D" | "YTD" | "ALL";
  setRange: (r: "7D" | "30D" | "90D" | "YTD" | "ALL") => void;
}) {
  const ranges: Array<typeof range> = ["7D", "30D", "90D", "YTD", "ALL"];
  return (
    <Card className="p-6 sm:p-7">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-sora text-lg font-semibold tracking-tight">Revenue</h2>
            <StatusPill tone="info">Live</StatusPill>
          </div>
          <p className="mt-1 text-xs" style={{ color: T.textMuted }}>
            Current period · Updates in real time
          </p>
        </div>
        <div
          className="inline-flex rounded-xl p-0.5"
          style={{ background: T.bg, border: `1px solid ${T.border}` }}
        >
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className="rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
              style={{
                background: range === r ? T.card : "transparent",
                color: range === r ? T.text : T.textMuted,
                boxShadow: range === r ? "0 1px 2px rgba(17,17,17,0.06)" : "none",
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </header>

      <div className="relative mt-6 h-[440px] w-full">
        <svg viewBox="0 0 800 400" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="curveStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={T.blue} />
              <stop offset="100%" stopColor={T.violet} />
            </linearGradient>
            <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={T.blue} stopOpacity="0.14" />
              <stop offset="100%" stopColor={T.violet} stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="40"
              x2="780"
              y1={40 + i * 80}
              y2={40 + i * 80}
              stroke={T.hairline}
              strokeWidth="1"
            />
          ))}

          {["€400", "€300", "€200", "€100", "€0"].map((t, i) => (
            <text key={t} x="8" y={44 + i * 80} fill={T.textFaint} style={{ fontSize: 10 }}>
              {t}
            </text>
          ))}

          <path
            d="M40,340 C 180,338 320,342 460,340 S 700,340 780,340 L 780,360 L 40,360 Z"
            fill="url(#curveFill)"
            className="anim-fade"
          />
          <path
            d="M40,340 C 180,338 320,342 460,340 S 700,340 780,340"
            fill="none"
            stroke="url(#curveStroke)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="anim-draw"
            pathLength={1}
          />

          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
            <text
              key={d}
              x={40 + i * (740 / 6)}
              y="380"
              textAnchor="middle"
              fill={T.textFaint}
              style={{ fontSize: 10 }}
            >
              {d}
            </text>
          ))}
        </svg>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="pointer-events-auto max-w-sm rounded-2xl p-5 text-center anim-fade-up"
            style={{
              background: "rgba(255,255,255,0.92)",
              border: `1px solid ${T.border}`,
              boxShadow: SHADOW_LIFT,
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              className="mx-auto grid h-11 w-11 place-items-center rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${T.blue}14, ${T.violet}14)`,
                color: T.blue,
              }}
            >
              <BarChart3 className="h-5 w-5" aria-hidden />
            </div>
            <p className="mt-3 font-sora text-sm font-semibold">No analytics yet</p>
            <p className="mt-1 text-xs leading-relaxed" style={{ color: T.textMuted }}>
              Connect your first store to unlock insights.
            </p>
            <button
              className="mt-4 inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-xs font-medium text-white transition hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: T.text }}
            >
              <Store className="h-3.5 w-3.5" aria-hidden /> Connect Store
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ============================================================
   SECONDARY INSIGHTS
   ============================================================ */

function SecondaryInsights() {
  const items = [
    { label: "Net Revenue", value: "€0.00", icon: Wallet, accent: T.blue, kind: "line" as const },
    {
      label: "Refund Rate",
      value: "0.00%",
      icon: RefreshCw,
      accent: T.amber,
      kind: "bar" as const,
    },
    {
      label: "Chargeback Rate",
      value: "0.00%",
      icon: ShieldAlert,
      accent: T.red,
      kind: "line" as const,
    },
    {
      label: "Success Rate",
      value: "0.0%",
      icon: CheckCircle2,
      accent: T.green,
      kind: "line" as const,
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <div
            key={it.label}
            className="group rounded-3xl p-5 transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: T.card, border: `1px solid ${T.border}`, boxShadow: SHADOW_SOFT }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = SHADOW_LIFT)}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = SHADOW_SOFT)}
          >
            <div className="flex items-center justify-between">
              <div
                className="grid h-8 w-8 place-items-center rounded-lg transition-transform duration-200 group-hover:scale-110"
                style={{ background: `${it.accent}14`, color: it.accent }}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </div>
              <span className="text-[10px] font-medium" style={{ color: T.textMuted }}>
                Current period
              </span>
            </div>
            <p
              className="mt-4 text-[11px] font-medium uppercase tracking-wider"
              style={{ color: T.textMuted }}
            >
              {it.label}
            </p>
            <p className="mt-1 font-sora text-xl font-semibold tabular-nums">{it.value}</p>
            {it.kind === "line" ? <MiniLine accent={it.accent} /> : <MiniBars accent={it.accent} />}
          </div>
        );
      })}
    </div>
  );
}

function MiniLine({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 120 32" className="mt-3 h-8 w-full" preserveAspectRatio="none" aria-hidden>
      <line
        x1="0"
        y1="24"
        x2="120"
        y2="24"
        stroke={T.border}
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      <path d="M0,24 L120,24" stroke={accent} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function MiniBars({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 120 32" className="mt-3 h-8 w-full" preserveAspectRatio="none" aria-hidden>
      {[...Array(9)].map((_, i) => (
        <rect
          key={i}
          x={i * 14 + 2}
          y={26}
          width={8}
          height={2}
          rx={1}
          fill={accent}
          opacity="0.35"
        />
      ))}
    </svg>
  );
}

/* ============================================================
   TOP COUNTRIES — MODERN WORLD MAP
   ============================================================ */

function TopCountries() {
  return (
    <Card className="p-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="font-sora text-base font-semibold tracking-tight">Top countries</h2>
          <p className="mt-1 text-xs" style={{ color: T.textMuted }}>
            Current period · Global reach
          </p>
        </div>
        <Globe2 className="h-4 w-4" style={{ color: T.textMuted }} aria-hidden />
      </header>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-[1.4fr_1fr] sm:items-center">
        <WorldDots />
        <div
          className="flex flex-col items-center justify-center rounded-2xl p-5 text-center"
          style={{ background: T.bg, border: `1px dashed ${T.border}` }}
        >
          <div
            className="grid h-10 w-10 place-items-center rounded-full"
            style={{ background: T.card, boxShadow: SHADOW_SOFT }}
          >
            <Users className="h-4 w-4" style={{ color: T.textMuted }} aria-hidden />
          </div>
          <p className="mt-3 font-sora text-sm font-semibold">No customers yet</p>
          <p className="mt-1 text-xs leading-relaxed" style={{ color: T.textMuted }}>
            Your first customers will appear here.
          </p>
        </div>
      </div>
    </Card>
  );
}

function WorldDots() {
  // stylized dotted world silhouette (rough continents in a rounded band)
  const dots: React.ReactNode[] = [];
  const W = 340;
  const H = 180;
  // A rough continent mask using multiple ellipses
  const inMask = (x: number, y: number) => {
    const ellipses = [
      { cx: 70, cy: 80, rx: 30, ry: 22 }, // NA
      { cx: 110, cy: 130, rx: 18, ry: 30 }, // SA
      { cx: 175, cy: 70, rx: 22, ry: 16 }, // EU
      { cx: 195, cy: 120, rx: 26, ry: 34 }, // AF
      { cx: 245, cy: 85, rx: 44, ry: 26 }, // Asia
      { cx: 285, cy: 145, rx: 20, ry: 12 }, // AU
    ];
    return ellipses.some(({ cx, cy, rx, ry }) => {
      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      return dx * dx + dy * dy < 1;
    });
  };
  for (let y = 10; y < H - 10; y += 6) {
    for (let x = 20; x < W - 20; x += 6) {
      if (inMask(x, y)) {
        dots.push(<circle key={`${x}-${y}`} cx={x} cy={y} r={1.3} fill={T.borderStrong} />);
      }
    }
  }
  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden>
        {dots}
      </svg>
      {/* subtle equator line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-1/2 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${T.border}, transparent)` }}
      />
    </div>
  );
}

/* ============================================================
   PAYMENT METHODS
   ============================================================ */

function PaymentMethods() {
  const methods = [
    { label: "Visa", color: T.text },
    { label: "Mastercard", color: T.blue },
    { label: "Apple Pay", color: T.violet },
    { label: "Google Pay", color: T.green },
    { label: "PayPal", color: "#003087" },
    { label: "SEPA", color: T.amber },
    { label: "Crypto", color: T.pink },
  ];
  return (
    <Card className="p-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="font-sora text-base font-semibold tracking-tight">Payment methods</h2>
          <p className="mt-1 text-xs" style={{ color: T.textMuted }}>
            Distribution across checkout
          </p>
        </div>
        <CreditCard className="h-4 w-4" style={{ color: T.textMuted }} aria-hidden />
      </header>
      <div className="mt-6 grid grid-cols-1 items-center gap-6 sm:grid-cols-[auto_1fr]">
        <div className="relative mx-auto grid h-40 w-40 place-items-center">
          <svg viewBox="0 0 120 120" className="h-40 w-40 -rotate-90" aria-hidden>
            <circle cx="60" cy="60" r="46" fill="none" stroke={T.hairline} strokeWidth="14" />
            <circle
              cx="60"
              cy="60"
              r="46"
              fill="none"
              stroke={T.border}
              strokeWidth="14"
              strokeDasharray="4 6"
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <p className="font-sora text-xl font-semibold tabular-nums">0%</p>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: T.textMuted }}>
                No data
              </p>
            </div>
          </div>
        </div>
        <ul className="space-y-1">
          {methods.map((m) => (
            <li
              key={m.label}
              className="flex items-center justify-between rounded-lg border border-transparent px-2 py-1.5 text-sm transition"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = T.bg;
                e.currentTarget.style.borderColor = T.border;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: m.color }}
                  aria-hidden
                />
                <span style={{ color: T.text }}>{m.label}</span>
              </span>
              <span className="tabular-nums" style={{ color: T.textMuted }}>
                0%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

/* ============================================================
   TRANSACTIONS
   ============================================================ */

function RecentTransactions() {
  return (
    <Card>
      <header
        className="sticky top-16 z-10 flex items-center justify-between rounded-t-3xl p-6"
        style={{ borderBottom: `1px solid ${T.border}`, background: T.card }}
      >
        <div>
          <h2 className="font-sora text-base font-semibold tracking-tight">Recent transactions</h2>
          <p className="mt-1 text-xs" style={{ color: T.textMuted }}>
            Live feed · Updated in real time
          </p>
        </div>
        <SecondaryButton>
          <Plus className="h-3.5 w-3.5" aria-hidden /> New payment
        </SecondaryButton>
      </header>

      <div
        className="grid grid-cols-[1.5fr_1fr_1fr_0.8fr_0.8fr] gap-4 px-6 py-3 text-[11px] font-medium uppercase tracking-wider"
        style={{ borderBottom: `1px solid ${T.border}`, color: T.textMuted }}
      >
        <span>Customer</span>
        <span>Method</span>
        <span>Amount</span>
        <span>Status</span>
        <span className="text-right">Time</span>
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div
          className="grid h-14 w-14 place-items-center rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${T.blue}0d, ${T.violet}0d)`,
            border: `1px solid ${T.border}`,
          }}
        >
          <Receipt className="h-6 w-6" style={{ color: T.blue }} aria-hidden />
        </div>
        <p className="mt-4 font-sora text-sm font-semibold">No transactions yet</p>
        <p className="mt-1 max-w-sm text-xs leading-relaxed" style={{ color: T.textMuted }}>
          Your first payments will appear here as soon as your store starts collecting orders.
        </p>
        <div className="mt-5">
          <PrimaryButton>
            <Plus className="h-3.5 w-3.5" aria-hidden /> Create Test Payment
          </PrimaryButton>
        </div>
      </div>
    </Card>
  );
}

/* ============================================================
   LIVE ACTIVITY
   ============================================================ */

function LiveActivity() {
  return (
    <Card className="p-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="font-sora text-base font-semibold tracking-tight">Live activity</h2>
          <p className="mt-1 text-xs" style={{ color: T.textMuted }}>
            System events across your workspace
          </p>
        </div>
        <Badge>
          <Activity className="h-3 w-3" aria-hidden /> Today
        </Badge>
      </header>
      <div
        className="relative mt-6 flex flex-col items-center justify-center rounded-2xl py-14 text-center"
        style={{
          background: `linear-gradient(180deg, ${T.bg} 0%, transparent 100%)`,
          border: `1px dashed ${T.border}`,
        }}
      >
        <div
          className="grid h-11 w-11 place-items-center rounded-full"
          style={{ background: T.card, boxShadow: SHADOW_SOFT }}
        >
          <Activity className="h-4 w-4" style={{ color: T.textMuted }} aria-hidden />
        </div>
        <p className="mt-3 font-sora text-sm font-semibold">Waiting for your first event</p>
        <p className="mt-1 max-w-xs text-xs leading-relaxed" style={{ color: T.textMuted }}>
          Activity from your business will appear here.
        </p>
      </div>
    </Card>
  );
}

/* ============================================================
   QUICK ACTIONS
   ============================================================ */

function QuickActions() {
  const items = [
    { label: "Connect Shopify", desc: "One-click store sync", icon: Store, accent: T.green },
    { label: "Generate API Key", desc: "For developers", icon: KeyRound, accent: T.blue },
    { label: "Invite Team", desc: "Add teammates", icon: UserPlus, accent: T.violet },
    { label: "Create Checkout", desc: "Shareable payment link", icon: Link2, accent: T.amber },
    { label: "Read Docs", desc: "API & guides", icon: BookOpen, accent: T.textMuted },
    { label: "Import Customers", desc: "From CSV or another tool", icon: Download, accent: T.pink },
  ];
  return (
    <Card className="p-6">
      <h2 className="font-sora text-base font-semibold tracking-tight">Quick actions</h2>
      <p className="mt-1 text-xs" style={{ color: T.textMuted }}>
        Get set up in a few clicks
      </p>
      <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((i) => {
          const Icon = i.icon;
          return (
            <li key={i.label}>
              <button
                className="group relative flex w-full items-start gap-3 overflow-hidden rounded-2xl p-3 text-left transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: T.card, border: `1px solid ${T.border}` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = SHADOW_LIFT;
                  e.currentTarget.style.borderColor = T.borderStrong;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = T.border;
                }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${i.accent}0e, transparent 60%)`,
                  }}
                />
                <span
                  className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-transform duration-200 group-hover:scale-110"
                  style={{ background: `${i.accent}14`, color: i.accent }}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="relative min-w-0 flex-1">
                  <span
                    className="block truncate text-[13px] font-semibold"
                    style={{ color: T.text }}
                  >
                    {i.label}
                  </span>
                  <span
                    className="mt-0.5 block truncate text-[11px]"
                    style={{ color: T.textMuted }}
                  >
                    {i.desc}
                  </span>
                </span>
                <ArrowUpRight
                  className="relative h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: T.textMuted }}
                  aria-hidden
                />
              </button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

/* ============================================================
   COMMAND PALETTE
   ============================================================ */

function CommandPalette({ onClose }: { onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const commands = [
    { label: "Go to Overview", icon: LayoutGrid, hint: "Navigate" },
    { label: "View Transactions", icon: ArrowLeftRight, hint: "Navigate" },
    { label: "View Customers", icon: Users, hint: "Navigate" },
    { label: "Create Test Payment", icon: Plus, hint: "Action" },
    { label: "Connect Shopify", icon: Store, hint: "Setup" },
    { label: "Generate API Key", icon: KeyRound, hint: "Developers" },
    { label: "Invite Team Member", icon: UserPlus, hint: "Team" },
    { label: "Read Documentation", icon: BookOpen, hint: "Help" },
  ].filter((c) => c.label.toLowerCase().includes(q.toLowerCase()));

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh] anim-fade"
      style={{ background: "rgba(17,17,17,0.35)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[560px] overflow-hidden rounded-2xl anim-fade-up"
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          boxShadow: "0 24px 60px rgba(17,17,17,0.18)",
        }}
      >
        <div
          className="flex items-center gap-3 px-4 py-3.5"
          style={{ borderBottom: `1px solid ${T.border}` }}
        >
          <Search className="h-4 w-4" style={{ color: T.textMuted }} aria-hidden />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-70"
            style={{ color: T.text }}
          />
          <kbd
            className="rounded-md px-1.5 py-0.5 text-[10px] font-medium"
            style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMuted }}
          >
            ESC
          </kbd>
        </div>
        <div className="max-h-[340px] overflow-y-auto p-2">
          {commands.length === 0 && (
            <p className="p-6 text-center text-xs" style={{ color: T.textMuted }}>
              No results
            </p>
          )}
          {commands.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.label}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition"
                style={{ color: T.text }}
                onMouseEnter={(e) => (e.currentTarget.style.background = T.bg)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                onClick={onClose}
              >
                <span
                  className="grid h-8 w-8 place-items-center rounded-lg"
                  style={{ background: T.bg, color: T.text }}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="flex-1">{c.label}</span>
                <span className="text-[11px]" style={{ color: T.textMuted }}>
                  {c.hint}
                </span>
              </button>
            );
          })}
        </div>
        <div
          className="flex items-center justify-between px-4 py-2 text-[11px]"
          style={{ borderTop: `1px solid ${T.border}`, color: T.textMuted, background: T.bg }}
        >
          <span>Tally Command</span>
          <span className="flex items-center gap-2">
            <kbd
              className="rounded px-1.5 py-0.5"
              style={{ background: T.card, border: `1px solid ${T.border}` }}
            >
              ↑↓
            </kbd>
            navigate
            <kbd
              className="rounded px-1.5 py-0.5"
              style={{ background: T.card, border: `1px solid ${T.border}` }}
            >
              ↵
            </kbd>
            select
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   GLOBAL ANIMATION CSS
   ============================================================ */

const ANIM_CSS = `
@keyframes tally-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes tally-fade-up { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: translateY(0) } }
@keyframes tally-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes tally-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
@keyframes tally-float-slow { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-4px) } }
.anim-fade { animation: tally-fade 240ms ease-out both }
.anim-fade-up { animation: tally-fade-up 320ms cubic-bezier(0.2, 0.7, 0.2, 1) both }
.anim-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: tally-draw 900ms ease-out 100ms both }
.anim-float { animation: tally-float 4.5s ease-in-out infinite }
.anim-float-slow { animation: tally-float-slow 6s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .anim-fade, .anim-fade-up, .anim-draw, .anim-float, .anim-float-slow { animation: none !important }
}
`;
