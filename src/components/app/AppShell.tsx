import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Search, Bell, HelpCircle, Command, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { NAV_GROUPS } from "./nav";
import { TallyAI } from "./TallyAI";
import { CommandPalette, openCommandPalette } from "./CommandPalette";
import { UniversalSearch } from "./UniversalSearch";

export const T = {
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

export const SHADOW_SOFT = "0 1px 2px rgba(17,17,17,0.04), 0 1px 3px rgba(17,17,17,0.03)";
export const SHADOW_LIFT = "0 10px 30px rgba(17,17,17,0.07), 0 2px 6px rgba(17,17,17,0.04)";

function TopNav({ email }: { email: string | null }) {
  const navigate = useNavigate();
  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center gap-3 px-5"
      style={{ background: T.card, borderBottom: `1px solid ${T.border}` }}
    >
      <Link to="/" className="flex items-center gap-2 pr-2">
        <span
          className="grid h-7 w-7 place-items-center rounded-md text-[13px] font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.violet})` }}
        >
          T
        </span>
        <span className="text-[15px] font-semibold" style={{ color: T.text }}>
          Tally
        </span>
      </Link>
      <button
        onClick={openCommandPalette}
        className="ml-4 hidden flex-1 items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors md:flex"
        style={{ background: T.bg, border: `1px solid ${T.border}`, maxWidth: 520 }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.borderStrong)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.border)}
      >
        <Search className="h-4 w-4" style={{ color: T.textFaint }} />
        <span className="flex-1 text-[13px]" style={{ color: T.textFaint }}>
          Search anything…
        </span>
        <kbd
          className="hidden items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-medium md:flex"
          style={{ background: T.card, borderColor: T.border, color: T.textMuted }}
        >
          <Command className="h-3 w-3" /> K
        </kbd>
      </button>
      <div className="ml-auto flex items-center gap-1">
        {[HelpCircle, Bell].map((Icon, i) => (
          <button
            key={i}
            className="grid h-9 w-9 place-items-center rounded-lg transition-colors"
            style={{ color: T.textMuted }}
            onMouseEnter={(e) => (e.currentTarget.style.background = T.hairline)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
          className="ml-2 flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12.5px] font-medium transition-colors"
          style={{ color: T.text }}
          onMouseEnter={(e) => (e.currentTarget.style.background = T.hairline)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <span
            className="grid h-7 w-7 place-items-center rounded-full text-[11px] font-semibold text-white"
            style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.violet})` }}
          >
            {(email?.[0] ?? "M").toUpperCase()}
          </span>
          <span className="hidden sm:block">{email ?? "Merchant"}</span>
          <ChevronDown className="h-3.5 w-3.5" style={{ color: T.textFaint }} />
        </button>
      </div>
    </header>
  );
}

function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside
      className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-[240px] shrink-0 overflow-y-auto px-3 py-5 md:block"
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
              const isActive = item.to === pathname;
              return (
                <Link
                  key={item.key}
                  to={item.to!}
                  className="group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all"
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
                      style={{
                        background: `linear-gradient(180deg, ${T.blue}, ${T.violet})`,
                      }}
                      aria-hidden
                    />
                  )}
                  <Icon className="h-4 w-4" aria-hidden />
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
    </aside>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);
  return (
    <div className="min-h-dvh w-full" style={{ background: T.bg, color: T.text }}>
      <TopNav email={email} />
      <div className="mx-auto flex w-full max-w-[1600px]">
        <Sidebar />
        <main className="min-w-0 flex-1 px-5 py-8 md:px-10">{children}</main>
      </div>
      <TallyAI />
      <CommandPalette />
      <UniversalSearch />
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[26px] font-semibold tracking-tight" style={{ color: T.text }}>
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-[13.5px]" style={{ color: T.textMuted }}>
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({
  children,
  className = "",
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl ${padded ? "p-6" : ""} ${className}`}
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        boxShadow: SHADOW_SOFT,
      }}
    >
      {children}
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: typeof Search;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div
        className="mb-5 grid h-16 w-16 place-items-center rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${T.hairline}, ${T.bg})`,
          border: `1px solid ${T.border}`,
        }}
      >
        <Icon className="h-7 w-7" style={{ color: T.textMuted }} />
      </div>
      <h3 className="text-[16px] font-semibold" style={{ color: T.text }}>
        {title}
      </h3>
      <p className="mt-1.5 max-w-md text-[13px]" style={{ color: T.textMuted }}>
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-semibold text-white transition-all hover:brightness-110"
      style={{
        background: T.text,
        boxShadow: SHADOW_SOFT,
      }}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-all"
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        color: T.text,
      }}
    >
      {children}
    </button>
  );
}
