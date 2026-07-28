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
  Sparkles,
  Command,
  ChevronRight,
  ChevronDown,
  Wallet,
  CheckCircle2,
  Timer,
  Landmark,
  Bitcoin,
  Coins,
  QrCode,
  ShieldCheck,
  Zap,
  Calendar,
  Repeat,
  Download,
  X,
  Info,
  Globe2,
  Building2,
  ArrowDownToLine,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { NAV_GROUPS as SHARED_NAV_GROUPS } from "@/components/app/nav";

export const Route = createFileRoute("/_authenticated/payouts")({
  component: PayoutsPage,
  head: () => ({
    meta: [
      { title: "Payouts — Tally" },
      { name: "description", content: "Manage where and how your funds are settled." },
      { property: "og:title", content: "Payouts — Tally" },
      { property: "og:description", content: "Manage where and how your funds are settled." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

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

type NavItem = { label: string; icon: typeof LayoutGrid; key: string; to?: string; badge?: string };
type NavGroup = { title?: string; items: NavItem[] };
const NAV_GROUPS: NavGroup[] = SHARED_NAV_GROUPS;

type TabKey = "banks" | "wallets" | "history";

function PayoutsPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [tab, setTab] = useState<TabKey>("banks");
  const [bankOpen, setBankOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const [schedule, setSchedule] = useState({
    frequency: "weekly" as "instant" | "daily" | "weekly" | "monthly" | "custom",
    day: "Monday",
    currency: "EUR",
    minBalance: "100",
    auto: true,
  });
  const [settlement, setSettlement] = useState({
    currency: "EUR",
    delay: "T+3",
    reserve: 0,
    rolling: false,
    instant: false,
    notifications: true,
  });
  const [currencies, setCurrencies] = useState<Record<string, boolean>>({});

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
        setBankOpen(false);
        setWalletOpen(false);
        setScheduleOpen(false);
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
      <TopNav
        email={email}
        initials={initials}
        onOpenCmd={() => setCmdOpen(true)}
        onSignOut={handleSignOut}
      />

      <div className="flex">
        <Sidebar active="payouts" />

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 sm:py-10">
          <div className="mx-auto max-w-[1320px]">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <Breadcrumbs />
              </div>
              <div className="col-span-12">
                <PageHeader
                  onAddBank={() => {
                    setTab("banks");
                    setBankOpen(true);
                  }}
                  onAddWallet={() => {
                    setTab("wallets");
                    setWalletOpen(true);
                  }}
                  onSchedule={() => setScheduleOpen(true)}
                />
              </div>
              <div className="col-span-12">
                <KpiCards />
              </div>
              <div className="col-span-12">
                <TabsBar tab={tab} setTab={setTab} />
              </div>
              <div className="col-span-12">
                <div key={tab} className="anim-fade-up">
                  {tab === "banks" && <BankAccountsTab onAdd={() => setBankOpen(true)} />}
                  {tab === "wallets" && <CryptoWalletsTab onAdd={() => setWalletOpen(true)} />}
                  {tab === "history" && <HistoryTab />}
                </div>
              </div>
              <div className="col-span-12 lg:col-span-6">
                <SchedulePayoutsCard schedule={schedule} setSchedule={setSchedule} />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <SettlementCard settlement={settlement} setSettlement={setSettlement} />
              </div>
              <div className="col-span-12">
                <CurrenciesCard currencies={currencies} setCurrencies={setCurrencies} />
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
      {bankOpen && <BankModal onClose={() => setBankOpen(false)} />}
      {walletOpen && <WalletModal onClose={() => setWalletOpen(false)} />}
      {scheduleOpen && (
        <ScheduleModal
          schedule={schedule}
          setSchedule={setSchedule}
          onClose={() => setScheduleOpen(false)}
        />
      )}
    </div>
  );
}

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
            <span className="flex-1 truncate">Search accounts, wallets, payouts…</span>
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
            Treasury
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
          background: `linear-gradient(140deg, rgba(37,99,235,0.06), rgba(16,185,129,0.06))`,
          border: `1px solid ${T.border}`,
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="grid h-6 w-6 place-items-center rounded-md text-white"
            style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.violet})` }}
          >
            <ShieldCheck className="h-3 w-3" aria-hidden />
          </div>
          <p className="text-[11px] font-semibold" style={{ color: T.text }}>
            Treasury vault
          </p>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed" style={{ color: T.textMuted }}>
          All settlement destinations are encrypted and audited daily.
        </p>
      </div>
    </aside>
  );
}

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

type Tone = "muted" | "success" | "info" | "warning" | "violet" | "teal" | "danger";
function StatusPill({ tone = "muted", children }: { tone?: Tone; children: React.ReactNode }) {
  const map: Record<Tone, { bg: string; fg: string; dot: string }> = {
    muted: { bg: T.hairline, fg: T.textMuted, dot: T.textFaint },
    success: { bg: "rgba(16,185,129,0.08)", fg: "#047857", dot: T.green },
    info: { bg: "rgba(37,99,235,0.08)", fg: "#1d4ed8", dot: T.blue },
    warning: { bg: "rgba(245,158,11,0.1)", fg: "#b45309", dot: T.amber },
    violet: { bg: "rgba(124,58,237,0.08)", fg: "#6d28d9", dot: T.violet },
    teal: { bg: "rgba(20,184,166,0.08)", fg: "#0f766e", dot: T.teal },
    danger: { bg: "rgba(239,68,68,0.08)", fg: "#b91c1c", dot: T.red },
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
function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold" style={{ color: T.text }}>
        {label}
      </span>
      {children}
      {hint && (
        <span className="text-[10px]" style={{ color: T.textFaint }}>
          {hint}
        </span>
      )}
    </label>
  );
}
function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-10 rounded-xl px-3 text-sm outline-none transition"
      style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = T.text;
        e.currentTarget.style.background = T.card;
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = T.border;
        e.currentTarget.style.background = T.bg;
      }}
    />
  );
}
function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="h-10 rounded-xl px-3 text-sm outline-none transition"
      style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text }}
    />
  );
}

function Breadcrumbs() {
  return (
    <nav className="flex items-center gap-1.5 text-[12px]" aria-label="Breadcrumb">
      <span style={{ color: T.textMuted }}>Acme Store</span>
      <ChevronRight className="h-3 w-3" style={{ color: T.textFaint }} aria-hidden />
      <span style={{ color: T.text }} className="font-medium">
        Payouts
      </span>
    </nav>
  );
}

function PageHeader({
  onAddBank,
  onAddWallet,
  onSchedule,
}: {
  onAddBank: () => void;
  onAddWallet: () => void;
  onSchedule: () => void;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="font-sora text-[28px] font-semibold tracking-tight sm:text-[32px]">
          Payouts
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: T.textMuted }}>
          Manage where and how your funds are settled.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <SecondaryButton size="sm" onClick={onAddBank}>
          <Landmark className="h-3.5 w-3.5" aria-hidden /> Add Bank Account
        </SecondaryButton>
        <SecondaryButton size="sm" onClick={onAddWallet}>
          <Wallet className="h-3.5 w-3.5" aria-hidden /> Add Wallet
        </SecondaryButton>
        <PrimaryButton size="sm" onClick={onSchedule}>
          <Calendar className="h-3.5 w-3.5" aria-hidden /> Schedule Payout
        </PrimaryButton>
      </div>
    </div>
  );
}

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

function KpiCards() {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Kpi
        label="Available balance"
        target={0}
        prefix="€"
        decimals={2}
        icon={Wallet}
        accent={T.blue}
        tone="Awaiting first payment"
      />
      <Kpi
        label="Pending payouts"
        target={0}
        prefix="€"
        decimals={2}
        icon={Timer}
        accent={T.amber}
        tone="Nothing pending"
      />
      <Kpi
        label="Completed payouts"
        target={0}
        prefix="€"
        decimals={2}
        icon={CheckCircle2}
        accent={T.green}
        tone="All-time"
      />
      <NextScheduledCard />
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
  tone,
}: {
  label: string;
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  icon: typeof Wallet;
  accent: string;
  tone: string;
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
        <StatusPill tone="muted">{tone}</StatusPill>
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
function NextScheduledCard() {
  return (
    <div
      className="group relative overflow-hidden rounded-3xl p-5 transition-all hover:-translate-y-0.5"
      style={{
        background: `linear-gradient(180deg, ${T.card} 0%, ${T.card} 60%, ${T.violet}05 100%)`,
        border: `1px solid ${T.border}`,
        boxShadow: SHADOW_SOFT,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = SHADOW_LIFT)}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = SHADOW_SOFT)}
    >
      <div className="relative flex items-center justify-between">
        <div
          className="grid h-9 w-9 place-items-center rounded-xl"
          style={{ background: `${T.violet}14`, color: T.violet }}
        >
          <Calendar className="h-4 w-4" aria-hidden />
        </div>
        <StatusPill tone="violet">Not scheduled</StatusPill>
      </div>
      <p
        className="mt-5 text-[11px] font-medium uppercase tracking-wider"
        style={{ color: T.textMuted }}
      >
        Next scheduled payout
      </p>
      <p className="mt-1 font-sora text-[20px] font-semibold tracking-tight">Set a cadence</p>
      <p className="mt-1 text-[11px]" style={{ color: T.textMuted }}>
        Automate weekly or monthly settlements.
      </p>
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

function TabsBar({ tab, setTab }: { tab: TabKey; setTab: (t: TabKey) => void }) {
  const tabs: { key: TabKey; label: string; icon: typeof Landmark; count: string }[] = [
    { key: "banks", label: "Bank Accounts", icon: Landmark, count: "0" },
    { key: "wallets", label: "Crypto Wallets", icon: Wallet, count: "0" },
    { key: "history", label: "Payout History", icon: ArrowDownToLine, count: "0" },
  ];
  return (
    <div
      className="relative flex flex-wrap items-center gap-1 rounded-2xl p-1.5"
      style={{ background: T.card, border: `1px solid ${T.border}`, boxShadow: SHADOW_SOFT }}
    >
      {tabs.map((t) => {
        const active = tab === t.key;
        const Icon = t.icon;
        return (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="relative inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-all sm:flex-none"
            style={{
              background: active ? T.text : "transparent",
              color: active ? "#fff" : T.textMuted,
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.background = T.bg;
            }}
            onMouseLeave={(e) => {
              if (!active) e.currentTarget.style.background = "transparent";
            }}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden />
            <span>{t.label}</span>
            <span
              className="ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums"
              style={{
                background: active ? "rgba(255,255,255,0.15)" : T.hairline,
                color: active ? "#fff" : T.textMuted,
              }}
            >
              {t.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function BankAccountsTab({ onAdd }: { onAdd: () => void }) {
  return (
    <Card className="overflow-hidden">
      <SectionHeader
        title="Bank accounts"
        subtitle="SEPA, SWIFT and local rails for global settlements."
        pill={<StatusPill tone="muted">0 connected</StatusPill>}
      />
      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
        <EmptyIllustration variant="bank" />
        <div className="flex flex-col justify-center gap-4">
          <div>
            <h3 className="font-sora text-lg font-semibold tracking-tight">
              No bank accounts connected
            </h3>
            <p className="mt-1 text-sm" style={{ color: T.textMuted }}>
              Connect your first bank account to receive payouts. We support SEPA in 36 countries,
              SWIFT worldwide, and local rails in the US, UK and Switzerland.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              { icon: ShieldCheck, label: "Instant verification via micro-deposits" },
              { icon: Globe2, label: "SEPA, SWIFT, ACH & Faster Payments" },
              { icon: Zap, label: "As fast as T+0 with instant settlement" },
              { icon: Building2, label: "Multi-account & multi-currency support" },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <li
                  key={f.label}
                  className="flex items-center gap-2 rounded-xl p-2.5 text-[12px]"
                  style={{ background: T.bg, border: `1px solid ${T.border}` }}
                >
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-lg"
                    style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span style={{ color: T.text }}>{f.label}</span>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-wrap items-center gap-2">
            <PrimaryButton onClick={onAdd} size="sm">
              <Plus className="h-3.5 w-3.5" aria-hidden /> Add Bank Account
            </PrimaryButton>
            <SecondaryButton size="sm">
              <Info className="h-3.5 w-3.5" aria-hidden /> Verification guide
            </SecondaryButton>
          </div>
        </div>
      </div>
    </Card>
  );
}

function CryptoWalletsTab({ onAdd }: { onAdd: () => void }) {
  const chains = [
    { k: "btc", label: "Bitcoin", accent: "#F7931A", icon: Bitcoin },
    { k: "eth", label: "Ethereum", accent: "#627EEA", icon: Coins },
    { k: "usdc", label: "USDC", accent: "#2775CA", icon: Coins },
    { k: "usdt", label: "USDT", accent: "#26A17B", icon: Coins },
    { k: "polygon", label: "Polygon", accent: "#8247E5", icon: Coins },
    { k: "base", label: "Base", accent: "#0052FF", icon: Coins },
    { k: "arbitrum", label: "Arbitrum", accent: "#28A0F0", icon: Coins },
    { k: "solana", label: "Solana", accent: "#14F195", icon: Coins },
  ];
  return (
    <Card className="overflow-hidden">
      <SectionHeader
        title="Crypto wallets"
        subtitle="Receive on-chain settlements in stablecoins or native assets."
        pill={<StatusPill tone="muted">0 connected</StatusPill>}
      />
      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
        <EmptyIllustration variant="wallet" />
        <div className="flex flex-col justify-center gap-4">
          <div>
            <h3 className="font-sora text-lg font-semibold tracking-tight">No wallets connected</h3>
            <p className="mt-1 text-sm" style={{ color: T.textMuted }}>
              Connect a crypto wallet to receive settlements in seconds. All withdrawals are
              verified on-chain and fully auditable from your dashboard.
            </p>
          </div>
          <div>
            <p
              className="mb-2 text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: T.textFaint }}
            >
              Supported networks
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {chains.map((c) => {
                const Icon = c.icon;
                return (
                  <li
                    key={c.k}
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                    style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text }}
                  >
                    <span
                      className="grid h-4 w-4 place-items-center rounded-full text-white"
                      style={{ background: c.accent }}
                    >
                      <Icon className="h-2.5 w-2.5" aria-hidden />
                    </span>
                    {c.label}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <PrimaryButton onClick={onAdd} size="sm">
              <Plus className="h-3.5 w-3.5" aria-hidden /> Add Wallet
            </PrimaryButton>
            <SecondaryButton size="sm">
              <QrCode className="h-3.5 w-3.5" aria-hidden /> Scan wallet
            </SecondaryButton>
          </div>
        </div>
      </div>
    </Card>
  );
}

function HistoryTab() {
  const cols = [
    "Payout ID",
    "Destination",
    "Amount",
    "Currency",
    "Method",
    "Status",
    "Created",
    "Completed",
    "",
  ];
  return (
    <Card className="overflow-hidden">
      <SectionHeader
        title="Payout history"
        subtitle="Every settlement, on-chain or off-chain, in one place."
        pill={
          <div className="flex items-center gap-2">
            <SecondaryButton size="sm">
              <Download className="h-3.5 w-3.5" aria-hidden /> Export
            </SecondaryButton>
            <StatusPill tone="muted">Last 90 days</StatusPill>
          </div>
        }
      />
      <div className="overflow-x-auto">
        <div
          className="sticky top-0 grid min-w-[900px] grid-cols-[1.1fr_1.4fr_0.9fr_0.7fr_0.9fr_0.9fr_1fr_1fr_60px] gap-4 px-6 py-3 text-[10px] font-semibold uppercase tracking-wider"
          style={{ background: T.bg, borderBottom: `1px solid ${T.border}`, color: T.textMuted }}
        >
          {cols.map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <EmptyIllustration variant="history" small />
          <p className="mt-4 font-sora text-base font-semibold">No payouts yet</p>
          <p className="mt-1 max-w-md text-[13px]" style={{ color: T.textMuted }}>
            Your payout history will appear once settlements begin. Every payout is signed,
            timestamped and downloadable as a PDF receipt.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <StatusPill tone="violet">Scheduled</StatusPill>
            <StatusPill tone="info">Processing</StatusPill>
            <StatusPill tone="success">Completed</StatusPill>
            <StatusPill tone="warning">Pending</StatusPill>
            <StatusPill tone="danger">Failed</StatusPill>
            <StatusPill tone="muted">Cancelled</StatusPill>
          </div>
        </div>
      </div>
    </Card>
  );
}

function SectionHeader({
  title,
  subtitle,
  pill,
}: {
  title: string;
  subtitle: string;
  pill?: React.ReactNode;
}) {
  return (
    <div
      className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-6 py-4"
      style={{ borderBottom: `1px solid ${T.border}` }}
    >
      <div className="min-w-0">
        <h3 className="font-sora text-base font-semibold tracking-tight">{title}</h3>
        <p className="mt-0.5 text-[11px]" style={{ color: T.textMuted }}>
          {subtitle}
        </p>
      </div>
      {pill}
    </div>
  );
}

function EmptyIllustration({
  variant,
  small,
}: {
  variant: "bank" | "wallet" | "history";
  small?: boolean;
}) {
  const h = small ? "h-24 w-24" : "h-56";
  if (variant === "bank") {
    return (
      <div
        className={`relative ${h} overflow-hidden rounded-2xl`}
        style={{
          background: `radial-gradient(circle at 20% 20%, ${T.blue}14, transparent 50%), radial-gradient(circle at 80% 80%, ${T.violet}14, transparent 55%), ${T.bg}`,
          border: `1px solid ${T.border}`,
        }}
      >
        <div className="absolute left-6 top-6 anim-float">
          <FakeBankCard tint={T.blue} label="Primary" />
        </div>
        <div className="absolute right-6 bottom-6 anim-float-slow">
          <FakeBankCard tint={T.violet} label="Secondary" />
        </div>
      </div>
    );
  }
  if (variant === "wallet") {
    return (
      <div
        className={`relative ${h} overflow-hidden rounded-2xl`}
        style={{
          background: `radial-gradient(circle at 30% 30%, ${T.green}14, transparent 55%), radial-gradient(circle at 80% 70%, ${T.violet}14, transparent 55%), ${T.bg}`,
          border: `1px solid ${T.border}`,
        }}
      >
        <div className="absolute left-6 top-6 anim-float">
          <FakeWalletChip tint="#F7931A" label="BTC" />
        </div>
        <div className="absolute right-8 top-10 anim-float-slow">
          <FakeWalletChip tint="#627EEA" label="ETH" />
        </div>
        <div className="absolute left-10 bottom-8 anim-float-slow">
          <FakeWalletChip tint="#2775CA" label="USDC" />
        </div>
        <div className="absolute right-6 bottom-6 anim-float">
          <FakeWalletChip tint={T.green} label="SOL" />
        </div>
      </div>
    );
  }
  return (
    <div
      className={`relative ${h} overflow-hidden rounded-2xl`}
      style={{
        background: `radial-gradient(circle at 50% 50%, ${T.blue}14, transparent 60%), ${T.bg}`,
        border: `1px solid ${T.border}`,
      }}
    >
      <div className="grid h-full place-items-center">
        <ArrowDownToLine className="h-6 w-6" style={{ color: T.text }} aria-hidden />
      </div>
    </div>
  );
}
function FakeBankCard({ tint, label }: { tint: string; label: string }) {
  return (
    <div
      className="w-[180px] rounded-2xl p-3"
      style={{
        background: `linear-gradient(135deg, ${T.card}, ${tint}10)`,
        border: `1px solid ${T.border}`,
        boxShadow: SHADOW_LIFT,
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="grid h-6 w-6 place-items-center rounded-md"
          style={{ background: `${tint}14`, color: tint }}
        >
          <Landmark className="h-3 w-3" aria-hidden />
        </span>
        <span
          className="text-[9px] font-semibold uppercase tracking-wider"
          style={{ color: T.textFaint }}
        >
          {label}
        </span>
      </div>
      <p className="mt-2 font-mono text-[10px]" style={{ color: T.textMuted }}>
        •••• •••• •••• ••••
      </p>
      <p className="mt-2 text-[10px] font-semibold" style={{ color: T.text }}>
        Not connected
      </p>
    </div>
  );
}
function FakeWalletChip({ tint, label }: { tint: string; label: string }) {
  return (
    <div
      className="flex items-center gap-2 rounded-full px-2.5 py-1.5"
      style={{ background: T.card, border: `1px solid ${T.border}`, boxShadow: SHADOW_LIFT }}
    >
      <span
        className="grid h-5 w-5 place-items-center rounded-full text-white"
        style={{ background: tint }}
      >
        <Coins className="h-3 w-3" aria-hidden />
      </span>
      <span className="text-[11px] font-semibold">{label}</span>
    </div>
  );
}

type Schedule = {
  frequency: "instant" | "daily" | "weekly" | "monthly" | "custom";
  day: string;
  currency: string;
  minBalance: string;
  auto: boolean;
};

function SchedulePayoutsCard({
  schedule,
  setSchedule,
}: {
  schedule: Schedule;
  setSchedule: React.Dispatch<React.SetStateAction<Schedule>>;
}) {
  const options = [
    { k: "instant", label: "Instant", desc: "As soon as funds are cleared", icon: Zap },
    { k: "daily", label: "Daily", desc: "Every business day", icon: Repeat },
    { k: "weekly", label: "Weekly", desc: "Once a week on your day", icon: Calendar },
    { k: "monthly", label: "Monthly", desc: "First business day of month", icon: Calendar },
    { k: "custom", label: "Custom", desc: "Advanced cron-like rules", icon: Settings },
  ] as const;
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-sora text-base font-semibold tracking-tight">Scheduled payouts</h3>
          <p className="mt-0.5 text-[11px]" style={{ color: T.textMuted }}>
            Choose when funds are automatically transferred to your accounts.
          </p>
        </div>
        <StatusPill tone={schedule.auto ? "success" : "muted"}>
          {schedule.auto ? "On" : "Manual"}
        </StatusPill>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {options.map((o) => {
          const active = schedule.frequency === o.k;
          const Icon = o.icon;
          return (
            <button
              key={o.k}
              onClick={() => setSchedule((s) => ({ ...s, frequency: o.k }))}
              className="group flex flex-col items-start gap-2 rounded-2xl p-3 text-left transition-all"
              style={{
                background: active ? T.text : T.bg,
                border: `1px solid ${active ? T.text : T.border}`,
                color: active ? "#fff" : T.text,
              }}
            >
              <span
                className="grid h-7 w-7 place-items-center rounded-lg"
                style={{
                  background: active ? "rgba(255,255,255,0.12)" : T.card,
                  color: active ? "#fff" : T.text,
                  border: `1px solid ${active ? "transparent" : T.border}`,
                }}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
              </span>
              <div>
                <p className="text-[12px] font-semibold">{o.label}</p>
                <p
                  className="mt-0.5 text-[10px]"
                  style={{ color: active ? "rgba(255,255,255,0.7)" : T.textMuted }}
                >
                  {o.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Field label="Preferred day">
          <SelectInput
            value={schedule.day}
            onChange={(e) => setSchedule((s) => ({ ...s, day: e.target.value }))}
          >
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Preferred currency">
          <SelectInput
            value={schedule.currency}
            onChange={(e) => setSchedule((s) => ({ ...s, currency: e.target.value }))}
          >
            {["EUR", "USD", "GBP", "CHF"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Minimum balance" hint="Skip payouts below this amount">
          <TextInput
            value={schedule.minBalance}
            onChange={(e) => setSchedule((s) => ({ ...s, minBalance: e.target.value }))}
            inputMode="decimal"
            placeholder="100"
          />
        </Field>
      </div>

      <div
        className="mt-4 flex items-center justify-between rounded-2xl p-3"
        style={{ background: T.bg, border: `1px solid ${T.border}` }}
      >
        <div className="min-w-0">
          <p className="text-[13px] font-semibold">Automatic payouts</p>
          <p className="text-[11px]" style={{ color: T.textMuted }}>
            Trigger settlements according to the rules above.
          </p>
        </div>
        <Toggle
          checked={schedule.auto}
          onChange={(v) => setSchedule((s) => ({ ...s, auto: v }))}
          label="Automatic payouts"
        />
      </div>
    </Card>
  );
}

type Settlement = {
  currency: string;
  delay: string;
  reserve: number;
  rolling: boolean;
  instant: boolean;
  notifications: boolean;
};

function SettlementCard({
  settlement,
  setSettlement,
}: {
  settlement: Settlement;
  setSettlement: React.Dispatch<React.SetStateAction<Settlement>>;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-sora text-base font-semibold tracking-tight">Settlement settings</h3>
          <p className="mt-0.5 text-[11px]" style={{ color: T.textMuted }}>
            Control how your available balance is calculated and released.
          </p>
        </div>
        <StatusPill tone="teal">Global</StatusPill>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Settlement currency">
          <SelectInput
            value={settlement.currency}
            onChange={(e) => setSettlement((s) => ({ ...s, currency: e.target.value }))}
          >
            {["EUR", "USD", "GBP", "CHF"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Settlement delay" hint="How long funds stay in-flight before payout">
          <SelectInput
            value={settlement.delay}
            onChange={(e) => setSettlement((s) => ({ ...s, delay: e.target.value }))}
          >
            {["T+0 Instant", "T+1", "T+2", "T+3", "T+7"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </SelectInput>
        </Field>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold">Reserve percentage</p>
          <span className="text-[12px] font-semibold tabular-nums" style={{ color: T.text }}>
            {settlement.reserve}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={30}
          value={settlement.reserve}
          onChange={(e) => setSettlement((s) => ({ ...s, reserve: Number(e.target.value) }))}
          className="mt-2 w-full accent-black"
        />
        <p className="mt-1 text-[10px]" style={{ color: T.textMuted }}>
          Withhold a percentage as a rolling reserve for chargebacks.
        </p>
      </div>

      <ul className="mt-4 divide-y" style={{ borderColor: T.hairline }}>
        {[
          {
            k: "rolling",
            label: "Rolling reserve",
            hint: "Release the reserve automatically after 90 days.",
          },
          {
            k: "instant",
            label: "Instant settlement",
            hint: "Pay out available balance the moment it's cleared.",
          },
          {
            k: "notifications",
            label: "Payout notifications",
            hint: "Email & webhook alerts for every payout.",
          },
        ].map((o) => (
          <li key={o.k} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold">{o.label}</p>
              <p className="text-[11px]" style={{ color: T.textMuted }}>
                {o.hint}
              </p>
            </div>
            <Toggle
              checked={(settlement as unknown as Record<string, boolean>)[o.k]}
              onChange={(v) => setSettlement((s) => ({ ...s, [o.k]: v }) as Settlement)}
              label={o.label}
            />
          </li>
        ))}
      </ul>
    </Card>
  );
}

const CURRENCIES: { code: string; name: string; flag: string }[] = [
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "GBP", name: "Pound Sterling", flag: "🇬🇧" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
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
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <h3 className="font-sora text-base font-semibold tracking-tight">
            Supported payout currencies
          </h3>
          <p className="mt-0.5 text-[11px]" style={{ color: T.textMuted }}>
            Activate a currency to enable it as a payout destination.
          </p>
        </div>
        <StatusPill tone="muted">
          {Object.values(currencies).filter(Boolean).length} active
        </StatusPill>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {CURRENCIES.map((c) => {
          const on = !!currencies[c.code];
          return (
            <li key={c.code}>
              <button
                onClick={() => setCurrencies((cc) => ({ ...cc, [c.code]: !on }))}
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all hover:-translate-y-0.5"
                style={{
                  background: on ? T.text : T.card,
                  color: on ? "#fff" : T.text,
                  border: `1px solid ${on ? T.text : T.border}`,
                }}
              >
                <span className="text-base leading-none" aria-hidden>
                  {c.flag}
                </span>
                {c.code}
                <span
                  className="rounded-full px-1.5 py-0.5 text-[9px] font-semibold"
                  style={{
                    background: on ? "rgba(255,255,255,0.15)" : T.hairline,
                    color: on ? "#fff" : T.textMuted,
                  }}
                >
                  {on ? "Active" : "Inactive"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

function ModalShell({
  title,
  subtitle,
  onClose,
  children,
  footer,
  icon: Icon,
  accent = T.blue,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: React.ReactNode;
  footer: React.ReactNode;
  icon: typeof Landmark;
  accent?: string;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center px-4 py-6 sm:items-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 anim-fade"
        style={{ background: "rgba(17,17,17,0.35)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />
      <div
        className="relative flex w-full max-w-[560px] flex-col overflow-hidden rounded-3xl anim-fade-up"
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          boxShadow: "0 24px 60px rgba(17,17,17,0.18)",
        }}
      >
        <header
          className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-6 py-4"
          style={{ borderBottom: `1px solid ${T.border}` }}
        >
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
              style={{ background: `${accent}14`, color: accent }}
            >
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="truncate font-sora text-sm font-semibold">{title}</p>
              <p className="truncate text-[11px]" style={{ color: T.textMuted }}>
                {subtitle}
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
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>
        <footer
          className="flex items-center justify-end gap-2 px-6 py-3"
          style={{ borderTop: `1px solid ${T.border}`, background: T.bg }}
        >
          {footer}
        </footer>
      </div>
    </div>
  );
}

function BankModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell
      title="Add a bank account"
      subtitle="We'll verify with two micro-deposits within 1 business day."
      onClose={onClose}
      icon={Landmark}
      accent={T.blue}
      footer={
        <>
          <SecondaryButton size="sm" onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton size="sm" onClick={onClose}>
            Save & verify
          </PrimaryButton>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Account holder">
          <TextInput placeholder="Jane Doe" />
        </Field>
        <Field label="Company name">
          <TextInput placeholder="Acme Store Ltd." />
        </Field>
        <Field label="IBAN" hint="International Bank Account Number">
          <TextInput placeholder="FR76 3000 6000 0112 3456 7890 189" />
        </Field>
        <Field label="SWIFT / BIC">
          <TextInput placeholder="AGRIFRPP" />
        </Field>
        <Field label="Bank name">
          <TextInput placeholder="Crédit Agricole" />
        </Field>
        <Field label="Country">
          <SelectInput defaultValue="FR">
            {["FR", "DE", "ES", "IT", "NL", "BE", "GB", "US", "CH"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Currency">
          <SelectInput defaultValue="EUR">
            {["EUR", "USD", "GBP", "CHF"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Verification documents" hint="PDF, PNG or JPG · Max 10MB">
          <div
            className="flex h-10 items-center gap-2 rounded-xl px-3 text-[12px]"
            style={{ background: T.bg, border: `1px dashed ${T.border}`, color: T.textMuted }}
          >
            <Download className="h-3.5 w-3.5" aria-hidden /> Drop bank statement here
          </div>
        </Field>
      </div>
    </ModalShell>
  );
}

function WalletModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell
      title="Add a crypto wallet"
      subtitle="Withdrawals require a small signed message to confirm ownership."
      onClose={onClose}
      icon={Wallet}
      accent={T.violet}
      footer={
        <>
          <SecondaryButton size="sm" onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton size="sm" onClick={onClose}>
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Verify wallet
          </PrimaryButton>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Wallet name">
          <TextInput placeholder="Treasury cold wallet" />
        </Field>
        <Field label="Network">
          <SelectInput defaultValue="ethereum">
            {["ethereum", "polygon", "base", "arbitrum", "solana", "bitcoin"].map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Asset">
          <SelectInput defaultValue="USDC">
            {["USDC", "USDT", "ETH", "BTC", "SOL", "MATIC"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field
          label="Wallet address"
          hint="Double-check the address, transactions are irreversible."
        >
          <TextInput placeholder="0x…" />
        </Field>
        <Field label="Notes">
          <TextInput placeholder="Internal reference" />
        </Field>
        <Field label="Verification">
          <div
            className="flex h-10 items-center justify-between rounded-xl px-3 text-[12px]"
            style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text }}
          >
            <span className="inline-flex items-center gap-1.5" style={{ color: T.textMuted }}>
              <QrCode className="h-3.5 w-3.5" aria-hidden /> Sign a message with your wallet
            </span>
            <span
              className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
              style={{ background: T.hairline, color: T.textMuted }}
            >
              Required
            </span>
          </div>
        </Field>
      </div>
    </ModalShell>
  );
}

function ScheduleModal({
  schedule,
  setSchedule,
  onClose,
}: {
  schedule: Schedule;
  setSchedule: React.Dispatch<React.SetStateAction<Schedule>>;
  onClose: () => void;
}) {
  return (
    <ModalShell
      title="Schedule a payout"
      subtitle="Send an ad-hoc payout to any verified destination."
      onClose={onClose}
      icon={Calendar}
      accent={T.green}
      footer={
        <>
          <SecondaryButton size="sm" onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton size="sm" onClick={onClose}>
            Schedule
          </PrimaryButton>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Amount">
          <TextInput placeholder="0.00" inputMode="decimal" />
        </Field>
        <Field label="Currency">
          <SelectInput
            value={schedule.currency}
            onChange={(e) => setSchedule((s) => ({ ...s, currency: e.target.value }))}
          >
            {["EUR", "USD", "GBP", "CHF"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Destination">
          <SelectInput defaultValue="add">
            <option value="add">Add a destination first…</option>
          </SelectInput>
        </Field>
        <Field label="Send on">
          <TextInput placeholder="Immediately" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Memo">
            <TextInput placeholder="September settlement" />
          </Field>
        </div>
      </div>
      <p
        className="mt-3 rounded-xl p-3 text-[11px]"
        style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMuted }}
      >
        <Info className="mr-1 inline h-3 w-3" aria-hidden /> You'll be able to schedule payouts as
        soon as your first bank account or wallet is verified.
      </p>
    </ModalShell>
  );
}

function CommandPalette({ onClose }: { onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const commands = [
    { label: "Add bank account", icon: Landmark, hint: "Payouts" },
    { label: "Add crypto wallet", icon: Wallet, hint: "Payouts" },
    { label: "Schedule a payout", icon: Calendar, hint: "Payouts" },
    { label: "Change settlement currency", icon: Coins, hint: "Setting" },
    { label: "Export payout history", icon: Download, hint: "Reporting" },
    { label: "Go to Payments", icon: CreditCard, hint: "Navigate" },
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
            placeholder="Search accounts, wallets, payouts…"
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

const ANIM_CSS = `
@keyframes tally-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes tally-fade-up { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: translateY(0) } }
@keyframes tally-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
@keyframes tally-float-slow { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
.anim-fade { animation: tally-fade 220ms ease-out both }
.anim-fade-up { animation: tally-fade-up 320ms cubic-bezier(0.2,0.7,0.2,1) both }
.anim-float { animation: tally-float 4.5s ease-in-out infinite }
.anim-float-slow { animation: tally-float-slow 6s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .anim-fade, .anim-fade-up, .anim-float, .anim-float-slow { animation: none !important }
}
`;
