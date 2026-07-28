import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ComponentType, type ReactNode } from "react";
import {
  Building2,
  User,
  Users,
  ShieldCheck,
  Palette,
  Bell,
  Lock,
  KeyRound,
  Webhook,
  CreditCard,
  Globe,
  Puzzle,
  Terminal,
  ScrollText,
  AlertOctagon,
  Search,
  Command,
  Check,
  Copy,
  RefreshCw,
  Plus,
  Trash2,
  ExternalLink,
  Upload,
  Sun,
  Moon,
  Monitor,
  ChevronRight,
  Sparkles,
  Circle,
  ShoppingBag,
  Store,
  ShoppingCart,
  Zap,
  MessageSquare,
  BarChart3,
  Facebook,
  Layers,
  Info,
  X,
} from "lucide-react";
import {
  AppShell,
  PageHeader,
  Card,
  PrimaryButton,
  SecondaryButton,
  EmptyState,
  T,
  SHADOW_LIFT,
} from "@/components/app/AppShell";

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
  head: () => ({
    meta: [
      { title: "Settings — Tally" },
      {
        name: "description",
        content: "Configure your workspace, team, security, integrations and billing.",
      },
      { property: "og:title", content: "Settings — Tally" },
      { property: "og:description", content: "A premium settings hub for your Tally workspace." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const KEYFRAMES = `
@keyframes s-rise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes s-pop { 0% { transform: scale(.9); opacity: 0 } 60% { transform: scale(1.05); opacity: 1 } 100% { transform: scale(1); opacity: 1 } }
@keyframes s-pulse { 0%,100% { opacity: .5 } 50% { opacity: 1 } }
`;

type SectionKey =
  | "workspace"
  | "profile"
  | "team"
  | "roles"
  | "branding"
  | "notifications"
  | "security"
  | "api"
  | "webhooks"
  | "billing"
  | "domains"
  | "integrations"
  | "developer"
  | "audit"
  | "danger";

type NavItem = {
  key: SectionKey;
  label: string;
  icon: ComponentType<{ className?: string }>;
  group: string;
  accent?: string;
};

const NAV: NavItem[] = [
  { key: "workspace", label: "Workspace", icon: Building2, group: "General" },
  { key: "profile", label: "Profile", icon: User, group: "General" },
  { key: "team", label: "Team members", icon: Users, group: "Access" },
  { key: "roles", label: "Roles & permissions", icon: ShieldCheck, group: "Access" },
  { key: "branding", label: "Branding", icon: Palette, group: "Appearance" },
  { key: "notifications", label: "Notifications", icon: Bell, group: "Appearance" },
  { key: "security", label: "Security", icon: Lock, group: "Security" },
  { key: "api", label: "API keys", icon: KeyRound, group: "Developers" },
  { key: "webhooks", label: "Webhooks", icon: Webhook, group: "Developers" },
  { key: "developer", label: "Developer", icon: Terminal, group: "Developers" },
  { key: "billing", label: "Billing", icon: CreditCard, group: "Workspace" },
  { key: "domains", label: "Domains", icon: Globe, group: "Workspace" },
  { key: "integrations", label: "Integrations", icon: Puzzle, group: "Workspace" },
  { key: "audit", label: "Audit logs", icon: ScrollText, group: "Compliance" },
  { key: "danger", label: "Danger zone", icon: AlertOctagon, group: "Compliance", accent: T.red },
];

function SettingsPage() {
  const [active, setActive] = useState<SectionKey>("workspace");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NAV;
    return NAV.filter(
      (n) => n.label.toLowerCase().includes(q) || n.group.toLowerCase().includes(q),
    );
  }, [query]);

  const groups = useMemo(() => {
    const g: Record<string, NavItem[]> = {};
    for (const n of filtered) (g[n.group] ||= []).push(n);
    return g;
  }, [filtered]);

  const showToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 2200);
  };

  return (
    <AppShell>
      <style>{KEYFRAMES}</style>

      <PageHeader
        title="Settings"
        description="Configure your workspace and preferences."
        actions={
          <>
            <WorkspaceSelector />
            <div
              className="hidden md:flex items-center gap-2 rounded-lg px-3 py-2 text-[12.5px]"
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.textMuted }}
            >
              <Search className="h-3.5 w-3.5" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search settings"
                className="w-40 bg-transparent outline-none placeholder:opacity-70"
                style={{ color: T.text }}
              />
              <span
                className="ml-1 flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10.5px] font-semibold"
                style={{ background: T.hairline, color: T.textFaint }}
              >
                <Command className="h-2.5 w-2.5" />K
              </span>
            </div>
          </>
        }
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* LEFT NAV */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div
            className="rounded-3xl p-2"
            style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              boxShadow: "0 1px 2px rgba(17,17,17,.04)",
            }}
          >
            {Object.keys(groups).length === 0 ? (
              <p className="px-3 py-6 text-center text-[12.5px]" style={{ color: T.textMuted }}>
                No matching setting.
              </p>
            ) : (
              Object.entries(groups).map(([group, items]) => (
                <div key={group} className="px-1 py-1.5">
                  <p
                    className="px-2.5 pb-1.5 pt-1 text-[10.5px] font-semibold uppercase tracking-wider"
                    style={{ color: T.textFaint }}
                  >
                    {group}
                  </p>
                  <ul className="space-y-0.5">
                    {items.map((n) => {
                      const isActive = active === n.key;
                      const accent = n.accent ?? T.blue;
                      return (
                        <li key={n.key}>
                          <button
                            onClick={() => setActive(n.key)}
                            className="group relative flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-[13px] font-medium transition-all"
                            style={{
                              background: isActive ? T.hairline : "transparent",
                              color: n.accent && !isActive ? T.red : T.text,
                            }}
                            onMouseEnter={(e) => {
                              if (!isActive) e.currentTarget.style.background = T.bg;
                            }}
                            onMouseLeave={(e) => {
                              if (!isActive) e.currentTarget.style.background = "transparent";
                            }}
                          >
                            <span
                              aria-hidden
                              className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full transition-opacity"
                              style={{ background: accent, opacity: isActive ? 1 : 0 }}
                            />
                            <n.icon className="h-4 w-4" />
                            <span className="flex-1 truncate">{n.label}</span>
                            <ChevronRight
                              className="h-3.5 w-3.5 transition-transform"
                              style={{
                                color: T.textFaint,
                                transform: isActive ? "translateX(2px)" : "translateX(-4px)",
                                opacity: isActive ? 1 : 0,
                              }}
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* RIGHT PANEL */}
        <section
          key={active}
          style={{ animation: "s-rise .28s ease-out both" }}
          className="min-w-0 space-y-6"
        >
          {active === "workspace" && (
            <WorkspaceSection onSaved={() => showToast("Workspace saved")} />
          )}
          {active === "profile" && <ProfileSection onSaved={() => showToast("Profile saved")} />}
          {active === "team" && <TeamSection />}
          {active === "roles" && <RolesSection />}
          {active === "branding" && (
            <BrandingSection onSaved={() => showToast("Branding updated")} />
          )}
          {active === "notifications" && <NotificationsSection />}
          {active === "security" && <SecuritySection />}
          {active === "api" && <ApiSection onCopied={() => showToast("Copied to clipboard")} />}
          {active === "webhooks" && <WebhooksSection />}
          {active === "billing" && <BillingSection />}
          {active === "domains" && <DomainsSection />}
          {active === "integrations" && <IntegrationsSection onToast={showToast} />}
          {active === "developer" && <DeveloperSection />}
          {active === "audit" && <AuditSection />}
          {active === "danger" && (
            <DangerSection onDone={() => showToast("Confirmation required")} />
          )}
        </section>
      </div>

      <Toast text={toast} />
    </AppShell>
  );
}

/* ============================================================
   Shared primitives
   ============================================================ */
function SectionHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <h2 className="text-[20px] font-semibold tracking-tight" style={{ color: T.text }}>
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-[13px]" style={{ color: T.textMuted }}>
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold" style={{ color: T.text }}>
        {label}
      </span>
      {children}
      {hint && (
        <span className="mt-1 block text-[11.5px]" style={{ color: T.textFaint }}>
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
      className={`w-full rounded-xl px-3 py-2 text-[13px] outline-none transition-all placeholder:opacity-70 focus:ring-2 ${props.className ?? ""}`}
      style={{
        background: T.bg,
        border: `1px solid ${T.border}`,
        color: T.text,
        ...(props.style as object),
      }}
    />
  );
}

function Select({ options, defaultValue }: { options: string[]; defaultValue?: string }) {
  return (
    <select
      defaultValue={defaultValue}
      className="w-full rounded-xl px-3 py-2 text-[13px] outline-none"
      style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text }}
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="relative h-6 w-11 shrink-0 rounded-full transition-colors"
      style={{ background: on ? T.text : T.border }}
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

function StatusPill({
  tone,
  children,
}: {
  tone: "green" | "amber" | "red" | "muted" | "blue";
  children: ReactNode;
}) {
  const c = { green: T.green, amber: T.amber, red: T.red, blue: T.blue, muted: T.textMuted }[tone];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold"
      style={{ background: `${c}15`, color: c }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
      {children}
    </span>
  );
}

function Toast({ text }: { text: string | null }) {
  if (!text) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center">
      <div
        className="pointer-events-auto flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-white"
        style={{
          background: T.text,
          boxShadow: SHADOW_LIFT,
          animation: "s-pop .25s ease-out both",
        }}
      >
        <span
          className="grid h-5 w-5 place-items-center rounded-full"
          style={{ background: T.green }}
        >
          <Check className="h-3 w-3" />
        </span>
        {text}
      </div>
    </div>
  );
}

/* ============================================================
   Workspace selector
   ============================================================ */
function WorkspaceSelector() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-semibold"
        style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
      >
        <span
          className="grid h-5 w-5 place-items-center rounded-md text-white text-[10px] font-bold"
          style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.violet})` }}
        >
          T
        </span>
        Tally Workspace
        <ChevronRight className="h-3.5 w-3.5 rotate-90" style={{ color: T.textFaint }} />
      </button>
      {open && (
        <div
          className="absolute right-0 top-full z-30 mt-1.5 w-64 rounded-xl p-1.5"
          style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            boxShadow: SHADOW_LIFT,
            animation: "s-rise .18s ease-out both",
          }}
        >
          <div
            className="px-2.5 pb-1.5 pt-1 text-[10.5px] font-semibold uppercase tracking-wider"
            style={{ color: T.textFaint }}
          >
            Your workspaces
          </div>
          {["Tally Workspace"].map((w) => (
            <button
              key={w}
              className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-[13px]"
              style={{ color: T.text }}
              onMouseEnter={(e) => (e.currentTarget.style.background = T.hairline)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span>{w}</span>
              <Check className="h-3.5 w-3.5" style={{ color: T.blue }} />
            </button>
          ))}
          <div className="my-1 h-px" style={{ background: T.border }} />
          <button
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] font-semibold"
            style={{ color: T.blue }}
            onMouseEnter={(e) => (e.currentTarget.style.background = T.hairline)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <Plus className="h-3.5 w-3.5" /> Create workspace
          </button>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Sections
   ============================================================ */

function WorkspaceSection({ onSaved }: { onSaved: () => void }) {
  return (
    <>
      <SectionHeader
        title="Workspace"
        description="How your workspace appears to teammates and partners."
        actions={
          <PrimaryButton onClick={onSaved}>
            <Check className="h-4 w-4" /> Save changes
          </PrimaryButton>
        }
      />
      <Card>
        <div className="grid gap-6 md:grid-cols-[auto_1fr]">
          <LogoUpload />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Workspace name">
              <TextInput defaultValue="Tally Workspace" />
            </Field>
            <Field label="Workspace slug" hint="tally.app/w/your-slug">
              <TextInput defaultValue="tally-workspace" />
            </Field>
            <Field label="Timezone">
              <Select
                options={["Europe/Paris (UTC+01)", "UTC", "America/New_York", "Asia/Tokyo"]}
              />
            </Field>
            <Field label="Default currency">
              <Select options={["EUR — Euro", "USD — US Dollar", "GBP — Pound", "JPY — Yen"]} />
            </Field>
            <Field label="Language">
              <Select options={["English", "Français", "Español", "Deutsch"]} />
            </Field>
            <Field label="Merchant category">
              <Select options={["Ecommerce", "SaaS", "Marketplace", "Digital goods"]} />
            </Field>
          </div>
        </div>
      </Card>

      <Card>
        <SectionHeader
          title="Business information"
          description="Used on invoices and compliance filings."
        />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Field label="Legal company name">
            <TextInput placeholder="Tally SAS" />
          </Field>
          <Field label="VAT number">
            <TextInput placeholder="FR12 345 678 901" />
          </Field>
          <Field label="Company address">
            <TextInput placeholder="Street, city, country" />
          </Field>
          <Field label="Registration number">
            <TextInput placeholder="RCS…" />
          </Field>
        </div>
      </Card>
    </>
  );
}

function LogoUpload() {
  return (
    <div className="flex items-start gap-4">
      <div
        className="grid h-20 w-20 place-items-center rounded-2xl text-white text-[22px] font-bold"
        style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.violet})` }}
      >
        T
      </div>
      <div className="flex flex-col gap-2 pt-1">
        <p className="text-[12px] font-semibold" style={{ color: T.text }}>
          Workspace logo
        </p>
        <p className="text-[11.5px]" style={{ color: T.textFaint }}>
          SVG or PNG, max 1MB
        </p>
        <div className="flex gap-2">
          <SecondaryButton>
            <Upload className="h-3.5 w-3.5" /> Upload
          </SecondaryButton>
          <button
            className="rounded-lg px-3 py-1.5 text-[12px] font-semibold"
            style={{ color: T.textMuted }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileSection({ onSaved }: { onSaved: () => void }) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  return (
    <>
      <SectionHeader
        title="Profile"
        description="Personal preferences that apply across your account."
        actions={
          <PrimaryButton onClick={onSaved}>
            <Check className="h-4 w-4" /> Save profile
          </PrimaryButton>
        }
      />
      <Card>
        <div className="grid gap-6 md:grid-cols-[auto_1fr]">
          <div className="flex items-start gap-4">
            <div
              className="grid h-20 w-20 place-items-center rounded-full text-white text-[22px] font-bold"
              style={{ background: `linear-gradient(135deg, ${T.violet}, ${T.pink})` }}
            >
              M
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <p className="text-[12px] font-semibold" style={{ color: T.text }}>
                Avatar
              </p>
              <p className="text-[11.5px]" style={{ color: T.textFaint }}>
                Recommended 400×400
              </p>
              <SecondaryButton>
                <Upload className="h-3.5 w-3.5" /> Upload photo
              </SecondaryButton>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Full name">
              <TextInput placeholder="Your name" />
            </Field>
            <Field label="Email">
              <TextInput type="email" placeholder="you@company.com" />
            </Field>
            <Field label="Phone number">
              <TextInput placeholder="+33…" />
            </Field>
            <Field label="Preferred language">
              <Select options={["English", "Français", "Español", "Deutsch"]} />
            </Field>
            <Field label="Time format">
              <Select options={["24-hour", "12-hour"]} />
            </Field>
          </div>
        </div>
      </Card>

      <Card>
        <SectionHeader title="Appearance" description="Choose how Tally looks on this device." />
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            { k: "light" as const, label: "Light", icon: Sun },
            { k: "dark" as const, label: "Dark", icon: Moon },
            { k: "system" as const, label: "System", icon: Monitor },
          ].map((o) => (
            <button
              key={o.k}
              onClick={() => setTheme(o.k)}
              className="flex items-center justify-between rounded-2xl p-4 text-left transition-all hover:-translate-y-0.5"
              style={{
                background: theme === o.k ? T.hairline : T.bg,
                border: `1.5px solid ${theme === o.k ? T.blue : T.border}`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="grid h-9 w-9 place-items-center rounded-xl"
                  style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
                >
                  <o.icon className="h-4 w-4" />
                </div>
                <span className="text-[13px] font-semibold" style={{ color: T.text }}>
                  {o.label}
                </span>
              </div>
              {theme === o.k && <Check className="h-4 w-4" style={{ color: T.blue }} />}
            </button>
          ))}
        </div>
      </Card>
    </>
  );
}

function TeamSection() {
  const [inviteOpen, setInviteOpen] = useState(false);
  return (
    <>
      <SectionHeader
        title="Team members"
        description="Invite teammates and control what they can do."
        actions={
          <PrimaryButton onClick={() => setInviteOpen(true)}>
            <Plus className="h-4 w-4" /> Invite member
          </PrimaryButton>
        }
      />
      <Card padded={false}>
        <div
          className="grid grid-cols-6 gap-3 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: T.textFaint, borderBottom: `1px solid ${T.border}`, background: T.bg }}
        >
          <span className="col-span-2">Member</span>
          <span>Role</span>
          <span>Status</span>
          <span>Last login</span>
          <span className="text-right">Actions</span>
        </div>
        <EmptyState
          icon={Users}
          title="No team members yet"
          description="Invite teammates to collaborate on payments, disputes and analytics."
          action={
            <PrimaryButton onClick={() => setInviteOpen(true)}>
              <Plus className="h-4 w-4" /> Invite your first teammate
            </PrimaryButton>
          }
        />
      </Card>

      {inviteOpen && (
        <Modal
          onClose={() => setInviteOpen(false)}
          title="Invite team member"
          subtitle="They'll receive an email with a secure link."
        >
          <div className="grid gap-4">
            <Field label="Email address">
              <TextInput type="email" placeholder="teammate@company.com" />
            </Field>
            <Field label="Role">
              <Select options={["Administrator", "Finance", "Support", "Developer", "Read only"]} />
            </Field>
            <Field label="Personal note (optional)">
              <TextInput placeholder="Welcome to the team!" />
            </Field>
          </div>
          <div className="mt-5 flex items-center justify-end gap-2">
            <SecondaryButton onClick={() => setInviteOpen(false)}>Cancel</SecondaryButton>
            <PrimaryButton onClick={() => setInviteOpen(false)}>
              <Plus className="h-4 w-4" /> Send invite
            </PrimaryButton>
          </div>
        </Modal>
      )}
    </>
  );
}

function RolesSection() {
  const roles = ["Administrator", "Finance", "Support", "Developer", "Read only"];
  const permissions = [
    "View dashboard",
    "Manage payments",
    "Refund payments",
    "Manage payouts",
    "Manage team",
    "View reports",
    "Manage integrations",
    "Manage API keys",
  ];
  const matrix: Record<string, boolean[]> = {
    Administrator: permissions.map(() => true),
    Finance: [true, true, true, true, false, true, false, false],
    Support: [true, true, true, false, false, true, false, false],
    Developer: [true, false, false, false, false, true, true, true],
    "Read only": [true, false, false, false, false, true, false, false],
  };
  return (
    <>
      <SectionHeader
        title="Roles & permissions"
        description="Fine-grained access based on responsibilities."
        actions={
          <PrimaryButton>
            <Plus className="h-4 w-4" /> Create custom role
          </PrimaryButton>
        }
      />
      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-separate border-spacing-0">
            <thead style={{ background: T.bg }}>
              <tr>
                <th
                  className="sticky left-0 z-10 px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider"
                  style={{
                    color: T.textFaint,
                    background: T.bg,
                    borderBottom: `1px solid ${T.border}`,
                  }}
                >
                  Permission
                </th>
                {roles.map((r) => (
                  <th
                    key={r}
                    className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: T.textFaint, borderBottom: `1px solid ${T.border}` }}
                  >
                    {r}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((p, i) => (
                <tr key={p}>
                  <td
                    className="sticky left-0 z-10 px-5 py-3 text-[13px] font-medium"
                    style={{
                      color: T.text,
                      background: T.card,
                      borderBottom: `1px solid ${T.border}`,
                    }}
                  >
                    {p}
                  </td>
                  {roles.map((r) => (
                    <td
                      key={r}
                      className="px-5 py-3 text-center"
                      style={{ borderBottom: `1px solid ${T.border}` }}
                    >
                      {matrix[r][i] ? (
                        <span
                          className="inline-grid h-5 w-5 place-items-center rounded-md"
                          style={{ background: `${T.green}18`, color: T.green }}
                        >
                          <Check className="h-3 w-3" />
                        </span>
                      ) : (
                        <span
                          className="inline-block h-1 w-3 rounded-full"
                          style={{ background: T.border }}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function BrandingSection({ onSaved }: { onSaved: () => void }) {
  const [primary, setPrimary] = useState(T.blue);
  const [radius, setRadius] = useState(16);
  const [font, setFont] = useState("Inter");
  return (
    <>
      <SectionHeader
        title="Branding"
        description="How Tally checkout and receipts appear to your customers."
        actions={
          <PrimaryButton onClick={onSaved}>
            <Check className="h-4 w-4" /> Publish branding
          </PrimaryButton>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Logo">
              <UploadArea label="Upload logo" hint="SVG · PNG · 1MB max" />
            </Field>
            <Field label="Favicon">
              <UploadArea label="Upload favicon" hint="32×32 PNG or ICO" />
            </Field>
            <Field label="Primary color">
              <ColorInput value={primary} onChange={setPrimary} />
            </Field>
            <Field label="Accent color">
              <ColorInput value={T.violet} onChange={() => {}} />
            </Field>
            <Field label="Typography">
              <Select options={["Inter", "Söhne", "Manrope", "Söhne Mono"]} defaultValue={font} />
            </Field>
            <Field label="Button style">
              <Select options={["Solid", "Outline", "Ghost"]} />
            </Field>
            <Field label={`Corner radius · ${radius}px`}>
              <input
                type="range"
                min={4}
                max={28}
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full accent-black"
              />
            </Field>
          </div>
        </Card>

        <div>
          <p className="mb-2 text-[12px] font-semibold" style={{ color: T.textMuted }}>
            Live preview
          </p>
          <div
            className="rounded-3xl p-6"
            style={{ background: T.bg, border: `1px solid ${T.border}` }}
          >
            <div
              className="rounded-2xl p-5"
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                boxShadow: SHADOW_LIFT,
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="grid h-8 w-8 place-items-center rounded-xl text-white text-[13px] font-bold"
                  style={{ background: primary }}
                >
                  T
                </div>
                <div>
                  <p className="text-[12.5px] font-semibold" style={{ color: T.text }}>
                    Your Brand
                  </p>
                  <p className="text-[10.5px]" style={{ color: T.textFaint }}>
                    Secure checkout
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-2 w-2/3 rounded-full" style={{ background: T.hairline }} />
                <div className="h-2 w-1/2 rounded-full" style={{ background: T.hairline }} />
              </div>
              <button
                className="mt-5 w-full py-2.5 text-[13px] font-semibold text-white transition-transform hover:scale-[1.01]"
                style={{ background: primary, borderRadius: radius }}
              >
                Pay €49.00
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function UploadArea({ label, hint }: { label: string; hint: string }) {
  return (
    <div
      className="flex items-center justify-center rounded-xl p-4 text-center"
      style={{ background: T.bg, border: `1.5px dashed ${T.border}` }}
    >
      <div>
        <div
          className="mx-auto grid h-9 w-9 place-items-center rounded-xl"
          style={{ background: T.card, border: `1px solid ${T.border}`, color: T.blue }}
        >
          <Upload className="h-4 w-4" />
        </div>
        <p className="mt-2 text-[12.5px] font-semibold" style={{ color: T.text }}>
          {label}
        </p>
        <p className="text-[11px]" style={{ color: T.textFaint }}>
          {hint}
        </p>
      </div>
    </div>
  );
}

function ColorInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div
      className="flex items-center gap-2 rounded-xl px-2 py-1.5"
      style={{ background: T.bg, border: `1px solid ${T.border}` }}
    >
      <label
        className="relative h-7 w-7 shrink-0 cursor-pointer rounded-lg"
        style={{ background: value, border: `1px solid ${T.border}` }}
      >
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>
      <input
        value={value.toUpperCase()}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-[13px] font-mono outline-none"
        style={{ color: T.text }}
      />
    </div>
  );
}

function NotificationsSection() {
  const [rows, setRows] = useState([
    {
      key: "email",
      label: "Email notifications",
      desc: "Payment alerts, disputes and daily summaries.",
      on: true,
    },
    {
      key: "browser",
      label: "Browser notifications",
      desc: "Push updates while Tally is open in your browser.",
      on: false,
    },
    {
      key: "sms",
      label: "SMS notifications",
      desc: "Critical alerts only, delivered via SMS.",
      on: false,
    },
    { key: "slack", label: "Slack", desc: "Route events into a Slack channel.", on: false },
    { key: "discord", label: "Discord", desc: "Deliver events to a Discord webhook.", on: false },
    {
      key: "webhooks",
      label: "Webhook events",
      desc: "Forward every event to your endpoint.",
      on: true,
    },
  ]);
  return (
    <>
      <SectionHeader
        title="Notifications"
        description="Choose how your team hears about important events."
      />
      <Card>
        <ul className="divide-y" style={{ borderColor: T.border }}>
          {rows.map((r, i) => (
            <li
              key={r.key}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold" style={{ color: T.text }}>
                  {r.label}
                </p>
                <p className="mt-0.5 text-[12px]" style={{ color: T.textMuted }}>
                  {r.desc}
                </p>
              </div>
              <Toggle
                on={r.on}
                onChange={(v) => {
                  const copy = [...rows];
                  copy[i] = { ...r, on: v };
                  setRows(copy);
                }}
              />
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

function SecuritySection() {
  return (
    <>
      <SectionHeader
        title="Security"
        description="Protect your workspace with modern authentication."
      />
      <Card>
        <ul className="divide-y" style={{ borderColor: T.border }}>
          {[
            {
              l: "Two-factor authentication",
              d: "Add a second factor to every sign-in.",
              cta: "Enable 2FA",
              tone: "amber" as const,
              status: "Recommended",
            },
            {
              l: "Passkeys",
              d: "Passwordless sign-in with biometrics or a hardware key.",
              cta: "Add passkey",
              tone: "blue" as const,
              status: "Available",
            },
            {
              l: "Password",
              d: "Set a strong password. Last changed: never.",
              cta: "Change password",
              tone: "muted" as const,
              status: "Never updated",
            },
            {
              l: "Recovery codes",
              d: "Backup codes to sign in if you lose access.",
              cta: "Generate codes",
              tone: "blue" as const,
              status: "Not generated",
            },
          ].map((row) => (
            <li
              key={row.l}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13.5px] font-semibold" style={{ color: T.text }}>
                    {row.l}
                  </p>
                  <StatusPill tone={row.tone}>{row.status}</StatusPill>
                </div>
                <p className="mt-0.5 text-[12px]" style={{ color: T.textMuted }}>
                  {row.d}
                </p>
              </div>
              <SecondaryButton>{row.cta}</SecondaryButton>
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <SectionHeader
            title="Active sessions"
            description="Devices currently signed in to this account."
          />
          <div className="mt-4">
            <EmptyState
              icon={Monitor}
              title="Only this device"
              description="You're only signed in on the device you're using now."
            />
          </div>
        </Card>
        <Card>
          <SectionHeader
            title="Session preferences"
            description="Automatic sign-out for idle sessions."
          />
          <div className="mt-4 grid gap-4">
            <Field label="Session timeout">
              <Select
                options={["15 minutes", "30 minutes", "1 hour", "4 hours", "Never"]}
                defaultValue="30 minutes"
              />
            </Field>
            <Field label="Trusted devices">
              <Select options={["Ask every time", "Trust for 30 days", "Trust forever"]} />
            </Field>
          </div>
        </Card>
      </div>

      <Card>
        <SectionHeader
          title="Login history"
          description="Recent sign-in activity for your account."
        />
        <div className="mt-4">
          <EmptyState
            icon={ScrollText}
            title="No history yet"
            description="Sign-ins from new devices will appear here."
          />
        </div>
      </Card>
    </>
  );
}

function ApiSection({ onCopied }: { onCopied: () => void }) {
  const keys = [
    {
      label: "Publishable key",
      value: "pk_live_51H•••••••••••••••••••••••",
      tone: "blue" as const,
      canReveal: false,
      note: "Safe to use in client code",
    },
    {
      label: "Secret key",
      value: "sk_live_••••••••••••••••••••••••••••",
      tone: "amber" as const,
      canReveal: true,
      note: "Keep this key secret",
    },
    {
      label: "Webhook secret",
      value: "whsec_••••••••••••••••••••••••••",
      tone: "amber" as const,
      canReveal: true,
      note: "Used to verify webhook signatures",
    },
  ];
  return (
    <>
      <SectionHeader
        title="API keys"
        description="Use these keys to authenticate requests to the Tally API."
        actions={
          <SecondaryButton>
            <ExternalLink className="h-4 w-4" /> Documentation
          </SecondaryButton>
        }
      />
      <Card>
        <ul className="divide-y" style={{ borderColor: T.border }}>
          {keys.map((k) => (
            <li
              key={k.label}
              className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[13.5px] font-semibold" style={{ color: T.text }}>
                    {k.label}
                  </p>
                  <StatusPill tone={k.tone}>{k.tone === "blue" ? "Public" : "Secret"}</StatusPill>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <code
                    className="truncate rounded-lg px-2.5 py-1.5 font-mono text-[12px]"
                    style={{
                      background: T.bg,
                      border: `1px solid ${T.border}`,
                      color: T.text,
                      maxWidth: 340,
                    }}
                  >
                    {k.value}
                  </code>
                </div>
                <p className="mt-1.5 text-[11.5px]" style={{ color: T.textFaint }}>
                  {k.note}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <SecondaryButton onClick={onCopied}>
                  <Copy className="h-3.5 w-3.5" /> Copy
                </SecondaryButton>
                <SecondaryButton>
                  <RefreshCw className="h-3.5 w-3.5" /> Rotate
                </SecondaryButton>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

function WebhooksSection() {
  return (
    <>
      <SectionHeader
        title="Webhooks"
        description="Receive real-time events from Tally at your endpoints."
        actions={
          <PrimaryButton>
            <Plus className="h-4 w-4" /> Add endpoint
          </PrimaryButton>
        }
      />
      <Card>
        <EmptyState
          icon={Webhook}
          title="No webhooks configured"
          description="Add an endpoint URL to start receiving events like payment.succeeded or dispute.created."
          action={
            <PrimaryButton>
              <Plus className="h-4 w-4" /> Create your first webhook
            </PrimaryButton>
          }
        />
      </Card>
      <Card>
        <SectionHeader title="Sample events" description="Preview of the events Tally can send." />
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {[
            "payment.succeeded",
            "payment.failed",
            "dispute.created",
            "dispute.won",
            "payout.paid",
            "refund.created",
          ].map((e) => (
            <div
              key={e}
              className="flex items-center gap-2 rounded-xl px-3 py-2"
              style={{ background: T.bg, border: `1px solid ${T.border}` }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: T.blue, animation: "s-pulse 2s ease-in-out infinite" }}
              />
              <code className="font-mono text-[12px]" style={{ color: T.text }}>
                {e}
              </code>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function BillingSection() {
  return (
    <>
      <SectionHeader
        title="Billing"
        description="Manage your plan, invoices and payment method."
        actions={
          <PrimaryButton>
            <Sparkles className="h-4 w-4" /> Upgrade plan
          </PrimaryButton>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: T.textFaint }}
              >
                Current plan
              </p>
              <h3 className="mt-1 text-[22px] font-semibold" style={{ color: T.text }}>
                Starter
              </h3>
              <p className="mt-1 text-[13px]" style={{ color: T.textMuted }}>
                1.2% + €0.20 per successful charge · No monthly fee
              </p>
            </div>
            <StatusPill tone="green">Active</StatusPill>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { l: "Volume this month", v: "€0", h: "of unlimited" },
              { l: "Transactions", v: "0", h: "processed" },
              { l: "Next invoice", v: "—", h: "on August 1" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl p-4"
                style={{ background: T.bg, border: `1px solid ${T.border}` }}
              >
                <p className="text-[11px]" style={{ color: T.textMuted }}>
                  {s.l}
                </p>
                <p className="mt-1 text-[20px] font-semibold" style={{ color: T.text }}>
                  {s.v}
                </p>
                <p className="text-[11px]" style={{ color: T.textFaint }}>
                  {s.h}
                </p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionHeader title="Payment method" />
          <div className="mt-4">
            <EmptyState
              icon={CreditCard}
              title="No card on file"
              description="Add a payment method to enable premium features."
              action={
                <PrimaryButton>
                  <Plus className="h-4 w-4" /> Add card
                </PrimaryButton>
              }
            />
          </div>
        </Card>
      </div>
      <Card>
        <SectionHeader title="Invoices" description="Downloadable receipts for your records." />
        <div className="mt-4">
          <EmptyState
            icon={ScrollText}
            title="No invoices yet"
            description="Your first invoice will appear at the end of the billing cycle."
          />
        </div>
      </Card>
    </>
  );
}

function DomainsSection() {
  return (
    <>
      <SectionHeader
        title="Domains"
        description="Serve checkout and receipts from your own domain."
        actions={
          <PrimaryButton>
            <Plus className="h-4 w-4" /> Add domain
          </PrimaryButton>
        }
      />
      <Card>
        <div className="grid gap-3 sm:grid-cols-2">
          <DomainRow label="Primary domain" value="workspace.tally.app" status="active" />
          <DomainRow label="Checkout domain" value="checkout.tally.app" status="active" />
        </div>
        <div className="mt-6">
          <EmptyState
            icon={Globe}
            title="No custom domain yet"
            description="Point a CNAME to Tally to serve checkout from your own domain."
            action={
              <PrimaryButton>
                <Plus className="h-4 w-4" /> Connect custom domain
              </PrimaryButton>
            }
          />
        </div>
      </Card>
    </>
  );
}

function DomainRow({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: "active" | "pending";
}) {
  return (
    <div
      className="flex items-center justify-between gap-3 rounded-2xl p-4"
      style={{ background: T.bg, border: `1px solid ${T.border}` }}
    >
      <div className="min-w-0">
        <p
          className="text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: T.textFaint }}
        >
          {label}
        </p>
        <p className="mt-0.5 truncate text-[13.5px] font-semibold" style={{ color: T.text }}>
          {value}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <StatusPill tone={status === "active" ? "green" : "amber"}>SSL {status}</StatusPill>
        <span className="text-[11px]" style={{ color: T.textFaint }}>
          DNS verified
        </span>
      </div>
    </div>
  );
}

function IntegrationsSection({ onToast }: { onToast: (m: string) => void }) {
  const items = [
    { name: "Shopify", icon: ShoppingBag, cat: "Ecommerce" },
    { name: "WooCommerce", icon: Store, cat: "Ecommerce" },
    { name: "Magento", icon: ShoppingCart, cat: "Ecommerce" },
    { name: "BigCommerce", icon: Layers, cat: "Ecommerce" },
    { name: "Zapier", icon: Zap, cat: "Automation" },
    { name: "HubSpot", icon: Users, cat: "CRM" },
    { name: "Slack", icon: MessageSquare, cat: "Communication" },
    { name: "Discord", icon: MessageSquare, cat: "Communication" },
    { name: "Meta", icon: Facebook, cat: "Ads" },
    { name: "Google Analytics", icon: BarChart3, cat: "Analytics" },
  ];
  return (
    <>
      <SectionHeader
        title="Integrations"
        description="Connect Tally with the tools your team already uses."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((it, i) => (
          <div
            key={it.name}
            className="group rounded-3xl p-5 transition-all hover:-translate-y-0.5"
            style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              boxShadow: "0 1px 2px rgba(17,17,17,.04)",
              animation: "s-rise .35s ease-out both",
              animationDelay: `${i * 40}ms`,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = SHADOW_LIFT)}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 2px rgba(17,17,17,.04)")}
          >
            <div className="flex items-start justify-between">
              <div
                className="grid h-10 w-10 place-items-center rounded-xl"
                style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text }}
              >
                <it.icon className="h-4.5 w-4.5" />
              </div>
              <StatusPill tone="muted">Not connected</StatusPill>
            </div>
            <p className="mt-4 text-[14px] font-semibold" style={{ color: T.text }}>
              {it.name}
            </p>
            <p className="mt-0.5 text-[11.5px]" style={{ color: T.textFaint }}>
              {it.cat}
            </p>
            <div className="mt-4">
              <SecondaryButton onClick={() => onToast(`Connect ${it.name} — coming soon`)}>
                Connect
              </SecondaryButton>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function DeveloperSection() {
  return (
    <>
      <SectionHeader
        title="Developer"
        description="Advanced tools for engineers building on Tally."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <ToggleRow
          label="Test mode"
          desc="Use test API keys and simulate charges without moving real money."
          on
        />
        <ToggleRow label="Verbose API logs" desc="Log request and response bodies for debugging." />
        <ToggleRow
          label="Enable early features"
          desc="Access experimental APIs before public release."
        />
        <ToggleRow
          label="Idempotency required"
          desc="Reject requests missing an idempotency key."
        />
      </div>
      <Card>
        <SectionHeader title="CLI & SDKs" description="Everything you need to ship faster." />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {["Node.js SDK", "Python SDK", "Tally CLI"].map((x) => (
            <div
              key={x}
              className="flex items-center justify-between rounded-2xl p-4"
              style={{ background: T.bg, border: `1px solid ${T.border}` }}
            >
              <span className="text-[13px] font-semibold" style={{ color: T.text }}>
                {x}
              </span>
              <ExternalLink className="h-3.5 w-3.5" style={{ color: T.textMuted }} />
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function ToggleRow({
  label,
  desc,
  on: initial = false,
}: {
  label: string;
  desc: string;
  on?: boolean;
}) {
  const [on, setOn] = useState(initial);
  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[13.5px] font-semibold" style={{ color: T.text }}>
            {label}
          </p>
          <p className="mt-0.5 text-[12px]" style={{ color: T.textMuted }}>
            {desc}
          </p>
        </div>
        <Toggle on={on} onChange={setOn} />
      </div>
    </Card>
  );
}

function AuditSection() {
  return (
    <>
      <SectionHeader
        title="Audit logs"
        description="A tamper-evident trail of every change in your workspace."
      />
      <Card>
        <ol className="relative space-y-4 pl-6">
          <span
            aria-hidden
            className="absolute left-[9px] top-1 bottom-1 w-px"
            style={{ background: T.border }}
          />
          {[
            { l: "Workspace created", d: "Getting started · today", accent: T.blue },
            {
              l: "Awaiting first login",
              d: "Sign-in events will appear here",
              accent: T.textMuted,
            },
            { l: "Awaiting first API change", d: "Key rotations and updates", accent: T.textMuted },
          ].map((s, i) => (
            <li
              key={s.l}
              className="relative"
              style={{ animation: "s-rise .35s ease-out both", animationDelay: `${i * 60}ms` }}
            >
              <span
                className="absolute -left-6 top-1 grid h-4 w-4 place-items-center rounded-full"
                style={{ background: T.card, border: `2px solid ${s.accent}` }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.accent }} />
              </span>
              <p className="text-[13.5px] font-semibold" style={{ color: T.text }}>
                {s.l}
              </p>
              <p className="text-[12px]" style={{ color: T.textMuted }}>
                {s.d}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <EmptyState
            icon={ScrollText}
            title="No further activity"
            description="Every login, API change, payout update and invite will appear here."
          />
        </div>
      </Card>
    </>
  );
}

function DangerSection({ onDone }: { onDone: () => void }) {
  const [confirm, setConfirm] = useState<null | "archive" | "transfer" | "delete">(null);
  return (
    <>
      <SectionHeader
        title="Danger zone"
        description="Irreversible actions. Proceed with caution."
      />
      <div className="grid gap-4">
        <DangerRow
          title="Archive workspace"
          desc="Freeze all activity. You can restore it later from support."
          cta="Archive"
          tone="amber"
          onClick={() => setConfirm("archive")}
        />
        <DangerRow
          title="Transfer ownership"
          desc="Move this workspace to another administrator."
          cta="Transfer"
          tone="blue"
          onClick={() => setConfirm("transfer")}
        />
        <DangerRow
          title="Delete workspace"
          desc="Permanently remove this workspace, all users and data."
          cta="Delete"
          tone="red"
          onClick={() => setConfirm("delete")}
        />
      </div>

      {confirm && (
        <Modal
          onClose={() => setConfirm(null)}
          title={
            confirm === "delete"
              ? "Delete workspace"
              : confirm === "archive"
                ? "Archive workspace"
                : "Transfer ownership"
          }
          subtitle={
            confirm === "delete" ? "This action cannot be undone." : "This action is reversible."
          }
          tone={confirm === "delete" ? "red" : "amber"}
        >
          <div className="grid gap-3">
            <div
              className="flex items-start gap-2 rounded-xl p-3 text-[12px]"
              style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMuted }}
            >
              <Info className="mt-0.5 h-4 w-4 shrink-0" style={{ color: T.textFaint }} />
              Type{" "}
              <span className="mx-1 font-mono font-semibold" style={{ color: T.text }}>
                tally-workspace
              </span>{" "}
              to confirm.
            </div>
            <TextInput placeholder="Workspace slug" />
          </div>
          <div className="mt-5 flex items-center justify-end gap-2">
            <SecondaryButton onClick={() => setConfirm(null)}>Cancel</SecondaryButton>
            <button
              onClick={() => {
                setConfirm(null);
                onDone();
              }}
              className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-semibold text-white transition-all hover:brightness-110"
              style={{
                background: confirm === "delete" ? T.red : confirm === "archive" ? T.amber : T.blue,
              }}
            >
              {confirm === "delete" ? (
                <Trash2 className="h-4 w-4" />
              ) : (
                <Circle className="h-4 w-4" />
              )}{" "}
              Confirm
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

function DangerRow({
  title,
  desc,
  cta,
  tone,
  onClick,
}: {
  title: string;
  desc: string;
  cta: string;
  tone: "red" | "amber" | "blue";
  onClick: () => void;
}) {
  const c = tone === "red" ? T.red : tone === "amber" ? T.amber : T.blue;
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 rounded-3xl p-5"
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        boxShadow: "0 1px 2px rgba(17,17,17,.04)",
      }}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-[14px] font-semibold" style={{ color: T.text }}>
            {title}
          </p>
          <StatusPill tone={tone === "red" ? "red" : tone === "amber" ? "amber" : "blue"}>
            {tone === "red" ? "Destructive" : "Requires confirmation"}
          </StatusPill>
        </div>
        <p className="mt-1 text-[12.5px]" style={{ color: T.textMuted }}>
          {desc}
        </p>
      </div>
      <button
        onClick={onClick}
        className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-semibold text-white transition-all hover:brightness-110"
        style={{ background: c }}
      >
        {cta}
      </button>
    </div>
  );
}

/* ============================================================
   Modal
   ============================================================ */
function Modal({
  title,
  subtitle,
  children,
  onClose,
  tone,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onClose: () => void;
  tone?: "red" | "amber";
}) {
  const accent = tone === "red" ? T.red : tone === "amber" ? T.amber : T.blue;
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
          animation: "s-rise .22s ease-out both",
        }}
      >
        <span
          className="absolute inset-x-0 top-0 h-[3px] rounded-t-3xl"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
        />
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[18px] font-semibold" style={{ color: T.text }}>
              {title}
            </h3>
            {subtitle && (
              <p className="mt-1 text-[12.5px]" style={{ color: T.textMuted }}>
                {subtitle}
              </p>
            )}
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
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
