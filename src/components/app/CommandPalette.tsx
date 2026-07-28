import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Search,
  ArrowRight,
  Star,
  Clock,
  Sparkles,
  Command as CmdIcon,
  CornerDownLeft,
  X,
  Plus,
  KeyRound,
  UserPlus,
  Link2,
  Download,
  Webhook,
  Store,
  Trash2,
  Compass,
  Zap,
} from "lucide-react";
import { NAV_GROUPS, type NavItem } from "./nav";
import { T } from "./AppShell";

type ActionKind = "navigate" | "action" | "ai";
type Action = {
  id: string;
  label: string;
  description?: string;
  icon: typeof Search;
  group: string;
  kind: ActionKind;
  to?: string;
  keywords?: string;
  hint?: string;
  onRun?: () => void;
};

const RECENT_KEY = "tally.cmdk.recent";
const FAV_KEY = "tally.cmdk.favorites";
const HISTORY_KEY = "tally.cmdk.history";
const MAX_RECENT = 6;
const MAX_HISTORY = 5;

function loadArr(k: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(k) ?? "[]");
  } catch {
    return [];
  }
}
function saveArr(k: string, v: string[]) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {
    /* ignore */
  }
}

export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent("tally:cmdk:open"));
}
export function openTallyAI(prompt?: string) {
  window.dispatchEvent(new CustomEvent("tally:ai:open", { detail: { prompt } }));
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Global open handlers
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("tally:cmdk:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("tally:cmdk:open", onOpen);
    };
  }, []);

  // Load persisted state on open
  useEffect(() => {
    if (!open) return;
    setRecent(loadArr(RECENT_KEY));
    setFavorites(loadArr(FAV_KEY));
    setHistory(loadArr(HISTORY_KEY));
    setQuery("");
    setActive(0);
    setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  // Track page visits for "Recent"
  useEffect(() => {
    if (!pathname.startsWith("/")) return;
    // Only track known app routes (nav items)
    const isNav = NAV_GROUPS.some((g) => g.items.some((i) => i.to === pathname));
    if (!isNav) return;
    const prev = loadArr(RECENT_KEY);
    const next = [pathname, ...prev.filter((p) => p !== pathname)].slice(0, MAX_RECENT);
    saveArr(RECENT_KEY, next);
  }, [pathname]);

  // Build all actions
  const allActions: Action[] = useMemo(() => {
    const navActions: Action[] = NAV_GROUPS.flatMap((g) =>
      g.items
        .filter((i): i is NavItem & { to: string } => Boolean(i.to))
        .map((i) => ({
          id: `nav:${i.to}`,
          label: i.label,
          description: g.title ?? "Navigation",
          icon: i.icon,
          group: "Navigation",
          kind: "navigate",
          to: i.to,
          keywords: `${i.label} ${i.key} ${g.title ?? ""}`,
        })),
    );

    const quickActions: Action[] = [
      {
        id: "act:create-customer",
        label: "Create Customer",
        icon: UserPlus,
        group: "Actions",
        kind: "navigate",
        to: "/customers",
        keywords: "new customer add",
        description: "Add a new customer to your workspace",
      },
      {
        id: "act:create-checkout",
        label: "Create Checkout",
        icon: Plus,
        group: "Actions",
        kind: "navigate",
        to: "/checkout",
        keywords: "new checkout builder",
        description: "Design a new checkout experience",
      },
      {
        id: "act:payment-link",
        label: "Create Payment Link",
        icon: Link2,
        group: "Actions",
        kind: "navigate",
        to: "/checkout",
        keywords: "payment link share url",
        description: "Generate a shareable payment link",
      },
      {
        id: "act:api-key",
        label: "Generate API Key",
        icon: KeyRound,
        group: "Actions",
        kind: "navigate",
        to: "/developers",
        keywords: "api key token secret",
        description: "Create a new API key",
      },
      {
        id: "act:invite-team",
        label: "Invite Team Member",
        icon: UserPlus,
        group: "Actions",
        kind: "navigate",
        to: "/team",
        keywords: "team invite member",
        description: "Send an invitation to a teammate",
      },
      {
        id: "act:webhook",
        label: "Create Webhook",
        icon: Webhook,
        group: "Actions",
        kind: "navigate",
        to: "/developers",
        keywords: "webhook endpoint event",
        description: "Subscribe to platform events",
      },
      {
        id: "act:connect-shopify",
        label: "Connect Shopify",
        icon: Store,
        group: "Actions",
        kind: "navigate",
        to: "/integrations",
        keywords: "shopify integration store",
        description: "Sync your Shopify store",
      },
      {
        id: "act:export",
        label: "Export Report",
        icon: Download,
        group: "Actions",
        kind: "navigate",
        to: "/reports",
        keywords: "export csv report download",
        description: "Download a report",
      },
      {
        id: "act:ai",
        label: "Open AI Copilot",
        icon: Sparkles,
        group: "AI",
        kind: "ai",
        keywords: "ai copilot assistant tally",
        description: "Chat with Tally AI",
        hint: "⌘J",
      },
    ];

    return [...navActions, ...quickActions];
  }, []);

  // Filter results
  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!q) return allActions;
    return allActions
      .map((a) => ({ a, score: score(a, q) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.a);
  }, [q, allActions]);

  // Compose sections
  const sections = useMemo(() => {
    const secs: { title: string; items: Action[] }[] = [];

    if (!q) {
      const favActions = favorites
        .map((id) => allActions.find((a) => a.id === id))
        .filter((x): x is Action => Boolean(x));
      if (favActions.length) secs.push({ title: "Favorites", items: favActions });

      const recentActions = recent
        .map((to) => allActions.find((a) => a.to === to))
        .filter((x): x is Action => Boolean(x));
      if (recentActions.length) secs.push({ title: "Recent", items: recentActions });
    }

    // Group results
    const byGroup = new Map<string, Action[]>();
    for (const a of results) {
      if (!byGroup.has(a.group)) byGroup.set(a.group, []);
      byGroup.get(a.group)!.push(a);
    }
    const groupOrder = ["Navigation", "Actions", "AI"];
    for (const g of groupOrder) {
      const items = byGroup.get(g);
      if (items?.length) secs.push({ title: g, items });
    }

    // AI fallback: always allow "Ask Tally AI: <query>" when there is a query
    if (q) {
      secs.push({
        title: "Ask AI",
        items: [
          {
            id: "ai:ask",
            label: `Ask Tally AI about "${query}"`,
            description: "Get an intelligent answer from your ecommerce copilot",
            icon: Sparkles,
            group: "AI",
            kind: "ai",
          },
        ],
      });
    }

    return secs;
  }, [q, query, results, recent, favorites, allActions]);

  // Flat list for keyboard nav
  const flat = useMemo(() => sections.flatMap((s) => s.items), [sections]);

  useEffect(() => {
    if (active >= flat.length) setActive(0);
  }, [flat.length, active]);

  // Ensure active row is visible
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function run(a: Action) {
    // Save history
    if (query.trim()) {
      const next = [query.trim(), ...history.filter((h) => h !== query.trim())].slice(
        0,
        MAX_HISTORY,
      );
      setHistory(next);
      saveArr(HISTORY_KEY, next);
    }
    setOpen(false);
    if (a.kind === "ai") {
      openTallyAI(a.id === "ai:ask" ? query : undefined);
      return;
    }
    if (a.to) navigate({ to: a.to });
    a.onRun?.();
  }

  function toggleFavorite(id: string) {
    const next = favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id];
    setFavorites(next);
    saveArr(FAV_KEY, next);
  }

  function clearHistory() {
    setHistory([]);
    saveArr(HISTORY_KEY, []);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[10vh] sm:pt-[15vh]"
      onClick={() => setOpen(false)}
      style={{ background: "rgba(15,15,25,0.35)", backdropFilter: "blur(6px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[640px] overflow-hidden rounded-2xl"
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          boxShadow: "0 30px 80px rgba(17,17,17,0.25), 0 8px 20px rgba(17,17,17,0.10)",
          animation: "cmdk-in 180ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <style>{`
          @keyframes cmdk-in {
            from { opacity: 0; transform: translateY(-8px) scale(0.98); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes cmdk-row {
            from { opacity: 0; transform: translateY(2px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* Search bar */}
        <div
          className="flex items-center gap-3 px-4"
          style={{ borderBottom: `1px solid ${T.border}`, height: 60 }}
        >
          <Search className="h-4 w-4" style={{ color: T.textMuted }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((i) => Math.min(flat.length - 1, i + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((i) => Math.max(0, i - 1));
              } else if (e.key === "Enter") {
                e.preventDefault();
                const a = flat[active];
                if (a) run(a);
              } else if (e.key === "Escape") {
                e.preventDefault();
                setOpen(false);
              } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
                e.preventDefault();
                setOpen(false);
                openTallyAI(query || undefined);
              }
            }}
            placeholder="Search anything…"
            className="flex-1 bg-transparent text-[15px] outline-none placeholder:font-normal"
            style={{ color: T.text }}
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="grid h-6 w-6 place-items-center rounded-md transition-colors"
              style={{ color: T.textMuted }}
              onMouseEnter={(e) => (e.currentTarget.style.background = T.hairline)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              aria-label="Clear"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <kbd
            className="flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-medium"
            style={{ background: T.bg, borderColor: T.border, color: T.textMuted }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
          {flat.length === 0 ? (
            <EmptyState
              query={query}
              onAsk={() => {
                setOpen(false);
                openTallyAI(query || undefined);
              }}
            />
          ) : (
            <>
              {!q && history.length > 0 && (
                <RecentSearches
                  items={history}
                  onPick={(h) => {
                    setQuery(h);
                    inputRef.current?.focus();
                  }}
                  onClear={clearHistory}
                />
              )}
              {sections.map((section, si) => {
                let baseIdx = 0;
                for (let i = 0; i < si; i++) baseIdx += sections[i].items.length;
                return (
                  <div key={section.title} className="mb-1">
                    <div
                      className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider"
                      style={{ color: T.textFaint }}
                    >
                      {section.title}
                    </div>
                    {section.items.map((a, i) => {
                      const idx = baseIdx + i;
                      return (
                        <Row
                          key={a.id}
                          idx={idx}
                          action={a}
                          active={idx === active}
                          favorite={favorites.includes(a.id)}
                          onHover={() => setActive(idx)}
                          onSelect={() => run(a)}
                          onFavorite={() => toggleFavorite(a.id)}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-4 py-2 text-[11px]"
          style={{ borderTop: `1px solid ${T.border}`, background: T.bg, color: T.textMuted }}
        >
          <div className="flex items-center gap-3">
            <FooterHint icon={<CornerDownLeft className="h-3 w-3" />} label="Select" />
            <FooterHint label="↑↓ Navigate" />
            <FooterHint label="ESC Close" />
          </div>
          <button
            onClick={() => {
              setOpen(false);
              openTallyAI(query || undefined);
            }}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 font-medium transition-all"
            style={{ color: T.violet }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F3FF")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <Sparkles className="h-3 w-3" />
            Ask Tally AI
            <kbd
              className="rounded border px-1 py-0.5 text-[9px]"
              style={{ borderColor: T.border, background: T.card, color: T.textMuted }}
            >
              <CmdIcon className="inline h-2.5 w-2.5" /> J
            </kbd>
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({
  idx,
  action,
  active,
  favorite,
  onHover,
  onSelect,
  onFavorite,
}: {
  idx: number;
  action: Action;
  active: boolean;
  favorite: boolean;
  onHover: () => void;
  onSelect: () => void;
  onFavorite: () => void;
}) {
  const Icon = action.icon;
  return (
    <div
      data-idx={idx}
      onMouseEnter={onHover}
      onClick={onSelect}
      className="group flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 transition-colors"
      style={{
        background: active ? "#EFF6FF" : "transparent",
        animation: "cmdk-row 160ms ease-out",
      }}
    >
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg"
        style={{
          background: active ? T.card : T.bg,
          border: `1px solid ${active ? "#DBEAFE" : T.border}`,
          color: active ? T.blue : T.textMuted,
        }}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-medium" style={{ color: T.text }}>
          {action.label}
        </div>
        {action.description && (
          <div className="truncate text-[11px]" style={{ color: T.textMuted }}>
            {action.description}
          </div>
        )}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onFavorite();
        }}
        className="grid h-7 w-7 place-items-center rounded-md opacity-0 transition-opacity group-hover:opacity-100"
        style={{ color: favorite ? T.amber : T.textFaint }}
        aria-label={favorite ? "Unpin" : "Pin"}
      >
        <Star className="h-3.5 w-3.5" fill={favorite ? T.amber : "none"} />
      </button>
      {action.hint && (
        <kbd
          className="rounded border px-1.5 py-0.5 text-[10px] font-medium"
          style={{ borderColor: T.border, background: T.card, color: T.textMuted }}
        >
          {action.hint}
        </kbd>
      )}
      <ArrowRight
        className="h-3.5 w-3.5 transition-opacity"
        style={{ color: T.blue, opacity: active ? 1 : 0 }}
      />
    </div>
  );
}

function RecentSearches({
  items,
  onPick,
  onClear,
}: {
  items: string[];
  onPick: (q: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="mb-1">
      <div
        className="flex items-center justify-between px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider"
        style={{ color: T.textFaint }}
      >
        <span>Recent searches</span>
        <button
          onClick={onClear}
          className="flex items-center gap-1 rounded normal-case tracking-normal transition-colors"
          style={{ color: T.textMuted }}
        >
          <Trash2 className="h-3 w-3" />
          Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5 px-2 pb-2">
        {items.map((h) => (
          <button
            key={h}
            onClick={() => onPick(h)}
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] transition-all"
            style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMuted }}
          >
            <Clock className="h-3 w-3" />
            {h}
          </button>
        ))}
      </div>
    </div>
  );
}

function EmptyState({ query, onAsk }: { query: string; onAsk: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
      <div
        className="grid h-12 w-12 place-items-center rounded-2xl"
        style={{ background: T.bg, color: T.textMuted, border: `1px solid ${T.border}` }}
      >
        <Compass className="h-5 w-5" />
      </div>
      <div>
        <div className="text-[14px] font-semibold" style={{ color: T.text }}>
          No results found
        </div>
        <div className="mt-1 text-[12px]" style={{ color: T.textMuted }}>
          Try another keyword {query && <>for “{query}”</>} or ask the copilot.
        </div>
      </div>
      <button
        onClick={onAsk}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] font-medium text-white transition-transform hover:scale-[1.02]"
        style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.violet})` }}
      >
        <Zap className="h-3.5 w-3.5" />
        Ask Tally AI instead
      </button>
    </div>
  );
}

function FooterHint({ icon, label }: { icon?: React.ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-1">
      {icon}
      {label}
    </span>
  );
}

/* --- Fuzzy scoring --- */
function score(a: Action, q: string) {
  const hay = `${a.label} ${a.keywords ?? ""} ${a.description ?? ""}`.toLowerCase();
  if (hay.includes(q)) {
    const label = a.label.toLowerCase();
    if (label === q) return 100;
    if (label.startsWith(q)) return 80;
    if (label.includes(q)) return 60;
    return 40;
  }
  // subsequence match
  let i = 0;
  for (const ch of hay) {
    if (ch === q[i]) i++;
    if (i === q.length) return 20;
  }
  return 0;
}
