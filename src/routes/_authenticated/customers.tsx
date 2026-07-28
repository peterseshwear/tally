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
  Download,
  Upload,
  X,
  UserPlus,
  UserCheck,
  Wallet,
  Repeat,
  ShoppingBag,
  Star,
  Crown,
  Globe2,
  Copy,
  Mail,
  Send,
  ExternalLink,
  StickyNote,
  Receipt,
  RefreshCw,
  ShieldCheck,
  Phone,
  Languages,
  Clock,
  Tag,
  CheckCircle2,
  BookOpen,
  Filter,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { NAV_GROUPS as SHARED_NAV_GROUPS } from "@/components/app/nav";

export const Route = createFileRoute("/_authenticated/customers")({
  component: CustomersPage,
  head: () => ({
    meta: [
      { title: "Customers — Tally" },
      {
        name: "description",
        content: "Manage customers, understand buying behavior and build long-term relationships.",
      },
      { property: "og:title", content: "Customers — Tally" },
      {
        property: "og:description",
        content: "Manage customers, understand buying behavior and build long-term relationships.",
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
function CustomersPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [segment, setSegment] = useState("all");

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
        setDrawerOpen(false);
        setImportOpen(false);
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
        href="#cust-main"
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
        <Sidebar active="customers" />

        <main id="cust-main" className="min-w-0 flex-1 px-4 py-8 sm:px-8 sm:py-10">
          <div className="mx-auto max-w-[1320px]">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <Breadcrumbs />
              </div>

              <div className="col-span-12">
                <PageHeader
                  onImport={() => setImportOpen(true)}
                  onOpenSearch={() => setCmdOpen(true)}
                />
              </div>

              <div className="col-span-12">
                <SummaryCards />
              </div>

              <div className="col-span-12 lg:col-span-3">
                <Segments active={segment} onChange={setSegment} />
              </div>

              <div className="col-span-12 lg:col-span-9">
                <CustomersTable
                  onRowClick={() => setDrawerOpen(true)}
                  onImport={() => setImportOpen(true)}
                />
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
      {drawerOpen && <CustomerDrawer onClose={() => setDrawerOpen(false)} />}
      {importOpen && <ImportDialog onClose={() => setImportOpen(false)} />}
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
            <span className="flex-1 truncate">Search customers, orders, transactions…</span>
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
                  className="group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-150"
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
      className={`inline-flex ${h} items-center gap-2 rounded-full ${px} font-medium text-white transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]`}
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
  tone?: "muted" | "success" | "info" | "warning" | "danger" | "violet" | "pink" | "teal";
  children: React.ReactNode;
}) {
  const toneMap: Record<string, { bg: string; fg: string; dot: string }> = {
    muted: { bg: T.hairline, fg: T.textMuted, dot: T.textFaint },
    success: { bg: "rgba(16,185,129,0.08)", fg: "#047857", dot: T.green },
    info: { bg: "rgba(37,99,235,0.08)", fg: "#1d4ed8", dot: T.blue },
    warning: { bg: "rgba(245,158,11,0.1)", fg: "#b45309", dot: T.amber },
    danger: { bg: "rgba(239,68,68,0.08)", fg: "#b91c1c", dot: T.red },
    violet: { bg: "rgba(124,58,237,0.08)", fg: "#6d28d9", dot: T.violet },
    pink: { bg: "rgba(236,72,153,0.08)", fg: "#be185d", dot: T.pink },
    teal: { bg: "rgba(20,184,166,0.08)", fg: "#0f766e", dot: T.teal },
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
   HEADER
   ============================================================ */
function Breadcrumbs() {
  return (
    <nav className="flex items-center gap-1.5 text-[12px]" aria-label="Breadcrumb">
      <span style={{ color: T.textMuted }}>Acme Store</span>
      <ChevronRight className="h-3 w-3" style={{ color: T.textFaint }} aria-hidden />
      <span style={{ color: T.text }} className="font-medium">
        Customers
      </span>
    </nav>
  );
}

function PageHeader({
  onImport,
  onOpenSearch,
}: {
  onImport: () => void;
  onOpenSearch: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-sora text-[28px] font-semibold tracking-tight sm:text-[32px]">
            Customers
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm" style={{ color: T.textMuted }}>
            Manage your customers, understand their buying behavior and build long-term
            relationships.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SecondaryButton size="sm" onClick={onImport}>
            <Upload className="h-3.5 w-3.5" aria-hidden /> Import Customers
          </SecondaryButton>
          <SecondaryButton size="sm">
            <Download className="h-3.5 w-3.5" aria-hidden /> Export
          </SecondaryButton>
          <PrimaryButton size="sm">
            <UserPlus className="h-3.5 w-3.5" aria-hidden /> Add Customer
          </PrimaryButton>
        </div>
      </div>

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-4 flex items-center"
          aria-hidden
        >
          <Search className="h-4 w-4" style={{ color: T.textMuted }} />
        </div>
        <input
          onFocus={onOpenSearch}
          placeholder="Search by name, email, customer ID or phone number…"
          className="h-14 w-full rounded-2xl pl-11 pr-24 text-[15px] outline-none transition-all placeholder:font-normal"
          style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            color: T.text,
            boxShadow: SHADOW_SOFT,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.borderStrong)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.border)}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-3 flex items-center gap-1"
          aria-hidden
        >
          <kbd
            className="inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium"
            style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMuted }}
          >
            <Command className="h-2.5 w-2.5" />K
          </kbd>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SUMMARY CARDS
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

function SummaryCards() {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <SummaryCard label="Total Customers" target={0} icon={Users} accent={T.blue} />
      <SummaryCard label="Returning Customers" target={0} icon={Repeat} accent={T.violet} />
      <SummaryCard
        label="Average Lifetime Value"
        prefix="€"
        target={0}
        decimals={2}
        icon={Wallet}
        accent={T.green}
      />
      <SummaryCard
        label="Avg. Orders / Customer"
        target={0}
        decimals={1}
        icon={ShoppingBag}
        accent={T.amber}
      />
    </section>
  );
}

function SummaryCard({
  label,
  target,
  decimals = 0,
  prefix = "",
  icon: Icon,
  accent,
}: {
  label: string;
  target: number;
  decimals?: number;
  prefix?: string;
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
        <StatusPill tone="muted">No activity yet</StatusPill>
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
   SEGMENTS SIDEBAR
   ============================================================ */
const SEGMENTS: { key: string; label: string; icon: typeof Users; tone: any; hint: string }[] = [
  { key: "all", label: "All Customers", icon: Users, tone: "muted", hint: "Complete list" },
  { key: "new", label: "New", icon: Sparkles, tone: "info", hint: "Last 30 days" },
  { key: "returning", label: "Returning", icon: Repeat, tone: "violet", hint: "2+ orders" },
  { key: "vip", label: "VIP", icon: Crown, tone: "warning", hint: "Top 5% by LTV" },
  { key: "high", label: "High Value", icon: Star, tone: "success", hint: "> €500 LTV" },
  { key: "inactive", label: "Inactive", icon: Clock, tone: "muted", hint: "No order 90 days" },
  { key: "intl", label: "International", icon: Globe2, tone: "teal", hint: "Outside your base" },
];

function Segments({ active, onChange }: { active: string; onChange: (k: string) => void }) {
  return (
    <Card className="p-3">
      <div className="flex items-center justify-between px-2 pb-2 pt-1">
        <p
          className="text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: T.textFaint }}
        >
          Segments
        </p>
        <button
          className="grid h-6 w-6 place-items-center rounded-md transition"
          style={{ color: T.textMuted }}
          aria-label="New segment"
          onMouseEnter={(e) => (e.currentTarget.style.background = T.bg)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <Plus className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
      <div className="flex flex-col gap-0.5">
        {SEGMENTS.map((s) => {
          const Icon = s.icon;
          const isActive = active === s.key;
          return (
            <button
              key={s.key}
              onClick={() => onChange(s.key)}
              className="group flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-[13px] transition-all"
              style={{
                background: isActive ? T.bg : "transparent",
                color: isActive ? T.text : T.textMuted,
              }}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = T.hairline;
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <span
                className="grid h-7 w-7 shrink-0 place-items-center rounded-lg transition-transform group-hover:scale-105"
                style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">{s.label}</span>
                <span className="block truncate text-[10px]" style={{ color: T.textFaint }}>
                  {s.hint}
                </span>
              </span>
              <span
                className="rounded-full px-1.5 text-[10px] font-semibold tabular-nums"
                style={{ background: T.hairline, color: T.textMuted }}
              >
                0
              </span>
            </button>
          );
        })}
      </div>

      <div
        className="mt-3 rounded-2xl p-3"
        style={{
          background: `linear-gradient(140deg, ${T.blue}08, ${T.violet}08)`,
          border: `1px dashed ${T.border}`,
        }}
      >
        <p className="text-[11px] font-semibold" style={{ color: T.text }}>
          Build a smart segment
        </p>
        <p className="mt-1 text-[11px] leading-relaxed" style={{ color: T.textMuted }}>
          Group customers by spend, country, product or tag and reuse them across campaigns.
        </p>
      </div>
    </Card>
  );
}

/* ============================================================
   CUSTOMERS TABLE + EMPTY STATE
   ============================================================ */
function CustomersTable({
  onRowClick,
  onImport,
}: {
  onRowClick: () => void;
  onImport: () => void;
}) {
  return (
    <Card>
      <div
        className="flex items-center justify-between rounded-t-3xl px-5 py-3"
        style={{ borderBottom: `1px solid ${T.border}` }}
      >
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">All Customers</p>
          <span
            className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums"
            style={{ background: T.hairline, color: T.textMuted }}
          >
            0
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <SecondaryButton size="sm">
            <Filter className="h-3.5 w-3.5" aria-hidden /> Filter
          </SecondaryButton>
          <SecondaryButton size="sm">
            <Tag className="h-3.5 w-3.5" aria-hidden /> Tags
          </SecondaryButton>
        </div>
      </div>

      <div
        className="hidden grid-cols-[40px_1.6fr_1.4fr_1fr_0.7fr_1fr_1fr_0.9fr_60px] gap-4 px-5 py-3 text-[11px] font-medium uppercase tracking-wider md:grid"
        style={{ borderBottom: `1px solid ${T.border}`, color: T.textMuted, background: T.card }}
      >
        <span aria-hidden />
        <span>Customer</span>
        <span>Email</span>
        <span>Country</span>
        <span>Orders</span>
        <span>Lifetime Value</span>
        <span>Last Purchase</span>
        <span>Status</span>
        <span className="text-right">Actions</span>
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <EmptyIllustration />
        <p className="mt-5 font-sora text-base font-semibold">No customers yet</p>
        <p className="mt-1.5 max-w-md text-sm leading-relaxed" style={{ color: T.textMuted }}>
          Customers will automatically appear after your first successful payments.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <PrimaryButton onClick={onImport}>
            <Upload className="h-3.5 w-3.5" aria-hidden /> Import Customers
          </PrimaryButton>
          <SecondaryButton onClick={onRowClick}>
            <UserPlus className="h-3.5 w-3.5" aria-hidden /> Create Test Customer
          </SecondaryButton>
        </div>
        <button
          onClick={onRowClick}
          className="mt-5 text-[11px] font-medium underline decoration-dotted underline-offset-4"
          style={{ color: T.textMuted }}
        >
          Preview a sample customer profile
        </button>
      </div>
    </Card>
  );
}

function EmptyIllustration() {
  return (
    <div className="relative h-[150px] w-[240px]">
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `linear-gradient(140deg, ${T.blue}0d, ${T.violet}0d)`,
          border: `1px solid ${T.border}`,
        }}
      />
      {/* Stacked customer cards */}
      {[
        { left: 20, top: 30, rotate: -8, delay: 0 },
        { left: 60, top: 20, rotate: 0, delay: 0.4 },
        { left: 100, top: 30, rotate: 8, delay: 0.8 },
      ].map((c, i) => (
        <div
          key={i}
          className="absolute h-[100px] w-[120px] rounded-2xl p-3 anim-float-slow"
          style={{
            left: c.left,
            top: c.top,
            transform: `rotate(${c.rotate}deg)`,
            background: T.card,
            border: `1px solid ${T.border}`,
            boxShadow: i === 1 ? SHADOW_LIFT : SHADOW_SOFT,
            animationDelay: `${c.delay}s`,
          }}
        >
          <div
            className="h-8 w-8 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${
                [T.blue, T.violet, T.teal][i]
              }, ${[T.violet, T.pink, T.blue][i]})`,
            }}
          />
          <div className="mt-2 h-1.5 w-16 rounded-full" style={{ background: T.hairline }} />
          <div className="mt-1.5 h-1.5 w-10 rounded-full" style={{ background: T.hairline }} />
          <div className="mt-3 flex gap-1">
            <div className="h-1.5 w-6 rounded-full" style={{ background: T.hairline }} />
            <div className="h-1.5 w-8 rounded-full" style={{ background: T.hairline }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   CUSTOMER DRAWER
   ============================================================ */
function CustomerDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Customer profile"
    >
      <div
        className="absolute inset-0 anim-fade"
        style={{ background: "rgba(17,17,17,0.35)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />
      <div
        className="absolute right-0 top-0 flex h-dvh w-full max-w-[560px] flex-col anim-slide-right"
        style={{ background: T.card, borderLeft: `1px solid ${T.border}` }}
      >
        <header
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: `1px solid ${T.border}` }}
        >
          <div className="flex items-center gap-2">
            <StatusPill tone="info">Preview</StatusPill>
            <span className="font-sora text-sm font-semibold">cust_sample_0001</span>
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
          {/* Identity */}
          <div className="flex items-start gap-4">
            <div
              className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-lg font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.violet})` }}
            >
              —
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-sora text-lg font-semibold tracking-tight">New customer</p>
              <p className="mt-0.5 truncate text-sm" style={{ color: T.textMuted }}>
                No email on file
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <StatusPill tone="muted">New</StatusPill>
                <StatusPill tone="teal">International-ready</StatusPill>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            {[
              { icon: Send, label: "Payment link" },
              { icon: Copy, label: "Copy ID" },
              { icon: RefreshCw, label: "Refund last" },
              { icon: ShoppingBag, label: "Checkout" },
              { icon: ArrowLeftRight, label: "Transactions" },
              { icon: StickyNote, label: "Add note" },
            ].map((a) => {
              const Icon = a.icon;
              return (
                <button
                  key={a.label}
                  className="flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-[11px] font-medium transition-all hover:-translate-y-0.5"
                  style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = SHADOW_LIFT)}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                >
                  <Icon className="h-4 w-4" style={{ color: T.textMuted }} aria-hidden />
                  {a.label}
                </button>
              );
            })}
          </div>

          {/* Insights grid */}
          <Section title="Insights">
            <div className="grid grid-cols-2 gap-2">
              <InsightTile label="Lifetime Revenue" value="€0.00" icon={Wallet} accent={T.blue} />
              <InsightTile
                label="Average Basket"
                value="€0.00"
                icon={ShoppingBag}
                accent={T.violet}
              />
              <InsightTile label="Preferred Method" value="—" icon={CreditCard} accent={T.teal} />
              <InsightTile label="Favorite Currency" value="—" icon={Banknote} accent={T.amber} />
              <InsightTile label="Success Rate" value="0%" icon={CheckCircle2} accent={T.green} />
              <InsightTile label="Refund Rate" value="0%" icon={RefreshCw} accent={T.pink} />
            </div>
          </Section>

          {/* Contact */}
          <Section title="Contact">
            <Row k="Full name" v="—" icon={UserCheck} />
            <Row k="Email" v="—" icon={Mail} />
            <Row k="Phone" v="—" icon={Phone} />
            <Row k="Country" v="—" icon={Globe2} />
            <Row k="Language" v="—" icon={Languages} />
            <Row k="Timezone" v="—" icon={Clock} />
          </Section>

          {/* Commerce */}
          <Section title="Commerce">
            <Row k="Customer since" v="—" />
            <Row k="Lifetime value" v="€0.00" />
            <Row k="Orders" v="0" />
            <Row k="Refunds" v="0" />
            <Row k="Chargebacks" v="0" />
            <Row k="Default currency" v="—" />
            <Row k="Payment methods" v={<StatusPill tone="muted">None on file</StatusPill>} />
          </Section>

          {/* Timeline */}
          <Section title="Activity timeline">
            <Timeline />
          </Section>

          {/* Recent orders */}
          <Section title="Recent orders">
            <RecentOrders />
          </Section>

          {/* Tags */}
          <Section title="Tags">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { label: "VIP", tone: "warning" as const },
                { label: "Wholesale", tone: "teal" as const },
                { label: "High Risk", tone: "danger" as const },
                { label: "Subscription", tone: "violet" as const },
                { label: "Returning", tone: "info" as const },
                { label: "Enterprise", tone: "muted" as const },
              ].map((t) => (
                <button
                  key={t.label}
                  className="transition-transform hover:scale-105"
                  aria-label={`Add ${t.label} tag`}
                >
                  <StatusPill tone={t.tone}>{t.label}</StatusPill>
                </button>
              ))}
              <button
                className="inline-flex h-6 items-center gap-1 rounded-full px-2 text-[10px] font-medium transition"
                style={{ background: T.bg, border: `1px dashed ${T.border}`, color: T.textMuted }}
              >
                <Plus className="h-2.5 w-2.5" aria-hidden /> New tag
              </button>
            </div>
          </Section>

          {/* Notes */}
          <Section title="Internal notes">
            <div
              className="rounded-xl p-3 text-xs"
              style={{ background: T.bg, border: `1px dashed ${T.border}`, color: T.textMuted }}
            >
              <span className="inline-flex items-center gap-1.5">
                <StickyNote className="h-3.5 w-3.5" aria-hidden /> No internal notes yet — start
                capturing context to help your team.
              </span>
            </div>
          </Section>
        </div>

        <footer
          className="flex items-center justify-between gap-2 px-6 py-3"
          style={{ borderTop: `1px solid ${T.border}`, background: T.bg }}
        >
          <span className="text-[11px]" style={{ color: T.textMuted }}>
            Preview only · sample profile
          </span>
          <div className="flex items-center gap-2">
            <SecondaryButton size="sm">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Invite to portal
            </SecondaryButton>
            <PrimaryButton size="sm" onClick={onClose}>
              Done
            </PrimaryButton>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7">
      <p
        className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider"
        style={{ color: T.textFaint }}
      >
        {title}
      </p>
      <div
        className="rounded-2xl p-3"
        style={{ background: T.card, border: `1px solid ${T.border}` }}
      >
        {children}
      </div>
    </section>
  );
}

function Row({ k, v, icon: Icon }: { k: string; v: React.ReactNode; icon?: typeof Mail }) {
  return (
    <div
      className="flex items-center justify-between py-1.5 text-[13px] first:pt-0 last:pb-0"
      style={{ color: T.text }}
    >
      <span className="inline-flex items-center gap-1.5" style={{ color: T.textMuted }}>
        {Icon && <Icon className="h-3.5 w-3.5" aria-hidden />} {k}
      </span>
      <span className="max-w-[60%] truncate text-right font-medium">{v}</span>
    </div>
  );
}

function InsightTile({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  icon: typeof Wallet;
  accent: string;
}) {
  return (
    <div
      className="rounded-xl p-3 transition-all hover:-translate-y-0.5"
      style={{ background: T.bg, border: `1px solid ${T.border}` }}
    >
      <div className="flex items-center gap-1.5">
        <span
          className="grid h-6 w-6 place-items-center rounded-md"
          style={{ background: `${accent}14`, color: accent }}
        >
          <Icon className="h-3 w-3" aria-hidden />
        </span>
        <span
          className="text-[10px] font-medium uppercase tracking-wider"
          style={{ color: T.textMuted }}
        >
          {label}
        </span>
      </div>
      <p className="mt-1.5 font-sora text-[15px] font-semibold tracking-tight tabular-nums">
        {value}
      </p>
    </div>
  );
}

function Timeline() {
  const events = [
    { icon: UserPlus, label: "Customer created" },
    { icon: Wallet, label: "First payment" },
    { icon: ShoppingBag, label: "Second order" },
    { icon: RefreshCw, label: "Refund requested" },
    { icon: Repeat, label: "Subscription renewed" },
    { icon: ShoppingCart, label: "Checkout abandoned" },
  ];
  return (
    <ol className="relative ml-1.5 border-l pl-5" style={{ borderColor: T.border }}>
      {events.map((e, i) => {
        const Icon = e.icon;
        return (
          <li key={i} className="relative pb-4 last:pb-0">
            <span
              className="absolute -left-[26px] top-0.5 grid h-5 w-5 place-items-center rounded-full"
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                boxShadow: SHADOW_SOFT,
              }}
            >
              <Icon className="h-3 w-3" style={{ color: T.textMuted }} aria-hidden />
            </span>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium" style={{ color: T.text }}>
                {e.label}
              </span>
              <span className="text-[11px]" style={{ color: T.textMuted }}>
                —
              </span>
            </div>
            <p className="mt-0.5 text-[11px]" style={{ color: T.textMuted }}>
              Waiting for first activity
            </p>
          </li>
        );
      })}
    </ol>
  );
}

function RecentOrders() {
  return (
    <div>
      <div
        className="grid grid-cols-[1fr_0.8fr_0.7fr_0.7fr_0.8fr] gap-3 pb-2 text-[10px] font-semibold uppercase tracking-wider"
        style={{ color: T.textFaint, borderBottom: `1px solid ${T.border}` }}
      >
        <span>Order ID</span>
        <span>Date</span>
        <span>Amount</span>
        <span>Status</span>
        <span>Method</span>
      </div>
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <span
          className="grid h-10 w-10 place-items-center rounded-xl"
          style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMuted }}
        >
          <Receipt className="h-4 w-4" aria-hidden />
        </span>
        <p className="mt-3 text-[13px] font-medium">No orders yet</p>
        <p className="mt-0.5 text-[11px]" style={{ color: T.textMuted }}>
          Orders will appear here as soon as this customer checks out.
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   IMPORT DIALOG
   ============================================================ */
function ImportDialog({ onClose }: { onClose: () => void }) {
  const [source, setSource] = useState<"csv" | "shopify" | "woo">("csv");
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 anim-fade"
        style={{ background: "rgba(17,17,17,0.35)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-[480px] overflow-hidden rounded-2xl anim-fade-up"
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          boxShadow: "0 24px 60px rgba(17,17,17,0.18)",
        }}
      >
        <header
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: `1px solid ${T.border}` }}
        >
          <div className="flex items-center gap-2">
            <div
              className="grid h-7 w-7 place-items-center rounded-lg text-white"
              style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.violet})` }}
            >
              <Upload className="h-3.5 w-3.5" aria-hidden />
            </div>
            <h3 className="font-sora text-sm font-semibold">Import customers</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-lg"
            style={{ color: T.textMuted }}
            onMouseEnter={(e) => (e.currentTarget.style.background = T.bg)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </header>

        <div className="px-5 py-5">
          <p
            className="mb-2 text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: T.textFaint }}
          >
            Source
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { k: "csv" as const, label: "CSV file" },
              { k: "shopify" as const, label: "Shopify" },
              { k: "woo" as const, label: "WooCommerce" },
            ].map((s) => {
              const active = source === s.k;
              return (
                <button
                  key={s.k}
                  onClick={() => setSource(s.k)}
                  className="flex flex-col items-center gap-1.5 rounded-2xl p-3 text-[12px] font-medium transition-all"
                  style={{
                    background: active ? `${T.blue}0d` : T.card,
                    border: `1px solid ${active ? `${T.blue}55` : T.border}`,
                    color: active ? T.blue : T.text,
                  }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          <div
            className="mt-5 flex flex-col items-center gap-2 rounded-2xl p-6 text-center"
            style={{ background: T.bg, border: `1px dashed ${T.border}` }}
          >
            <span
              className="grid h-10 w-10 place-items-center rounded-xl text-white"
              style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.violet})` }}
            >
              <Upload className="h-4 w-4" aria-hidden />
            </span>
            <p className="text-sm font-medium">Drop a file here or click to browse</p>
            <p className="text-[11px]" style={{ color: T.textMuted }}>
              Supports .csv up to 25MB. We&apos;ll match columns automatically.
            </p>
          </div>

          <p className="mt-3 text-[11px]" style={{ color: T.textMuted }}>
            Need the template?{" "}
            <a href="#" className="font-medium underline" style={{ color: T.text }}>
              Download example CSV
            </a>
          </p>
        </div>

        <footer
          className="flex items-center justify-end gap-2 px-5 py-3"
          style={{ borderTop: `1px solid ${T.border}`, background: T.bg }}
        >
          <SecondaryButton size="sm" onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton size="sm" onClick={onClose}>
            <Upload className="h-3.5 w-3.5" aria-hidden /> Start import
          </PrimaryButton>
        </footer>
      </div>
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
    { label: "Add customer", icon: UserPlus, hint: "Action" },
    { label: "Import from Shopify", icon: Upload, hint: "Setup" },
    { label: "Export customer list", icon: Download, hint: "Action" },
    { label: "View VIP segment", icon: Crown, hint: "Segment" },
    { label: "Go to Transactions", icon: ArrowLeftRight, hint: "Navigate" },
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
            placeholder="Search by name, email, customer ID or phone number…"
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
@keyframes tally-float-slow { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-4px) } }
.anim-fade { animation: tally-fade 220ms ease-out both }
.anim-fade-up { animation: tally-fade-up 320ms cubic-bezier(0.2,0.7,0.2,1) both }
.anim-slide-right { animation: tally-slide-right 320ms cubic-bezier(0.2,0.7,0.2,1) both }
.anim-float-slow { animation: tally-float-slow 6s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .anim-fade, .anim-fade-up, .anim-slide-right, .anim-float-slow { animation: none !important }
}
`;
