import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ShieldAlert,
  Trophy,
  XOctagon,
  Percent,
  Download,
  BookOpen,
  BellDot,
  Search,
  ChevronDown,
  Filter,
  CalendarDays,
  Globe2,
  CreditCard,
  Wallet,
  X,
  Upload,
  FileText,
  Image as ImageIcon,
  FileArchive,
  Sparkles,
  Clock,
  CheckCircle2,
  Circle,
  MessageSquare,
  Paperclip,
  LifeBuoy,
  Info,
  FileBarChart,
  ArrowUpRight,
} from "lucide-react";
import {
  AppShell,
  PageHeader,
  Card,
  PrimaryButton,
  SecondaryButton,
  T,
  SHADOW_LIFT,
} from "@/components/app/AppShell";

export const Route = createFileRoute("/_authenticated/disputes")({
  component: DisputesPage,
  head: () => ({
    meta: [
      { title: "Disputes — Tally" },
      {
        name: "description",
        content:
          "Track chargebacks, submit evidence and monitor dispute outcomes from one elegant workspace.",
      },
      { property: "og:title", content: "Disputes — Tally" },
      {
        property: "og:description",
        content: "Track chargebacks, submit evidence and monitor dispute outcomes.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
});

/* ============================================================
   Local micro-styles (keyframes for premium feel)
   ============================================================ */
const KEYFRAMES = `
@keyframes tally-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes tally-pulse { 0%,100% { opacity: .55 } 50% { opacity: 1 } }
@keyframes tally-shimmer { 0% { background-position: -400px 0 } 100% { background-position: 400px 0 } }
@keyframes tally-slide-in { from { transform: translateX(24px); opacity: 0 } to { transform: translateX(0); opacity: 1 } }
`;

/* ============================================================
   PAGE
   ============================================================ */
function DisputesPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <AppShell>
      <style>{KEYFRAMES}</style>

      <PageHeader
        title="Disputes"
        description="Track chargebacks, submit evidence and monitor dispute outcomes."
        actions={
          <>
            <SecondaryButton>
              <Download className="h-4 w-4" /> Export
            </SecondaryButton>
            <SecondaryButton>
              <BookOpen className="h-4 w-4" /> Documentation
            </SecondaryButton>
            <PrimaryButton onClick={() => setNotifOpen(true)}>
              <BellDot className="h-4 w-4" /> Notification settings
            </PrimaryButton>
          </>
        }
      />

      {/* KPI cards */}
      <SummaryCards />

      {/* Filter bar */}
      <div className="mt-6">
        <FilterBar />
      </div>

      {/* Main grid: table + side rail */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-6">
          <DisputesTable onOpen={() => setDrawerOpen(true)} />
          <QuickActions />
        </div>
        <aside className="space-y-6">
          <AiRecommendationCard />
          <DeadlinesCard />
          <EvidenceCenter />
        </aside>
      </div>

      {/* Drawer + Notification modal */}
      <DisputeDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <NotificationsModal open={notifOpen} onClose={() => setNotifOpen(false)} />
    </AppShell>
  );
}

/* ============================================================
   SUMMARY CARDS
   ============================================================ */

type Kpi = {
  label: string;
  value: string;
  icon: typeof ShieldAlert;
  accent: string;
  helper: string;
};

const KPIS: Kpi[] = [
  {
    label: "Open disputes",
    value: "0",
    icon: ShieldAlert,
    accent: T.blue,
    helper: "Awaiting your action",
  },
  { label: "Won", value: "0", icon: Trophy, accent: T.green, helper: "Successful outcomes" },
  { label: "Lost", value: "0", icon: XOctagon, accent: T.red, helper: "Funds recovered by issuer" },
  { label: "Win rate", value: "0%", icon: Percent, accent: T.amber, helper: "Rolling 90-day" },
];

function SummaryCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {KPIS.map((k, i) => (
        <div
          key={k.label}
          className="group relative overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            boxShadow: "0 1px 2px rgba(17,17,17,0.04)",
            animation: `tally-rise .4s ease-out both`,
            animationDelay: `${i * 60}ms`,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = SHADOW_LIFT)}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 2px rgba(17,17,17,0.04)")}
        >
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: `linear-gradient(90deg, ${k.accent}, transparent)` }}
          />
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div
                className="grid h-9 w-9 place-items-center rounded-xl"
                style={{
                  background: `${k.accent}14`,
                  color: k.accent,
                }}
              >
                <k.icon className="h-4.5 w-4.5" />
              </div>
              <span
                className="rounded-full px-2 py-0.5 text-[10.5px] font-semibold"
                style={{ background: T.hairline, color: T.textMuted }}
              >
                Live
              </span>
            </div>
            <p className="mt-4 text-[12px]" style={{ color: T.textMuted }}>
              {k.label}
            </p>
            <p
              className="mt-1 text-[30px] font-semibold tracking-tight"
              style={{ color: T.text, animation: `tally-rise .5s ease-out both` }}
            >
              {k.value}
            </p>
            <p className="mt-0.5 text-[11.5px]" style={{ color: T.textFaint }}>
              {k.helper}
            </p>
            <MiniChart color={k.accent} />
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniChart({ color }: { color: string }) {
  // Flat baseline with a soft pulse — no fake data.
  return (
    <div className="mt-4 h-10 w-full">
      <svg viewBox="0 0 120 40" className="h-full w-full">
        <defs>
          <linearGradient id={`g-${color}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 30 L120 30 L120 40 L0 40 Z" fill={`url(#g-${color})`} />
        <line
          x1="0"
          x2="120"
          y1="30"
          y2="30"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="2 4"
          style={{ animation: "tally-pulse 2.4s ease-in-out infinite" }}
        />
      </svg>
    </div>
  );
}

/* ============================================================
   FILTER BAR
   ============================================================ */

function FilterBar() {
  return (
    <div
      className="flex flex-wrap items-center gap-2 rounded-2xl p-2"
      style={{ background: T.card, border: `1px solid ${T.border}` }}
    >
      <div
        className="flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3 py-2"
        style={{ background: T.bg, border: `1px solid ${T.border}` }}
      >
        <Search className="h-4 w-4 shrink-0" style={{ color: T.textFaint }} />
        <input
          placeholder="Search by dispute ID, customer or transaction…"
          className="min-w-0 flex-1 bg-transparent text-[13px] outline-none"
          style={{ color: T.text }}
        />
      </div>
      <FilterChip
        icon={Filter}
        label="Status"
        options={["Needs Action", "Under Review", "Won", "Lost", "Closed"]}
      />
      <FilterChip
        icon={CreditCard}
        label="Payment method"
        options={["Visa", "Mastercard", "Amex", "SEPA", "Apple Pay"]}
      />
      <FilterChip
        icon={Globe2}
        label="Country"
        options={["France", "Germany", "United States", "United Kingdom"]}
      />
      <FilterChip
        icon={Wallet}
        label="Amount"
        options={["< €100", "€100 – €500", "€500 – €2 000", "> €2 000"]}
      />
      <FilterChip
        icon={CalendarDays}
        label="Date"
        options={["Last 7 days", "Last 30 days", "Last 90 days", "Custom"]}
      />
    </div>
  );
}

function FilterChip({
  icon: Icon,
  label,
  options,
}: {
  icon: typeof Filter;
  label: string;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[12.5px] font-medium transition-all"
        style={{
          background: open ? T.hairline : T.bg,
          border: `1px solid ${T.border}`,
          color: T.text,
        }}
      >
        <Icon className="h-3.5 w-3.5" style={{ color: T.textMuted }} />
        {label}
        <ChevronDown
          className="h-3.5 w-3.5 transition-transform"
          style={{
            color: T.textFaint,
            transform: open ? "rotate(180deg)" : "rotate(0)",
          }}
        />
      </button>
      {open && (
        <div
          className="absolute right-0 top-full z-20 mt-1.5 w-56 rounded-xl p-1.5"
          style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            boxShadow: SHADOW_LIFT,
            animation: "tally-rise .18s ease-out both",
          }}
        >
          {options.map((o) => (
            <button
              key={o}
              className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-[12.5px] transition-colors"
              style={{ color: T.text }}
              onMouseEnter={(e) => (e.currentTarget.style.background = T.hairline)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span>{o}</span>
              <span
                className="rounded-full px-1.5 text-[10px] font-semibold"
                style={{ background: T.hairline, color: T.textFaint }}
              >
                0
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   TABLE + EMPTY STATE
   ============================================================ */

function DisputesTable({ onOpen }: { onOpen: () => void }) {
  const cols = [
    "Dispute ID",
    "Customer",
    "Amount",
    "Reason",
    "Status",
    "Deadline",
    "Created",
    "Actions",
  ];
  return (
    <Card padded={false}>
      <div className="flex items-center justify-between p-5">
        <div>
          <h3 className="text-[15px] font-semibold" style={{ color: T.text }}>
            All disputes
          </h3>
          <p className="text-[12px]" style={{ color: T.textMuted }}>
            Showing 0 disputes
          </p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <SecondaryButton onClick={onOpen}>Preview drawer</SecondaryButton>
        </div>
      </div>
      <div className="overflow-hidden" style={{ borderTop: `1px solid ${T.border}` }}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-0">
            <thead className="sticky top-0 z-10" style={{ background: T.bg }}>
              <tr>
                {cols.map((c, i) => (
                  <th
                    key={c}
                    className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider"
                    style={{
                      color: T.textFaint,
                      borderBottom: `1px solid ${T.border}`,
                      textAlign: i === cols.length - 1 ? "right" : "left",
                    }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={cols.length} className="p-0">
                  <TableEmptyState />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}

function TableEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <DisputeIllustration />
      <h3 className="mt-6 text-[18px] font-semibold" style={{ color: T.text }}>
        No disputes yet
      </h3>
      <p className="mt-2 max-w-md text-[13px]" style={{ color: T.textMuted }}>
        Your disputes will automatically appear here if a customer opens a chargeback. You'll be
        alerted the moment one arrives.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <PrimaryButton>
          <BookOpen className="h-4 w-4" /> Learn about disputes
        </PrimaryButton>
        <SecondaryButton>
          <FileText className="h-4 w-4" /> Read best practices
        </SecondaryButton>
      </div>
    </div>
  );
}

function DisputeIllustration() {
  return (
    <div className="relative h-40 w-40">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(closest-side, ${T.blue}14, transparent 70%)`,
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-2xl"
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          boxShadow: SHADOW_LIFT,
          animation: "tally-rise .5s ease-out both",
        }}
      >
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <div
            className="grid h-9 w-9 place-items-center rounded-xl"
            style={{ background: `${T.green}18`, color: T.green }}
          >
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <span className="text-[10.5px] font-semibold" style={{ color: T.textMuted }}>
            All clear
          </span>
        </div>
      </div>
      {/* Floating chips */}
      {[
        { label: "Chargeback", color: T.amber, top: 4, left: -6 },
        { label: "Evidence", color: T.blue, top: 12, right: -12 },
        { label: "Won", color: T.green, bottom: 6, left: -4 },
      ].map((c, i) => (
        <span
          key={c.label}
          className="absolute rounded-full px-2 py-1 text-[10px] font-semibold"
          style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            color: c.color,
            boxShadow: SHADOW_LIFT,
            top: c.top,
            left: (c as any).left,
            right: (c as any).right,
            bottom: (c as any).bottom,
            animation: `tally-rise .6s ease-out both`,
            animationDelay: `${120 + i * 90}ms`,
          }}
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}

/* ============================================================
   QUICK ACTIONS
   ============================================================ */

function QuickActions() {
  const actions = [
    {
      icon: Upload,
      title: "Upload evidence",
      desc: "Attach receipts, tracking or communication logs.",
      accent: T.blue,
    },
    {
      icon: Download,
      title: "Download report",
      desc: "Export a full CSV of disputes and outcomes.",
      accent: T.violet,
    },
    {
      icon: BookOpen,
      title: "Chargeback guide",
      desc: "Learn how to win more disputes with strong evidence.",
      accent: T.amber,
    },
    {
      icon: LifeBuoy,
      title: "Contact support",
      desc: "Our specialists reply in under 4 hours.",
      accent: T.green,
    },
  ];
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[15px] font-semibold" style={{ color: T.text }}>
          Quick actions
        </h3>
        <span className="text-[11.5px]" style={{ color: T.textFaint }}>
          Shortcuts
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {actions.map((a, i) => (
          <button
            key={a.title}
            className="group flex items-start gap-3 rounded-2xl p-4 text-left transition-all hover:-translate-y-0.5"
            style={{
              background: T.bg,
              border: `1px solid ${T.border}`,
              animation: "tally-rise .4s ease-out both",
              animationDelay: `${i * 60}ms`,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = SHADOW_LIFT)}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <div
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-transform group-hover:scale-105"
              style={{ background: `${a.accent}18`, color: a.accent }}
            >
              <a.icon className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[13.5px] font-semibold" style={{ color: T.text }}>
                {a.title}
              </p>
              <p className="mt-0.5 text-[12px]" style={{ color: T.textMuted }}>
                {a.desc}
              </p>
            </div>
            <ArrowUpRight
              className="ml-auto h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
              style={{ color: T.textMuted }}
            />
          </button>
        ))}
      </div>
    </Card>
  );
}

/* ============================================================
   AI RECOMMENDATION
   ============================================================ */

function AiRecommendationCard() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl p-6"
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        boxShadow: "0 1px 2px rgba(17,17,17,0.04)",
      }}
    >
      <span
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full"
        style={{ background: `radial-gradient(closest-side, ${T.violet}22, transparent)` }}
      />
      <div className="flex items-center gap-2">
        <div
          className="grid h-8 w-8 place-items-center rounded-xl"
          style={{ background: `${T.violet}18`, color: T.violet }}
        >
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-[14px] font-semibold" style={{ color: T.text }}>
            AI recommendation
          </p>
          <p className="text-[11.5px]" style={{ color: T.textFaint }}>
            Personalized guidance, when it matters
          </p>
        </div>
      </div>
      <div
        className="mt-5 rounded-2xl p-5 text-center"
        style={{
          background: T.bg,
          border: `1px dashed ${T.border}`,
        }}
      >
        <div
          className="mx-auto grid h-12 w-12 place-items-center rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${T.hairline}, ${T.card})`,
            border: `1px solid ${T.border}`,
          }}
        >
          <Sparkles className="h-5 w-5" style={{ color: T.textMuted }} />
        </div>
        <p className="mt-3 text-[13px] font-semibold" style={{ color: T.text }}>
          Nothing to analyze yet
        </p>
        <p className="mx-auto mt-1 max-w-[26ch] text-[12px]" style={{ color: T.textMuted }}>
          AI recommendations will become available when disputes are received.
        </p>
      </div>
      <ul className="mt-5 space-y-2 text-[12px]" style={{ color: T.textMuted }}>
        {[
          "Summarize each case in seconds",
          "Highlight missing evidence",
          "Suggest the next best action",
          "Estimate probability of success",
        ].map((l) => (
          <li key={l} className="flex items-center gap-2">
            <span
              className="grid h-4 w-4 place-items-center rounded-full"
              style={{ background: `${T.violet}18`, color: T.violet }}
            >
              <Circle className="h-2 w-2" fill="currentColor" />
            </span>
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   DEADLINES
   ============================================================ */

function DeadlinesCard() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="grid h-8 w-8 place-items-center rounded-xl"
            style={{ background: `${T.amber}18`, color: T.amber }}
          >
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[14px] font-semibold" style={{ color: T.text }}>
              Upcoming deadlines
            </p>
            <p className="text-[11.5px]" style={{ color: T.textFaint }}>
              Sorted by priority
            </p>
          </div>
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[10.5px] font-semibold"
          style={{ background: T.hairline, color: T.textMuted }}
        >
          0
        </span>
      </div>
      <div
        className="mt-5 rounded-2xl p-5 text-center"
        style={{ background: T.bg, border: `1px dashed ${T.border}` }}
      >
        <p className="text-[13px] font-semibold" style={{ color: T.text }}>
          You're all caught up
        </p>
        <p className="mx-auto mt-1 max-w-[28ch] text-[12px]" style={{ color: T.textMuted }}>
          No deadlines. When a dispute needs a response, it will appear here.
        </p>
      </div>
      <div
        className="mt-4 grid grid-cols-4 gap-2 text-[10.5px] font-semibold uppercase tracking-wider"
        style={{ color: T.textFaint }}
      >
        <span>Date</span>
        <span>Merchant</span>
        <span>Days</span>
        <span className="text-right">Priority</span>
      </div>
    </Card>
  );
}

/* ============================================================
   EVIDENCE CENTER
   ============================================================ */

type UploadFile = { id: string; name: string; size: number; progress: number; kind: string };

function EvidenceCenter() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const accept = ".pdf,.png,.jpg,.jpeg,.zip,.txt";

  const addFiles = useCallback((list: FileList | null) => {
    if (!list) return;
    const next: UploadFile[] = Array.from(list).map((f) => ({
      id: `${f.name}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: f.name,
      size: f.size,
      progress: 0,
      kind: f.type || f.name.split(".").pop() || "file",
    }));
    setFiles((prev) => [...prev, ...next]);
    // Simulate progress locally (client-side visual only, no data persisted).
    next.forEach((f) => {
      const step = () => {
        setFiles((prev) =>
          prev.map((p) => (p.id === f.id ? { ...p, progress: Math.min(100, p.progress + 12) } : p)),
        );
      };
      const iv = setInterval(() => {
        step();
        setFiles((prev) => {
          const cur = prev.find((p) => p.id === f.id);
          if (cur && cur.progress >= 100) clearInterval(iv);
          return prev;
        });
      }, 180);
    });
  }, []);

  return (
    <Card>
      <div className="flex items-center gap-2">
        <div
          className="grid h-8 w-8 place-items-center rounded-xl"
          style={{ background: `${T.blue}18`, color: T.blue }}
        >
          <Paperclip className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-[14px] font-semibold" style={{ color: T.text }}>
            Evidence center
          </p>
          <p className="text-[11.5px]" style={{ color: T.textFaint }}>
            PDF, PNG, JPG, ZIP, TXT · up to 20 MB
          </p>
        </div>
      </div>

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          addFiles(e.dataTransfer.files);
        }}
        className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl px-4 py-8 text-center transition-all"
        style={{
          background: drag ? `${T.blue}0d` : T.bg,
          border: `1.5px dashed ${drag ? T.blue : T.border}`,
        }}
      >
        <div
          className="grid h-11 w-11 place-items-center rounded-2xl"
          style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            color: T.blue,
          }}
        >
          <Upload className="h-5 w-5" />
        </div>
        <p className="mt-3 text-[13px] font-semibold" style={{ color: T.text }}>
          Drag & drop evidence
        </p>
        <p className="mt-0.5 text-[12px]" style={{ color: T.textMuted }}>
          or click to browse from your device
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </label>

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((f) => (
            <li
              key={f.id}
              className="flex items-center gap-3 rounded-xl p-3"
              style={{ background: T.bg, border: `1px solid ${T.border}` }}
            >
              <FilePreview name={f.name} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[12.5px] font-semibold" style={{ color: T.text }}>
                    {f.name}
                  </p>
                  <span className="text-[11px]" style={{ color: T.textFaint }}>
                    {(f.size / 1024).toFixed(0)} KB
                  </span>
                </div>
                <div
                  className="mt-1.5 h-1 w-full overflow-hidden rounded-full"
                  style={{ background: T.hairline }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${f.progress}%`,
                      background: `linear-gradient(90deg, ${T.blue}, ${T.violet})`,
                    }}
                  />
                </div>
              </div>
              <button
                aria-label="Remove file"
                onClick={() => setFiles((prev) => prev.filter((p) => p.id !== f.id))}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-lg transition-colors"
                style={{ color: T.textMuted }}
                onMouseEnter={(e) => (e.currentTarget.style.background = T.hairline)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function FilePreview({ name }: { name: string }) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const Icon =
    ext === "zip" ? FileArchive : ["png", "jpg", "jpeg"].includes(ext) ? ImageIcon : FileText;
  const color = ext === "zip" ? T.amber : ["png", "jpg", "jpeg"].includes(ext) ? T.violet : T.blue;
  return (
    <div
      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
      style={{ background: `${color}18`, color }}
    >
      <Icon className="h-4 w-4" />
    </div>
  );
}

/* ============================================================
   DRAWER (Dispute details, empty preview)
   ============================================================ */

function DisputeDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0"
        style={{ background: "rgba(17,17,17,.35)", animation: "tally-rise .18s ease-out both" }}
        onClick={onClose}
      />
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-[520px] flex-col"
        style={{
          background: T.card,
          borderLeft: `1px solid ${T.border}`,
          boxShadow: "-24px 0 60px rgba(17,17,17,.12)",
          animation: "tally-slide-in .28s cubic-bezier(.2,.7,.2,1) both",
        }}
      >
        <header
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: `1px solid ${T.border}` }}
        >
          <div className="min-w-0">
            <p
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: T.textFaint }}
            >
              Dispute preview
            </p>
            <p className="mt-1 truncate text-[15px] font-semibold" style={{ color: T.text }}>
              No dispute selected
            </p>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg transition-colors"
            style={{ color: T.textMuted }}
            onMouseEnter={(e) => (e.currentTarget.style.background = T.hairline)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          <DrawerSection title="Overview">
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: "Customer", v: "—" },
                { l: "Transaction", v: "—" },
                { l: "Amount", v: "—" },
                { l: "Currency", v: "—" },
                { l: "Payment method", v: "—" },
                { l: "Reason", v: "—" },
              ].map((f) => (
                <div
                  key={f.l}
                  className="rounded-xl p-3"
                  style={{ background: T.bg, border: `1px solid ${T.border}` }}
                >
                  <p
                    className="text-[10.5px] font-semibold uppercase tracking-wider"
                    style={{ color: T.textFaint }}
                  >
                    {f.l}
                  </p>
                  <p className="mt-1 text-[13px] font-semibold" style={{ color: T.text }}>
                    {f.v}
                  </p>
                </div>
              ))}
            </div>
          </DrawerSection>

          <DrawerSection title="Timeline">
            <Timeline />
          </DrawerSection>

          <DrawerSection title="Evidence">
            <div
              className="rounded-2xl p-5 text-center"
              style={{ background: T.bg, border: `1px dashed ${T.border}` }}
            >
              <p className="text-[12.5px]" style={{ color: T.textMuted }}>
                Attach receipts, delivery confirmations or communication logs to strengthen this
                case.
              </p>
            </div>
          </DrawerSection>

          <DrawerSection title="Internal notes">
            <textarea
              placeholder="Add a private note for your team…"
              className="min-h-[92px] w-full resize-none rounded-xl px-3 py-2.5 text-[13px] outline-none"
              style={{
                background: T.bg,
                border: `1px solid ${T.border}`,
                color: T.text,
              }}
            />
          </DrawerSection>

          <DrawerSection title="Communication history">
            <div
              className="flex items-center gap-3 rounded-2xl p-4"
              style={{ background: T.bg, border: `1px solid ${T.border}` }}
            >
              <div
                className="grid h-9 w-9 place-items-center rounded-xl"
                style={{ background: `${T.blue}18`, color: T.blue }}
              >
                <MessageSquare className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[12.5px] font-semibold" style={{ color: T.text }}>
                  No messages yet
                </p>
                <p className="text-[11.5px]" style={{ color: T.textMuted }}>
                  Emails and issuer updates will thread here.
                </p>
              </div>
            </div>
          </DrawerSection>
        </div>

        <footer
          className="flex items-center justify-end gap-2 px-6 py-4"
          style={{ borderTop: `1px solid ${T.border}` }}
        >
          <SecondaryButton onClick={onClose}>Close</SecondaryButton>
          <PrimaryButton>Submit evidence</PrimaryButton>
        </footer>
      </aside>
    </div>
  );
}

function DrawerSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h4
        className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider"
        style={{ color: T.textFaint }}
      >
        {title}
      </h4>
      {children}
    </section>
  );
}

const TIMELINE_STEPS = [
  { label: "Dispute created", desc: "The issuer notified us of the chargeback.", accent: T.blue },
  { label: "Evidence requested", desc: "Compile receipts and proof of delivery.", accent: T.amber },
  { label: "Evidence submitted", desc: "Package sent to the acquiring bank.", accent: T.violet },
  { label: "Issuer review", desc: "The card network reviews the case.", accent: T.textMuted },
  { label: "Decision", desc: "Won, lost or partial recovery.", accent: T.green },
];

function Timeline() {
  return (
    <ol className="relative space-y-4 pl-6">
      <span
        aria-hidden
        className="absolute left-[9px] top-1 bottom-1 w-px"
        style={{ background: T.border }}
      />
      {TIMELINE_STEPS.map((s, i) => (
        <li
          key={s.label}
          className="relative"
          style={{ animation: "tally-rise .4s ease-out both", animationDelay: `${i * 70}ms` }}
        >
          <span
            className="absolute -left-6 top-1 grid h-4 w-4 place-items-center rounded-full"
            style={{
              background: T.card,
              border: `2px solid ${s.accent}`,
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.accent }} />
          </span>
          <p className="text-[13px] font-semibold" style={{ color: T.text }}>
            {s.label}
          </p>
          <p className="mt-0.5 text-[12px]" style={{ color: T.textMuted }}>
            {s.desc}
          </p>
        </li>
      ))}
    </ol>
  );
}

/* ============================================================
   NOTIFICATION SETTINGS MODAL
   ============================================================ */

function NotificationsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [prefs, setPrefs] = useState({
    email: true,
    browser: false,
    daily: true,
    instant: true,
  });
  const rows = useMemo(
    () => [
      {
        key: "email" as const,
        label: "Email alerts",
        desc: "New disputes, status changes and deadlines.",
      },
      {
        key: "browser" as const,
        label: "Browser notifications",
        desc: "Push updates while Tally is open.",
      },
      { key: "daily" as const, label: "Daily summary", desc: "One digest email every morning." },
      {
        key: "instant" as const,
        label: "Instant alerts",
        desc: "Real-time notifications for urgent cases.",
      },
    ],
    [],
  );

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center px-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0"
        style={{ background: "rgba(17,17,17,.4)" }}
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-lg rounded-3xl p-6"
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          boxShadow: SHADOW_LIFT,
          animation: "tally-rise .22s ease-out both",
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: T.textFaint }}
            >
              Preferences
            </p>
            <h3 className="mt-1 text-[18px] font-semibold" style={{ color: T.text }}>
              Notification settings
            </h3>
            <p className="mt-1 text-[12.5px]" style={{ color: T.textMuted }}>
              Choose how you want to hear about disputes.
            </p>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg"
            style={{ color: T.textMuted }}
            onMouseEnter={(e) => (e.currentTarget.style.background = T.hairline)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <ul className="mt-5 divide-y" style={{ borderColor: T.border }}>
          {rows.map((r) => (
            <li key={r.key} className="flex items-center justify-between gap-4 py-3.5">
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold" style={{ color: T.text }}>
                  {r.label}
                </p>
                <p className="mt-0.5 text-[12px]" style={{ color: T.textMuted }}>
                  {r.desc}
                </p>
              </div>
              <Toggle on={prefs[r.key]} onChange={(v) => setPrefs((p) => ({ ...p, [r.key]: v }))} />
            </li>
          ))}
        </ul>

        <div
          className="mt-4 flex items-start gap-2 rounded-xl p-3 text-[12px]"
          style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMuted }}
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0" style={{ color: T.textFaint }} />
          Preferences apply to every teammate with dispute access.
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
          <PrimaryButton onClick={onClose}>Save preferences</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="relative h-6 w-11 shrink-0 rounded-full transition-colors"
      style={{
        background: on ? T.text : T.border,
      }}
    >
      <span
        className="absolute top-0.5 h-5 w-5 rounded-full transition-transform"
        style={{
          background: T.card,
          boxShadow: "0 1px 2px rgba(17,17,17,.2)",
          transform: on ? "translateX(22px)" : "translateX(2px)",
        }}
      />
    </button>
  );
}

/* ============================================================
   Unused exports guard (satisfy TS on rarely used icons)
   ============================================================ */
// Keep imports referenced even if visual layout changes.
const _keepAlive = { FileBarChart };
void _keepAlive;
