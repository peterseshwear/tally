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
  Sparkles,
  Command,
  ChevronRight,
  ChevronDown,
  Zap,
  BookOpen,
  Wallet,
  CheckCircle2,
  Timer,
  Activity,
  ShieldCheck,
  Repeat,
  Save,
  Globe2,
  Link2,
  Bitcoin,
  ExternalLink,
  Wand2,
  X,
  Coins,
  Landmark,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { NAV_GROUPS as SHARED_NAV_GROUPS } from "@/components/app/nav";
import { BrandLogo } from "@/components/BrandLogo";

export const Route = createFileRoute("/_authenticated/payments")({
  component: PaymentsPage,
  head: () => ({
    meta: [
      { title: "Payments — Tally" },
      {
        name: "description",
        content: "Manage payment methods, acceptance and performance.",
      },
      { property: "og:title", content: "Payments — Tally" },
      {
        property: "og:description",
        content: "Manage payment methods, acceptance and performance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

/* ============================================================
   TOKENS
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
  teal: "#14B8A6",
  orange: "#F97316",
};
const SHADOW_SOFT = "0 1px 2px rgba(17,17,17,0.04), 0 1px 3px rgba(17,17,17,0.03)";
const SHADOW_LIFT = "0 10px 30px rgba(17,17,17,0.07), 0 2px 6px rgba(17,17,17,0.04)";

/* ============================================================
   NAV
   ============================================================ */
type NavItem = { label: string; icon: typeof LayoutGrid; key: string; to?: string; badge?: string };
type NavGroup = { title?: string; items: NavItem[] };
const NAV_GROUPS: NavGroup[] = SHARED_NAV_GROUPS;

/* ============================================================
   ROOT
   ============================================================ */
function PaymentsPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [methodDetail, setMethodDetail] = useState<PaymentMethod | null>(null);

  const [methods, setMethods] = useState<Record<string, boolean>>({});
  const [config, setConfig] = useState<Record<string, boolean>>({
    autoCapture: true,
    manualCapture: false,
    threeds: true,
    fraud: true,
    retry: true,
    saveCards: true,
    express: true,
    routing: false,
  });
  const [defaultCurrency, setDefaultCurrency] = useState("EUR");
  const [currencies, setCurrencies] = useState<Record<string, boolean>>({
    EUR: true,
    USD: true,
    GBP: true,
  });

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
        setMethodDetail(null);
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
  const enabledCount = Object.values(methods).filter(Boolean).length;

  return (
    <div className="min-h-dvh font-manrope antialiased" style={{ background: T.bg, color: T.text }}>
      <style>{ANIM_CSS}</style>

      <TopNav
        email={email}
        initials={initials}
        onOpenCmd={() => setCmdOpen(true)}
        onSignOut={handleSignOut}
      />

      <div className="flex">
        <Sidebar active="payments" />

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 sm:py-10">
          <div className="mx-auto max-w-[1320px]">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <Breadcrumbs />
              </div>

              <div className="col-span-12">
                <PageHeader />
              </div>

              <div className="col-span-12">
                <KpiCards enabledCount={enabledCount} />
              </div>

              <div className="col-span-12">
                <MethodsGrid
                  methods={methods}
                  setMethods={setMethods}
                  onDetails={(m) => setMethodDetail(m)}
                />
              </div>

              <div className="col-span-12 lg:col-span-7">
                <PerformanceTable />
              </div>
              <div className="col-span-12 lg:col-span-5">
                <FlowDiagram />
              </div>

              <div className="col-span-12 lg:col-span-7">
                <CoverageMap enabledCount={enabledCount} />
              </div>
              <div className="col-span-12 lg:col-span-5">
                <TimelineCard />
              </div>

              <div className="col-span-12 lg:col-span-7">
                <ConfigurationCard
                  config={config}
                  setConfig={setConfig}
                  defaultCurrency={defaultCurrency}
                  setDefaultCurrency={setDefaultCurrency}
                />
              </div>
              <div className="col-span-12 lg:col-span-5">
                <CurrenciesCard currencies={currencies} setCurrencies={setCurrencies} />
              </div>

              <div className="col-span-12">
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
      {methodDetail && (
        <MethodDetail
          method={methodDetail}
          enabled={!!methods[methodDetail.key]}
          onToggle={(v) => setMethods((m) => ({ ...m, [methodDetail.key]: v }))}
          onClose={() => setMethodDetail(null)}
        />
      )}
    </div>
  );
}

/* ============================================================
   TOP NAV + SIDEBAR
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
            <span className="flex-1 truncate">Search methods, countries, currencies…</span>
            <kbd
              className="inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium"
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.textMuted }}
            >
              <Command className="h-2.5 w-2.5" aria-hidden />K
            </kbd>
          </button>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <span
            className="hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium sm:flex"
            style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
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
          <IconBtn label="Notifications">
            <Bell className="h-4 w-4" aria-hidden />
          </IconBtn>
          <IconBtn label="Help">
            <HelpCircle className="h-4 w-4" aria-hidden />
          </IconBtn>
          <button
            onClick={onSignOut}
            className="ml-1 grid h-9 w-9 place-items-center rounded-full text-xs font-semibold text-white transition hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${T.blue} 0%, ${T.violet} 100%)` }}
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

function Sidebar({ active }: { active: string }) {
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
              const isActive = active === item.key;
              const Cmp: any = item.to ? Link : "button";
              const cmpProps: any = item.to ? { to: item.to } : {};
              return (
                <Cmp
                  key={item.key}
                  {...cmpProps}
                  className="group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all"
                  style={{
                    background: isActive ? T.hairline : "transparent",
                    color: isActive ? T.text : T.textMuted,
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = T.bg;
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                    if (!isActive)
                      (e.currentTarget as HTMLElement).style.background = "transparent";
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
                    className="h-4 w-4 transition-transform group-hover:scale-110"
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
                </Cmp>
              );
            })}
          </div>
        ))}
      </nav>

      <div
        className="mt-6 overflow-hidden rounded-2xl p-4"
        style={{
          background: `linear-gradient(140deg, rgba(37,99,235,0.06), rgba(124,58,237,0.06))`,
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

function PrimaryButton({
  children,
  onClick,
  size = "md",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  size?: "sm" | "md";
}) {
  const h = size === "sm" ? "h-9" : "h-11";
  const px = size === "sm" ? "px-4 text-xs" : "px-5 text-sm";
  return (
    <button
      onClick={onClick}
      className={`inline-flex ${h} items-center gap-2 rounded-full ${px} font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98]`}
      style={{
        background: T.text,
        boxShadow: "0 1px 2px rgba(17,17,17,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
  size = "md",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  size?: "sm" | "md";
}) {
  const h = size === "sm" ? "h-9" : "h-11";
  const px = size === "sm" ? "px-3 text-xs" : "px-5 text-sm";
  return (
    <button
      onClick={onClick}
      className={`inline-flex ${h} items-center gap-2 rounded-full ${px} font-medium transition-all active:scale-[0.98]`}
      style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
      onMouseEnter={(e) => (e.currentTarget.style.background = T.bg)}
      onMouseLeave={(e) => (e.currentTarget.style.background = T.card)}
    >
      {children}
    </button>
  );
}

function StatusPill({
  tone = "muted",
  children,
}: {
  tone?: "muted" | "success" | "info" | "warning" | "violet" | "teal";
  children: React.ReactNode;
}) {
  const map: Record<string, { bg: string; fg: string; dot: string }> = {
    muted: { bg: T.hairline, fg: T.textMuted, dot: T.textFaint },
    success: { bg: "rgba(16,185,129,0.08)", fg: "#047857", dot: T.green },
    info: { bg: "rgba(37,99,235,0.08)", fg: "#1d4ed8", dot: T.blue },
    warning: { bg: "rgba(245,158,11,0.1)", fg: "#b45309", dot: T.amber },
    violet: { bg: "rgba(124,58,237,0.08)", fg: "#6d28d9", dot: T.violet },
    teal: { bg: "rgba(20,184,166,0.08)", fg: "#0f766e", dot: T.teal },
  };
  const c = map[tone];
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

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className="relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors"
      style={{ background: checked ? T.text : T.border }}
    >
      <span
        className="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
        style={{ transform: `translateX(${checked ? 18 : 2}px)` }}
      />
    </button>
  );
}

/* ============================================================
   HEADER
   ============================================================ */
function Breadcrumbs() {
  return (
    <nav className="flex items-center gap-1.5 text-[12px]" aria-label="Breadcrumb">
      <span style={{ color: T.textMuted }}>Acme Store</span>
      <ChevronRight className="h-3 w-3" style={{ color: T.textFaint }} aria-hidden />
      <span style={{ color: T.text }} className="font-medium">
        Payments
      </span>
    </nav>
  );
}

function PageHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="font-sora text-[28px] font-semibold tracking-tight sm:text-[32px]">
          Payments
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: T.textMuted }}>
          Manage payment methods, acceptance and performance.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <SecondaryButton size="sm">
          <BookOpen className="h-3.5 w-3.5" aria-hidden /> Documentation
        </SecondaryButton>
        <SecondaryButton size="sm">
          <Settings className="h-3.5 w-3.5" aria-hidden /> Settings
        </SecondaryButton>
        <PrimaryButton size="sm">
          <Plus className="h-3.5 w-3.5" aria-hidden /> Add Payment Method
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ============================================================
   KPI CARDS
   ============================================================ */
function useCountUp(target: number, decimals = 0, duration = 900) {
  const [value, setValue] = useState(0);
  const start = useRef<number | null>(null);
  useEffect(() => {
    let raf = 0;
    const step = (t: number) => {
      if (start.current === null) start.current = t;
      const p = Math.min(1, (t - start.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value.toFixed(decimals);
}

function KpiCards({ enabledCount }: { enabledCount: number }) {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Kpi label="Active Payment Methods" target={enabledCount} icon={CreditCard} accent={T.blue} />
      <Kpi
        label="Payment Success Rate"
        target={0}
        suffix="%"
        icon={CheckCircle2}
        accent={T.green}
      />
      <Kpi
        label="Today's Volume"
        target={0}
        prefix="€"
        decimals={2}
        icon={Wallet}
        accent={T.violet}
      />
      <Kpi label="Avg. Processing Time" target={0} suffix=" ms" icon={Timer} accent={T.amber} />
    </section>
  );
}

function Kpi({
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
      className="group relative overflow-hidden rounded-3xl p-5 transition-all hover:-translate-y-0.5"
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
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
        style={{ background: `${accent}33` }}
      />
      <div className="relative flex items-center justify-between">
        <div
          className="grid h-9 w-9 place-items-center rounded-xl transition-transform group-hover:scale-105"
          style={{ background: `${accent}14`, color: accent }}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </div>
        <StatusPill tone="muted">Awaiting data</StatusPill>
      </div>
      <p
        className="relative mt-5 text-[11px] font-medium uppercase tracking-wider"
        style={{ color: T.textMuted }}
      >
        {label}
      </p>
      <p className="relative mt-1 font-sora text-[26px] font-semibold tracking-tight tabular-nums">
        {prefix}
        {val}
        {suffix}
      </p>
      <MiniChart accent={accent} />
    </div>
  );
}

function MiniChart({ accent }: { accent: string }) {
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
      <circle cx="60" cy="20" r="2.5" fill={accent} />
      <circle cx="60" cy="20" r="6" fill={accent} opacity="0.15">
        <animate attributeName="r" values="4;8;4" dur="2.4s" repeatCount="indefinite" />
        <animate
          attributeName="opacity"
          values="0.25;0.05;0.25"
          dur="2.4s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

/* ============================================================
   METHODS GRID
   ============================================================ */
type PaymentMethod = {
  key: string;
  name: string;
  short: string;
  category: "Card" | "Wallet" | "Bank" | "Crypto";
  accent: string;
  countries: string;
  currency: string;
  speed: string;
  icon?: typeof CreditCard;
};

const METHODS: PaymentMethod[] = [
  {
    key: "visa",
    name: "Visa",
    short: "VISA",
    category: "Card",
    accent: "#1A1F71",
    countries: "Global · 200+",
    currency: "Multi",
    speed: "Instant",
  },
  {
    key: "mastercard",
    name: "Mastercard",
    short: "MC",
    category: "Card",
    accent: "#EB001B",
    countries: "Global · 200+",
    currency: "Multi",
    speed: "Instant",
  },
  {
    key: "amex",
    name: "American Express",
    short: "AMEX",
    category: "Card",
    accent: "#006FCF",
    countries: "Global · 130+",
    currency: "Multi",
    speed: "Instant",
  },
  {
    key: "applepay",
    name: "Apple Pay",
    short: "APAY",
    category: "Wallet",
    accent: "#000000",
    countries: "Global · 75+",
    currency: "Multi",
    speed: "Instant",
  },
  {
    key: "googlepay",
    name: "Google Pay",
    short: "GPAY",
    category: "Wallet",
    accent: "#4285F4",
    countries: "Global · 40+",
    currency: "Multi",
    speed: "Instant",
  },
  {
    key: "paypal",
    name: "PayPal",
    short: "PP",
    category: "Wallet",
    accent: "#003087",
    countries: "Global · 200+",
    currency: "Multi",
    speed: "Instant",
  },
  {
    key: "sepa",
    name: "SEPA Direct Debit",
    short: "SEPA",
    category: "Bank",
    accent: "#0F172A",
    countries: "Eurozone · 36",
    currency: "EUR",
    speed: "1–2 days",
  },
  {
    key: "bancontact",
    name: "Bancontact",
    short: "BC",
    category: "Bank",
    accent: "#005498",
    countries: "Belgium",
    currency: "EUR",
    speed: "Instant",
  },
  {
    key: "ideal",
    name: "iDEAL",
    short: "IDL",
    category: "Bank",
    accent: "#CC0066",
    countries: "Netherlands",
    currency: "EUR",
    speed: "Instant",
  },
  {
    key: "sofort",
    name: "Sofort",
    short: "SOF",
    category: "Bank",
    accent: "#EE7F00",
    countries: "DE · AT · BE · IT · NL · ES",
    currency: "EUR",
    speed: "Instant",
  },
  {
    key: "eps",
    name: "EPS",
    short: "EPS",
    category: "Bank",
    accent: "#B71C1C",
    countries: "Austria",
    currency: "EUR",
    speed: "Instant",
  },
  {
    key: "multibanco",
    name: "Multibanco",
    short: "MB",
    category: "Bank",
    accent: "#0057A0",
    countries: "Portugal",
    currency: "EUR",
    speed: "1–3 days",
  },
  {
    key: "openbanking",
    name: "Open Banking",
    short: "OB",
    category: "Bank",
    accent: "#111827",
    countries: "UK · EU",
    currency: "GBP · EUR",
    speed: "Instant",
  },
  {
    key: "usdc",
    name: "USDC",
    short: "USDC",
    category: "Crypto",
    accent: "#2775CA",
    countries: "Global",
    currency: "USDC",
    speed: "Seconds",
  },
  {
    key: "usdt",
    name: "USDT",
    short: "USDT",
    category: "Crypto",
    accent: "#26A17B",
    countries: "Global",
    currency: "USDT",
    speed: "Seconds",
  },
  {
    key: "btc",
    name: "Bitcoin",
    short: "BTC",
    category: "Crypto",
    accent: "#F7931A",
    countries: "Global",
    currency: "BTC",
    speed: "10–30 min",
  },
  {
    key: "eth",
    name: "Ethereum",
    short: "ETH",
    category: "Crypto",
    accent: "#627EEA",
    countries: "Global",
    currency: "ETH",
    speed: "Seconds",
  },
];

function MethodsGrid({
  methods,
  setMethods,
  onDetails,
}: {
  methods: Record<string, boolean>;
  setMethods: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  onDetails: (m: PaymentMethod) => void;
}) {
  const [filter, setFilter] = useState<"all" | "Card" | "Wallet" | "Bank" | "Crypto">("all");
  const list = filter === "all" ? METHODS : METHODS.filter((m) => m.category === filter);

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-sora text-lg font-semibold tracking-tight">Payment methods</h2>
        <div
          className="flex items-center gap-0.5 rounded-full p-1"
          style={{ background: T.card, border: `1px solid ${T.border}` }}
        >
          {(["all", "Card", "Wallet", "Bank", "Crypto"] as const).map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="inline-flex h-7 items-center rounded-full px-3 text-[11px] font-medium transition-all"
                style={{
                  background: active ? T.text : "transparent",
                  color: active ? "#fff" : T.textMuted,
                }}
              >
                {f === "all" ? "All" : f}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((m) => (
          <MethodCard
            key={m.key}
            m={m}
            enabled={!!methods[m.key]}
            onToggle={(v) => setMethods((mm) => ({ ...mm, [m.key]: v }))}
            onLearn={() => onDetails(m)}
          />
        ))}
      </div>
    </section>
  );
}

function MethodCard({
  m,
  enabled,
  onToggle,
  onLearn,
}: {
  m: PaymentMethod;
  enabled: boolean;
  onToggle: (v: boolean) => void;
  onLearn: () => void;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-3xl p-4 transition-all duration-200 hover:-translate-y-1"
      style={{
        background: T.card,
        border: `1px solid ${enabled ? `${m.accent}55` : T.border}`,
        boxShadow: SHADOW_SOFT,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = SHADOW_LIFT)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = SHADOW_SOFT)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
        style={{ background: `${m.accent}33` }}
      />
      <div className="flex items-start justify-between">
        <MethodLogo m={m} />
        {enabled ? (
          <StatusPill tone="success">Active</StatusPill>
        ) : (
          <StatusPill tone="muted">Available</StatusPill>
        )}
      </div>

      <div className="mt-3">
        <p className="text-sm font-semibold tracking-tight">{m.name}</p>
        <p className="text-[11px]" style={{ color: T.textMuted }}>
          {m.category}
        </p>
      </div>

      <dl className="mt-3 flex flex-col gap-1 text-[11px]" style={{ color: T.textMuted }}>
        <div className="flex items-center justify-between">
          <dt className="inline-flex items-center gap-1">
            <Globe2 className="h-3 w-3" aria-hidden /> Countries
          </dt>
          <dd className="max-w-[60%] truncate text-right font-medium" style={{ color: T.text }}>
            {m.countries}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="inline-flex items-center gap-1">
            <Coins className="h-3 w-3" aria-hidden /> Settlement
          </dt>
          <dd className="font-medium" style={{ color: T.text }}>
            {m.currency}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="inline-flex items-center gap-1">
            <Timer className="h-3 w-3" aria-hidden /> Speed
          </dt>
          <dd className="font-medium" style={{ color: T.text }}>
            {m.speed}
          </dd>
        </div>
      </dl>

      <div
        className="mt-4 flex items-center justify-between border-t pt-3"
        style={{ borderColor: T.hairline }}
      >
        <button
          onClick={onLearn}
          className="inline-flex items-center gap-1 text-[11px] font-medium transition"
          style={{ color: T.text }}
        >
          Learn more <ArrowUpRight className="h-3 w-3" aria-hidden />
        </button>
        <Toggle checked={enabled} onChange={onToggle} label={`Enable ${m.name}`} />
      </div>
    </div>
  );
}

const METHOD_DOMAINS: Record<string, string> = {
  visa: "visa.com",
  mastercard: "mastercard.com",
  amex: "americanexpress.com",
  applepay: "apple.com",
  googlepay: "pay.google.com",
  paypal: "paypal.com",
  sepa: "europa.eu",
  bancontact: "bancontact.com",
  ideal: "ideal.nl",
  sofort: "klarna.com",
  eps: "eps-ueberweisung.at",
  multibanco: "sibs.com",
  openbanking: "openbanking.org.uk",
  usdc: "circle.com",
  usdt: "tether.to",
  btc: "bitcoin.org",
  eth: "ethereum.org",
};

function MethodLogo({ m }: { m: PaymentMethod }) {
  const domain = METHOD_DOMAINS[m.key];
  if (domain) {
    return (
      <div className="h-10 w-14 shrink-0">
        <BrandLogo domain={domain} name={m.name} size={40} rounded={12} />
      </div>
    );
  }
  return (
    <div
      className="grid h-10 w-14 shrink-0 place-items-center rounded-xl"
      style={{ background: "#FFFFFF", border: `1px solid ${T.border}`, color: m.accent }}
    >
      <span className="font-sora text-[10px] font-bold tracking-tight">{m.short}</span>
    </div>
  );
}

/* ============================================================
   PERFORMANCE TABLE
   ============================================================ */
function PerformanceTable() {
  return (
    <Card>
      <div
        className="flex items-center justify-between rounded-t-3xl px-5 py-4"
        style={{ borderBottom: `1px solid ${T.border}` }}
      >
        <div>
          <h3 className="font-sora text-base font-semibold tracking-tight">Payment performance</h3>
          <p className="mt-0.5 text-[11px]" style={{ color: T.textMuted }}>
            Track volume, success rate and disputes per method.
          </p>
        </div>
        <StatusPill tone="muted">Last 30 days</StatusPill>
      </div>

      <div
        className="grid grid-cols-[1.4fr_1fr_0.9fr_0.9fr_0.9fr_0.9fr_0.9fr] gap-4 border-b px-5 py-2.5 text-[10px] font-medium uppercase tracking-wider"
        style={{ borderColor: T.border, color: T.textMuted }}
      >
        <span>Method</span>
        <span>Volume</span>
        <span>Txns</span>
        <span>Success</span>
        <span>Avg time</span>
        <span>Refunds</span>
        <span>Chargebacks</span>
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
        <span
          className="grid h-11 w-11 place-items-center rounded-2xl"
          style={{
            background: `linear-gradient(140deg, ${T.blue}12, ${T.violet}12)`,
            border: `1px solid ${T.border}`,
            color: T.text,
          }}
        >
          <Activity className="h-5 w-5" aria-hidden />
        </span>
        <p className="mt-3 font-sora text-sm font-semibold">Performance data will appear here</p>
        <p className="mt-1 max-w-md text-[12px]" style={{ color: T.textMuted }}>
          Once payments start flowing, this table breaks down volume, acceptance and disputes per
          method.
        </p>
      </div>
    </Card>
  );
}

/* ============================================================
   FLOW DIAGRAM
   ============================================================ */
function FlowDiagram() {
  const steps = [
    { label: "Customer", icon: Users, accent: T.blue },
    { label: "Checkout", icon: ShoppingCart, accent: T.violet },
    { label: "Authorization", icon: ShieldCheck, accent: T.teal },
    { label: "Capture", icon: CheckCircle2, accent: T.green },
    { label: "Settlement", icon: Landmark, accent: T.amber },
    { label: "Payout", icon: Banknote, accent: T.pink },
  ];
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-sora text-base font-semibold tracking-tight">Payment flow</h3>
          <p className="mt-0.5 text-[11px]" style={{ color: T.textMuted }}>
            How a customer payment moves through Tally.
          </p>
        </div>
        <StatusPill tone="info">Real time</StatusPill>
      </div>

      <ol className="mt-5 flex flex-col gap-2.5">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <li
              key={s.label}
              className="group relative flex items-center gap-3 rounded-2xl p-2.5 transition-all"
              style={{ background: T.bg, border: `1px solid ${T.border}` }}
            >
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-xl transition-transform group-hover:scale-110"
                style={{ background: `${s.accent}14`, color: s.accent }}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <span className="flex-1 text-[13px] font-semibold">{s.label}</span>
              <span
                className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums"
                style={{ background: T.card, border: `1px solid ${T.border}`, color: T.textMuted }}
              >
                Step {i + 1}
              </span>
              {i < steps.length - 1 && (
                <span
                  className="absolute left-[26px] top-full h-2.5 w-px"
                  style={{ background: T.border }}
                  aria-hidden
                />
              )}
              <span
                aria-hidden
                className="absolute inset-y-1 left-1 w-[3px] rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: s.accent }}
              />
            </li>
          );
        })}
      </ol>
    </Card>
  );
}

/* ============================================================
   COVERAGE MAP
   ============================================================ */
function CoverageMap({ enabledCount }: { enabledCount: number }) {
  const dots = 90;
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-sora text-base font-semibold tracking-tight">Global coverage</h3>
          <p className="mt-0.5 text-[11px]" style={{ color: T.textMuted }}>
            Countries light up as you enable more payment methods.
          </p>
        </div>
        <StatusPill tone={enabledCount > 0 ? "success" : "muted"}>
          {enabledCount > 0 ? `${enabledCount} active` : "None active"}
        </StatusPill>
      </div>

      <div
        className="relative mt-4 overflow-hidden rounded-2xl"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${T.blue}0d, transparent 60%), radial-gradient(circle at 80% 70%, ${T.violet}0d, transparent 55%), ${T.bg}`,
          border: `1px solid ${T.border}`,
          aspectRatio: "16 / 9",
        }}
      >
        <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full" aria-hidden>
          {Array.from({ length: dots }).map((_, i) => {
            const x = 10 + ((i * 37) % 300);
            const y = 15 + Math.floor(i / 8) * 12 + ((i * 5) % 8);
            const active = enabledCount > 0 && i % 6 === 0;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={active ? 1.6 : 1.1}
                fill={active ? T.blue : T.border}
                opacity={active ? 0.9 : 0.7}
              />
            );
          })}
        </svg>

        {enabledCount === 0 && (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <div>
              <span
                className="mx-auto grid h-10 w-10 place-items-center rounded-2xl"
                style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
              >
                <Globe2 className="h-4 w-4" aria-hidden />
              </span>
              <p className="mt-2 text-sm font-semibold">No payment methods configured yet</p>
              <p className="mt-1 max-w-md text-[12px]" style={{ color: T.textMuted }}>
                Connect your first payment provider to unlock global coverage.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
        <MapStat label="Countries" value={enabledCount > 0 ? "120+" : "—"} accent={T.blue} />
        <MapStat label="Currencies" value={enabledCount > 0 ? "45" : "—"} accent={T.violet} />
        <MapStat label="Local methods" value={enabledCount.toString()} accent={T.green} />
      </div>
    </Card>
  );
}

function MapStat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-xl p-2.5" style={{ background: T.bg, border: `1px solid ${T.border}` }}>
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} aria-hidden />
        <span
          className="text-[10px] font-medium uppercase tracking-wider"
          style={{ color: T.textMuted }}
        >
          {label}
        </span>
      </div>
      <p className="mt-1 font-sora text-sm font-semibold tabular-nums">{value}</p>
    </div>
  );
}

/* ============================================================
   TIMELINE (empty)
   ============================================================ */
function TimelineCard() {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-sora text-base font-semibold tracking-tight">Payment activity</h3>
          <p className="mt-0.5 text-[11px]" style={{ color: T.textMuted }}>
            Live events across every method.
          </p>
        </div>
        <StatusPill tone="muted">Empty</StatusPill>
      </div>

      <div
        className="mt-4 flex flex-col items-center justify-center rounded-2xl px-6 py-10 text-center"
        style={{ background: T.bg, border: `1px dashed ${T.border}` }}
      >
        <span
          className="grid h-10 w-10 place-items-center rounded-2xl"
          style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
        >
          <Activity className="h-4 w-4" aria-hidden />
        </span>
        <p className="mt-3 text-sm font-semibold">No payment activity yet</p>
        <p className="mt-1 max-w-sm text-[12px]" style={{ color: T.textMuted }}>
          Payment events will appear here automatically as soon as your first transaction goes
          through.
        </p>
      </div>

      <ol className="mt-4 space-y-3">
        {["Authorized", "Captured", "Settled"].map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <span
              className="grid h-6 w-6 place-items-center rounded-full"
              style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textFaint }}
            >
              <span className="text-[10px] font-semibold">{i + 1}</span>
            </span>
            <span className="flex-1 text-[12px]" style={{ color: T.textMuted }}>
              {s}
            </span>
            <span className="text-[10px]" style={{ color: T.textFaint }}>
              waiting
            </span>
          </li>
        ))}
      </ol>
    </Card>
  );
}

/* ============================================================
   CONFIGURATION
   ============================================================ */
function ConfigurationCard({
  config,
  setConfig,
  defaultCurrency,
  setDefaultCurrency,
}: {
  config: Record<string, boolean>;
  setConfig: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  defaultCurrency: string;
  setDefaultCurrency: (c: string) => void;
}) {
  const options: { k: string; label: string; hint: string; icon: typeof CheckCircle2 }[] = [
    {
      k: "autoCapture",
      label: "Capture automatically",
      hint: "Charge the card as soon as it's authorized.",
      icon: CheckCircle2,
    },
    {
      k: "manualCapture",
      label: "Manual capture",
      hint: "Authorize now, capture later within 7 days.",
      icon: Timer,
    },
    {
      k: "threeds",
      label: "3D Secure",
      hint: "Trigger SCA challenges when required.",
      icon: ShieldCheck,
    },
    {
      k: "fraud",
      label: "Fraud protection",
      hint: "Score every transaction with our ML model.",
      icon: ShieldAlert,
    },
    {
      k: "retry",
      label: "Retry failed payments",
      hint: "Smart retry for soft declines.",
      icon: Repeat,
    },
    {
      k: "saveCards",
      label: "Save customer cards",
      hint: "Vault tokens for one-click reuse.",
      icon: Save,
    },
    {
      k: "express",
      label: "Express checkout",
      hint: "Apple Pay & Google Pay at the top of checkout.",
      icon: Zap,
    },
    {
      k: "routing",
      label: "Smart routing",
      hint: "Route each payment to the acquirer with best acceptance.",
      icon: Wand2,
    },
  ];
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-sora text-base font-semibold tracking-tight">
            Payment configuration
          </h3>
          <p className="mt-0.5 text-[11px]" style={{ color: T.textMuted }}>
            Fine-tune how every payment is authorized, captured and settled.
          </p>
        </div>
        <StatusPill tone="violet">Global</StatusPill>
      </div>

      <ul className="mt-4 divide-y" style={{ borderColor: T.hairline }}>
        {options.map((o) => {
          const Icon = o.icon;
          return (
            <li
              key={o.k}
              className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
              style={{ borderColor: T.hairline }}
            >
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-xl"
                style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text }}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold">{o.label}</p>
                <p className="text-[11px]" style={{ color: T.textMuted }}>
                  {o.hint}
                </p>
              </div>
              <Toggle
                checked={!!config[o.k]}
                onChange={(v) => setConfig((c) => ({ ...c, [o.k]: v }))}
                label={o.label}
              />
            </li>
          );
        })}
      </ul>

      <div
        className="mt-4 flex flex-col gap-2 rounded-2xl p-3 sm:flex-row sm:items-center sm:justify-between"
        style={{ background: T.bg, border: `1px solid ${T.border}` }}
      >
        <div>
          <p
            className="text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: T.textFaint }}
          >
            Default currency
          </p>
          <p className="mt-0.5 text-[13px] font-semibold">Settle in {defaultCurrency}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["EUR", "USD", "GBP"].map((c) => {
            const active = defaultCurrency === c;
            return (
              <button
                key={c}
                onClick={() => setDefaultCurrency(c)}
                className="inline-flex h-8 items-center rounded-full px-3 text-xs font-semibold transition"
                style={{
                  background: active ? T.text : T.card,
                  color: active ? "#fff" : T.text,
                  border: `1px solid ${active ? T.text : T.border}`,
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

/* ============================================================
   CURRENCIES
   ============================================================ */
const CURRENCIES: { code: string; name: string; flag: string; settle: boolean }[] = [
  { code: "EUR", name: "Euro", flag: "🇪🇺", settle: true },
  { code: "USD", name: "US Dollar", flag: "🇺🇸", settle: true },
  { code: "GBP", name: "Pound Sterling", flag: "🇬🇧", settle: true },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭", settle: true },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", settle: true },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺", settle: true },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", settle: false },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪", settle: false },
  { code: "BRL", name: "Brazilian Real", flag: "🇧🇷", settle: false },
  { code: "MXN", name: "Mexican Peso", flag: "🇲🇽", settle: false },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬", settle: true },
  { code: "HKD", name: "Hong Kong Dollar", flag: "🇭🇰", settle: true },
];

function CurrenciesCard({
  currencies,
  setCurrencies,
}: {
  currencies: Record<string, boolean>;
  setCurrencies: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-sora text-base font-semibold tracking-tight">Supported currencies</h3>
          <p className="mt-0.5 text-[11px]" style={{ color: T.textMuted }}>
            Accept locally, settle globally.
          </p>
        </div>
        <StatusPill tone="teal">
          {Object.values(currencies).filter(Boolean).length} enabled
        </StatusPill>
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-2">
        {CURRENCIES.map((c) => {
          const on = !!currencies[c.code];
          return (
            <li
              key={c.code}
              className="flex items-center gap-2.5 rounded-xl p-2.5 transition-all"
              style={{
                background: T.bg,
                border: `1px solid ${on ? T.borderStrong : T.border}`,
              }}
            >
              <span className="text-base leading-none" aria-hidden>
                {c.flag}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold">
                  {c.code}
                  <span className="ml-1 font-normal" style={{ color: T.textMuted }}>
                    · {c.name}
                  </span>
                </p>
                <p className="text-[10px]" style={{ color: T.textFaint }}>
                  {c.settle ? "Settlement available" : "Presentment only"}
                </p>
              </div>
              <Toggle
                checked={on}
                onChange={(v) => setCurrencies((cc) => ({ ...cc, [c.code]: v }))}
                label={c.name}
              />
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

/* ============================================================
   QUICK ACTIONS
   ============================================================ */
function QuickActions() {
  const actions = [
    {
      icon: Sparkles,
      label: "Enable Apple Pay",
      desc: "One tap on iPhone and Safari.",
      accent: T.text,
    },
    {
      icon: Sparkles,
      label: "Enable Google Pay",
      desc: "One tap on Chrome and Android.",
      accent: T.blue,
    },
    {
      icon: Link2,
      label: "Connect PSP",
      desc: "Bring your own acquirer or provider.",
      accent: T.violet,
    },
    {
      icon: Wallet,
      label: "Generate Payment Link",
      desc: "Charge any customer instantly.",
      accent: T.green,
    },
    {
      icon: ShoppingCart,
      label: "Create Checkout",
      desc: "Design a hosted checkout page.",
      accent: T.amber,
    },
    {
      icon: BookOpen,
      label: "View Documentation",
      desc: "Integrate in under 10 minutes.",
      accent: T.teal,
    },
  ];
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-sora text-lg font-semibold tracking-tight">Quick actions</h2>
        <span className="text-[11px]" style={{ color: T.textMuted }}>
          Get up and running in minutes
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.label}
              className="group relative overflow-hidden rounded-3xl p-4 text-left transition-all hover:-translate-y-0.5"
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                boxShadow: SHADOW_SOFT,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = SHADOW_LIFT)}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = SHADOW_SOFT)}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
                style={{ background: `${a.accent}22` }}
              />
              <div className="flex items-center justify-between">
                <span
                  className="grid h-11 w-11 place-items-center rounded-2xl transition-transform group-hover:scale-105"
                  style={{ background: `${a.accent}14`, color: a.accent }}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <ArrowUpRight
                  className="h-4 w-4 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  style={{ color: T.text }}
                  aria-hidden
                />
              </div>
              <p className="mt-3 text-sm font-semibold">{a.label}</p>
              <p className="mt-0.5 text-[12px]" style={{ color: T.textMuted }}>
                {a.desc}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   METHOD DETAIL DRAWER
   ============================================================ */
function MethodDetail({
  method,
  enabled,
  onToggle,
  onClose,
}: {
  method: PaymentMethod;
  enabled: boolean;
  onToggle: (v: boolean) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label={`${method.name} details`}
    >
      <div
        className="absolute inset-0 anim-fade"
        style={{ background: "rgba(17,17,17,0.35)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />
      <div
        className="absolute right-0 top-0 flex h-dvh w-full max-w-[480px] flex-col anim-slide-right"
        style={{ background: T.card, borderLeft: `1px solid ${T.border}` }}
      >
        <header
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: `1px solid ${T.border}` }}
        >
          <div className="flex items-center gap-2.5">
            <MethodLogo m={method} />
            <div>
              <p className="font-sora text-sm font-semibold">{method.name}</p>
              <p className="text-[11px]" style={{ color: T.textMuted }}>
                {method.category}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-lg transition"
            style={{ color: T.textMuted }}
            onMouseEnter={(e) => (e.currentTarget.style.background = T.bg)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div
            className="flex items-center justify-between rounded-2xl p-3"
            style={{ background: T.bg, border: `1px solid ${T.border}` }}
          >
            <div>
              <p
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: T.textFaint }}
              >
                Status
              </p>
              <p className="mt-0.5 text-sm font-semibold">
                {enabled ? "Active on checkout" : "Available to activate"}
              </p>
            </div>
            <Toggle checked={enabled} onChange={onToggle} label={`Enable ${method.name}`} />
          </div>

          <section className="mt-6">
            <p
              className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: T.textFaint }}
            >
              Coverage
            </p>
            <div
              className="grid grid-cols-1 gap-2 rounded-2xl p-3 sm:grid-cols-3"
              style={{ background: T.card, border: `1px solid ${T.border}` }}
            >
              <DetailRow label="Countries" value={method.countries} />
              <DetailRow label="Settlement" value={method.currency} />
              <DetailRow label="Speed" value={method.speed} />
            </div>
          </section>

          <section className="mt-6">
            <p
              className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: T.textFaint }}
            >
              Highlights
            </p>
            <ul className="flex flex-col gap-1.5 text-[13px]">
              {[
                "PCI-DSS Level 1 out of the box",
                "3D Secure & SCA handled automatically",
                "Full refund and partial refund support",
                "Webhook notifications for every state change",
              ].map((h) => (
                <li key={h} className="inline-flex items-center gap-2" style={{ color: T.text }}>
                  <CheckCircle2 className="h-3.5 w-3.5" style={{ color: T.green }} aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6">
            <p
              className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: T.textFaint }}
            >
              Pricing
            </p>
            <div
              className="rounded-2xl p-4"
              style={{ background: T.bg, border: `1px solid ${T.border}` }}
            >
              <p className="font-sora text-2xl font-semibold tracking-tight">
                1.2%
                <span className="ml-1 text-sm font-medium" style={{ color: T.textMuted }}>
                  + 20¢ per success
                </span>
              </p>
              <p className="mt-1 text-[11px]" style={{ color: T.textMuted }}>
                Flat, transparent pricing across every {method.category.toLowerCase()} payment.
              </p>
            </div>
          </section>
        </div>

        <footer
          className="flex items-center justify-between gap-2 px-6 py-3"
          style={{ borderTop: `1px solid ${T.border}`, background: T.bg }}
        >
          <SecondaryButton size="sm">
            <ExternalLink className="h-3.5 w-3.5" aria-hidden /> Read docs
          </SecondaryButton>
          <PrimaryButton size="sm" onClick={onClose}>
            Done
          </PrimaryButton>
        </footer>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl p-2" style={{ background: T.bg, border: `1px solid ${T.border}` }}>
      <p
        className="text-[10px] font-medium uppercase tracking-wider"
        style={{ color: T.textFaint }}
      >
        {label}
      </p>
      <p className="mt-0.5 text-[12px] font-semibold">{value}</p>
    </div>
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
    { label: "Enable Apple Pay", icon: Sparkles, hint: "Method" },
    { label: "Enable Google Pay", icon: Sparkles, hint: "Method" },
    { label: "Add USDC crypto payments", icon: Coins, hint: "Method" },
    { label: "Change default currency", icon: Wallet, hint: "Setting" },
    { label: "Read Documentation", icon: BookOpen, hint: "Help" },
    { label: "Go to Transactions", icon: ArrowLeftRight, hint: "Navigate" },
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
            placeholder="Search methods, countries, currencies…"
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
      </div>
    </div>
  );
}

/* ============================================================
   ANIMATIONS
   ============================================================ */
const ANIM_CSS = `
@keyframes tally-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes tally-fade-up { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: translateY(0) } }
@keyframes tally-slide-right { from { transform: translateX(100%) } to { transform: translateX(0) } }
.anim-fade { animation: tally-fade 220ms ease-out both }
.anim-fade-up { animation: tally-fade-up 320ms cubic-bezier(0.2,0.7,0.2,1) both }
.anim-slide-right { animation: tally-slide-right 320ms cubic-bezier(0.2,0.7,0.2,1) both }
@media (prefers-reduced-motion: reduce) {
  .anim-fade, .anim-fade-up, .anim-slide-right { animation: none !important }
}
`;
