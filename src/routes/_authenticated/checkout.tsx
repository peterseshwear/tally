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
  ChevronUp,
  Monitor,
  Tablet as TabletIcon,
  Smartphone,
  Layers,
  Palette,
  ImageIcon,
  Wallet,
  Sliders,
  GripVertical,
  Eye,
  Save,
  History,
  UploadCloud,
  Check,
  X,
  Lock,
  ShieldCheck,
  Truck,
  Tag,
  MapPin,
  Mail,
  User,
  Package,
  Undo2,
  Redo2,
  RefreshCw,
  Star,
  Type,
  Square,
  MoveHorizontal,
  Wand2,
  ToggleLeft,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { NAV_GROUPS as SHARED_NAV_GROUPS } from "@/components/app/nav";

export const Route = createFileRoute("/_authenticated/checkout")({
  component: CheckoutBuilderPage,
  head: () => ({
    meta: [
      { title: "Checkout Builder — Tally" },
      { name: "description", content: "Design your checkout experience visually." },
      { property: "og:title", content: "Checkout Builder — Tally" },
      { property: "og:description", content: "Design your checkout experience visually." },
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
   BUILDER STATE
   ============================================================ */
type ThemeKey = "minimal" | "modern" | "luxury" | "dark" | "fashion" | "technology" | "beauty";
type ButtonStyle = "solid" | "gradient" | "outline";
type FontKey = "sora" | "inter" | "serif" | "mono";
type Device = "desktop" | "tablet" | "mobile";
type SectionKey =
  "customer" | "shipping" | "billing" | "payment" | "summary" | "discount" | "notes" | "terms";

type Design = {
  theme: ThemeKey;
  bg: string;
  surface: string;
  text: string;
  muted: string;
  primary: string;
  accent: string;
  border: string;
  radius: number;
  padding: number;
  buttonStyle: ButtonStyle;
  buttonRadius: number;
  buttonHeight: number;
  shadow: "none" | "soft" | "lift";
  font: FontKey;
  brand: string;
  cta: string;
};

const THEMES: Record<ThemeKey, Partial<Design> & { label: string; swatches: string[] }> = {
  minimal: {
    label: "Minimal",
    swatches: ["#FAFBFC", "#111111", "#111111", "#E5E5E5"],
    bg: "#FAFBFC",
    surface: "#FFFFFF",
    text: "#111111",
    muted: "#6B7280",
    primary: "#111111",
    accent: "#2563EB",
    border: "#EAEAEA",
    radius: 14,
    buttonStyle: "solid",
    font: "sora",
  },
  modern: {
    label: "Modern",
    swatches: ["#F7F8FB", "#0F172A", "#2563EB", "#7C3AED"],
    bg: "#F7F8FB",
    surface: "#FFFFFF",
    text: "#0F172A",
    muted: "#64748B",
    primary: "#2563EB",
    accent: "#7C3AED",
    border: "#E2E8F0",
    radius: 18,
    buttonStyle: "gradient",
    font: "sora",
  },
  luxury: {
    label: "Luxury",
    swatches: ["#FAF7F1", "#1B1A18", "#B08A4A", "#1B1A18"],
    bg: "#FAF7F1",
    surface: "#FFFFFF",
    text: "#1B1A18",
    muted: "#7A6F5C",
    primary: "#1B1A18",
    accent: "#B08A4A",
    border: "#EADFCB",
    radius: 4,
    buttonStyle: "solid",
    font: "serif",
  },
  dark: {
    label: "Dark",
    swatches: ["#0B0B0F", "#161620", "#7C5CFF", "#E5E7EB"],
    bg: "#0B0B0F",
    surface: "#141420",
    text: "#F5F5F7",
    muted: "#8B8B99",
    primary: "#7C5CFF",
    accent: "#22D3EE",
    border: "#26263A",
    radius: 16,
    buttonStyle: "gradient",
    font: "sora",
  },
  fashion: {
    label: "Fashion",
    swatches: ["#FFF7F5", "#1A1A1A", "#EC4899", "#F97316"],
    bg: "#FFF7F5",
    surface: "#FFFFFF",
    text: "#1A1A1A",
    muted: "#6B7280",
    primary: "#EC4899",
    accent: "#F97316",
    border: "#F5DDD3",
    radius: 22,
    buttonStyle: "gradient",
    font: "sora",
  },
  technology: {
    label: "Technology",
    swatches: ["#F5FBFF", "#0A0F1F", "#0EA5E9", "#10B981"],
    bg: "#F5FBFF",
    surface: "#FFFFFF",
    text: "#0A0F1F",
    muted: "#475569",
    primary: "#0EA5E9",
    accent: "#10B981",
    border: "#DBEAFE",
    radius: 12,
    buttonStyle: "solid",
    font: "mono",
  },
  beauty: {
    label: "Beauty",
    swatches: ["#FFF5F7", "#3B1A2E", "#DB2777", "#F59E0B"],
    bg: "#FFF5F7",
    surface: "#FFFFFF",
    text: "#3B1A2E",
    muted: "#8B5C74",
    primary: "#DB2777",
    accent: "#F59E0B",
    border: "#F7D9E2",
    radius: 26,
    buttonStyle: "solid",
    font: "serif",
  },
};

function themeDefaults(k: ThemeKey): Design {
  const base = THEMES[k];
  return {
    theme: k,
    bg: base.bg!,
    surface: base.surface!,
    text: base.text!,
    muted: base.muted!,
    primary: base.primary!,
    accent: base.accent!,
    border: base.border!,
    radius: base.radius!,
    padding: 20,
    buttonStyle: base.buttonStyle!,
    buttonRadius: 14,
    buttonHeight: 48,
    shadow: "soft",
    font: base.font!,
    brand: "Acme Store",
    cta: "Pay securely",
  };
}

const FONT_STACKS: Record<FontKey, string> = {
  sora: '"Sora", ui-sans-serif, system-ui, sans-serif',
  inter: '"Inter", "Manrope", ui-sans-serif, system-ui, sans-serif',
  serif: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
};

/* ============================================================
   ROOT
   ============================================================ */
function CheckoutBuilderPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [previewFull, setPreviewFull] = useState(false);

  const [device, setDevice] = useState<Device>("desktop");
  const [design, setDesign] = useState<Design>(() => themeDefaults("modern"));
  const [tab, setTab] = useState<"sections" | "theme" | "brand" | "payments" | "advanced">(
    "sections",
  );
  const [selected, setSelected] = useState<string>("cta");
  const [sections, setSections] = useState<SectionKey[]>([
    "customer",
    "shipping",
    "discount",
    "payment",
    "summary",
    "terms",
  ]);

  const [methods, setMethods] = useState<Record<string, boolean>>({
    visa: true,
    mastercard: true,
    amex: true,
    applepay: true,
    googlepay: true,
    paypal: true,
    klarna: false,
    sepa: false,
    bancontact: false,
    ideal: false,
    openbanking: false,
    crypto: false,
  });

  const [smart, setSmart] = useState<Record<string, boolean>>({
    oneClick: true,
    express: true,
    remember: true,
    guest: true,
    savedCards: true,
    autoCurrency: true,
    address: true,
    tax: false,
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
        setPublishOpen(false);
        setPreviewFull(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  function applyTheme(k: ThemeKey) {
    setDesign((d) => ({ ...themeDefaults(k), brand: d.brand, cta: d.cta }));
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
        <Sidebar active="checkout" />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-[1520px]">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <Breadcrumbs />
              </div>
              <div className="col-span-12">
                <PageHeader
                  onPreview={() => setPreviewFull(true)}
                  onPublish={() => setPublishOpen(true)}
                />
              </div>
            </div>

            {/* Editor 3-col */}
            <div className="mt-6 grid grid-cols-12 gap-4">
              {/* LEFT */}
              <div className="col-span-12 lg:col-span-3">
                <LeftPanel
                  tab={tab}
                  setTab={setTab}
                  design={design}
                  setDesign={setDesign}
                  applyTheme={applyTheme}
                  sections={sections}
                  setSections={setSections}
                  methods={methods}
                  setMethods={setMethods}
                  smart={smart}
                  setSmart={setSmart}
                />
              </div>

              {/* CENTER */}
              <div className="col-span-12 lg:col-span-6">
                <CenterCanvas
                  device={device}
                  setDevice={setDevice}
                  design={design}
                  sections={sections}
                  methods={methods}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>

              {/* RIGHT */}
              <div className="col-span-12 lg:col-span-3">
                <PropertiesPanel design={design} setDesign={setDesign} selected={selected} />
              </div>
            </div>

            <p className="mt-6 pb-6 text-center text-xs" style={{ color: T.textMuted }}>
              Signed in as <span style={{ color: T.text }}>{email ?? "…"}</span>
            </p>
          </div>
        </main>
      </div>

      {cmdOpen && <CommandPalette onClose={() => setCmdOpen(false)} />}
      {publishOpen && <PublishDialog design={design} onClose={() => setPublishOpen(false)} />}
      {previewFull && (
        <FullPreview
          device={device}
          design={design}
          sections={sections}
          methods={methods}
          onClose={() => setPreviewFull(false)}
        />
      )}
    </div>
  );
}

/* ============================================================
   TOP NAV + SIDEBAR (shared)
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
            <span className="flex-1 truncate">Jump to sections, themes, payment methods…</span>
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
            Draft checkout
          </p>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed" style={{ color: T.textMuted }}>
          Publish when your design is ready. Your live checkout won&apos;t change until then.
        </p>
        <button
          className="mt-3 inline-flex h-8 items-center gap-1 rounded-full px-3 text-[11px] font-medium text-white transition hover:opacity-90"
          style={{ background: T.text }}
        >
          Publish <ArrowUpRight className="h-3 w-3" aria-hidden />
        </button>
      </div>
    </aside>
  );
}

/* ============================================================
   PRIMITIVES
   ============================================================ */
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
  tone?: "muted" | "success" | "info" | "warning" | "violet";
  children: React.ReactNode;
}) {
  const map: Record<string, { bg: string; fg: string; dot: string }> = {
    muted: { bg: T.hairline, fg: T.textMuted, dot: T.textFaint },
    success: { bg: "rgba(16,185,129,0.08)", fg: "#047857", dot: T.green },
    info: { bg: "rgba(37,99,235,0.08)", fg: "#1d4ed8", dot: T.blue },
    warning: { bg: "rgba(245,158,11,0.1)", fg: "#b45309", dot: T.amber },
    violet: { bg: "rgba(124,58,237,0.08)", fg: "#6d28d9", dot: T.violet },
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
      onClick={() => onChange(!checked)}
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
      <span style={{ color: T.textMuted }}>Checkout</span>
      <ChevronRight className="h-3 w-3" style={{ color: T.textFaint }} aria-hidden />
      <span style={{ color: T.text }} className="font-medium">
        Builder
      </span>
    </nav>
  );
}

function PageHeader({ onPreview, onPublish }: { onPreview: () => void; onPublish: () => void }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="font-sora text-[26px] font-semibold tracking-tight sm:text-[30px]">
            Checkout Builder
          </h1>
          <StatusPill tone="violet">Beta</StatusPill>
        </div>
        <p className="mt-1.5 text-sm" style={{ color: T.textMuted }}>
          Design your checkout experience visually.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div
          className="hidden items-center gap-1 rounded-full p-1 md:flex"
          style={{ background: T.card, border: `1px solid ${T.border}` }}
        >
          <IconMiniBtn label="Undo">
            <Undo2 className="h-3.5 w-3.5" aria-hidden />
          </IconMiniBtn>
          <IconMiniBtn label="Redo">
            <Redo2 className="h-3.5 w-3.5" aria-hidden />
          </IconMiniBtn>
          <IconMiniBtn label="Version history">
            <History className="h-3.5 w-3.5" aria-hidden />
          </IconMiniBtn>
        </div>
        <SecondaryButton size="sm" onClick={onPreview}>
          <Eye className="h-3.5 w-3.5" aria-hidden /> Preview
        </SecondaryButton>
        <SecondaryButton size="sm">
          <Save className="h-3.5 w-3.5" aria-hidden /> Save draft
        </SecondaryButton>
        <PrimaryButton size="sm" onClick={onPublish}>
          <UploadCloud className="h-3.5 w-3.5" aria-hidden /> Publish
        </PrimaryButton>
      </div>
    </div>
  );
}

function IconMiniBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      aria-label={label}
      title={label}
      className="grid h-7 w-7 place-items-center rounded-full transition"
      style={{ color: T.textMuted }}
      onMouseEnter={(e) => (e.currentTarget.style.background = T.hairline)}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {children}
    </button>
  );
}

/* ============================================================
   LEFT PANEL
   ============================================================ */
function LeftPanel({
  tab,
  setTab,
  design,
  setDesign,
  applyTheme,
  sections,
  setSections,
  methods,
  setMethods,
  smart,
  setSmart,
}: {
  tab: "sections" | "theme" | "brand" | "payments" | "advanced";
  setTab: (t: any) => void;
  design: Design;
  setDesign: React.Dispatch<React.SetStateAction<Design>>;
  applyTheme: (k: ThemeKey) => void;
  sections: SectionKey[];
  setSections: React.Dispatch<React.SetStateAction<SectionKey[]>>;
  methods: Record<string, boolean>;
  setMethods: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  smart: Record<string, boolean>;
  setSmart: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) {
  const tabs = [
    { k: "sections", label: "Sections", icon: Layers },
    { k: "theme", label: "Theme", icon: Palette },
    { k: "brand", label: "Brand", icon: ImageIcon },
    { k: "payments", label: "Payments", icon: Wallet },
    { k: "advanced", label: "Advanced", icon: Sliders },
  ] as const;

  return (
    <div
      className="sticky top-[88px] flex max-h-[calc(100dvh-110px)] flex-col overflow-hidden rounded-3xl"
      style={{ background: T.card, border: `1px solid ${T.border}`, boxShadow: SHADOW_SOFT }}
    >
      <div
        className="grid shrink-0 grid-cols-5 gap-0.5 p-1"
        style={{ borderBottom: `1px solid ${T.border}` }}
      >
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.k;
          return (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              title={t.label}
              className="group relative grid h-9 place-items-center rounded-xl text-[11px] font-medium transition-all"
              style={{
                background: active ? T.bg : "transparent",
                color: active ? T.text : T.textMuted,
              }}
              onMouseEnter={(e) => {
                if (!active) (e.currentTarget as HTMLElement).style.background = T.hairline;
              }}
              onMouseLeave={(e) => {
                if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <Icon className="h-4 w-4" aria-hidden />
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {tab === "sections" && <SectionsTab sections={sections} setSections={setSections} />}
        {tab === "theme" && <ThemeTab current={design.theme} apply={applyTheme} />}
        {tab === "brand" && <BrandTab design={design} setDesign={setDesign} />}
        {tab === "payments" && <PaymentsTab methods={methods} setMethods={setMethods} />}
        {tab === "advanced" && <AdvancedTab smart={smart} setSmart={setSmart} />}
      </div>
    </div>
  );
}

const SECTION_META: Record<SectionKey, { label: string; icon: typeof Layers }> = {
  customer: { label: "Customer Information", icon: User },
  shipping: { label: "Shipping Address", icon: Truck },
  billing: { label: "Billing Address", icon: MapPin },
  payment: { label: "Payment Method", icon: CreditCard },
  summary: { label: "Order Summary", icon: Package },
  discount: { label: "Discount Code", icon: Tag },
  notes: { label: "Order Notes", icon: Type },
  terms: { label: "Terms & Consent", icon: ShieldCheck },
};

function SectionsTab({
  sections,
  setSections,
}: {
  sections: SectionKey[];
  setSections: React.Dispatch<React.SetStateAction<SectionKey[]>>;
}) {
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  function reorder(from: number, to: number) {
    setSections((s) => {
      const copy = [...s];
      const [x] = copy.splice(from, 1);
      copy.splice(to, 0, x);
      return copy;
    });
  }

  const available = (Object.keys(SECTION_META) as SectionKey[]).filter(
    (k) => !sections.includes(k),
  );

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p
          className="mb-2 text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: T.textFaint }}
        >
          In your checkout
        </p>
        <ul className="flex flex-col gap-1.5">
          {sections.map((k, i) => {
            const meta = SECTION_META[k];
            const Icon = meta.icon;
            const isOver = overIdx === i && dragIdx !== null && dragIdx !== i;
            return (
              <li
                key={k}
                draggable
                onDragStart={() => setDragIdx(i)}
                onDragOver={(e) => {
                  e.preventDefault();
                  setOverIdx(i);
                }}
                onDrop={() => {
                  if (dragIdx !== null && dragIdx !== i) reorder(dragIdx, i);
                  setDragIdx(null);
                  setOverIdx(null);
                }}
                onDragEnd={() => {
                  setDragIdx(null);
                  setOverIdx(null);
                }}
                className="group flex cursor-grab items-center gap-2 rounded-xl px-2.5 py-2 transition-all active:cursor-grabbing"
                style={{
                  background: dragIdx === i ? T.hairline : T.bg,
                  border: `1px dashed ${isOver ? T.blue : "transparent"}`,
                  transform: isOver ? "translateY(1px)" : undefined,
                }}
              >
                <GripVertical className="h-3.5 w-3.5" style={{ color: T.textFaint }} aria-hidden />
                <span
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-md"
                  style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
                >
                  <Icon className="h-3 w-3" aria-hidden />
                </span>
                <span className="flex-1 text-[12px] font-medium">{meta.label}</span>
                <button
                  onClick={() => setSections((s) => s.filter((x) => x !== k))}
                  className="grid h-6 w-6 place-items-center rounded-md opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ color: T.textMuted }}
                  aria-label={`Remove ${meta.label}`}
                >
                  <X className="h-3 w-3" aria-hidden />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {available.length > 0 && (
        <div>
          <p
            className="mb-2 text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: T.textFaint }}
          >
            Add section
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {available.map((k) => {
              const meta = SECTION_META[k];
              const Icon = meta.icon;
              return (
                <button
                  key={k}
                  onClick={() => setSections((s) => [...s, k])}
                  className="flex items-center gap-1.5 rounded-xl p-2 text-left text-[11px] font-medium transition-all hover:-translate-y-0.5"
                  style={{ background: T.card, border: `1px dashed ${T.border}`, color: T.text }}
                >
                  <Icon className="h-3 w-3" style={{ color: T.textMuted }} aria-hidden />
                  <span className="truncate">{meta.label}</span>
                  <Plus className="ml-auto h-3 w-3" style={{ color: T.textMuted }} aria-hidden />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ThemeTab({ current, apply }: { current: ThemeKey; apply: (k: ThemeKey) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {(Object.keys(THEMES) as ThemeKey[]).map((k) => {
        const t = THEMES[k];
        const active = current === k;
        return (
          <button
            key={k}
            onClick={() => apply(k)}
            className="group overflow-hidden rounded-2xl p-1.5 text-left transition-all hover:-translate-y-0.5"
            style={{
              background: T.card,
              border: `1.5px solid ${active ? T.text : T.border}`,
              boxShadow: active ? SHADOW_LIFT : SHADOW_SOFT,
            }}
          >
            <div
              className="h-14 rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${t.swatches![0]} 0%, ${t.swatches![0]} 55%, ${t.swatches![2]} 100%)`,
              }}
            >
              <div className="flex gap-1 p-1.5">
                {t.swatches!.slice(1).map((c, i) => (
                  <span
                    key={i}
                    className="h-2 w-2 rounded-full"
                    style={{ background: c, border: `1px solid rgba(0,0,0,0.06)` }}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between px-1 py-1.5">
              <span className="text-[12px] font-semibold">{t.label}</span>
              {active && <Check className="h-3.5 w-3.5" style={{ color: T.text }} aria-hidden />}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function BrandTab({
  design,
  setDesign,
}: {
  design: Design;
  setDesign: React.Dispatch<React.SetStateAction<Design>>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <FieldGroup label="Merchant name">
        <input
          value={design.brand}
          onChange={(e) => setDesign((d) => ({ ...d, brand: e.target.value }))}
          className="h-9 w-full rounded-xl px-3 text-[12px] outline-none"
          style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text }}
        />
      </FieldGroup>

      <FieldGroup label="Logo">
        <button
          className="flex h-16 w-full flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-medium transition"
          style={{ background: T.bg, border: `1px dashed ${T.border}`, color: T.textMuted }}
        >
          <UploadCloud className="h-4 w-4" aria-hidden />
          Upload SVG or PNG
        </button>
      </FieldGroup>

      <FieldGroup label="Primary color">
        <ColorRow
          value={design.primary}
          onChange={(v) => setDesign((d) => ({ ...d, primary: v }))}
        />
      </FieldGroup>
      <FieldGroup label="Accent color">
        <ColorRow value={design.accent} onChange={(v) => setDesign((d) => ({ ...d, accent: v }))} />
      </FieldGroup>
      <FieldGroup label="Background">
        <ColorRow value={design.bg} onChange={(v) => setDesign((d) => ({ ...d, bg: v }))} />
      </FieldGroup>
      <FieldGroup label="Surface">
        <ColorRow
          value={design.surface}
          onChange={(v) => setDesign((d) => ({ ...d, surface: v }))}
        />
      </FieldGroup>

      <FieldGroup label="Font">
        <div className="grid grid-cols-2 gap-1.5">
          {(Object.keys(FONT_STACKS) as FontKey[]).map((f) => {
            const active = design.font === f;
            return (
              <button
                key={f}
                onClick={() => setDesign((d) => ({ ...d, font: f }))}
                className="rounded-xl px-3 py-2 text-left text-[12px] transition-all"
                style={{
                  background: active ? T.text : T.card,
                  color: active ? "#fff" : T.text,
                  border: `1px solid ${active ? T.text : T.border}`,
                  fontFamily: FONT_STACKS[f],
                }}
              >
                Aa · {f}
              </button>
            );
          })}
        </div>
      </FieldGroup>

      <FieldGroup label="Button style">
        <div className="grid grid-cols-3 gap-1.5">
          {(["solid", "gradient", "outline"] as ButtonStyle[]).map((s) => {
            const active = design.buttonStyle === s;
            return (
              <button
                key={s}
                onClick={() => setDesign((d) => ({ ...d, buttonStyle: s }))}
                className="rounded-xl px-2 py-2 text-[11px] font-medium capitalize transition"
                style={{
                  background: active ? T.text : T.card,
                  color: active ? "#fff" : T.text,
                  border: `1px solid ${active ? T.text : T.border}`,
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </FieldGroup>
    </div>
  );
}

const PAYMENT_METHODS = [
  { key: "visa", label: "Visa", countries: "Global" },
  { key: "mastercard", label: "Mastercard", countries: "Global" },
  { key: "amex", label: "American Express", countries: "Global" },
  { key: "applepay", label: "Apple Pay", countries: "Global" },
  { key: "googlepay", label: "Google Pay", countries: "Global" },
  { key: "paypal", label: "PayPal", countries: "Global" },
  { key: "klarna", label: "Klarna", countries: "EU · US · UK" },
  { key: "sepa", label: "SEPA Direct Debit", countries: "Eurozone" },
  { key: "bancontact", label: "Bancontact", countries: "Belgium" },
  { key: "ideal", label: "iDEAL", countries: "Netherlands" },
  { key: "openbanking", label: "Open Banking", countries: "UK · EU" },
  { key: "crypto", label: "Crypto", countries: "Global" },
];

function PaymentsTab({
  methods,
  setMethods,
}: {
  methods: Record<string, boolean>;
  setMethods: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) {
  return (
    <ul className="flex flex-col gap-1.5">
      {PAYMENT_METHODS.map((m) => {
        const on = !!methods[m.key];
        return (
          <li
            key={m.key}
            className="flex items-center gap-2.5 rounded-xl p-2 transition-all"
            style={{ background: T.bg, border: `1px solid ${on ? T.border : "transparent"}` }}
          >
            <span
              className="grid h-8 w-10 shrink-0 place-items-center rounded-lg text-[9px] font-bold"
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
            >
              {m.label.slice(0, 4).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold">{m.label}</p>
              <p className="truncate text-[10px]" style={{ color: T.textMuted }}>
                {m.countries}
              </p>
            </div>
            <Toggle
              checked={on}
              onChange={(v) => setMethods((mm) => ({ ...mm, [m.key]: v }))}
              label={m.label}
            />
          </li>
        );
      })}
    </ul>
  );
}

function AdvancedTab({
  smart,
  setSmart,
}: {
  smart: Record<string, boolean>;
  setSmart: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) {
  const items = [
    { k: "oneClick", label: "One-click checkout", hint: "Returning shoppers skip forms." },
    { k: "express", label: "Express checkout", hint: "Apple Pay & Google Pay at the top." },
    { k: "remember", label: "Remember customer", hint: "Autofill on next visit." },
    { k: "guest", label: "Guest checkout", hint: "No account required." },
    { k: "savedCards", label: "Saved cards", hint: "Vault card tokens securely." },
    { k: "autoCurrency", label: "Auto-currency", hint: "Detect currency by IP." },
    { k: "address", label: "Address autocomplete", hint: "Google Places integration." },
    { k: "tax", label: "Tax calculation", hint: "Real-time VAT & sales tax." },
  ];
  return (
    <ul className="flex flex-col gap-1">
      {items.map((it) => (
        <li
          key={it.k}
          className="flex items-start gap-2.5 rounded-xl p-2.5 transition"
          onMouseEnter={(e) => (e.currentTarget.style.background = T.bg)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <span
            className="grid h-6 w-6 shrink-0 place-items-center rounded-md"
            style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text }}
          >
            <Wand2 className="h-3 w-3" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold">{it.label}</p>
            <p className="text-[11px]" style={{ color: T.textMuted }}>
              {it.hint}
            </p>
          </div>
          <Toggle
            checked={!!smart[it.k]}
            onChange={(v) => setSmart((s) => ({ ...s, [it.k]: v }))}
            label={it.label}
          />
        </li>
      ))}
    </ul>
  );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p
        className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider"
        style={{ color: T.textFaint }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

function ColorRow({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <label
      className="flex h-9 items-center gap-2 rounded-xl px-2"
      style={{ background: T.bg, border: `1px solid ${T.border}` }}
    >
      <span
        className="relative h-5 w-5 shrink-0 overflow-hidden rounded-md"
        style={{ background: value, border: `1px solid ${T.border}` }}
      >
        <input
          type="color"
          value={hexOnly(value)}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label="Pick color"
        />
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-[12px] outline-none"
        style={{ color: T.text }}
      />
    </label>
  );
}

function hexOnly(v: string) {
  if (/^#[0-9a-fA-F]{6}$/.test(v)) return v;
  return "#000000";
}

/* ============================================================
   CENTER CANVAS
   ============================================================ */
function CenterCanvas({
  device,
  setDevice,
  design,
  sections,
  methods,
  selected,
  setSelected,
}: {
  device: Device;
  setDevice: (d: Device) => void;
  design: Design;
  sections: SectionKey[];
  methods: Record<string, boolean>;
  selected: string;
  setSelected: (s: string) => void;
}) {
  const [zoom, setZoom] = useState(1);

  const frame =
    device === "mobile"
      ? { w: 390, label: "iPhone 15" }
      : device === "tablet"
        ? { w: 820, label: "iPad" }
        : { w: 1120, label: "Desktop" };

  return (
    <div
      className="flex flex-col overflow-hidden rounded-3xl"
      style={{ background: T.card, border: `1px solid ${T.border}`, boxShadow: SHADOW_SOFT }}
    >
      {/* Toolbar */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5"
        style={{ borderBottom: `1px solid ${T.border}` }}
      >
        <div
          className="flex items-center gap-0.5 rounded-full p-1"
          style={{ background: T.bg, border: `1px solid ${T.border}` }}
        >
          {(
            [
              { k: "desktop", icon: Monitor, label: "Desktop" },
              { k: "tablet", icon: TabletIcon, label: "Tablet" },
              { k: "mobile", icon: Smartphone, label: "Mobile" },
            ] as { k: Device; icon: typeof Monitor; label: string }[]
          ).map((d) => {
            const Icon = d.icon;
            const active = device === d.k;
            return (
              <button
                key={d.k}
                onClick={() => setDevice(d.k)}
                title={d.label}
                className="inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-medium transition-all"
                style={{
                  background: active ? T.card : "transparent",
                  color: active ? T.text : T.textMuted,
                  boxShadow: active ? SHADOW_SOFT : "none",
                }}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                <span className="hidden sm:inline">{d.label}</span>
              </button>
            );
          })}
        </div>

        <span className="text-[11px]" style={{ color: T.textMuted }}>
          {frame.label} · {frame.w}px
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(2)))}
            className="grid h-7 w-7 place-items-center rounded-full text-xs transition"
            style={{ color: T.textMuted, background: T.bg, border: `1px solid ${T.border}` }}
            aria-label="Zoom out"
          >
            −
          </button>
          <span
            className="min-w-[42px] text-center text-[11px] font-medium tabular-nums"
            style={{ color: T.textMuted }}
          >
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(1.5, +(z + 0.1).toFixed(2)))}
            className="grid h-7 w-7 place-items-center rounded-full text-xs transition"
            style={{ color: T.textMuted, background: T.bg, border: `1px solid ${T.border}` }}
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={() => setZoom(1)}
            className="ml-1 grid h-7 w-7 place-items-center rounded-full transition"
            style={{ color: T.textMuted }}
            aria-label="Reset zoom"
          >
            <RefreshCw className="h-3 w-3" aria-hidden />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div
        className="relative flex-1 overflow-auto p-6"
        style={{
          minHeight: 720,
          background: `radial-gradient(circle at 1px 1px, ${T.border} 1px, transparent 0)`,
          backgroundSize: "18px 18px",
        }}
      >
        <div className="mx-auto flex justify-center" style={{ width: "fit-content" }}>
          <div
            style={{
              width: frame.w,
              transform: `scale(${zoom})`,
              transformOrigin: "top center",
              transition: "width 260ms cubic-bezier(0.2,0.7,0.2,1)",
            }}
          >
            <DeviceShell device={device}>
              <CheckoutPreview
                design={design}
                sections={sections}
                methods={methods}
                selected={selected}
                setSelected={setSelected}
              />
            </DeviceShell>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeviceShell({ device, children }: { device: Device; children: React.ReactNode }) {
  if (device === "mobile") {
    return (
      <div
        className="mx-auto overflow-hidden rounded-[46px] p-2"
        style={{
          background: "#111",
          border: "8px solid #111",
          boxShadow: "0 24px 60px rgba(17,17,17,0.18)",
        }}
      >
        <div className="relative overflow-hidden rounded-[34px]" style={{ background: "#fff" }}>
          <div className="pointer-events-none absolute left-1/2 top-1.5 z-10 h-4 w-24 -translate-x-1/2 rounded-full bg-black" />
          <div className="pt-6">{children}</div>
        </div>
      </div>
    );
  }
  if (device === "tablet") {
    return (
      <div
        className="mx-auto overflow-hidden rounded-[28px] p-2"
        style={{
          background: "#e5e5e7",
          border: "10px solid #111",
          boxShadow: "0 24px 60px rgba(17,17,17,0.18)",
        }}
      >
        <div className="overflow-hidden rounded-[16px] bg-white">{children}</div>
      </div>
    );
  }
  return (
    <div
      className="mx-auto overflow-hidden rounded-[18px]"
      style={{ boxShadow: "0 24px 60px rgba(17,17,17,0.14)", background: "#fff" }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ background: "#F5F5F7", borderBottom: `1px solid ${T.border}` }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FF5F57" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28C840" }} />
        <div
          className="ml-3 flex items-center gap-2 rounded-md px-3 py-1 text-[11px]"
          style={{ background: "#fff", color: T.textMuted, border: `1px solid ${T.border}` }}
        >
          <Lock className="h-3 w-3" aria-hidden />
          checkout.acme.store
        </div>
      </div>
      {children}
    </div>
  );
}

/* ============================================================
   CHECKOUT PREVIEW
   ============================================================ */
function CheckoutPreview({
  design,
  sections,
  methods,
  selected,
  setSelected,
}: {
  design: Design;
  sections: SectionKey[];
  methods: Record<string, boolean>;
  selected: string;
  setSelected: (s: string) => void;
}) {
  const s: React.CSSProperties = {
    background: design.bg,
    color: design.text,
    fontFamily: FONT_STACKS[design.font],
  };

  return (
    <div style={s} className="anim-fade">
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: `1px solid ${design.border}` }}
      >
        <div className="flex items-center gap-2">
          <div
            className="grid h-7 w-7 place-items-center rounded-lg text-white"
            style={{
              background: `linear-gradient(135deg, ${design.primary}, ${design.accent})`,
            }}
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
          </div>
          <span className="font-semibold tracking-tight" style={{ color: design.text }}>
            {design.brand}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px]" style={{ color: design.muted }}>
          <Lock className="h-3 w-3" aria-hidden />
          Secure checkout
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-3 p-5" style={{ padding: design.padding }}>
          {sections.map((k) => (
            <SectionCard
              key={k}
              sectionKey={k}
              design={design}
              methods={methods}
              selected={selected}
              setSelected={setSelected}
            />
          ))}

          <PayButton design={design} selected={selected} setSelected={setSelected} />

          <div
            className="mt-1 flex items-center justify-center gap-4 text-[10px]"
            style={{ color: design.muted }}
          >
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" aria-hidden /> PCI DSS
            </span>
            <span className="inline-flex items-center gap-1">
              <Lock className="h-3 w-3" aria-hidden /> 256-bit SSL
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="h-3 w-3" aria-hidden /> 4.9 · 12k reviews
            </span>
          </div>
        </div>

        <aside
          className="flex flex-col gap-3 p-5"
          style={{
            background: `color-mix(in oklab, ${design.surface} 92%, ${design.primary} 4%)`,
            borderLeft: `1px solid ${design.border}`,
            padding: design.padding,
          }}
        >
          <SummaryPanel design={design} selected={selected} setSelected={setSelected} />
        </aside>
      </div>

      <div
        className="flex items-center justify-between px-6 py-3 text-[10px]"
        style={{ borderTop: `1px solid ${design.border}`, color: design.muted }}
      >
        <span>© {design.brand}</span>
        <span className="inline-flex items-center gap-1.5">
          Powered by{" "}
          <span className="font-semibold" style={{ color: design.text }}>
            Tally
          </span>
        </span>
      </div>
    </div>
  );
}

function SectionCard({
  sectionKey,
  design,
  methods,
  selected,
  setSelected,
}: {
  sectionKey: SectionKey;
  design: Design;
  methods: Record<string, boolean>;
  selected: string;
  setSelected: (s: string) => void;
}) {
  const isSelected = selected === sectionKey;
  const meta = SECTION_META[sectionKey];
  const Icon = meta.icon;

  const wrap: React.CSSProperties = {
    background: design.surface,
    border: `1px solid ${isSelected ? design.primary : design.border}`,
    borderRadius: design.radius,
    boxShadow: isSelected
      ? `0 0 0 3px color-mix(in oklab, ${design.primary} 18%, transparent)`
      : "none",
    transition: "all 200ms cubic-bezier(0.2,0.7,0.2,1)",
  };

  return (
    <div style={wrap} className="cursor-pointer" onClick={() => setSelected(sectionKey)}>
      <div className="flex items-center gap-2 px-4 pb-2 pt-3">
        <span
          className="grid h-6 w-6 place-items-center rounded-md"
          style={{
            background: `color-mix(in oklab, ${design.primary} 8%, transparent)`,
            color: design.primary,
          }}
        >
          <Icon className="h-3 w-3" aria-hidden />
        </span>
        <span className="text-[12px] font-semibold" style={{ color: design.text }}>
          {meta.label}
        </span>
      </div>
      <div className="px-4 pb-4">
        {sectionKey === "customer" && (
          <PreviewInputs design={design} fields={["Email", "Phone (optional)"]} />
        )}
        {sectionKey === "shipping" && (
          <PreviewInputs
            design={design}
            fields={["Full name", "Address", "City", "Postal code", "Country"]}
            grid
          />
        )}
        {sectionKey === "billing" && (
          <PreviewInputs design={design} fields={["Same as shipping", "Company (optional)"]} />
        )}
        {sectionKey === "discount" && <DiscountRow design={design} />}
        {sectionKey === "payment" && <PaymentMethods design={design} methods={methods} />}
        {sectionKey === "summary" && <MiniSummary design={design} />}
        {sectionKey === "notes" && <PreviewInputs design={design} fields={["Add order notes"]} />}
        {sectionKey === "terms" && (
          <p className="text-[11px]" style={{ color: design.muted }}>
            By placing this order you agree to our terms & privacy policy.
          </p>
        )}
      </div>
    </div>
  );
}

function PreviewInputs({
  design,
  fields,
  grid,
}: {
  design: Design;
  fields: string[];
  grid?: boolean;
}) {
  return (
    <div className={grid ? "grid grid-cols-2 gap-2" : "flex flex-col gap-2"}>
      {fields.map((f, i) => (
        <div
          key={i}
          className="h-9 rounded-md px-3 text-[11px]"
          style={{
            background: `color-mix(in oklab, ${design.surface} 88%, ${design.text} 4%)`,
            border: `1px solid ${design.border}`,
            color: design.muted,
            lineHeight: "36px",
            borderRadius: Math.max(6, design.radius - 6),
          }}
        >
          {f}
        </div>
      ))}
    </div>
  );
}

function DiscountRow({ design }: { design: Design }) {
  return (
    <div className="flex gap-2">
      <div
        className="h-9 flex-1 rounded-md px-3 text-[11px]"
        style={{
          background: `color-mix(in oklab, ${design.surface} 88%, ${design.text} 4%)`,
          border: `1px solid ${design.border}`,
          color: design.muted,
          lineHeight: "36px",
          borderRadius: Math.max(6, design.radius - 6),
        }}
      >
        Discount code
      </div>
      <button
        className="h-9 shrink-0 px-3 text-[11px] font-semibold"
        style={{
          background: "transparent",
          border: `1px solid ${design.border}`,
          color: design.text,
          borderRadius: Math.max(6, design.radius - 6),
        }}
      >
        Apply
      </button>
    </div>
  );
}

function PaymentMethods({ design, methods }: { design: Design; methods: Record<string, boolean> }) {
  const enabled = PAYMENT_METHODS.filter((m) => methods[m.key]);
  return (
    <div className="flex flex-wrap gap-1.5">
      {enabled.length === 0 && (
        <p className="text-[11px]" style={{ color: design.muted }}>
          No payment methods enabled — add some in the Payments panel.
        </p>
      )}
      {enabled.map((m) => (
        <span
          key={m.key}
          className="inline-flex h-8 min-w-[52px] items-center justify-center rounded-md px-2 text-[9px] font-bold tracking-wide"
          style={{
            background: design.surface,
            border: `1px solid ${design.border}`,
            color: design.text,
            borderRadius: Math.max(6, design.radius - 8),
          }}
        >
          {m.label.slice(0, 4).toUpperCase()}
        </span>
      ))}
    </div>
  );
}

function MiniSummary({ design }: { design: Design }) {
  return (
    <div className="flex flex-col gap-1.5 text-[11px]" style={{ color: design.muted }}>
      <Row2 k="Subtotal" v="€128.00" c={design.text} />
      <Row2 k="Shipping" v="Free" c={design.text} />
      <Row2 k="Tax" v="€10.24" c={design.text} />
      <div className="h-px" style={{ background: design.border }} />
      <Row2 k="Total" v="€138.24" c={design.text} bold />
    </div>
  );
}

function Row2({ k, v, c, bold }: { k: string; v: string; c: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span>{k}</span>
      <span style={{ color: c, fontWeight: bold ? 700 : 500 }}>{v}</span>
    </div>
  );
}

function SummaryPanel({
  design,
  selected,
  setSelected,
}: {
  design: Design;
  selected: string;
  setSelected: (s: string) => void;
}) {
  const isSel = selected === "summary-card";
  return (
    <div
      onClick={() => setSelected("summary-card")}
      className="cursor-pointer p-4"
      style={{
        background: design.surface,
        border: `1px solid ${isSel ? design.primary : design.border}`,
        borderRadius: design.radius,
        boxShadow: isSel
          ? `0 0 0 3px color-mix(in oklab, ${design.primary} 18%, transparent)`
          : "none",
      }}
    >
      <p
        className="text-[11px] font-semibold uppercase tracking-wider"
        style={{ color: design.muted }}
      >
        Your order
      </p>
      <div className="mt-3 flex flex-col gap-3">
        {[
          { name: "Everyday Tee", desc: "Size M · Black", price: "€48.00" },
          { name: "Merino Socks", desc: "Pack of 3", price: "€24.00" },
          { name: "Canvas Tote", desc: "Natural", price: "€56.00" },
        ].map((p, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className="grid h-11 w-11 shrink-0 place-items-center rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${design.primary}22, ${design.accent}22)`,
                borderRadius: Math.max(8, design.radius - 6),
              }}
            >
              <Package className="h-4 w-4" style={{ color: design.primary }} aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold" style={{ color: design.text }}>
                {p.name}
              </p>
              <p className="truncate text-[10px]" style={{ color: design.muted }}>
                {p.desc}
              </p>
            </div>
            <span className="text-[11px] font-semibold tabular-nums" style={{ color: design.text }}>
              {p.price}
            </span>
          </div>
        ))}
      </div>
      <div className="my-4 h-px" style={{ background: design.border }} />
      <MiniSummary design={design} />
    </div>
  );
}

function PayButton({
  design,
  selected,
  setSelected,
}: {
  design: Design;
  selected: string;
  setSelected: (s: string) => void;
}) {
  const isSel = selected === "cta";
  const bg =
    design.buttonStyle === "gradient"
      ? `linear-gradient(135deg, ${design.primary}, ${design.accent})`
      : design.buttonStyle === "outline"
        ? "transparent"
        : design.primary;
  const color = design.buttonStyle === "outline" ? design.primary : "#fff";
  const border = design.buttonStyle === "outline" ? `1.5px solid ${design.primary}` : "none";
  const shadow =
    design.shadow === "lift"
      ? `0 12px 30px color-mix(in oklab, ${design.primary} 30%, transparent)`
      : design.shadow === "soft"
        ? `0 4px 10px color-mix(in oklab, ${design.primary} 22%, transparent)`
        : "none";

  return (
    <button
      onClick={() => setSelected("cta")}
      style={{
        height: design.buttonHeight,
        background: bg,
        color,
        border,
        borderRadius: design.buttonRadius,
        boxShadow: isSel
          ? `${shadow}, 0 0 0 3px color-mix(in oklab, ${design.primary} 25%, transparent)`
          : shadow,
        fontFamily: FONT_STACKS[design.font],
      }}
      className="mt-1 w-full text-[14px] font-semibold transition-transform hover:scale-[1.01] active:scale-[0.99]"
    >
      {design.cta} · €138.24
    </button>
  );
}

/* ============================================================
   RIGHT PANEL — properties
   ============================================================ */
function PropertiesPanel({
  design,
  setDesign,
  selected,
}: {
  design: Design;
  setDesign: React.Dispatch<React.SetStateAction<Design>>;
  selected: string;
}) {
  const isCta = selected === "cta";
  return (
    <div
      className="sticky top-[88px] flex max-h-[calc(100dvh-110px)] flex-col overflow-hidden rounded-3xl"
      style={{ background: T.card, border: `1px solid ${T.border}`, boxShadow: SHADOW_SOFT }}
    >
      <div className="px-4 py-3" style={{ borderBottom: `1px solid ${T.border}` }}>
        <p
          className="text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: T.textFaint }}
        >
          Selected
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span
            className="grid h-6 w-6 place-items-center rounded-md"
            style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text }}
          >
            {isCta ? (
              <Zap className="h-3 w-3" aria-hidden />
            ) : (
              <Square className="h-3 w-3" aria-hidden />
            )}
          </span>
          <p className="text-[13px] font-semibold">
            {isCta ? "Pay button" : ((SECTION_META as any)[selected]?.label ?? "Section")}
          </p>
          <StatusPill tone="info">Live</StatusPill>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {isCta ? (
          <CtaProperties design={design} setDesign={setDesign} />
        ) : (
          <CardProperties design={design} setDesign={setDesign} />
        )}
      </div>

      <div className="px-4 py-3" style={{ borderTop: `1px solid ${T.border}`, background: T.bg }}>
        <p className="text-[10px]" style={{ color: T.textMuted }}>
          Tip: click any element in the preview to edit its properties.
        </p>
      </div>
    </div>
  );
}

function CtaProperties({
  design,
  setDesign,
}: {
  design: Design;
  setDesign: React.Dispatch<React.SetStateAction<Design>>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <FieldGroup label="Label">
        <input
          value={design.cta}
          onChange={(e) => setDesign((d) => ({ ...d, cta: e.target.value }))}
          className="h-9 w-full rounded-xl px-3 text-[12px] outline-none"
          style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text }}
        />
      </FieldGroup>

      <FieldGroup label="Style">
        <div className="grid grid-cols-3 gap-1.5">
          {(["solid", "gradient", "outline"] as ButtonStyle[]).map((s) => {
            const active = design.buttonStyle === s;
            return (
              <button
                key={s}
                onClick={() => setDesign((d) => ({ ...d, buttonStyle: s }))}
                className="rounded-xl px-2 py-2 text-[11px] font-medium capitalize transition"
                style={{
                  background: active ? T.text : T.card,
                  color: active ? "#fff" : T.text,
                  border: `1px solid ${active ? T.text : T.border}`,
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </FieldGroup>

      <SliderRow
        label="Height"
        icon={MoveHorizontal}
        value={design.buttonHeight}
        min={40}
        max={64}
        onChange={(v) => setDesign((d) => ({ ...d, buttonHeight: v }))}
        suffix="px"
      />
      <SliderRow
        label="Radius"
        icon={Square}
        value={design.buttonRadius}
        min={0}
        max={32}
        onChange={(v) => setDesign((d) => ({ ...d, buttonRadius: v }))}
        suffix="px"
      />

      <FieldGroup label="Shadow">
        <div className="grid grid-cols-3 gap-1.5">
          {(["none", "soft", "lift"] as const).map((s) => {
            const active = design.shadow === s;
            return (
              <button
                key={s}
                onClick={() => setDesign((d) => ({ ...d, shadow: s }))}
                className="rounded-xl px-2 py-2 text-[11px] font-medium capitalize transition"
                style={{
                  background: active ? T.text : T.card,
                  color: active ? "#fff" : T.text,
                  border: `1px solid ${active ? T.text : T.border}`,
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </FieldGroup>

      <FieldGroup label="Primary color">
        <ColorRow
          value={design.primary}
          onChange={(v) => setDesign((d) => ({ ...d, primary: v }))}
        />
      </FieldGroup>
      <FieldGroup label="Accent (gradient)">
        <ColorRow value={design.accent} onChange={(v) => setDesign((d) => ({ ...d, accent: v }))} />
      </FieldGroup>

      <div
        className="mt-1 rounded-2xl p-3"
        style={{ background: T.bg, border: `1px dashed ${T.border}` }}
      >
        <p
          className="mb-2 text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: T.textFaint }}
        >
          States
        </p>
        <div className="grid grid-cols-3 gap-1.5 text-[10px]">
          {["Default", "Hover", "Loading", "Disabled", "Success", "Error"].map((s) => (
            <span
              key={s}
              className="grid h-7 place-items-center rounded-lg"
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.textMuted }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CardProperties({
  design,
  setDesign,
}: {
  design: Design;
  setDesign: React.Dispatch<React.SetStateAction<Design>>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <SliderRow
        label="Card radius"
        icon={Square}
        value={design.radius}
        min={0}
        max={32}
        onChange={(v) => setDesign((d) => ({ ...d, radius: v }))}
        suffix="px"
      />
      <SliderRow
        label="Section padding"
        icon={MoveHorizontal}
        value={design.padding}
        min={12}
        max={40}
        onChange={(v) => setDesign((d) => ({ ...d, padding: v }))}
        suffix="px"
      />
      <FieldGroup label="Border color">
        <ColorRow value={design.border} onChange={(v) => setDesign((d) => ({ ...d, border: v }))} />
      </FieldGroup>
      <FieldGroup label="Surface">
        <ColorRow
          value={design.surface}
          onChange={(v) => setDesign((d) => ({ ...d, surface: v }))}
        />
      </FieldGroup>
      <FieldGroup label="Text">
        <ColorRow value={design.text} onChange={(v) => setDesign((d) => ({ ...d, text: v }))} />
      </FieldGroup>
      <FieldGroup label="Muted text">
        <ColorRow value={design.muted} onChange={(v) => setDesign((d) => ({ ...d, muted: v }))} />
      </FieldGroup>
    </div>
  );
}

function SliderRow({
  label,
  icon: Icon,
  value,
  min,
  max,
  onChange,
  suffix = "",
}: {
  label: string;
  icon: typeof Square;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span
          className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: T.textFaint }}
        >
          <Icon className="h-3 w-3" aria-hidden /> {label}
        </span>
        <span
          className="rounded-md px-1.5 py-0.5 text-[10px] font-semibold tabular-nums"
          style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text }}
        >
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#111111]"
        aria-label={label}
      />
    </div>
  );
}

/* ============================================================
   PUBLISH DIALOG
   ============================================================ */
function PublishDialog({ design, onClose }: { design: Design; onClose: () => void }) {
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
        className="relative w-full max-w-[500px] overflow-hidden rounded-2xl anim-fade-up"
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
              <UploadCloud className="h-3.5 w-3.5" aria-hidden />
            </div>
            <h3 className="font-sora text-sm font-semibold">Publish checkout</h3>
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
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider" style={{ color: T.textMuted }}>
                New version
              </p>
              <p className="font-sora text-xl font-semibold">v14 · Draft</p>
            </div>
            <StatusPill tone="success">Ready</StatusPill>
          </div>

          <div
            className="mt-4 rounded-2xl p-3"
            style={{ background: T.bg, border: `1px solid ${T.border}` }}
          >
            <p
              className="mb-2 text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: T.textFaint }}
            >
              Changes
            </p>
            <ul className="flex flex-col gap-1.5 text-[12px]">
              <li className="inline-flex items-center gap-2">
                <Check className="h-3.5 w-3.5" style={{ color: T.green }} aria-hidden /> Theme
                switched to <b className="capitalize">{design.theme}</b>
              </li>
              <li className="inline-flex items-center gap-2">
                <Check className="h-3.5 w-3.5" style={{ color: T.green }} aria-hidden /> Pay button
                set to <b>{design.buttonStyle}</b>
              </li>
              <li className="inline-flex items-center gap-2">
                <Check className="h-3.5 w-3.5" style={{ color: T.green }} aria-hidden /> Radius{" "}
                {design.radius}px · Padding {design.padding}px
              </li>
              <li className="inline-flex items-center gap-2">
                <Check className="h-3.5 w-3.5" style={{ color: T.green }} aria-hidden /> Font{" "}
                <b>{design.font}</b>
              </li>
            </ul>
          </div>

          <p className="mt-3 text-[11px]" style={{ color: T.textMuted }}>
            Publishing replaces the live checkout instantly. You can roll back anytime from Version
            History.
          </p>
        </div>

        <footer
          className="flex items-center justify-between gap-2 px-5 py-3"
          style={{ borderTop: `1px solid ${T.border}`, background: T.bg }}
        >
          <span
            className="inline-flex items-center gap-1.5 text-[11px]"
            style={{ color: T.textMuted }}
          >
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Zero downtime rollout
          </span>
          <div className="flex items-center gap-2">
            <SecondaryButton size="sm" onClick={onClose}>
              Cancel
            </SecondaryButton>
            <PrimaryButton size="sm" onClick={onClose}>
              <UploadCloud className="h-3.5 w-3.5" aria-hidden /> Publish v14
            </PrimaryButton>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ============================================================
   FULL PREVIEW
   ============================================================ */
function FullPreview({
  device,
  design,
  sections,
  methods,
  onClose,
}: {
  device: Device;
  design: Design;
  sections: SectionKey[];
  methods: Record<string, boolean>;
  onClose: () => void;
}) {
  const w = device === "mobile" ? 390 : device === "tablet" ? 820 : 1120;
  return (
    <div
      className="fixed inset-0 z-50 anim-fade"
      role="dialog"
      aria-modal="true"
      aria-label="Preview"
    >
      <div
        className="absolute inset-0"
        style={{ background: "rgba(17,17,17,0.6)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
      />
      <div className="relative flex h-full flex-col">
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ background: "rgba(255,255,255,0.9)", borderBottom: `1px solid ${T.border}` }}
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold">
            <Eye className="h-4 w-4" aria-hidden /> Live preview
          </span>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg"
            style={{ color: T.textMuted, background: T.card, border: `1px solid ${T.border}` }}
            aria-label="Close preview"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-8">
          <div className="mx-auto" style={{ width: w }}>
            <DeviceShell device={device}>
              <CheckoutPreview
                design={design}
                sections={sections}
                methods={methods}
                selected=""
                setSelected={() => {}}
              />
            </DeviceShell>
          </div>
        </div>
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
    { label: "Switch to Minimal theme", icon: Palette, hint: "Theme" },
    { label: "Switch to Modern theme", icon: Palette, hint: "Theme" },
    { label: "Toggle Apple Pay", icon: Wallet, hint: "Payment" },
    { label: "Preview on mobile", icon: Smartphone, hint: "View" },
    { label: "Publish current draft", icon: UploadCloud, hint: "Action" },
    { label: "Open version history", icon: History, hint: "Action" },
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
            placeholder="Jump to sections, themes, payment methods…"
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
.anim-fade { animation: tally-fade 220ms ease-out both }
.anim-fade-up { animation: tally-fade-up 320ms cubic-bezier(0.2,0.7,0.2,1) both }
@media (prefers-reduced-motion: reduce) {
  .anim-fade, .anim-fade-up { animation: none !important }
}
`;
