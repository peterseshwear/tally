import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Code2,
  KeyRound,
  Webhook,
  BookOpen,
  Activity,
  Rocket,
  Terminal,
  FlaskConical,
  Gauge,
  ScrollText,
  Package,
  History,
  ExternalLink,
  Plus,
  Copy,
  RotateCw,
  Trash2,
  Power,
  Eye,
  EyeOff,
  Send,
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  Play,
  Save,
  ArrowUpRight,
  Check,
  Sparkles,
  Zap,
  Lock,
  CircleDot,
  FileCode2,
  Globe,
  ShieldCheck,
  Layers,
  Info,
} from "lucide-react";
import {
  AppShell,
  PageHeader,
  Card,
  PrimaryButton,
  SecondaryButton,
  T,
} from "@/components/app/AppShell";

export const Route = createFileRoute("/_authenticated/developers")({
  component: DevelopersPage,
  head: () => ({
    meta: [
      { title: "Developers — Tally" },
      { name: "description", content: "API keys, webhooks, playground and developer tooling." },
      { property: "og:title", content: "Developer Center — Tally" },
      { property: "og:description", content: "Build, test and manage your Tally integration." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

type SectionKey =
  | "overview"
  | "keys"
  | "webhooks"
  | "explorer"
  | "events"
  | "logs"
  | "sdks"
  | "playground"
  | "sandbox"
  | "limits"
  | "docs"
  | "changelog";

const SECTIONS: {
  key: SectionKey;
  label: string;
  icon: typeof Code2;
  group: "Build" | "Observe" | "Learn";
}[] = [
  { key: "overview", label: "Overview", icon: Rocket, group: "Build" },
  { key: "keys", label: "API Keys", icon: KeyRound, group: "Build" },
  { key: "webhooks", label: "Webhooks", icon: Webhook, group: "Build" },
  { key: "explorer", label: "API Explorer", icon: Terminal, group: "Build" },
  { key: "playground", label: "Playground", icon: Play, group: "Build" },
  { key: "sandbox", label: "Sandbox", icon: FlaskConical, group: "Build" },
  { key: "events", label: "Events", icon: Activity, group: "Observe" },
  { key: "logs", label: "Request Logs", icon: ScrollText, group: "Observe" },
  { key: "limits", label: "Rate Limits", icon: Gauge, group: "Observe" },
  { key: "sdks", label: "SDKs", icon: Package, group: "Learn" },
  { key: "docs", label: "Documentation", icon: BookOpen, group: "Learn" },
  { key: "changelog", label: "Changelog", icon: History, group: "Learn" },
];

function DevelopersPage() {
  const [section, setSection] = useState<SectionKey>("overview");

  return (
    <AppShell>
      <div className="p-4 sm:p-6">
        <PageHeader
          title="Developer Center"
          description="Build, test and manage your integrations — API keys, webhooks, live events, logs and SDKs in one workspace."
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <ApiStatusPill />
              <SecondaryButton>
                <BookOpen className="mr-1.5 h-3.5 w-3.5" /> Documentation
              </SecondaryButton>
              <PrimaryButton>
                <Plus className="mr-1.5 h-3.5 w-3.5" /> Create API key
              </PrimaryButton>
            </div>
          }
        />

        <div className="mt-6 grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)_300px]">
          <DevSidebar current={section} onChange={setSection} />
          <div className="min-w-0">{renderSection(section)}</div>
          <ContextPanel section={section} />
        </div>
      </div>
    </AppShell>
  );
}

function renderSection(section: SectionKey) {
  switch (section) {
    case "overview":
      return <OverviewSection />;
    case "keys":
      return <KeysSection />;
    case "webhooks":
      return <WebhooksSection />;
    case "explorer":
      return <ExplorerSection />;
    case "events":
      return <EventsSection />;
    case "logs":
      return <LogsSection />;
    case "sdks":
      return <SDKsSection />;
    case "playground":
      return <PlaygroundSection />;
    case "sandbox":
      return <SandboxSection />;
    case "limits":
      return <LimitsSection />;
    case "docs":
      return <DocsSection />;
    case "changelog":
      return <ChangelogSection />;
  }
}

/* ---------------- Shared ---------------- */

function ApiStatusPill() {
  return (
    <div
      className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
      style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#166534" }}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#22C55E] opacity-70" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
      </span>
      API operational
    </div>
  );
}

function DevSidebar({
  current,
  onChange,
}: {
  current: SectionKey;
  onChange: (s: SectionKey) => void;
}) {
  const grouped = useMemo(() => {
    const m = new Map<string, typeof SECTIONS>();
    SECTIONS.forEach((s) => {
      const arr = m.get(s.group) ?? [];
      arr.push(s);
      m.set(s.group, arr);
    });
    return Array.from(m.entries());
  }, []);

  return (
    <aside
      className="sticky top-4 h-fit rounded-2xl p-2"
      style={{ background: T.card, border: `1px solid ${T.border}` }}
    >
      {grouped.map(([group, items]) => (
        <div key={group} className="mb-2 last:mb-0">
          <div
            className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: T.textFaint }}
          >
            {group}
          </div>
          <div className="flex flex-col gap-0.5">
            {items.map((s) => {
              const Icon = s.icon;
              const active = current === s.key;
              return (
                <button
                  key={s.key}
                  onClick={() => onChange(s.key)}
                  className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] transition-all"
                  style={{
                    background: active ? "#EFF6FF" : "transparent",
                    color: active ? T.blue : T.text,
                    fontWeight: active ? 600 : 500,
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.background = T.bg;
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: active ? T.blue : T.textMuted }} />
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
}

function ContextPanel({ section }: { section: SectionKey }) {
  const map: Record<
    SectionKey,
    {
      title: string;
      snippet?: { lang: string; code: string };
      tips: string[];
      links: { label: string; href: string }[];
    }
  > = {
    overview: {
      title: "Get started in minutes",
      snippet: { lang: "bash", code: "npm install @tally/node" },
      tips: [
        "Create a restricted test key before shipping to production.",
        "Register a webhook to react to payments in real time.",
      ],
      links: [
        { label: "Quickstart guide", href: "#" },
        { label: "Authentication overview", href: "#" },
      ],
    },
    keys: {
      title: "Key safety",
      snippet: {
        lang: "bash",
        code: "curl https://api.tally.dev/v1/charges \\\n  -u sk_test_xxx:",
      },
      tips: [
        "Secret keys are shown once. Store them in a secure vault.",
        "Use restricted keys for CI, cron and internal services.",
      ],
      links: [{ label: "Rotating keys safely", href: "#" }],
    },
    webhooks: {
      title: "Reliable webhooks",
      snippet: {
        lang: "js",
        code: "const sig = req.headers['tally-signature'];\nvalidate(sig, body, secret);",
      },
      tips: ["Verify signatures on every request.", "Return 2xx quickly — process work async."],
      links: [
        { label: "Signature verification", href: "#" },
        { label: "Event types reference", href: "#" },
      ],
    },
    explorer: {
      title: "Try it live",
      snippet: { lang: "http", code: "GET /v1/customers" },
      tips: ["Test keys never affect real money or notify customers."],
      links: [{ label: "Endpoint reference", href: "#" }],
    },
    events: {
      title: "Event stream",
      tips: [
        "Events appear here in real time as your integration fires.",
        "Replay any event to test downstream systems.",
      ],
      links: [{ label: "Event catalog", href: "#" }],
    },
    logs: {
      title: "Debug faster",
      tips: [
        "Every API request is logged with headers, body and response.",
        "Filter by status code to surface failing calls.",
      ],
      links: [{ label: "Error codes", href: "#" }],
    },
    sdks: {
      title: "Official SDKs",
      snippet: {
        lang: "js",
        code: "import Tally from '@tally/node';\nconst tally = new Tally(process.env.TALLY_KEY);",
      },
      tips: ["All SDKs share the same resource-based design."],
      links: [{ label: "SDK guides", href: "#" }],
    },
    playground: {
      title: "Compose requests",
      tips: ["Save reusable requests into collections shared with your team."],
      links: [{ label: "Import from Postman", href: "#" }],
    },
    sandbox: {
      title: "Safe experiments",
      tips: [
        "Sandbox mirrors production but never touches real money.",
        "Reset the environment at any time.",
      ],
      links: [{ label: "Test cards & IBANs", href: "#" }],
    },
    limits: {
      title: "Fair usage",
      tips: [
        "Default limit is 100 req/s per key.",
        "Bursts up to 200/s are allowed for short intervals.",
      ],
      links: [{ label: "Handling rate limits", href: "#" }],
    },
    docs: {
      title: "Deep-dive guides",
      tips: ["Reference is versioned. Pin the API version in each request."],
      links: [{ label: "Open full docs", href: "#" }],
    },
    changelog: {
      title: "Stay up to date",
      tips: ["Subscribe to the changelog RSS to receive breaking-change alerts."],
      links: [{ label: "RSS feed", href: "#" }],
    },
  };
  const c = map[section];

  return (
    <aside className="hidden lg:block">
      <div
        className="sticky top-4 rounded-2xl p-4"
        style={{ background: T.card, border: `1px solid ${T.border}` }}
      >
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5" style={{ color: T.blue }} />
          <div
            className="text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: T.textFaint }}
          >
            Contextual help
          </div>
        </div>
        <h4 className="mt-2 text-[14px] font-semibold" style={{ color: T.text }}>
          {c.title}
        </h4>

        {c.snippet && (
          <div className="mt-3 overflow-hidden rounded-lg" style={{ background: "#0F172A" }}>
            <div className="flex items-center justify-between px-3 py-1.5">
              <span className="text-[10px] font-medium uppercase" style={{ color: "#94A3B8" }}>
                {c.snippet.lang}
              </span>
              <CopyIconButton text={c.snippet.code} />
            </div>
            <pre
              className="px-3 pb-3 pt-0 text-[11px] leading-relaxed"
              style={{ color: "#E2E8F0" }}
            >
              <code>{c.snippet.code}</code>
            </pre>
          </div>
        )}

        <ul className="mt-3 flex flex-col gap-2">
          {c.tips.map((t, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-[12px] leading-relaxed"
              style={{ color: T.textMuted }}
            >
              <Info className="mt-0.5 h-3 w-3 shrink-0" style={{ color: T.blue }} />
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-3 flex flex-col gap-1 border-t pt-3" style={{ borderColor: T.hairline }}>
          {c.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="flex items-center justify-between rounded-md px-2 py-1 text-[12px] font-medium transition-colors"
              style={{ color: T.blue }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#EFF6FF")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {l.label} <ArrowUpRight className="h-3 w-3" />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

function CopyIconButton({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text).catch(() => {});
        setOk(true);
        setTimeout(() => setOk(false), 1400);
      }}
      className="grid h-6 w-6 place-items-center rounded transition-all"
      style={{ color: ok ? "#4ADE80" : "#94A3B8" }}
      aria-label="Copy"
    >
      {ok ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3 w-3" />}
    </button>
  );
}

function SectionCard({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold" style={{ color: T.text }}>
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-[12.5px]" style={{ color: T.textMuted }}>
              {subtitle}
            </p>
          )}
        </div>
        {actions}
      </div>
      {children}
    </Card>
  );
}

function EmptyState({
  icon: Icon,
  title,
  body,
  cta,
}: {
  icon: typeof Code2;
  title: string;
  body: string;
  cta?: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col items-center gap-3 rounded-xl p-8 text-center"
      style={{ background: T.bg, border: `1px dashed ${T.border}` }}
    >
      <div
        className="grid h-11 w-11 place-items-center rounded-xl"
        style={{ background: T.card, border: `1px solid ${T.border}`, color: T.blue }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-[14px] font-semibold" style={{ color: T.text }}>
          {title}
        </div>
        <div className="mt-1 max-w-md text-[12.5px] leading-relaxed" style={{ color: T.textMuted }}>
          {body}
        </div>
      </div>
      {cta && <div className="mt-1">{cta}</div>}
    </div>
  );
}

/* ---------------- Overview ---------------- */

function OverviewSection() {
  const stats = [
    { label: "API keys", value: "0", hint: "None created yet", icon: KeyRound },
    { label: "Webhooks", value: "0", hint: "No endpoints", icon: Webhook },
    { label: "Events today", value: "—", hint: "Awaiting first event", icon: Activity },
    { label: "API requests (24h)", value: "—", hint: "No traffic yet", icon: Zap },
    { label: "Rate limit usage", value: "0%", hint: "of 100 req/s", icon: Gauge },
    { label: "SDK version", value: "v2026.07", hint: "Latest release", icon: Package },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-4 transition-transform hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <span
                  className="text-[11px] font-medium uppercase tracking-wide"
                  style={{ color: T.textFaint }}
                >
                  {s.label}
                </span>
                <Icon className="h-3.5 w-3.5" style={{ color: T.textMuted }} />
              </div>
              <div className="mt-2 text-[22px] font-semibold" style={{ color: T.text }}>
                {s.value}
              </div>
              <div className="mt-0.5 text-[11.5px]" style={{ color: T.textMuted }}>
                {s.hint}
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="overflow-hidden p-0">
        <div className="p-5">
          <div
            className="text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: T.blue }}
          >
            Quickstart
          </div>
          <h3 className="mt-1 text-[16px] font-semibold" style={{ color: T.text }}>
            Ship your first API call in under a minute
          </h3>
          <p className="mt-1 text-[12.5px]" style={{ color: T.textMuted }}>
            Follow the three steps below to move from install to a live test payment.
          </p>
        </div>
        <div className="grid gap-0 sm:grid-cols-3" style={{ borderTop: `1px solid ${T.border}` }}>
          {[
            {
              n: 1,
              title: "Create a test key",
              body: "Generate a secret key scoped to your sandbox environment.",
              icon: KeyRound,
            },
            {
              n: 2,
              title: "Install an SDK",
              body: "Add the Tally client to your codebase in your favorite language.",
              icon: Package,
            },
            {
              n: 3,
              title: "Send a test payment",
              body: "Fire a $10 authorization to see it land in Events.",
              icon: Send,
            },
          ].map((s, i, arr) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                className="p-5"
                style={{ borderRight: i < arr.length - 1 ? `1px solid ${T.border}` : undefined }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="grid h-7 w-7 place-items-center rounded-lg text-[12px] font-semibold"
                    style={{ background: "#EFF6FF", color: T.blue }}
                  >
                    {s.n}
                  </div>
                  <Icon className="h-3.5 w-3.5" style={{ color: T.textMuted }} />
                </div>
                <div className="mt-3 text-[13.5px] font-semibold" style={{ color: T.text }}>
                  {s.title}
                </div>
                <div className="mt-0.5 text-[12px] leading-relaxed" style={{ color: T.textMuted }}>
                  {s.body}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <SectionCard
        title="Recent activity"
        subtitle="Real-time events and API traffic will appear here."
      >
        <EmptyState
          icon={Activity}
          title="No activity yet"
          body="Once your first API request or webhook delivery lands, it will show up in this stream."
        />
      </SectionCard>
    </div>
  );
}

/* ---------------- API Keys ---------------- */

function KeysSection() {
  return (
    <SectionCard
      title="API Keys"
      subtitle="Rotate frequently, restrict scopes, and keep secret keys in a vault."
      actions={
        <PrimaryButton>
          <Plus className="mr-1.5 h-3.5 w-3.5" /> Create key
        </PrimaryButton>
      }
    >
      <div className="mb-3 flex flex-wrap gap-2">
        {["All", "Test", "Live", "Restricted"].map((f, i) => (
          <button
            key={f}
            className="rounded-full px-3 py-1 text-[11.5px] font-medium transition-all"
            style={{
              background: i === 0 ? "#EFF6FF" : T.card,
              border: `1px solid ${i === 0 ? "#BFDBFE" : T.border}`,
              color: i === 0 ? T.blue : T.textMuted,
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl" style={{ border: `1px solid ${T.border}` }}>
        <div
          className="grid grid-cols-[1.5fr_0.8fr_0.9fr_0.9fr_1fr_0.7fr_0.4fr] gap-3 px-4 py-2.5 text-[10.5px] font-semibold uppercase tracking-wider"
          style={{ background: T.bg, color: T.textFaint, borderBottom: `1px solid ${T.border}` }}
        >
          <div>Key name</div>
          <div>Environment</div>
          <div>Created</div>
          <div>Last used</div>
          <div>Permissions</div>
          <div>Status</div>
          <div />
        </div>
        <div className="px-4 py-10">
          <EmptyState
            icon={KeyRound}
            title="No API keys yet"
            body="Create a test key to authenticate SDK and REST calls. Secret keys are only shown once at creation."
            cta={
              <PrimaryButton>
                <Plus className="mr-1.5 h-3.5 w-3.5" /> Create your first key
              </PrimaryButton>
            }
          />
        </div>
      </div>

      <SecretKeyPreview />

      <div
        className="mt-4 flex items-start gap-2.5 rounded-xl p-3.5"
        style={{ background: "#FFFBEB", border: "1px solid #FDE68A" }}
      >
        <Lock className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#B45309" }} />
        <div className="text-[12px] leading-relaxed" style={{ color: "#78350F" }}>
          <span className="font-semibold">Never expose secret keys.</span> Store them as environment
          variables and rotate immediately if a key leaks. Available actions per key: copy, rotate,
          disable, delete.
        </div>
      </div>
    </SectionCard>
  );
}

function SecretKeyPreview() {
  const [reveal, setReveal] = useState(false);
  const masked = "sk_test_" + "•".repeat(28);
  const shown = "sk_test_51J•••••••••••••_example_only";
  return (
    <div
      className="mt-4 rounded-xl p-4"
      style={{ background: T.bg, border: `1px solid ${T.border}` }}
    >
      <div
        className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider"
        style={{ color: T.textFaint }}
      >
        <Eye className="h-3 w-3" /> Example — what a fresh key looks like
      </div>
      <div className="mt-2 flex items-center gap-2">
        <code
          className="flex-1 truncate rounded-lg px-3 py-2 text-[12.5px]"
          style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            color: T.text,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          {reveal ? shown : masked}
        </code>
        <button
          onClick={() => setReveal((r) => !r)}
          className="grid h-8 w-8 place-items-center rounded-lg"
          style={{ background: T.card, border: `1px solid ${T.border}`, color: T.textMuted }}
        >
          {reveal ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        </button>
        <CopyPillButton text={shown} />
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {[
          { label: "Rotate", icon: RotateCw },
          { label: "Disable", icon: Power },
          { label: "Delete", icon: Trash2, danger: true },
        ].map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.label}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11.5px] font-medium"
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                color: a.danger ? "#B91C1C" : T.text,
              }}
            >
              <Icon className="h-3 w-3" /> {a.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CopyPillButton({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text).catch(() => {});
        setOk(true);
        setTimeout(() => setOk(false), 1500);
      }}
      className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-medium transition-all"
      style={{
        background: ok ? "#DCFCE7" : T.card,
        border: `1px solid ${ok ? "#86EFAC" : T.border}`,
        color: ok ? "#166534" : T.text,
      }}
    >
      {ok ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {ok ? "Copied" : "Copy"}
    </button>
  );
}

/* ---------------- Webhooks ---------------- */

function WebhooksSection() {
  return (
    <SectionCard
      title="Webhooks"
      subtitle="Receive real-time events from Tally into your infrastructure."
      actions={
        <PrimaryButton>
          <Plus className="mr-1.5 h-3.5 w-3.5" /> Create endpoint
        </PrimaryButton>
      }
    >
      <div className="grid gap-3">
        <div
          className="rounded-xl p-5"
          style={{ background: T.bg, border: `1px dashed ${T.border}` }}
        >
          <div className="grid grid-cols-[1fr_auto] gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Webhook className="h-4 w-4" style={{ color: T.blue }} />
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: T.textFaint }}
                >
                  Example endpoint shape
                </span>
              </div>
              <div
                className="mt-2 truncate rounded-lg px-3 py-2 text-[12.5px]"
                style={{
                  background: T.card,
                  border: `1px solid ${T.border}`,
                  color: T.text,
                  fontFamily: "ui-monospace, SFMono-Regular, monospace",
                }}
              >
                https://api.your-store.com/tally/webhooks
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["payment.succeeded", "payment.failed", "refund.created", "customer.updated"].map(
                  (e) => (
                    <span
                      key={e}
                      className="rounded-md px-2 py-0.5 text-[10.5px] font-medium"
                      style={{
                        background: T.card,
                        border: `1px solid ${T.border}`,
                        color: T.textMuted,
                        fontFamily: "ui-monospace, monospace",
                      }}
                    >
                      {e}
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className="rounded-full px-2 py-0.5 text-[10.5px] font-medium"
                style={{ background: T.card, border: `1px solid ${T.border}`, color: T.textMuted }}
              >
                <CircleDot className="mr-1 inline h-3 w-3" /> Awaiting first delivery
              </span>
              <div className="flex gap-1.5">
                <button
                  className="rounded-lg px-2.5 py-1 text-[11px] font-medium"
                  style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
                >
                  <Send className="mr-1 inline h-3 w-3" /> Send test
                </button>
                <button
                  className="rounded-lg px-2.5 py-1 text-[11px] font-medium"
                  style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
                >
                  <ScrollText className="mr-1 inline h-3 w-3" /> Logs
                </button>
              </div>
            </div>
          </div>
        </div>

        <EmptyState
          icon={Webhook}
          title="No webhook endpoints configured"
          body="Register a URL, pick the events you care about, and Tally will POST signed payloads with automatic retries."
          cta={
            <PrimaryButton>
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Create endpoint
            </PrimaryButton>
          }
        />
      </div>
    </SectionCard>
  );
}

/* ---------------- API Explorer ---------------- */

function ExplorerSection() {
  const [method, setMethod] = useState<"GET" | "POST" | "PUT" | "DELETE">("GET");
  const [path, setPath] = useState("/v1/customers");
  const [tab, setTab] = useState<"body" | "headers" | "auth">("headers");

  return (
    <SectionCard
      title="API Explorer"
      subtitle="Craft, authenticate and send test requests against the Tally API."
    >
      <div className="flex flex-wrap items-center gap-2">
        <MethodSelect value={method} onChange={setMethod} />
        <input
          value={path}
          onChange={(e) => setPath(e.target.value)}
          className="min-w-0 flex-1 rounded-lg px-3 py-2 text-[13px] outline-none"
          style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            color: T.text,
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
          }}
        />
        <button
          className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12.5px] font-semibold text-white"
          style={{ background: T.blue }}
        >
          <Play className="h-3.5 w-3.5" /> Send
        </button>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {/* Request */}
        <div className="overflow-hidden rounded-xl" style={{ border: `1px solid ${T.border}` }}>
          <div className="flex items-center gap-1 px-2 pt-2">
            {(["headers", "body", "auth"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="rounded-md px-2.5 py-1 text-[11.5px] font-medium capitalize transition-colors"
                style={{
                  background: tab === t ? "#EFF6FF" : "transparent",
                  color: tab === t ? T.blue : T.textMuted,
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="p-3">
            {tab === "headers" && (
              <CodeBlock
                lang="http"
                code={`Authorization: Bearer sk_test_•••\nContent-Type: application/json\nTally-Version: 2026-07-01`}
              />
            )}
            {tab === "body" && (
              <CodeBlock
                lang="json"
                code={`{\n  "email": "customer@example.com",\n  "name": "Ada Lovelace"\n}`}
              />
            )}
            {tab === "auth" && (
              <CodeBlock
                lang="bash"
                code={`curl ${method} https://api.tally.dev${path} \\\n  -u sk_test_•••:`}
              />
            )}
          </div>
        </div>

        {/* Response */}
        <div className="overflow-hidden rounded-xl" style={{ border: `1px solid ${T.border}` }}>
          <div
            className="flex items-center justify-between px-3 py-2"
            style={{ borderBottom: `1px solid ${T.border}` }}
          >
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase" style={{ color: T.textFaint }}>
                Response
              </span>
              <span
                className="rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold"
                style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMuted }}
              >
                Idle
              </span>
            </div>
            <div className="text-[10.5px]" style={{ color: T.textFaint }}>
              Waiting for send
            </div>
          </div>
          <div className="grid place-items-center p-10">
            <div className="text-center">
              <div
                className="mx-auto grid h-10 w-10 place-items-center rounded-xl"
                style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMuted }}
              >
                <Terminal className="h-4 w-4" />
              </div>
              <div className="mt-2 text-[12.5px]" style={{ color: T.textMuted }}>
                Hit{" "}
                <span className="font-semibold" style={{ color: T.text }}>
                  Send
                </span>{" "}
                to see the JSON response here.
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function MethodSelect({
  value,
  onChange,
}: {
  value: "GET" | "POST" | "PUT" | "DELETE";
  onChange: (v: any) => void;
}) {
  const colors: Record<string, string> = {
    GET: "#16A34A",
    POST: "#2563EB",
    PUT: "#D97706",
    DELETE: "#DC2626",
  };
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg px-2.5 py-2 pr-7 text-[12.5px] font-semibold outline-none"
        style={{ background: T.card, border: `1px solid ${T.border}`, color: colors[value] }}
      >
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>DELETE</option>
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-1.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2"
        style={{ color: T.textMuted }}
      />
    </div>
  );
}

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-lg" style={{ background: "#0F172A" }}>
      <div className="flex items-center justify-between px-3 py-1.5">
        <span className="text-[10px] font-semibold uppercase" style={{ color: "#94A3B8" }}>
          {lang}
        </span>
        <CopyIconButton text={code} />
      </div>
      <pre
        className="max-h-64 overflow-auto px-3 pb-3 text-[11.5px] leading-relaxed"
        style={{ color: "#E2E8F0" }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ---------------- Events ---------------- */

function EventsSection() {
  const types = [
    { label: "payment.created", color: "#2563EB" },
    { label: "payment.failed", color: "#DC2626" },
    { label: "refund.created", color: "#7C3AED" },
    { label: "customer.updated", color: "#0891B2" },
    { label: "checkout.published", color: "#059669" },
    { label: "webhook.delivered", color: "#D97706" },
  ];

  return (
    <SectionCard
      title="Events"
      subtitle="A real-time timeline of every event fired across your workspace."
      actions={
        <div className="flex gap-1.5">
          <SecondaryButton>
            <Filter className="mr-1.5 h-3.5 w-3.5" /> Filter
          </SecondaryButton>
          <SecondaryButton>All environments</SecondaryButton>
        </div>
      }
    >
      <div className="mb-4 flex flex-wrap gap-1.5">
        {types.map((t) => (
          <span
            key={t.label}
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
            style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMuted }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: t.color }} />
            {t.label}
          </span>
        ))}
      </div>

      <div className="relative pl-6">
        <div className="absolute bottom-0 left-2 top-0 w-px" style={{ background: T.border }} />
        {["Now", "1h", "24h"].map((t) => (
          <div key={t} className="relative mb-4 last:mb-0">
            <div
              className="absolute -left-[18px] top-1.5 grid h-3 w-3 place-items-center rounded-full"
              style={{ background: T.card, border: `2px solid ${T.border}` }}
            >
              <span className="h-1 w-1 rounded-full" style={{ background: T.textFaint }} />
            </div>
            <div
              className="rounded-xl p-4"
              style={{ background: T.bg, border: `1px dashed ${T.border}` }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[11px] font-semibold uppercase"
                  style={{ color: T.textFaint }}
                >
                  {t === "Now" ? "Live stream" : `Last ${t}`}
                </span>
                <span className="text-[11px]" style={{ color: T.textMuted }}>
                  0 events
                </span>
              </div>
              <div className="mt-2 text-[12.5px]" style={{ color: T.textMuted }}>
                Events will appear here as they occur. Each event includes a full JSON payload,
                timestamp, and a one-click replay action.
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ---------------- Logs ---------------- */

function LogsSection() {
  return (
    <SectionCard
      title="Request logs"
      subtitle="Inspect every API request Tally received from your integration."
      actions={
        <div className="flex items-center gap-1.5">
          <div
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
            style={{ background: T.card, border: `1px solid ${T.border}` }}
          >
            <Search className="h-3.5 w-3.5" style={{ color: T.textMuted }} />
            <input
              placeholder="Search by endpoint, ID, IP…"
              className="w-52 bg-transparent text-[12px] outline-none"
              style={{ color: T.text }}
            />
          </div>
          <SecondaryButton>
            <Filter className="mr-1.5 h-3.5 w-3.5" /> Filters
          </SecondaryButton>
        </div>
      }
    >
      <div className="mb-3 flex flex-wrap gap-1.5">
        {["All", "2xx", "3xx", "4xx", "5xx"].map((s, i) => (
          <button
            key={s}
            className="rounded-full px-3 py-1 text-[11.5px] font-medium"
            style={{
              background: i === 0 ? "#EFF6FF" : T.card,
              border: `1px solid ${i === 0 ? "#BFDBFE" : T.border}`,
              color: i === 0 ? T.blue : T.textMuted,
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl" style={{ border: `1px solid ${T.border}` }}>
        <div
          className="grid grid-cols-[0.9fr_0.6fr_1.5fr_0.6fr_0.6fr_0.6fr] gap-3 px-4 py-2.5 text-[10.5px] font-semibold uppercase tracking-wider"
          style={{ background: T.bg, color: T.textFaint, borderBottom: `1px solid ${T.border}` }}
        >
          <div>Timestamp</div>
          <div>Method</div>
          <div>Endpoint</div>
          <div>Status</div>
          <div>Duration</div>
          <div>Env</div>
        </div>
        {/* skeleton hint */}
        <div className="flex flex-col divide-y" style={{ borderColor: T.hairline }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="grid grid-cols-[0.9fr_0.6fr_1.5fr_0.6fr_0.6fr_0.6fr] items-center gap-3 px-4 py-3"
            >
              <SkelBar w="70%" />
              <SkelBar w="50%" />
              <SkelBar w="90%" />
              <SkelBar w="40%" />
              <SkelBar w="60%" />
              <SkelBar w="40%" />
            </div>
          ))}
        </div>
        <div className="p-6">
          <EmptyState
            icon={ScrollText}
            title="No requests logged yet"
            body="Once you fire your first API call, every request will appear here with headers, body and response details."
          />
        </div>
      </div>
    </SectionCard>
  );
}

function SkelBar({ w }: { w: string }) {
  return (
    <div
      className="h-2.5 rounded"
      style={{
        width: w,
        background: "linear-gradient(90deg,#F3F4F6,#E5E7EB,#F3F4F6)",
        backgroundSize: "200% 100%",
        animation: "dev-shim 1.6s linear infinite",
      }}
    />
  );
}

/* ---------------- SDKs ---------------- */

function SDKsSection() {
  const sdks: { name: string; version: string; install: string; color: string; abbr: string }[] = [
    {
      name: "JavaScript",
      version: "3.4.1",
      install: "npm install @tally/js",
      color: "#F7DF1E",
      abbr: "JS",
    },
    {
      name: "TypeScript",
      version: "3.4.1",
      install: "npm install @tally/ts",
      color: "#3178C6",
      abbr: "TS",
    },
    {
      name: "Node.js",
      version: "3.4.1",
      install: "npm install @tally/node",
      color: "#68A063",
      abbr: "N",
    },
    {
      name: "PHP",
      version: "2.9.0",
      install: "composer require tally/tally-php",
      color: "#777BB4",
      abbr: "PHP",
    },
    {
      name: "Python",
      version: "3.2.0",
      install: "pip install tally",
      color: "#3776AB",
      abbr: "PY",
    },
    {
      name: "Go",
      version: "1.7.2",
      install: "go get github.com/tally/tally-go",
      color: "#00ADD8",
      abbr: "GO",
    },
    {
      name: "Java",
      version: "1.5.0",
      install: "implementation 'com.tally:tally:1.5.0'",
      color: "#E76F00",
      abbr: "JV",
    },
    { name: "Ruby", version: "1.4.0", install: "gem install tally", color: "#CC342D", abbr: "RB" },
  ];

  return (
    <SectionCard
      title="Official SDKs"
      subtitle="First-class libraries maintained by the Tally team."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {sdks.map((s) => (
          <div
            key={s.name}
            className="group flex flex-col gap-3 rounded-xl p-4 transition-all hover:-translate-y-0.5"
            style={{ background: T.card, border: `1px solid ${T.border}` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="grid h-8 w-8 place-items-center rounded-lg text-[10px] font-bold text-white"
                  style={{ background: s.color }}
                >
                  {s.abbr}
                </div>
                <div>
                  <div className="text-[13.5px] font-semibold" style={{ color: T.text }}>
                    {s.name}
                  </div>
                  <div className="text-[11px]" style={{ color: T.textMuted }}>
                    Latest v{s.version}
                  </div>
                </div>
              </div>
              <span
                className="rounded-full px-1.5 py-0.5 text-[9.5px] font-semibold uppercase"
                style={{ background: "#F0FDF4", color: "#166534" }}
              >
                Stable
              </span>
            </div>

            <div
              className="rounded-lg px-3 py-2 text-[11.5px]"
              style={{
                background: T.bg,
                border: `1px solid ${T.border}`,
                color: T.text,
                fontFamily: "ui-monospace, monospace",
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <code className="truncate">{s.install}</code>
                <CopyIconButton text={s.install} />
              </div>
            </div>

            <div className="flex gap-2 text-[11.5px]">
              <a
                href="#"
                className="inline-flex items-center gap-1 font-medium"
                style={{ color: T.blue }}
              >
                Docs <ArrowUpRight className="h-3 w-3" />
              </a>
              <span style={{ color: T.textFaint }}>·</span>
              <a
                href="#"
                className="inline-flex items-center gap-1 font-medium"
                style={{ color: T.textMuted }}
              >
                GitHub <ExternalLink className="h-3 w-3" />
              </a>
              <span style={{ color: T.textFaint }}>·</span>
              <a
                href="#"
                className="inline-flex items-center gap-1 font-medium"
                style={{ color: T.textMuted }}
              >
                Quickstart <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ---------------- Playground ---------------- */

function PlaygroundSection() {
  return (
    <SectionCard
      title="Playground"
      subtitle="Compose requests, save collections and iterate quickly."
      actions={
        <div className="flex gap-1.5">
          <SecondaryButton>
            <Save className="mr-1.5 h-3.5 w-3.5" /> Save
          </SecondaryButton>
          <PrimaryButton>
            <Play className="mr-1.5 h-3.5 w-3.5" /> Run
          </PrimaryButton>
        </div>
      }
    >
      <div className="grid gap-3 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div
          className="rounded-xl p-3"
          style={{ background: T.bg, border: `1px solid ${T.border}` }}
        >
          <div className="flex items-center justify-between">
            <div
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: T.textFaint }}
            >
              Collections
            </div>
            <button
              className="grid h-6 w-6 place-items-center rounded"
              style={{ color: T.textMuted }}
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="mt-2 flex flex-col gap-1">
            {["Untitled collection"].map((c) => (
              <div
                key={c}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px]"
                style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
              >
                <Layers className="h-3.5 w-3.5" style={{ color: T.textMuted }} /> {c}
              </div>
            ))}
          </div>
          <div
            className="mt-4 text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: T.textFaint }}
          >
            History
          </div>
          <div className="mt-2 text-[11.5px] italic" style={{ color: T.textMuted }}>
            No recent runs. Requests you execute will appear here.
          </div>
        </div>

        <div className="overflow-hidden rounded-xl" style={{ border: `1px solid ${T.border}` }}>
          <div
            className="flex items-center gap-2 border-b px-3 py-2"
            style={{ borderColor: T.border, background: T.bg }}
          >
            <span
              className="rounded px-1.5 py-0.5 text-[10.5px] font-bold"
              style={{ background: "#DCFCE7", color: "#166534" }}
            >
              GET
            </span>
            <code
              className="text-[12px]"
              style={{ color: T.text, fontFamily: "ui-monospace, monospace" }}
            >
              /v1/payments/{"{"}id{"}"}
            </code>
          </div>
          <CodeBlock
            lang="js"
            code={`import Tally from '@tally/node';\nconst tally = new Tally(process.env.TALLY_KEY);\n\nconst payment = await tally.payments.retrieve('pi_•••');\nconsole.log(payment.status);`}
          />
        </div>
      </div>
    </SectionCard>
  );
}

/* ---------------- Sandbox ---------------- */

function SandboxSection() {
  return (
    <div className="flex flex-col gap-5">
      <SectionCard
        title="Sandbox environment"
        subtitle="Everything you build here is isolated from live money."
        actions={
          <span
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
            style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", color: T.blue }}
          >
            <FlaskConical className="h-3 w-3" /> Sandbox active
          </span>
        }
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { title: "Test key", value: "sk_test_•••", icon: KeyRound },
            { title: "Currency", value: "USD, EUR, GBP", icon: Globe },
            { title: "3DS mode", value: "Automatic", icon: ShieldCheck },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="rounded-xl p-3"
                style={{ background: T.bg, border: `1px solid ${T.border}` }}
              >
                <div
                  className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: T.textFaint }}
                >
                  <Icon className="h-3 w-3" /> {s.title}
                </div>
                <div className="mt-1 text-[13px] font-medium" style={{ color: T.text }}>
                  {s.value}
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard
        title="Test data generators"
        subtitle="On-demand tools — nothing is created until you click."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Create test customer",
              body: "Generate a fake customer with valid metadata for API testing.",
              cta: "Generate customer",
            },
            {
              title: "Create test payment",
              body: "Fires a payment intent with a chosen amount, currency and outcome.",
              cta: "Create payment",
            },
            {
              title: "Simulate a refund",
              body: "Trigger a refund flow against an existing test payment.",
              cta: "Simulate refund",
            },
            {
              title: "Trigger a webhook",
              body: "Send a signed event to any of your endpoints to test handling.",
              cta: "Fire webhook",
            },
            {
              title: "Simulate a dispute",
              body: "Open a chargeback in sandbox to exercise your evidence flow.",
              cta: "Open dispute",
            },
            {
              title: "Reset environment",
              body: "Wipe sandbox data and start from a clean slate.",
              cta: "Reset sandbox",
              danger: true,
            },
          ].map((c) => (
            <div
              key={c.title}
              className="flex flex-col rounded-xl p-4"
              style={{ background: T.card, border: `1px solid ${T.border}` }}
            >
              <div className="text-[13px] font-semibold" style={{ color: T.text }}>
                {c.title}
              </div>
              <div
                className="mt-1 flex-1 text-[12px] leading-relaxed"
                style={{ color: T.textMuted }}
              >
                {c.body}
              </div>
              <button
                className="mt-3 self-start rounded-lg px-3 py-1.5 text-[12px] font-medium"
                style={{
                  background: c.danger ? T.card : "#EFF6FF",
                  border: `1px solid ${c.danger ? T.border : "#BFDBFE"}`,
                  color: c.danger ? "#B91C1C" : T.blue,
                }}
              >
                {c.cta}
              </button>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

/* ---------------- Rate limits ---------------- */

function LimitsSection() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Current usage", value: "0", suffix: "req/s" },
          { label: "Remaining", value: "100", suffix: "req/s" },
          { label: "Quota", value: "8.6M", suffix: "req/day" },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <div
              className="text-[11px] font-medium uppercase tracking-wide"
              style={{ color: T.textFaint }}
            >
              {s.label}
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-[24px] font-semibold" style={{ color: T.text }}>
                {s.value}
              </span>
              <span className="text-[11.5px]" style={{ color: T.textMuted }}>
                {s.suffix}
              </span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full" style={{ background: T.bg }}>
              <div className="h-full rounded-full" style={{ width: "0%", background: T.blue }} />
            </div>
          </Card>
        ))}
      </div>

      <SectionCard title="Traffic (last 24h)" subtitle="Hourly rate limit usage across all keys.">
        <FakeChart />
        <div className="mt-3 text-[11.5px]" style={{ color: T.textMuted }}>
          Chart will populate once your integration starts sending traffic.
        </div>
      </SectionCard>
    </div>
  );
}

function FakeChart() {
  const bars = Array.from({ length: 24 }, () => 6 + Math.random() * 10);
  return (
    <div className="flex h-32 items-end gap-1.5">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t"
          style={{
            height: `${h}%`,
            background: "linear-gradient(180deg, #DBEAFE, #EFF6FF)",
            border: `1px solid ${T.border}`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- Docs ---------------- */

function DocsSection() {
  const guides = [
    {
      title: "Authentication",
      body: "Bearer tokens, restricted keys, key rotation.",
      icon: KeyRound,
    },
    { title: "Errors", body: "Structure, HTTP codes and idempotent retries.", icon: ShieldCheck },
    { title: "Pagination", body: "Cursor-based iteration for large result sets.", icon: Layers },
    { title: "Webhooks", body: "Delivery, retries and signature verification.", icon: Webhook },
    { title: "SDK guides", body: "Language-specific setup and conventions.", icon: Package },
    { title: "Idempotency", body: "Safe retries with the Idempotency-Key header.", icon: RotateCw },
  ];

  return (
    <SectionCard
      title="Documentation"
      subtitle="Search the entire developer knowledge base without leaving the workspace."
      actions={
        <a
          href="#"
          className="inline-flex items-center gap-1 text-[12px] font-medium"
          style={{ color: T.blue }}
        >
          Open full docs <ArrowUpRight className="h-3 w-3" />
        </a>
      }
    >
      <div
        className="flex items-center gap-2 rounded-xl px-3 py-2.5"
        style={{ background: T.bg, border: `1px solid ${T.border}` }}
      >
        <Search className="h-4 w-4" style={{ color: T.textMuted }} />
        <input
          placeholder="Search docs — endpoints, error codes, guides…"
          className="flex-1 bg-transparent text-[13px] outline-none"
          style={{ color: T.text }}
        />
        <kbd
          className="rounded border px-1.5 py-0.5 text-[10px] font-medium"
          style={{ borderColor: T.border, background: T.card, color: T.textMuted }}
        >
          /
        </kbd>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => {
          const Icon = g.icon;
          return (
            <a
              key={g.title}
              href="#"
              className="group flex flex-col gap-2 rounded-xl p-4 transition-all hover:-translate-y-0.5"
              style={{ background: T.card, border: `1px solid ${T.border}` }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="grid h-8 w-8 place-items-center rounded-lg"
                  style={{ background: "#EFF6FF", color: T.blue }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <ChevronRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  style={{ color: T.textFaint }}
                />
              </div>
              <div className="text-[13.5px] font-semibold" style={{ color: T.text }}>
                {g.title}
              </div>
              <div className="text-[12px] leading-relaxed" style={{ color: T.textMuted }}>
                {g.body}
              </div>
            </a>
          );
        })}
      </div>
    </SectionCard>
  );
}

/* ---------------- Changelog ---------------- */

function ChangelogSection() {
  const releases = [
    {
      version: "v2026.07.01",
      date: "July 1, 2026",
      tag: "Feature",
      tagColor: "#166534",
      tagBg: "#DCFCE7",
      title: "Real-time event stream",
      body: "Subscribe to the /v1/events endpoint over server-sent events for sub-second delivery.",
    },
    {
      version: "v2026.06.14",
      date: "June 14, 2026",
      tag: "Improvement",
      tagColor: T.blue,
      tagBg: "#EFF6FF",
      title: "Idempotency keys on refunds",
      body: "Prevent duplicate refunds by attaching Idempotency-Key to /v1/refunds.",
    },
    {
      version: "v2026.05.02",
      date: "May 2, 2026",
      tag: "Breaking",
      tagColor: "#B91C1C",
      tagBg: "#FEE2E2",
      title: "Removed deprecated payments.charge",
      body: "Use payments.create with capture_method='automatic' instead.",
    },
  ];

  return (
    <SectionCard
      title="Changelog"
      subtitle="Every release with breaking changes flagged clearly."
      actions={
        <SecondaryButton>
          <FileCode2 className="mr-1.5 h-3.5 w-3.5" /> RSS
        </SecondaryButton>
      }
    >
      <div className="relative pl-6">
        <div className="absolute bottom-0 left-2 top-0 w-px" style={{ background: T.border }} />
        <div className="flex flex-col gap-3">
          {releases.map((r) => (
            <div key={r.version} className="relative">
              <div
                className="absolute -left-[18px] top-3 grid h-3 w-3 place-items-center rounded-full"
                style={{ background: T.card, border: `2px solid ${T.blue}` }}
              />
              <div
                className="rounded-xl p-4"
                style={{ background: T.card, border: `1px solid ${T.border}` }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <code
                      className="text-[12px] font-semibold"
                      style={{ color: T.text, fontFamily: "ui-monospace, monospace" }}
                    >
                      {r.version}
                    </code>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
                      style={{ background: r.tagBg, color: r.tagColor }}
                    >
                      {r.tag}
                    </span>
                  </div>
                  <span className="text-[11px]" style={{ color: T.textFaint }}>
                    {r.date}
                  </span>
                </div>
                <div className="mt-2 text-[14px] font-semibold" style={{ color: T.text }}>
                  {r.title}
                </div>
                <div
                  className="mt-0.5 text-[12.5px] leading-relaxed"
                  style={{ color: T.textMuted }}
                >
                  {r.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes dev-shim { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }`}</style>
    </SectionCard>
  );
}
