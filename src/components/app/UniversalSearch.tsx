import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  X,
  Users,
  ArrowLeftRight,
  CreditCard,
  RotateCcw,
  ShieldAlert,
  Receipt,
  Repeat,
  Link2,
  ShoppingCart,
  KeyRound,
  Webhook,
  FileBarChart,
  Code2,
  Settings,
  Boxes,
  BookOpen,
  Bookmark,
  Clock,
  Trash2,
  Filter,
  ChevronRight,
  Sparkles,
  Inbox,
  Plus,
  CornerDownLeft,
} from "lucide-react";
import { T } from "./AppShell";

type CategoryKey =
  | "all"
  | "customers"
  | "transactions"
  | "payments"
  | "refunds"
  | "disputes"
  | "invoices"
  | "subscriptions"
  | "links"
  | "checkouts"
  | "api"
  | "webhooks"
  | "reports"
  | "developers"
  | "settings"
  | "integrations"
  | "docs";

type Category = {
  key: CategoryKey;
  label: string;
  icon: typeof Search;
  emptyHint: string;
  requiresData: boolean;
};

const CATEGORIES: Category[] = [
  {
    key: "customers",
    label: "Customers",
    icon: Users,
    requiresData: true,
    emptyHint: "Import or create your first customer to search them here.",
  },
  {
    key: "transactions",
    label: "Transactions",
    icon: ArrowLeftRight,
    requiresData: true,
    emptyHint: "Once you start accepting payments, every transaction becomes searchable.",
  },
  {
    key: "payments",
    label: "Payments",
    icon: CreditCard,
    requiresData: true,
    emptyHint: "Enable payment methods to see live payment records.",
  },
  {
    key: "refunds",
    label: "Refunds",
    icon: RotateCcw,
    requiresData: true,
    emptyHint: "Refunds you issue will be searchable here.",
  },
  {
    key: "disputes",
    label: "Disputes",
    icon: ShieldAlert,
    requiresData: true,
    emptyHint: "No chargebacks yet. Disputes will appear as they open.",
  },
  {
    key: "invoices",
    label: "Invoices",
    icon: Receipt,
    requiresData: true,
    emptyHint: "Create your first invoice to search it here.",
  },
  {
    key: "subscriptions",
    label: "Subscriptions",
    icon: Repeat,
    requiresData: true,
    emptyHint: "Recurring plans will appear once configured.",
  },
  {
    key: "links",
    label: "Payment Links",
    icon: Link2,
    requiresData: true,
    emptyHint: "Share a payment link and it becomes searchable.",
  },
  {
    key: "checkouts",
    label: "Checkouts",
    icon: ShoppingCart,
    requiresData: true,
    emptyHint: "Publish a checkout to find it here.",
  },
  {
    key: "api",
    label: "API Keys",
    icon: KeyRound,
    requiresData: true,
    emptyHint: "Generate an API key from Developers.",
  },
  {
    key: "webhooks",
    label: "Webhooks",
    icon: Webhook,
    requiresData: true,
    emptyHint: "Register a webhook endpoint to search it.",
  },
  {
    key: "reports",
    label: "Reports",
    icon: FileBarChart,
    requiresData: true,
    emptyHint: "Reports you export or schedule will be searchable.",
  },
  { key: "developers", label: "Developers", icon: Code2, requiresData: false, emptyHint: "" },
  { key: "settings", label: "Settings", icon: Settings, requiresData: false, emptyHint: "" },
  { key: "integrations", label: "Integrations", icon: Boxes, requiresData: false, emptyHint: "" },
  { key: "docs", label: "Documentation", icon: BookOpen, requiresData: false, emptyHint: "" },
];

// Static searchable entries (settings / integrations / docs)
type StaticEntry = {
  id: string;
  title: string;
  subtitle: string;
  category: CategoryKey;
  keywords: string;
  to?: string;
};

const STATIC_ENTRIES: StaticEntry[] = [
  {
    id: "s1",
    title: "Two-factor authentication",
    subtitle: "Security · Settings",
    category: "settings",
    keywords: "2fa security login mfa",
    to: "/settings",
  },
  {
    id: "s2",
    title: "Team members",
    subtitle: "Workspace · Settings",
    category: "settings",
    keywords: "team invite members roles",
    to: "/team",
  },
  {
    id: "s3",
    title: "Branding",
    subtitle: "Appearance · Settings",
    category: "settings",
    keywords: "logo colors brand",
    to: "/settings",
  },
  {
    id: "s4",
    title: "Notifications",
    subtitle: "Preferences · Settings",
    category: "settings",
    keywords: "email alerts",
    to: "/notifications",
  },
  {
    id: "s5",
    title: "Audit logs",
    subtitle: "Compliance · Settings",
    category: "settings",
    keywords: "audit activity",
    to: "/settings",
  },
  {
    id: "i1",
    title: "Shopify",
    subtitle: "Ecommerce · Integration",
    category: "integrations",
    keywords: "shopify store ecom",
    to: "/integrations",
  },
  {
    id: "i2",
    title: "WooCommerce",
    subtitle: "Ecommerce · Integration",
    category: "integrations",
    keywords: "woo wordpress",
    to: "/integrations",
  },
  {
    id: "i3",
    title: "Klaviyo",
    subtitle: "Marketing · Integration",
    category: "integrations",
    keywords: "email marketing",
    to: "/integrations",
  },
  {
    id: "i4",
    title: "HubSpot",
    subtitle: "CRM · Integration",
    category: "integrations",
    keywords: "crm sales",
    to: "/integrations",
  },
  {
    id: "d1",
    title: "API keys",
    subtitle: "Developers",
    category: "developers",
    keywords: "api token secret publishable",
    to: "/developers",
  },
  {
    id: "d2",
    title: "Webhooks",
    subtitle: "Developers",
    category: "developers",
    keywords: "webhook events",
    to: "/developers",
  },
  {
    id: "d3",
    title: "API reference",
    subtitle: "Documentation",
    category: "docs",
    keywords: "api reference docs",
    to: "/developers",
  },
  {
    id: "d4",
    title: "Getting started",
    subtitle: "Documentation",
    category: "docs",
    keywords: "docs guide start",
    to: "/onboarding",
  },
  {
    id: "d5",
    title: "Accept your first payment",
    subtitle: "Documentation",
    category: "docs",
    keywords: "first payment tutorial",
    to: "/onboarding",
  },
];

type FilterKey = "status" | "amount" | "date" | "currency" | "country" | "method" | "provider";
const FILTER_CHIPS: { key: FilterKey; label: string }[] = [
  { key: "date", label: "Date" },
  { key: "status", label: "Status" },
  { key: "amount", label: "Amount" },
  { key: "currency", label: "Currency" },
  { key: "country", label: "Country" },
  { key: "method", label: "Payment method" },
  { key: "provider", label: "Provider" },
];

const RECENT_KEY = "tally.search.recent";
const SAVED_KEY = "tally.search.saved";
const MAX_RECENT = 6;

type Saved = { id: string; label: string; query: string };
const DEFAULT_SAVED: Saved[] = [
  { id: "sv1", label: "Failed payments", query: "status:failed" },
  { id: "sv2", label: "French customers", query: "country:FR" },
  { id: "sv3", label: "High-value orders", query: "amount:>500" },
  { id: "sv4", label: "Pending payouts", query: "status:pending payouts" },
  { id: "sv5", label: "Recent refunds", query: "type:refund" },
];

function load<T>(k: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function save<T>(k: string, v: T) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {
    /* ignore */
  }
}

export function openUniversalSearch(prefill?: string) {
  window.dispatchEvent(new CustomEvent("tally:search:open", { detail: { prefill } }));
}

export function UniversalSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CategoryKey>("all");
  const [activeFilters, setActiveFilters] = useState<Set<FilterKey>>(new Set());
  const [recent, setRecent] = useState<string[]>([]);
  const [saved, setSaved] = useState<Saved[]>(DEFAULT_SAVED);
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inField =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          (target as HTMLElement).isContentEditable);
      // Cmd+Shift+F
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setOpen(true);
        return;
      }
      // "/" when not typing in a field
      if (e.key === "/" && !inField && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ prefill?: string }>).detail;
      if (detail?.prefill) setQ(detail.prefill);
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("tally:search:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("tally:search:open", onOpen);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setRecent(load<string[]>(RECENT_KEY, []));
    setSaved(load<Saved[]>(SAVED_KEY, DEFAULT_SAVED));
    setActiveIdx(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const query = q.trim().toLowerCase();

  // Static results filtered by query + category
  const staticResults = useMemo(() => {
    const catFilter = (e: StaticEntry) => cat === "all" || e.category === cat;
    if (!query) return STATIC_ENTRIES.filter(catFilter);
    return STATIC_ENTRIES.filter(catFilter).filter((e) => {
      const hay = `${e.title} ${e.subtitle} ${e.keywords}`.toLowerCase();
      return hay.includes(query);
    });
  }, [query, cat]);

  // Categories to show as empty-state sections (data-backed)
  const dataCategories = useMemo(() => {
    if (cat === "all") return CATEGORIES.filter((c) => c.requiresData);
    return CATEGORIES.filter((c) => c.requiresData && c.key === cat);
  }, [cat]);

  function commitSearch(text: string) {
    const t = text.trim();
    if (!t) return;
    const next = [t, ...recent.filter((r) => r !== t)].slice(0, MAX_RECENT);
    setRecent(next);
    save(RECENT_KEY, next);
  }

  function saveCurrent() {
    if (!query) return;
    const label = q.trim();
    const entry: Saved = { id: `u-${Date.now()}`, label, query: q };
    const next = [entry, ...saved.filter((s) => s.label !== label)].slice(0, 8);
    setSaved(next);
    save(SAVED_KEY, next);
  }

  function toggleFilter(k: FilterKey) {
    const next = new Set(activeFilters);
    if (next.has(k)) next.delete(k);
    else next.add(k);
    setActiveFilters(next);
  }

  const totalResults = staticResults.length;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-start justify-center p-3 pt-[6vh] sm:p-6 sm:pt-[10vh]"
      onClick={() => setOpen(false)}
      style={{ background: "rgba(15,15,25,0.4)", backdropFilter: "blur(10px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-[900px] flex-col overflow-hidden rounded-2xl"
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          boxShadow: "0 40px 100px rgba(17,17,17,0.25), 0 10px 30px rgba(17,17,17,0.08)",
          maxHeight: "82vh",
          animation: "us-in 200ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <style>{`
          @keyframes us-in {
            from { opacity: 0; transform: translateY(-10px) scale(0.985); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes us-shimmer {
            0%   { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          .us-skeleton {
            background: linear-gradient(90deg, #F3F4F6 0%, #E5E7EB 40%, #F3F4F6 80%);
            background-size: 200% 100%;
            animation: us-shimmer 1.4s linear infinite;
          }
        `}</style>

        {/* Header */}
        <header className="px-6 pb-3 pt-5" style={{ borderBottom: `1px solid ${T.border}` }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[16px] font-semibold" style={{ color: T.text }}>
                Search
              </div>
              <div className="mt-0.5 text-[12px]" style={{ color: T.textMuted }}>
                Find customers, transactions, payments, reports and more.
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-lg transition-colors"
              style={{ color: T.textMuted }}
              onMouseEnter={(e) => (e.currentTarget.style.background = T.hairline)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Search input */}
          <div
            className="mt-4 flex items-center gap-3 rounded-xl px-3.5 py-3"
            style={{ background: T.bg, border: `1px solid ${T.border}` }}
          >
            <Search className="h-5 w-5" style={{ color: T.textMuted }} />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setActiveIdx(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  commitSearch(q);
                  const target = staticResults[activeIdx];
                  if (target?.to) {
                    setOpen(false);
                    window.location.assign(target.to);
                  }
                } else if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActiveIdx((i) => Math.min(staticResults.length - 1, i + 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActiveIdx((i) => Math.max(0, i - 1));
                } else if (e.key === "Escape") {
                  setOpen(false);
                }
              }}
              placeholder="Search customers, transactions, emails, payment IDs…"
              className="flex-1 bg-transparent text-[15px] outline-none"
              style={{ color: T.text }}
            />
            {q && (
              <button
                onClick={saveCurrent}
                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium transition-all"
                style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
              >
                <Bookmark className="h-3 w-3" />
                Save
              </button>
            )}
            <kbd
              className="hidden items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium sm:flex"
              style={{ background: T.card, borderColor: T.border, color: T.textMuted }}
            >
              /
            </kbd>
          </div>

          {/* Filter chips */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <div
              className="flex items-center gap-1 pr-1 text-[11px]"
              style={{ color: T.textFaint }}
            >
              <Filter className="h-3 w-3" /> Filters
            </div>
            {FILTER_CHIPS.map((f) => {
              const active = activeFilters.has(f.key);
              return (
                <button
                  key={f.key}
                  onClick={() => toggleFilter(f.key)}
                  className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all"
                  style={{
                    background: active ? "#EFF6FF" : T.card,
                    border: `1px solid ${active ? "#BFDBFE" : T.border}`,
                    color: active ? T.blue : T.textMuted,
                  }}
                >
                  {f.label}
                  {active && <X className="h-2.5 w-2.5" />}
                </button>
              );
            })}
            {activeFilters.size > 0 && (
              <button
                onClick={() => setActiveFilters(new Set())}
                className="ml-1 text-[11px] font-medium"
                style={{ color: T.textMuted }}
              >
                Clear
              </button>
            )}
          </div>
        </header>

        {/* Body: sidebar categories + results */}
        <div className="flex min-h-0 flex-1">
          <aside
            className="hidden w-52 shrink-0 overflow-y-auto py-2 sm:block"
            style={{ borderRight: `1px solid ${T.border}`, background: T.bg }}
          >
            <CategoryButton
              label="All results"
              icon={Search}
              active={cat === "all"}
              onClick={() => setCat("all")}
              count={totalResults}
            />
            <div
              className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: T.textFaint }}
            >
              Data
            </div>
            {CATEGORIES.filter((c) => c.requiresData).map((c) => (
              <CategoryButton
                key={c.key}
                label={c.label}
                icon={c.icon}
                active={cat === c.key}
                onClick={() => setCat(c.key)}
                count={0}
                empty
              />
            ))}
            <div
              className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: T.textFaint }}
            >
              Configuration
            </div>
            {CATEGORIES.filter((c) => !c.requiresData).map((c) => {
              const count = STATIC_ENTRIES.filter((e) => e.category === c.key).length;
              return (
                <CategoryButton
                  key={c.key}
                  label={c.label}
                  icon={c.icon}
                  active={cat === c.key}
                  onClick={() => setCat(c.key)}
                  count={count}
                />
              );
            })}
          </aside>

          <div className="min-w-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
            {/* Saved + Recent (only shown when no query) */}
            {!query && (
              <div className="mb-4 grid gap-3 sm:grid-cols-2">
                <SavedBlock
                  saved={saved}
                  onPick={(s) => {
                    setQ(s.query);
                    inputRef.current?.focus();
                  }}
                  onRemove={(id) => {
                    const next = saved.filter((s) => s.id !== id);
                    setSaved(next);
                    save(SAVED_KEY, next);
                  }}
                />
                <RecentBlock
                  items={recent}
                  onPick={(r) => {
                    setQ(r);
                    inputRef.current?.focus();
                  }}
                  onClear={() => {
                    setRecent([]);
                    save(RECENT_KEY, []);
                  }}
                />
              </div>
            )}

            {/* Static results (configuration/settings/docs) */}
            {staticResults.length > 0 && (
              <section className="mb-4">
                <SectionHeader
                  label={
                    cat === "all"
                      ? "Configuration & docs"
                      : (CATEGORIES.find((c) => c.key === cat)?.label ?? "")
                  }
                  count={staticResults.length}
                />
                <div className="mt-1 flex flex-col gap-1">
                  {staticResults.map((r, i) => (
                    <ResultRow
                      key={r.id}
                      entry={r}
                      active={i === activeIdx}
                      onHover={() => setActiveIdx(i)}
                      onSelect={() => {
                        commitSearch(q);
                        if (r.to) {
                          setOpen(false);
                          window.location.assign(r.to);
                        }
                      }}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Data-backed empty categories */}
            {dataCategories.map((c) => (
              <DataCategoryEmpty key={c.key} category={c} query={q} />
            ))}

            {/* Global empty state */}
            {staticResults.length === 0 && query && (
              <GlobalEmptyState
                query={q}
                onAskAI={() => {
                  setOpen(false);
                  window.dispatchEvent(new CustomEvent("tally:ai:open", { detail: { prompt: q } }));
                }}
                onClear={() => setQ("")}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-5 py-2.5 text-[11px]"
          style={{ borderTop: `1px solid ${T.border}`, background: T.bg, color: T.textMuted }}
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <CornerDownLeft className="h-3 w-3" /> Open
            </span>
            <span>↑↓ Navigate</span>
            <span>ESC Close</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd
              className="rounded border px-1 py-0.5 text-[9px]"
              style={{ borderColor: T.border, background: T.card }}
            >
              /
            </kbd>
            <span>or</span>
            <kbd
              className="rounded border px-1 py-0.5 text-[9px]"
              style={{ borderColor: T.border, background: T.card }}
            >
              ⌘ ⇧ F
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryButton({
  label,
  icon: Icon,
  active,
  onClick,
  count,
  empty,
}: {
  label: string;
  icon: typeof Search;
  active: boolean;
  onClick: () => void;
  count: number;
  empty?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2 px-3 py-1.5 text-[12.5px] transition-colors"
      style={{
        background: active ? T.card : "transparent",
        borderLeft: `2px solid ${active ? T.blue : "transparent"}`,
        color: active ? T.text : T.textMuted,
        fontWeight: active ? 600 : 500,
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = T.hairline;
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = "transparent";
      }}
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="flex-1 text-left">{label}</span>
      <span
        className="rounded px-1.5 text-[10px]"
        style={{
          background: active ? T.bg : "transparent",
          color: empty ? T.textFaint : T.textMuted,
        }}
      >
        {empty ? "—" : count}
      </span>
    </button>
  );
}

function SectionHeader({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-center justify-between px-1">
      <div
        className="text-[10px] font-semibold uppercase tracking-wider"
        style={{ color: T.textFaint }}
      >
        {label}
      </div>
      <div className="text-[10px]" style={{ color: T.textFaint }}>
        {count} result{count === 1 ? "" : "s"}
      </div>
    </div>
  );
}

function ResultRow({
  entry,
  active,
  onHover,
  onSelect,
}: {
  entry: StaticEntry;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  const cat = CATEGORIES.find((c) => c.key === entry.category);
  const Icon = cat?.icon ?? Search;
  return (
    <div
      onMouseEnter={onHover}
      onClick={onSelect}
      className="group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-all"
      style={{
        background: active ? "#EFF6FF" : "transparent",
        border: `1px solid ${active ? "#DBEAFE" : "transparent"}`,
      }}
    >
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
        style={{
          background: active ? T.card : T.bg,
          border: `1px solid ${T.border}`,
          color: active ? T.blue : T.textMuted,
        }}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-[13px] font-medium" style={{ color: T.text }}>
            {entry.title}
          </span>
          <span
            className="rounded-full px-1.5 py-0.5 text-[9.5px] font-medium uppercase tracking-wide"
            style={{ background: T.bg, color: T.textMuted, border: `1px solid ${T.border}` }}
          >
            {cat?.label}
          </span>
        </div>
        <div className="truncate text-[11.5px]" style={{ color: T.textMuted }}>
          {entry.subtitle}
        </div>
      </div>
      <ChevronRight
        className="h-4 w-4 transition-transform"
        style={{
          color: active ? T.blue : T.textFaint,
          transform: active ? "translateX(2px)" : "translateX(0)",
        }}
      />
    </div>
  );
}

function DataCategoryEmpty({ category, query }: { category: Category; query: string }) {
  const Icon = category.icon;
  return (
    <section className="mb-4">
      <SectionHeader label={category.label} count={0} />
      <div
        className="mt-1 flex items-start gap-3 rounded-xl p-4"
        style={{ background: T.bg, border: `1px dashed ${T.border}` }}
      >
        <div className="flex flex-col items-center gap-2 pt-1">
          <span
            className="grid h-9 w-9 place-items-center rounded-lg"
            style={{ background: T.card, border: `1px solid ${T.border}`, color: T.textMuted }}
          >
            <Icon className="h-4 w-4" />
          </span>
          <div className="us-skeleton h-1 w-9 rounded-full" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-medium" style={{ color: T.text }}>
            {query
              ? `No ${category.label.toLowerCase()} match “${query}”`
              : `No ${category.label.toLowerCase()} yet`}
          </div>
          <div className="mt-0.5 text-[11.5px] leading-relaxed" style={{ color: T.textMuted }}>
            {category.emptyHint}
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <div className="us-skeleton h-2 w-[70%] rounded" />
            <div className="us-skeleton h-2 w-[50%] rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}

function GlobalEmptyState({
  query,
  onAskAI,
  onClear,
}: {
  query: string;
  onAskAI: () => void;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-10 text-center">
      <div
        className="grid h-14 w-14 place-items-center rounded-2xl"
        style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMuted }}
      >
        <Inbox className="h-6 w-6" />
      </div>
      <div>
        <div className="text-[15px] font-semibold" style={{ color: T.text }}>
          No matching results
        </div>
        <div className="mt-1 text-[12.5px]" style={{ color: T.textMuted }}>
          Try another keyword{query && <> for “{query}”</>} or adjust your filters.
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={onClear}
          className="rounded-lg px-3 py-1.5 text-[12px] font-medium"
          style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
        >
          Clear search
        </button>
        <button
          onClick={onAskAI}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium text-white transition-transform hover:scale-[1.02]"
          style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.violet})` }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Ask Tally AI instead
        </button>
      </div>
    </div>
  );
}

function SavedBlock({
  saved,
  onPick,
  onRemove,
}: {
  saved: Saved[];
  onPick: (s: Saved) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="rounded-xl p-3" style={{ background: T.bg, border: `1px solid ${T.border}` }}>
      <div className="mb-2 flex items-center justify-between">
        <div
          className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: T.textFaint }}
        >
          <Bookmark className="h-3 w-3" /> Saved searches
        </div>
        <span className="text-[10px]" style={{ color: T.textFaint }}>
          {saved.length}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {saved.map((s) => (
          <div
            key={s.id}
            onClick={() => onPick(s)}
            className="group flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition-colors"
            onMouseEnter={(e) => (e.currentTarget.style.background = T.card)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12.5px] font-medium" style={{ color: T.text }}>
                {s.label}
              </div>
              <div className="truncate text-[10.5px] font-mono" style={{ color: T.textFaint }}>
                {s.query}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(s.id);
              }}
              className="grid h-6 w-6 place-items-center rounded opacity-0 transition-opacity group-hover:opacity-100"
              style={{ color: T.textFaint }}
              aria-label="Remove"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {saved.length === 0 && (
          <div
            className="flex items-center gap-1.5 px-2 py-1.5 text-[11.5px]"
            style={{ color: T.textMuted }}
          >
            <Plus className="h-3 w-3" /> Save a query to reuse it in one click
          </div>
        )}
      </div>
    </div>
  );
}

function RecentBlock({
  items,
  onPick,
  onClear,
}: {
  items: string[];
  onPick: (q: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="rounded-xl p-3" style={{ background: T.bg, border: `1px solid ${T.border}` }}>
      <div className="mb-2 flex items-center justify-between">
        <div
          className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: T.textFaint }}
        >
          <Clock className="h-3 w-3" /> Recent searches
        </div>
        {items.length > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-[10px]"
            style={{ color: T.textMuted }}
          >
            <Trash2 className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>
      {items.length === 0 ? (
        <div className="px-2 py-1.5 text-[11.5px]" style={{ color: T.textMuted }}>
          Your search history will appear here.
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {items.map((r) => (
            <button
              key={r}
              onClick={() => onPick(r)}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] transition-all"
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
            >
              <Clock className="h-3 w-3" style={{ color: T.textFaint }} />
              {r}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
