import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import {
  Sparkles,
  X,
  Send,
  ArrowRight,
  Receipt,
  Users,
  ShoppingBag,
  Store,
  KeyRound,
  BarChart3,
  Zap,
  Lightbulb,
  Loader2,
} from "lucide-react";
import { T, SHADOW_LIFT } from "./AppShell";

type Msg = { id: string; role: "user" | "assistant"; content: string };

const PAGE_MAP: Record<string, { name: string; prompts: string[] }> = {
  "/app": {
    name: "Overview",
    prompts: ["Summarize today", "What should I do next?", "Explain my KPIs"],
  },
  "/transactions": {
    name: "Transactions",
    prompts: ["Explain a failed payment", "How do refunds work?", "Export today's transactions"],
  },
  "/customers": {
    name: "Customers",
    prompts: ["Estimate lifetime value", "How to import from Shopify", "Create a payment link"],
  },
  "/analytics": {
    name: "Analytics",
    prompts: ["Summarize this week", "Explain conversion rate", "Identify growth trends"],
  },
  "/payments": {
    name: "Payments",
    prompts: ["Recommend payment methods", "Explain settlement", "How to improve success rate"],
  },
  "/payouts": {
    name: "Payouts",
    prompts: ["When is my next payout?", "Explain T+3 settlement", "Add a crypto wallet"],
  },
  "/checkout": {
    name: "Checkout",
    prompts: ["Best checkout layout", "Enable Apple Pay", "Add upsells"],
  },
  "/disputes": {
    name: "Disputes",
    prompts: ["Explain chargebacks", "How to win a dispute", "What evidence to submit"],
  },
  "/integrations": {
    name: "Integrations",
    prompts: ["Connect Shopify", "Connect WooCommerce", "Connect Klaviyo"],
  },
  "/settings": {
    name: "Settings",
    prompts: ["Generate an API key", "Invite a teammate", "Set up 2FA"],
  },
  "/onboarding": {
    name: "Onboarding",
    prompts: ["What is KYC?", "Why verify identity?", "Fastest path to go live"],
  },
};

const QUICK_ACTIONS = [
  { icon: Receipt, label: "View Transactions", to: "/transactions" },
  { icon: Users, label: "Open Customers", to: "/customers" },
  { icon: ShoppingBag, label: "Create Checkout", to: "/checkout" },
  { icon: Store, label: "Connect Store", to: "/integrations" },
  { icon: KeyRound, label: "Generate API Key", to: "/settings" },
  { icon: BarChart3, label: "View Analytics", to: "/analytics" },
] as const;

const WELCOME_PROMPTS = [
  "Why did my payment fail?",
  "Create a checkout",
  "Show today's revenue",
  "Generate an API key",
  "Explain chargebacks",
  "Connect Shopify",
];

const QUICK_PROMPTS = [
  "Create Checkout",
  "Connect Shopify",
  "View Analytics",
  "Explain Chargebacks",
  "Show Failed Payments",
  "Generate Report",
];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function TallyAI() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const ctx = useMemo(() => {
    const match = Object.keys(PAGE_MAP).find((k) => pathname.startsWith(k));
    return match
      ? { route: match, ...PAGE_MAP[match] }
      : { route: pathname, name: "Tally", prompts: WELCOME_PROMPTS.slice(0, 3) };
  }, [pathname]);

  useEffect(() => {
    if (open) setTimeout(() => textareaRef.current?.focus(), 150);
  }, [open]);

  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true);
      const detail = (e as CustomEvent<{ prompt?: string }>).detail;
      if (detail?.prompt) setInput(detail.prompt);
    };
    window.addEventListener("tally:ai:open", onOpen);
    return () => window.removeEventListener("tally:ai:open", onOpen);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || busy) return;
    const userMsg: Msg = { id: uid(), role: "user", content: clean };
    const assistantId = uid();
    const nextMsgs = [...msgs, userMsg];
    setMsgs([...nextMsgs, { id: assistantId, role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/tally-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          messages: nextMsgs.map((m) => ({ role: m.role, content: m.content })),
          context: { page: ctx.name, route: ctx.route },
        }),
      });
      if (!res.ok || !res.body) throw new Error(await res.text().catch(() => "Request failed"));

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";
        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const json = JSON.parse(payload);
            const delta = json.choices?.[0]?.delta?.content;
            if (typeof delta === "string" && delta) {
              acc += delta;
              setMsgs((prev) =>
                prev.map((m) => (m.id === assistantId ? { ...m, content: acc } : m)),
              );
            }
          } catch {
            /* ignore parse errors */
          }
        }
      }
      if (!acc) {
        setMsgs((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: "_No response received. Please try again._" }
              : m,
          ),
        );
      }
    } catch (err) {
      const message =
        err instanceof Error && err.name === "AbortError"
          ? "_Stopped._"
          : "⚠️ I couldn't reach the AI service. Please try again in a moment.";
      setMsgs((prev) => prev.map((m) => (m.id === assistantId ? { ...m, content: message } : m)));
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  function reset() {
    abortRef.current?.abort();
    setMsgs([]);
    setInput("");
  }

  return (
    <>
      {/* Floating launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Tally AI"
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full text-white transition-transform hover:scale-105 active:scale-95"
        style={{
          background: `linear-gradient(135deg, ${T.blue}, ${T.violet})`,
          boxShadow: "0 12px 30px rgba(37,99,235,0.35), 0 2px 6px rgba(124,58,237,0.25)",
        }}
      >
        <Sparkles className="h-6 w-6" />
        <span
          className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full text-[9px] font-bold"
          style={{ background: T.card, color: T.violet, border: `1px solid ${T.border}` }}
        >
          AI
        </span>
      </button>

      {/* Backdrop for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full flex-col transition-transform duration-300 ease-out sm:w-[460px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: T.card,
          borderLeft: `1px solid ${T.border}`,
          boxShadow: SHADOW_LIFT,
        }}
      >
        {/* Header */}
        <header
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: `1px solid ${T.border}` }}
        >
          <div
            className="grid h-9 w-9 place-items-center rounded-xl text-white"
            style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.violet})` }}
          >
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div
              className="flex items-center gap-2 text-[14px] font-semibold"
              style={{ color: T.text }}
            >
              Tally AI
              <span
                className="flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium"
                style={{ background: "#ECFDF5", color: "#047857" }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: T.green }} />
                Online
              </span>
            </div>
            <div className="text-[12px]" style={{ color: T.textMuted }}>
              Your ecommerce copilot · {ctx.name}
            </div>
          </div>
          {msgs.length > 0 && (
            <button
              onClick={reset}
              className="rounded-md px-2 py-1 text-[11px] font-medium transition-colors"
              style={{ color: T.textMuted }}
              onMouseEnter={(e) => (e.currentTarget.style.background = T.hairline)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              New chat
            </button>
          )}
          <button
            onClick={() => setOpen(false)}
            className="grid h-8 w-8 place-items-center rounded-lg transition-colors"
            style={{ color: T.textMuted }}
            onMouseEnter={(e) => (e.currentTarget.style.background = T.hairline)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5">
          {msgs.length === 0 ? (
            <WelcomeView
              ctx={ctx}
              onPrompt={send}
              onNavigate={(to) => {
                navigate({ to });
                setOpen(false);
              }}
            />
          ) : (
            <div className="flex flex-col gap-4">
              {msgs.map((m) => (
                <MessageBubble key={m.id} role={m.role} content={m.content} />
              ))}
              {busy && msgs[msgs.length - 1]?.content === "" && <TypingDots />}
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="px-5 pb-4 pt-2" style={{ borderTop: `1px solid ${T.border}` }}>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => send(p)}
                disabled={busy}
                className="rounded-full px-2.5 py-1 text-[11px] font-medium transition-all disabled:opacity-50"
                style={{
                  background: T.bg,
                  border: `1px solid ${T.border}`,
                  color: T.textMuted,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = T.card;
                  e.currentTarget.style.borderColor = T.blue;
                  e.currentTarget.style.color = T.blue;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = T.bg;
                  e.currentTarget.style.borderColor = T.border;
                  e.currentTarget.style.color = T.textMuted;
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="mt-3 flex items-end gap-2 rounded-2xl p-2"
            style={{ background: T.bg, border: `1px solid ${T.border}` }}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={1}
              placeholder="Ask Tally AI anything…"
              className="max-h-32 flex-1 resize-none bg-transparent px-2 py-1.5 text-[13px] outline-none"
              style={{ color: T.text }}
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="grid h-9 w-9 place-items-center rounded-xl text-white transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
              style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.violet})` }}
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </form>
          <p className="mt-2 text-center text-[10px]" style={{ color: T.textFaint }}>
            Tally AI can make mistakes. Confirm sensitive actions before running.
          </p>
        </div>
      </aside>
    </>
  );
}

function WelcomeView({
  ctx,
  onPrompt,
  onNavigate,
}: {
  ctx: { name: string; prompts: string[] };
  onPrompt: (t: string) => void;
  onNavigate: (to: string) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <div className="text-[18px] font-semibold" style={{ color: T.text }}>
          Welcome 👋
        </div>
        <p className="mt-1 text-[13px] leading-relaxed" style={{ color: T.textMuted }}>
          I can help you manage payments, customers, analytics and your business.
        </p>
      </section>

      {/* Context prompts */}
      <section>
        <div className="mb-2 flex items-center gap-2">
          <Zap className="h-3.5 w-3.5" style={{ color: T.violet }} />
          <div
            className="text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: T.textMuted }}
          >
            On this page · {ctx.name}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          {ctx.prompts.map((p) => (
            <button
              key={p}
              onClick={() => onPrompt(p)}
              className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] transition-all"
              style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = T.blue;
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span>{p}</span>
              <ArrowRight
                className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                style={{ color: T.blue }}
              />
            </button>
          ))}
        </div>
      </section>

      {/* Try asking */}
      <section>
        <div
          className="mb-2 text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: T.textMuted }}
        >
          Try asking
        </div>
        <div className="flex flex-wrap gap-1.5">
          {WELCOME_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => onPrompt(p)}
              className="rounded-full px-3 py-1.5 text-[12px] font-medium transition-all"
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F5F3FF";
                e.currentTarget.style.borderColor = T.violet;
                e.currentTarget.style.color = T.violet;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = T.card;
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.color = T.text;
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      {/* Suggested actions */}
      <section>
        <div
          className="mb-2 text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: T.textMuted }}
        >
          Suggested actions
        </div>
        <div className="grid grid-cols-2 gap-2">
          {QUICK_ACTIONS.map(({ icon: Icon, label, to }) => (
            <button
              key={label}
              onClick={() => onNavigate(to)}
              className="group flex flex-col items-start gap-2 rounded-xl p-3 text-left transition-all"
              style={{ background: T.card, border: `1px solid ${T.border}` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = T.blue;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(37,99,235,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span
                className="grid h-7 w-7 place-items-center rounded-lg"
                style={{ background: "#F5F3FF", color: T.violet }}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="text-[12px] font-medium" style={{ color: T.text }}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Insights */}
      <section>
        <div className="mb-2 flex items-center gap-2">
          <Lightbulb className="h-3.5 w-3.5" style={{ color: T.amber }} />
          <div
            className="text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: T.textMuted }}
          >
            AI insights
          </div>
        </div>
        <div
          className="rounded-xl p-4 text-[12px] leading-relaxed"
          style={{
            background: "linear-gradient(135deg, #F5F3FF 0%, #EFF6FF 100%)",
            border: `1px solid ${T.border}`,
            color: T.textMuted,
          }}
        >
          <div className="mb-1 font-medium" style={{ color: T.text }}>
            No insights available yet
          </div>
          Connect your store and start processing payments to unlock personalized recommendations —
          revenue trends, conversion changes, fraud alerts and growth opportunities.
        </div>
      </section>
    </div>
  );
}

function MessageBubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[85%] rounded-2xl rounded-tr-md px-3.5 py-2.5 text-[13px] leading-relaxed text-white"
          style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.violet})` }}
        >
          {content}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-2.5">
      <div
        className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg text-white"
        style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.violet})` }}
      >
        <Sparkles className="h-3.5 w-3.5" />
      </div>
      <div
        className="prose prose-sm max-w-none flex-1 text-[13px] leading-relaxed prose-p:my-1.5 prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5 prose-headings:text-[13px] prose-headings:font-semibold prose-code:rounded prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-[12px] prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-a:text-blue-600"
        style={{ color: T.text }}
      >
        {content ? <ReactMarkdown>{content}</ReactMarkdown> : <TypingDots />}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-2">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full"
          style={{
            background: T.violet,
            animationDelay: `${i * 120}ms`,
          }}
        />
      ))}
    </div>
  );
}
