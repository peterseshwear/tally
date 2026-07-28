import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  component: Pricing,
  head: () => ({
    meta: [
      { title: "Pricing — Zippay Conversion Suite for Shopify & WooCommerce" },
      {
        name: "description",
        content:
          "Simple pricing for Zippay. 1.2% of extra revenue generated — page builder, A/B testing, upsell and cross-sell in one suite. Free until you grow.",
      },
      { property: "og:title", content: "Zippay Pricing — 1.2% of uplift" },
      {
        property: "og:description",
        content:
          "Pay 1.2% only on the incremental revenue Zippay generates. Page builder, conversion optimization, upsell and cross-sell — no monthly fees.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const includedFeatures = [
  "Drag-and-drop page builder",
  "100+ conversion-ready templates",
  "A/B & multivariate testing",
  "One-click upsells",
  "Cross-sell recommendations",
  "Post-purchase offers",
  "Cart & bundle builder",
  "Exit-intent & sticky bars",
  "Native Shopify & Woo apps",
  "Real-time analytics dashboard",
];

const addons = [
  {
    tag: "Personalization AI",
    price: "0.3%",
    unit: "of extra revenue",
    desc: "Auto-personalize hero, PDP and recommendations per visitor using intent, source and past behaviour.",
  },
  {
    tag: "Bundle Builder+",
    price: "0.2%",
    unit: "of bundle revenue",
    desc: "Mix-and-match bundles, tiered discounts and volume packs — configured in a few clicks.",
  },
  {
    tag: "Post-purchase+",
    price: "0.4%",
    unit: "of upsell revenue",
    desc: "One-click thank-you page upsells and subscription upgrades without a second checkout step.",
  },
  {
    tag: "Winback",
    price: "$0.02",
    unit: "per email/SMS",
    desc: "Automated abandoned-cart, browse-abandon and winback flows synced to your store catalog.",
  },
];

const compare = [
  { row: "Success fee on uplift", zip: "1.2%", stripe: "n/a", pp: "n/a" },
  { row: "Monthly platform fee", zip: "$0", stripe: "$99+", pp: "$149+" },
  { row: "Drag-and-drop builder", zip: "Yes", stripe: "No", pp: "Limited" },
  { row: "A/B & multivariate testing", zip: "Unlimited", stripe: "Limited", pp: "Add-on" },
  { row: "Upsell / cross-sell engine", zip: "Yes", stripe: "3rd-party", pp: "Add-on" },
  { row: "Shopify native app", zip: "Yes", stripe: "Limited", pp: "Yes" },
  { row: "WooCommerce plugin", zip: "Yes", stripe: "3rd-party", pp: "Yes" },
];
const outOfTheBox = [
  {
    icon: "card",
    title: "No-code page builder",
    items: ["Drag-and-drop editor", "100+ templates", "Mobile-first layouts", "Reusable sections"],
  },
  {
    icon: "shield-search",
    title: "Conversion rate optimization",
    items: [
      "A/B & multivariate tests",
      "Auto-winner promotion",
      "Heatmaps & session replays",
      "Funnel analytics",
    ],
  },
  {
    icon: "cart",
    title: "Upsell & cross-sell engine",
    items: [
      "One-click PDP upsells",
      "Cart cross-sells",
      "Post-purchase offers",
      "Rules & AI recommendations",
    ],
  },
  {
    icon: "chart",
    title: "Revenue analytics",
    items: ["AOV & LTV dashboards", "Cohort reports", "Attribution by channel"],
  },
  {
    icon: "bars",
    title: "Bundles & merchandising",
    items: [
      "Volume & mix bundles",
      "Frequently bought together",
      "Sticky add-to-cart",
      "Dynamic pricing rules",
    ],
  },
  {
    icon: "bank",
    title: "SEO & speed",
    items: ["Core Web Vitals optimized", "Structured data", "Image CDN & lazy load"],
  },
  {
    icon: "chat",
    title: "Onboarding & CSM",
    items: ["24×7 chat support", "Merchant playbooks", "Slack community"],
  },
  {
    icon: "lock",
    title: "Trust & reliability",
    items: ["99.999% uptime", "Enterprise-grade security", "GDPR & CCPA ready"],
  },
];

function FeatureIcon({ name }: { name: string }) {
  const common = "size-6 text-blue-accent";
  switch (name) {
    case "card":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
          <path d="M2.5 10h19" />
        </svg>
      );
    case "shield-search":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
          <circle cx="11" cy="11" r="2.5" />
          <path d="m13 13 2 2" />
        </svg>
      );
    case "cart":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M3 5h2l2.5 11h11L21 8H7" />
          <circle cx="9" cy="20" r="1.4" />
          <circle cx="18" cy="20" r="1.4" />
        </svg>
      );
    case "chart":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M3 17l6-6 4 4 8-9" />
          <path d="M14 6h7v7" />
        </svg>
      );
    case "bars":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="4" y="12" width="3" height="8" />
          <rect x="10.5" y="8" width="3" height="12" />
          <rect x="17" y="4" width="3" height="16" />
        </svg>
      );
    case "bank":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M3 10 12 4l9 6" />
          <path d="M5 10v8M12 10v8M19 10v8" />
          <path d="M3 20h18" />
        </svg>
      );
    case "chat":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M4 5h16v11H8l-4 4V5z" />
          <path d="M10 10c0-1.5 1.2-2.2 2-2.2s2 .7 2 2c0 1.4-2 1.6-2 3" />
          <circle cx="12" cy="14" r=".6" fill="currentColor" />
        </svg>
      );
    case "lock":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
          <rect x="9" y="10" width="6" height="5" rx="1" />
          <path d="M10 10V9a2 2 0 0 1 4 0v1" />
        </svg>
      );
    default:
      return null;
  }
}

const faqs = [
  {
    q: "How does the 1.2% success fee work?",
    a: "You only pay 1.2% on the incremental revenue Zippay generates — the extra AOV from upsells, cross-sells and the uplift measured by our built-in A/B tests. If Zippay doesn't lift your revenue, you pay nothing.",
  },
  {
    q: "Are there any monthly or setup fees?",
    a: "No. No monthly platform fee, no per-seat pricing, no template fees. You install the Shopify or WooCommerce app and the full suite unlocks instantly.",
  },
  {
    q: "When do I qualify for volume pricing?",
    a: "Merchants above $500,000/mo in extra revenue generated by Zippay automatically move to a custom rate below 1.2%, with a dedicated CSM and roadmap input.",
  },
  {
    q: "Does the page builder replace my theme?",
    a: "No. Zippay layers on top of your existing Shopify theme or WooCommerce template. Build landing pages, PDPs, funnels and post-purchase pages without touching your theme code.",
  },
  {
    q: "What's included in the free trial?",
    a: "The first $10,000 of extra revenue Zippay generates is free — full product, no card required. After that, the 1.2% success fee applies to incremental revenue only.",
  },
  {
    q: "How is 'incremental revenue' measured?",
    a: "Every upsell, cross-sell and A/B test runs against a hold-out control group. You see the uplift live in your dashboard and can export the raw data any time.",
  },
];

function Pricing() {
  return (
    <div className="min-h-screen bg-off-white font-manrope text-navy-deep selection:bg-blue-accent/20">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-navy-deep/5 bg-off-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="font-sora text-xl font-semibold tracking-tight text-navy-deep">
            zippay<span className="text-blue-accent">.</span>
          </Link>
          <div className="hidden items-center gap-9 lg:flex">
            <Link
              to="/integrations"
              className="text-sm font-medium text-navy-deep/70 transition-colors hover:text-navy-deep"
            >
              Integrations
            </Link>
            <a
              href="#"
              className="text-sm font-medium text-navy-deep/70 transition-colors hover:text-navy-deep"
            >
              Merchants
            </a>
            <Link to="/pricing" className="text-sm font-semibold text-navy-deep">
              Pricing
            </Link>
            <Link
              to="/partners"
              className="text-sm font-medium text-navy-deep/70 transition-colors hover:text-navy-deep"
            >
              Partner Program
            </Link>
          </div>
          <Link
            to="/auth"
            className="inline-flex h-9 items-center rounded-full bg-navy-deep px-4 text-sm font-medium text-off-white transition-colors hover:bg-navy-mid"
          >
            Go to App
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pb-20 pt-16 lg:pt-24">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(30 58 95 / 0.35) 1px, transparent 0)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(ellipse 80% 55% at 50% 30%, black 40%, transparent 75%)",
          }}
        />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-accent">
            Pricing
          </span>
          <h1 className="mx-auto mt-4 max-w-[22ch] text-balance font-sora text-5xl font-semibold leading-[1.05] tracking-tight text-navy-deep sm:text-6xl">
            Only pay when we grow your store
          </h1>
          <p className="mx-auto mt-6 max-w-[58ch] text-pretty text-lg leading-relaxed text-navy-mid/75">
            One flat success fee on the extra revenue Zippay generates through page building, A/B
            testing, upsells and cross-sells. No monthly fee, no lock-in — free until you grow.
          </p>
        </div>
      </section>

      {/* Main pricing card */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="overflow-hidden rounded-3xl border border-navy-deep/10 bg-white shadow-xl shadow-navy-deep/5">
            <div className="grid lg:grid-cols-[1.1fr_1fr]">
              {/* Left: price */}
              <div className="border-b border-navy-deep/10 p-10 lg:border-b-0 lg:border-r lg:p-14">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-accent/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-accent">
                    Standard
                  </span>
                  <span className="text-xs text-navy-mid/60">Success-based</span>
                </div>

                <h2 className="mt-6 font-sora text-3xl font-semibold text-navy-deep">
                  Conversion Suite
                </h2>
                <p className="mt-2 text-sm text-navy-mid/70">
                  Everything a merchant needs to build, test and grow the store.
                </p>

                <div className="mt-10 flex items-baseline gap-2">
                  <span className="font-sora text-6xl font-semibold tracking-tight text-navy-deep">
                    1.2%
                  </span>
                  <span className="font-sora text-2xl text-navy-mid/60">of</span>
                  <span className="font-sora text-2xl font-semibold text-navy-deep">
                    extra revenue
                  </span>
                </div>
                <p className="mt-2 text-sm text-navy-mid/60">
                  measured vs. control — no uplift, no fee
                </p>

                <div className="mt-8 grid grid-cols-3 divide-x divide-navy-deep/10 border-y border-navy-deep/10 py-4 text-center">
                  <div>
                    <div className="font-sora text-lg font-semibold text-navy-deep">$0</div>
                    <div className="text-[11px] uppercase tracking-wider text-navy-mid/50">
                      Monthly fee
                    </div>
                  </div>
                  <div>
                    <div className="font-sora text-lg font-semibold text-navy-deep">$0</div>
                    <div className="text-[11px] uppercase tracking-wider text-navy-mid/50">
                      Setup
                    </div>
                  </div>
                  <div>
                    <div className="font-sora text-lg font-semibold text-navy-deep">$10k</div>
                    <div className="text-[11px] uppercase tracking-wider text-navy-mid/50">
                      Free uplift
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/auth"
                    className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-blue-accent px-6 text-sm font-semibold text-white shadow-lg shadow-blue-accent/25 transition-colors hover:bg-blue-accent/90"
                  >
                    Start free today →
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-navy-deep ring-1 ring-navy-deep/15 transition-colors hover:bg-navy-deep/5"
                  >
                    Contact sales
                  </Link>
                </div>
              </div>

              {/* Right: included */}
              <div className="bg-off-white/60 p-10 lg:p-14">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-navy-mid/50">
                  Included in every account
                </div>
                <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                  {includedFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-navy-deep">
                      <span
                        aria-hidden
                        className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-blue-accent/15 text-[11px] font-bold text-blue-accent"
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 rounded-2xl border border-dashed border-navy-deep/15 bg-white/60 p-5">
                  <div className="flex items-start gap-3">
                    <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-navy-deep text-off-white">
                      <span className="font-sora text-sm font-semibold">V</span>
                    </div>
                    <div>
                      <p className="font-sora text-sm font-semibold text-navy-deep">
                        Volume pricing from $500k/mo
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-navy-mid/70">
                        Custom success rate below 1.2%, dedicated CSM, roadmap input and white-glove
                        onboarding.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="border-t border-navy-deep/5 bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-accent">
                02 / Add-ons
              </span>
              <h2 className="mt-3 max-w-[24ch] font-sora text-4xl font-semibold leading-tight tracking-tight text-navy-deep sm:text-5xl">
                Turn on what you need, when you need it
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-navy-mid/70">
              Every add-on is metered — no bundle, no minimums. Flip it on from the dashboard and
              pay only for what you use.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {addons.map((a) => (
              <div
                key={a.tag}
                className="group flex flex-col rounded-2xl border border-navy-deep/10 bg-off-white/50 p-6 transition-colors hover:border-navy-deep/25 hover:bg-off-white"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-navy-mid/50">
                  {a.tag}
                </div>
                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="font-sora text-3xl font-semibold text-navy-deep">{a.price}</span>
                </div>
                <div className="mt-1 text-xs text-navy-mid/60">{a.unit}</div>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-navy-mid/75">{a.desc}</p>
                <a
                  href="#"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-accent"
                >
                  Learn more <span aria-hidden>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-off-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-accent">
              03 / Compare
            </span>
            <h2 className="mx-auto mt-3 max-w-[22ch] font-sora text-4xl font-semibold leading-tight tracking-tight text-navy-deep sm:text-5xl">
              How Zippay compares
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-navy-deep/10 bg-white">
            <div className="grid grid-cols-4 border-b border-navy-deep/10 bg-off-white/60 text-[11px] font-bold uppercase tracking-[0.15em] text-navy-mid/60">
              <div className="p-5">Feature</div>
              <div className="border-l border-navy-deep/10 bg-blue-accent/5 p-5 text-blue-accent">
                Zippay
              </div>
              <div className="border-l border-navy-deep/10 p-5">Stripe</div>
              <div className="border-l border-navy-deep/10 p-5">PayPal</div>
            </div>
            {compare.map((r, i) => (
              <div
                key={r.row}
                className={`grid grid-cols-4 text-sm ${i % 2 === 1 ? "bg-off-white/30" : ""}`}
              >
                <div className="p-5 font-medium text-navy-deep">{r.row}</div>
                <div className="border-l border-navy-deep/10 bg-blue-accent/[0.04] p-5 font-sora font-semibold text-navy-deep">
                  {r.zip}
                </div>
                <div className="border-l border-navy-deep/10 p-5 text-navy-mid/80">{r.stripe}</div>
                <div className="border-l border-navy-deep/10 p-5 text-navy-mid/80">{r.pp}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-navy-mid/50">
            Public pricing of the standard plans, as of Jul 2026. Custom volume pricing may differ.
          </p>
        </div>
      </section>

      {/* Features out of the box */}
      <section className="border-t border-navy-deep/5 bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-accent">
                Included
              </span>
              <h2 className="mt-3 max-w-[26ch] font-sora text-4xl font-semibold leading-tight tracking-tight text-navy-deep sm:text-5xl">
                Features available out of the box
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-navy-mid/70">
              Every Zippay account ships with the full stack — no gated tiers, no per-seat upsell.
              Turn features on from the dashboard.
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-12 border-t border-navy-deep/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {outOfTheBox.map((f) => (
              <div key={f.title} className="relative">
                <div className="mb-5 grid size-11 place-items-center rounded-xl bg-blue-accent/10">
                  <FeatureIcon name={f.icon} />
                </div>
                <h3 className="font-sora text-base font-semibold leading-snug text-navy-deep">
                  {f.title}
                </h3>
                <ul className="mt-4 space-y-2.5 border-t border-navy-deep/10 pt-4">
                  {f.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-navy-mid/85">
                      <span
                        aria-hidden
                        className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-blue-accent/15 text-[9px] font-bold text-blue-accent"
                      >
                        ✓
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise band */}
      <section className="bg-navy-deep py-20 text-off-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-accent">
                Enterprise
              </span>
              <h2 className="mt-3 max-w-[22ch] font-sora text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Custom growth deals for scaled stores
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-off-white/70">
                Generating above $500k / month in extra revenue with Zippay? Move to a custom
                success rate below 1.2%, unlock a named CSM, dedicated CRO squad and priority
                roadmap input.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-off-white px-6 text-sm font-semibold text-navy-deep transition-colors hover:bg-off-white/90">
                  Talk to sales →
                </button>
                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white/10 px-6 text-sm font-semibold text-off-white ring-1 ring-white/20 transition-colors hover:bg-white/15">
                  Estimate my uplift
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Custom success rate", "Below 1.2% on uplift"],
                ["Dedicated CSM", "Named account manager"],
                ["CRO squad", "Designers & test analysts"],
                ["Priority roadmap", "Ship what you need next"],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="font-sora text-base font-semibold">{t}</div>
                  <div className="mt-1 text-xs text-off-white/60">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-off-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-accent">
              04 / FAQ
            </span>
            <h2 className="mt-3 font-sora text-4xl font-semibold leading-tight tracking-tight text-navy-deep sm:text-5xl">
              Pricing questions, answered
            </h2>
          </div>
          <dl className="divide-y divide-navy-deep/10 border-y border-navy-deep/10">
            {faqs.map((f) => (
              <div key={f.q} className="grid gap-2 py-7 md:grid-cols-[1fr_1.6fr] md:gap-10">
                <dt className="font-sora text-lg font-semibold text-navy-deep">{f.q}</dt>
                <dd className="text-sm leading-relaxed text-navy-mid/75">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-navy-deep/5 bg-white py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mx-auto max-w-[22ch] font-sora text-4xl font-semibold leading-tight tracking-tight text-navy-deep sm:text-5xl">
            Start growing in under 10 minutes
          </h2>
          <p className="mx-auto mt-5 max-w-[54ch] text-base leading-relaxed text-navy-mid/70">
            Install on Shopify or WooCommerce, pick a template and launch your first upsell or A/B
            test today. Free until Zippay makes you money.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/auth"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-blue-accent px-6 text-sm font-semibold text-white shadow-lg shadow-blue-accent/25 transition-colors hover:bg-blue-accent/90"
            >
              Start free today →
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-navy-deep ring-1 ring-navy-deep/15 transition-colors hover:bg-navy-deep/5"
            >
              Contact sales ↗
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-navy-deep/5 bg-off-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs text-navy-mid/60 sm:flex-row">
          <span>© 2026 Zippay Labs — All systems processing.</span>
          <div className="flex gap-6">
            <Link to="/integrations" className="hover:text-navy-deep">
              Integrations
            </Link>
            <Link to="/pricing" className="hover:text-navy-deep">
              Pricing
            </Link>
            <a href="#" className="hover:text-navy-deep">
              Status
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
