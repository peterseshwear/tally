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
  Filter,
  X,
  Calendar,
  Receipt,
  Wallet,
  Clock,
  RefreshCw,
  CheckCircle2,
  BookOpen,
  Copy,
  Mail,
  ExternalLink,
  MapPin,
  Monitor,
  Fingerprint,
  StickyNote,
  Globe2,
  ArrowDownToLine,
  FileText,
  FileSpreadsheet,
  Store,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { NAV_GROUPS as SHARED_NAV_GROUPS } from "@/components/app/nav";

export const Route = createFileRoute("/_authenticated/transactions")({
  component: TransactionsPage,
  head: () => ({
    meta: [
      { title: "Transactions — Tally" },
      { name: "description", content: "Manage every payment from one place." },
      { property: "og:title", content: "Transactions — Tally" },
      { property: "og:description", content: "Manage every payment from one place." },
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
function TransactionsPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

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
        setExportOpen(false);
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
        href="#tx-main"
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
        <Sidebar active="transactions" />

        <main id="tx-main" className="min-w-0 flex-1 px-4 py-8 sm:px-8 sm:py-10">
          <div className="mx-auto max-w-[1320px]">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <Breadcrumbs />
              </div>

              <div className="col-span-12">
                <PageHeader
                  onExport={() => setExportOpen(true)}
                  onOpenSearch={() => setCmdOpen(true)}
                />
              </div>

              <div className="col-span-12">
                <SummaryCards />
              </div>

              <div className="col-span-12">
                <FilterBar />
              </div>

              <div className="col-span-12">
                <TransactionsTable onRowClick={() => setDrawerOpen(true)} />
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
      {drawerOpen && <TransactionDrawer onClose={() => setDrawerOpen(false)} />}
      {exportOpen && <ExportDialog onClose={() => setExportOpen(false)} />}
    </div>
  );
}

/* ============================================================
   TOP NAV + SIDEBAR (shared design)
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
  tone?: "muted" | "success" | "info" | "warning" | "danger" | "violet";
  children: React.ReactNode;
}) {
  const toneMap: Record<string, { bg: string; fg: string; dot: string }> = {
    muted: { bg: T.hairline, fg: T.textMuted, dot: T.textFaint },
    success: { bg: "rgba(16,185,129,0.08)", fg: "#047857", dot: T.green },
    info: { bg: "rgba(37,99,235,0.08)", fg: "#1d4ed8", dot: T.blue },
    warning: { bg: "rgba(245,158,11,0.1)", fg: "#b45309", dot: T.amber },
    danger: { bg: "rgba(239,68,68,0.08)", fg: "#b91c1c", dot: T.red },
    violet: { bg: "rgba(124,58,237,0.08)", fg: "#6d28d9", dot: T.violet },
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
   BREADCRUMBS + PAGE HEADER
   ============================================================ */
function Breadcrumbs() {
  return (
    <nav className="flex items-center gap-1.5 text-[12px]" aria-label="Breadcrumb">
      <span style={{ color: T.textMuted }}>Acme Store</span>
      <ChevronRight className="h-3 w-3" style={{ color: T.textFaint }} aria-hidden />
      <span style={{ color: T.text }} className="font-medium">
        Transactions
      </span>
    </nav>
  );
}

function PageHeader({
  onExport,
  onOpenSearch,
}: {
  onExport: () => void;
  onOpenSearch: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-sora text-[28px] font-semibold tracking-tight sm:text-[32px]">
            Transactions
          </h1>
          <p className="mt-1.5 text-sm" style={{ color: T.textMuted }}>
            Manage every payment from one place.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SecondaryButton size="sm" onClick={onExport}>
            <Download className="h-3.5 w-3.5" aria-hidden /> Export
          </SecondaryButton>
          <SecondaryButton size="sm">
            <Filter className="h-3.5 w-3.5" aria-hidden /> Filters
          </SecondaryButton>
          <PrimaryButton size="sm">
            <Plus className="h-3.5 w-3.5" aria-hidden /> New Payment
          </PrimaryButton>
        </div>
      </div>

      {/* Big search */}
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-4 flex items-center"
          aria-hidden
        >
          <Search className="h-4 w-4" style={{ color: T.textMuted }} />
        </div>
        <input
          onFocus={onOpenSearch}
          placeholder="Search by customer, email, transaction ID, payment ID…"
          className="h-14 w-full rounded-2xl pl-11 pr-24 text-[15px] outline-none transition-all placeholder:font-normal"
          style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            color: T.text,
            boxShadow: SHADOW_SOFT,
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = SHADOW_SOFT;
            e.currentTarget.style.borderColor = T.border;
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
   FILTER BAR
   ============================================================ */
type FilterDef = { key: string; label: string; icon: typeof Filter; options: string[] };
const FILTERS: FilterDef[] = [
  {
    key: "status",
    label: "Status",
    icon: CheckCircle2,
    options: ["Succeeded", "Pending", "Refunded", "Failed", "Disputed"],
  },
  {
    key: "method",
    label: "Payment Method",
    icon: CreditCard,
    options: ["Card", "Apple Pay", "Google Pay", "PayPal", "Crypto", "SEPA"],
  },
  {
    key: "amount",
    label: "Amount",
    icon: Wallet,
    options: ["< €50", "€50–€200", "€200–€1k", "> €1k"],
  },
  {
    key: "currency",
    label: "Currency",
    icon: Banknote,
    options: ["EUR", "USD", "GBP", "CHF", "SEK"],
  },
  {
    key: "country",
    label: "Country",
    icon: Globe2,
    options: ["France", "Germany", "Spain", "United Kingdom", "United States"],
  },
  {
    key: "date",
    label: "Date",
    icon: Calendar,
    options: ["Today", "Yesterday", "Last 7 days", "Last 30 days", "Custom"],
  },
];

function FilterBar() {
  const [open, setOpen] = useState<string | null>(null);
  const [active, setActive] = useState<Record<string, string>>({});
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(null);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const hasActive = Object.keys(active).length > 0;

  return (
    <div
      ref={wrapRef}
      className="flex flex-wrap items-center gap-2 rounded-2xl p-3"
      style={{ background: T.card, border: `1px solid ${T.border}`, boxShadow: SHADOW_SOFT }}
    >
      {FILTERS.map((f) => {
        const Icon = f.icon;
        const isOpen = open === f.key;
        const value = active[f.key];
        return (
          <div key={f.key} className="relative">
            <button
              onClick={() => setOpen(isOpen ? null : f.key)}
              className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-all active:scale-[0.98]"
              style={{
                background: value ? `${T.blue}10` : T.bg,
                border: `1px solid ${value ? `${T.blue}55` : T.border}`,
                color: value ? T.blue : T.text,
              }}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden />
              <span>{f.label}</span>
              {value && (
                <span className="rounded-full bg-white/70 px-1.5 py-0.5 text-[10px] font-semibold">
                  {value}
                </span>
              )}
              <ChevronDown
                className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {isOpen && (
              <div
                className="absolute left-0 top-11 z-30 w-[220px] overflow-hidden rounded-2xl p-1.5 anim-fade-up"
                style={{
                  background: T.card,
                  border: `1px solid ${T.border}`,
                  boxShadow: "0 24px 60px rgba(17,17,17,0.14)",
                }}
              >
                {f.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setActive((a) => ({ ...a, [f.key]: opt }));
                      setOpen(null);
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition"
                    style={{ color: T.text }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = T.bg)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <span>{opt}</span>
                    {value === opt && (
                      <CheckCircle2 className="h-3.5 w-3.5" style={{ color: T.blue }} aria-hidden />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <span className="mx-1 h-6 w-px" style={{ background: T.border }} aria-hidden />

      {hasActive ? (
        <button
          onClick={() => setActive({})}
          className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition"
          style={{ color: T.textMuted }}
          onMouseEnter={(e) => (e.currentTarget.style.background = T.bg)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <X className="h-3.5 w-3.5" aria-hidden /> Clear filters
        </button>
      ) : (
        <span className="px-2 text-[11px]" style={{ color: T.textFaint }}>
          No filters applied
        </span>
      )}
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
      <SummaryCard
        label="Today's Volume"
        prefix="€"
        target={0}
        decimals={2}
        icon={Wallet}
        accent={T.blue}
      />
      <SummaryCard label="Successful Payments" target={0} icon={CheckCircle2} accent={T.green} />
      <SummaryCard label="Pending" target={0} icon={Clock} accent={T.amber} />
      <SummaryCard
        label="Refunds"
        prefix="€"
        target={0}
        decimals={2}
        icon={RefreshCw}
        accent={T.violet}
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
        <StatusPill tone="muted">Current period</StatusPill>
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
   TRANSACTIONS TABLE (empty state)
   ============================================================ */
function TransactionsTable({ onRowClick }: { onRowClick: () => void }) {
  return (
    <Card>
      <div
        className="grid grid-cols-[1.6fr_1.2fr_1fr_0.8fr_1fr_0.9fr_1fr_60px] gap-4 rounded-t-3xl px-6 py-3 text-[11px] font-medium uppercase tracking-wider"
        style={{
          borderBottom: `1px solid ${T.border}`,
          color: T.textMuted,
          background: T.card,
          position: "sticky",
          top: "64px",
          zIndex: 5,
        }}
      >
        <span>Customer</span>
        <span>Transaction ID</span>
        <span>Method</span>
        <span>Country</span>
        <span>Amount</span>
        <span>Status</span>
        <span>Created</span>
        <span className="text-right">Actions</span>
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <EmptyIllustration />
        <p className="mt-5 font-sora text-base font-semibold">No transactions yet</p>
        <p className="mt-1.5 max-w-md text-sm leading-relaxed" style={{ color: T.textMuted }}>
          Your payments will automatically appear here once you connect your store.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <PrimaryButton onClick={onRowClick}>
            <Plus className="h-3.5 w-3.5" aria-hidden /> Create Test Payment
          </PrimaryButton>
          <SecondaryButton>
            <BookOpen className="h-3.5 w-3.5" aria-hidden /> Read Documentation
          </SecondaryButton>
        </div>
        <button
          onClick={onRowClick}
          className="mt-6 text-[11px] font-medium underline decoration-dotted underline-offset-4"
          style={{ color: T.textMuted }}
        >
          Preview a sample transaction
        </button>
      </div>
    </Card>
  );
}

function EmptyIllustration() {
  return (
    <div className="relative h-[140px] w-[220px]">
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `linear-gradient(140deg, ${T.blue}0d, ${T.violet}0d)`,
          border: `1px solid ${T.border}`,
        }}
      />
      {/* stacked receipt cards */}
      <div
        className="absolute left-6 top-4 h-[110px] w-[160px] rounded-2xl"
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          boxShadow: SHADOW_SOFT,
          transform: "rotate(-6deg)",
        }}
      />
      <div
        className="absolute left-10 top-6 h-[110px] w-[160px] rounded-2xl p-3 anim-float-slow"
        style={{ background: T.card, border: `1px solid ${T.border}`, boxShadow: SHADOW_LIFT }}
      >
        <div className="flex items-center gap-2">
          <div
            className="grid h-6 w-6 place-items-center rounded-lg text-white"
            style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.violet})` }}
          >
            <Receipt className="h-3 w-3" aria-hidden />
          </div>
          <div className="flex-1">
            <div className="h-2 w-16 rounded-full" style={{ background: T.hairline }} />
            <div className="mt-1 h-1.5 w-10 rounded-full" style={{ background: T.hairline }} />
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 w-full rounded-full" style={{ background: T.hairline }} />
          <div className="h-1.5 w-4/5 rounded-full" style={{ background: T.hairline }} />
          <div className="h-1.5 w-3/5 rounded-full" style={{ background: T.hairline }} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   TRANSACTION DRAWER (sample data — preview only)
   ============================================================ */
function TransactionDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Transaction details"
    >
      <div
        className="absolute inset-0 anim-fade"
        style={{ background: "rgba(17,17,17,0.35)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />
      <div
        className="absolute right-0 top-0 flex h-dvh w-full max-w-[520px] flex-col anim-slide-right"
        style={{ background: T.card, borderLeft: `1px solid ${T.border}` }}
      >
        <header
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: `1px solid ${T.border}` }}
        >
          <div className="flex items-center gap-2">
            <StatusPill tone="info">Preview</StatusPill>
            <span className="font-sora text-sm font-semibold">txn_sample_0001</span>
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
          {/* Amount */}
          <div>
            <p className="text-[11px] uppercase tracking-wider" style={{ color: T.textMuted }}>
              Amount
            </p>
            <p className="mt-1 font-sora text-[34px] font-semibold tracking-tight tabular-nums">
              €0.00
              <span
                className="ml-2 align-middle text-sm font-medium"
                style={{ color: T.textMuted }}
              >
                EUR
              </span>
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <StatusPill tone="success">Sample</StatusPill>
              <StatusPill tone="muted">Card · Visa •••• 0000</StatusPill>
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            {[
              { icon: RefreshCw, label: "Refund" },
              { icon: ArrowDownToLine, label: "Capture" },
              { icon: Mail, label: "Receipt" },
              { icon: Copy, label: "Copy link" },
              { icon: Users, label: "Customer" },
              { icon: FileText, label: "Download" },
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

          {/* Customer */}
          <Section title="Customer">
            <Row k="Name" v="—" />
            <Row k="Email" v="—" />
            <Row k="Customer ID" v="—" />
          </Section>

          {/* Timeline */}
          <Section title="Timeline">
            <Timeline />
          </Section>

          {/* Payment details */}
          <Section title="Payment">
            <Row k="Authorization" v="—" />
            <Row k="Capture" v="—" />
            <Row k="Refunds" v="€0.00" />
            <Row k="Risk score" v={<StatusPill tone="success">Low</StatusPill>} />
          </Section>

          <Section title="Billing address">
            <Row k="Street" v="—" icon={MapPin} />
            <Row k="City" v="—" />
            <Row k="Country" v="—" />
          </Section>

          <Section title="Shipping address">
            <Row k="Street" v="—" icon={MapPin} />
            <Row k="City" v="—" />
            <Row k="Country" v="—" />
          </Section>

          <Section title="Device">
            <Row k="Browser" v="—" icon={Monitor} />
            <Row k="IP Address" v="—" icon={Fingerprint} />
            <Row k="Country" v="—" icon={Globe2} />
          </Section>

          <Section title="Metadata">
            <div
              className="rounded-xl p-3 font-mono text-[11px]"
              style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMuted }}
            >
              {"{ /* no metadata yet */ }"}
            </div>
          </Section>

          <Section title="Notes">
            <div
              className="rounded-xl p-3 text-xs"
              style={{ background: T.bg, border: `1px dashed ${T.border}`, color: T.textMuted }}
            >
              <span className="inline-flex items-center gap-1.5">
                <StickyNote className="h-3.5 w-3.5" aria-hidden /> No internal notes yet.
              </span>
            </div>
          </Section>
        </div>

        <footer
          className="flex items-center justify-between gap-2 px-6 py-3"
          style={{ borderTop: `1px solid ${T.border}`, background: T.bg }}
        >
          <span className="text-[11px]" style={{ color: T.textMuted }}>
            Preview only · sample data
          </span>
          <div className="flex items-center gap-2">
            <SecondaryButton size="sm">
              <ExternalLink className="h-3.5 w-3.5" aria-hidden /> Open full
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

function Row({ k, v, icon: Icon }: { k: string; v: React.ReactNode; icon?: typeof MapPin }) {
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

function Timeline() {
  const events = [
    { icon: Plus, label: "Payment Created", time: "—", tone: "muted" as const, done: false },
    { icon: CheckCircle2, label: "Authorized", time: "—", tone: "info" as const, done: false },
    { icon: ArrowDownToLine, label: "Captured", time: "—", tone: "success" as const, done: false },
    { icon: CheckCircle2, label: "Completed", time: "—", tone: "success" as const, done: false },
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
                {e.time}
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

/* ============================================================
   EXPORT DIALOG
   ============================================================ */
function ExportDialog({ onClose }: { onClose: () => void }) {
  const [preset, setPreset] = useState("Last 7 days");
  const [format, setFormat] = useState<"csv" | "xlsx" | "pdf">("csv");
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
        className="relative w-full max-w-[460px] overflow-hidden rounded-2xl anim-fade-up"
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
              <Download className="h-3.5 w-3.5" aria-hidden />
            </div>
            <h3 className="font-sora text-sm font-semibold">Export transactions</h3>
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
            Format
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { k: "csv" as const, label: "CSV", icon: FileText },
              { k: "xlsx" as const, label: "Excel", icon: FileSpreadsheet },
              { k: "pdf" as const, label: "PDF", icon: FileText },
            ].map((f) => {
              const Icon = f.icon;
              const active = format === f.k;
              return (
                <button
                  key={f.k}
                  onClick={() => setFormat(f.k)}
                  className="flex flex-col items-center gap-1.5 rounded-2xl p-3 text-[12px] font-medium transition-all"
                  style={{
                    background: active ? `${T.blue}0d` : T.card,
                    border: `1px solid ${active ? `${T.blue}55` : T.border}`,
                    color: active ? T.blue : T.text,
                  }}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {f.label}
                </button>
              );
            })}
          </div>

          <p
            className="mb-2 mt-5 text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: T.textFaint }}
          >
            Date range
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["Today", "Yesterday", "Last 7 days", "Last month", "Custom"].map((p) => {
              const active = preset === p;
              return (
                <button
                  key={p}
                  onClick={() => setPreset(p)}
                  className="inline-flex h-8 items-center rounded-full px-3 text-xs font-medium transition"
                  style={{
                    background: active ? T.text : T.bg,
                    border: `1px solid ${active ? T.text : T.border}`,
                    color: active ? "#fff" : T.text,
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        <footer
          className="flex items-center justify-end gap-2 px-5 py-3"
          style={{ borderTop: `1px solid ${T.border}`, background: T.bg }}
        >
          <SecondaryButton size="sm" onClick={onClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton size="sm" onClick={onClose}>
            <Download className="h-3.5 w-3.5" aria-hidden /> Export {format.toUpperCase()}
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
    { label: "Go to Overview", icon: LayoutGrid, hint: "Navigate" },
    { label: "View Customers", icon: Users, hint: "Navigate" },
    { label: "Create Test Payment", icon: Plus, hint: "Action" },
    { label: "Export transactions", icon: Download, hint: "Action" },
    { label: "Connect Shopify", icon: Store, hint: "Setup" },
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
            placeholder="Search by customer, email, transaction ID, payment ID…"
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
