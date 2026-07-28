import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/partners")({
  component: Partners,
  head: () => ({
    meta: [
      { title: "Partner Program — Build, grow and co-sell with Zippay" },
      {
        name: "description",
        content:
          "Join the Zippay Partner Program. Agencies, platforms and technology partners build, market and co-sell payment solutions for Shopify and WooCommerce merchants.",
      },
      { property: "og:title", content: "Zippay Partner Program" },
      {
        property: "og:description",
        content:
          "Solutions, Platform and Technology tracks. Onboard your team, unlock revenue share, and co-sell with Zippay.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const tracks = [
  {
    tag: "Solutions",
    title: "Build your practice by offering expertise on Zippay",
    d: "Agencies, consultancies and system integrators helping merchants migrate, implement and optimize Zippay across Shopify and WooCommerce stacks.",
    who: ["Digital agencies", "Shopify Plus partners", "Woo experts", "Payment consultants"],
  },
  {
    tag: "Platform",
    title: "Grow your business by embedding Zippay into your platform",
    d: "SaaS platforms, marketplaces and e-commerce products that embed Zippay to monetize payments and speed up merchant onboarding.",
    who: ["Marketplaces", "Vertical SaaS", "Headless commerce", "PSPs & orchestrators"],
  },
  {
    tag: "Technology",
    title: "Build apps that show up in Zippay product flows",
    d: "ISVs building extensions surfaced natively in the Zippay dashboard — fraud, tax, analytics, subscriptions, loyalty and finance tools.",
    who: ["Fraud & risk", "Tax & compliance", "Analytics", "Finance & accounting"],
    invite: true,
  },
  {
    tag: "Payment method",
    title: "Launch your payment method on Zippay",
    d: "Local wallets, BNPL providers, real-time bank payment schemes and alternative payment methods reaching thousands of merchants in a single integration.",
    who: ["Local wallets", "BNPL", "Open banking", "Card networks"],
    invite: true,
  },
];

const benefits = [
  {
    n: "01",
    t: "Enablement",
    d: "On-demand technical and sales training in the partner portal. Certifications for individuals and teams.",
  },
  {
    n: "02",
    t: "Co-marketing",
    d: "Listing on the Zippay partner directory, co-branded launches, and joint campaigns with the Zippay marketing team.",
  },
  {
    n: "03",
    t: "Co-selling",
    d: "Submit opportunities, get matched with an account team, and access account planning to close deals faster.",
  },
  {
    n: "04",
    t: "Revenue share",
    d: "Earn on every merchant you bring, embed or refer — with transparent tiers that scale with volume.",
  },
  {
    n: "05",
    t: "Roadmap access",
    d: "Early access to APIs, checkout components and dashboard extensions before general availability.",
  },
  {
    n: "06",
    t: "Dedicated support",
    d: "A partner manager, technical solutions engineers and a private Slack channel for production issues.",
  },
];

const requirements = [
  "Registered business in a supported country",
  "Named technical and commercial leads",
  "Active pipeline of Shopify or WooCommerce merchants",
  "Signed Zippay Partner Agreement",
];

const stats = [
  { k: "1,200+", v: "Certified partners" },
  { k: "$4.8B", v: "Partner-sourced volume" },
  { k: "48", v: "Countries covered" },
  { k: "92%", v: "Partner retention" },
];

const faqs = [
  {
    q: "Which track should I apply to?",
    a: "Solutions is for service providers. Platform is for SaaS embedding payments. Technology and Payment method are invite-only — apply to Solutions or Platform and we'll route you if a better fit exists.",
  },
  {
    q: "Is there a cost to join?",
    a: "No. The Partner Program is free. You commit to training your team and following the Zippay Partner Agreement.",
  },
  {
    q: "How does revenue share work?",
    a: "Solutions and Platform partners earn a percentage of Zippay processing revenue on merchants they source or embed, with tiers that increase with volume.",
  },
  {
    q: "How long is the review?",
    a: "Applications are reviewed in 5 business days. Technology and Payment method tracks require an additional technical review.",
  },
];

function Partners() {
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
            <Link
              to="/pricing"
              className="text-sm font-medium text-navy-deep/70 transition-colors hover:text-navy-deep"
            >
              Pricing
            </Link>
            <Link to="/partners" className="text-sm font-semibold text-navy-deep">
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
            Partner Program
          </span>
          <h1 className="mx-auto mt-4 max-w-[22ch] text-balance font-sora text-5xl font-semibold leading-[1.05] tracking-tight text-navy-deep sm:text-6xl">
            Build, grow and <span className="text-blue-accent">co-sell</span> with Zippay
          </h1>
          <p className="mx-auto mt-6 max-w-[60ch] text-pretty text-lg leading-relaxed text-navy-mid/75">
            Join a global community of partners to build solutions and skills, market your company,
            and co-sell payment infrastructure to Shopify and WooCommerce merchants.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#apply"
              className="h-11 inline-flex items-center rounded-full bg-navy-deep px-6 text-sm font-medium text-off-white transition-colors hover:bg-navy-mid"
            >
              Become a partner
            </a>
            <a
              href="#tracks"
              className="h-11 inline-flex items-center rounded-full border border-navy-deep/15 bg-white px-6 text-sm font-medium text-navy-deep transition-colors hover:border-navy-deep/30"
            >
              Explore tracks
            </a>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.v} className="text-center">
                <div className="font-sora text-3xl font-semibold text-navy-deep">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-navy-mid/70">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section id="tracks" className="border-t border-navy-deep/5 bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between gap-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-accent">
                01 / The tracks
              </span>
              <h2 className="mt-3 max-w-[24ch] font-sora text-4xl font-semibold tracking-tight text-navy-deep sm:text-5xl">
                Pick the partner track that fits your business
              </h2>
            </div>
            <p className="hidden max-w-sm text-sm leading-relaxed text-navy-mid/75 lg:block">
              Whether you're embedding Zippay in your software or expanding your services practice,
              choose a track and unlock the resources built for it. Technology and Payment method
              tracks are invite-only.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {tracks.map((t) => (
              <div
                key={t.tag}
                className="group relative flex flex-col rounded-2xl border border-navy-deep/8 bg-off-white p-8 transition-colors hover:border-navy-deep/20"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-navy-deep px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-off-white">
                    {t.tag}
                  </span>
                  {t.invite && (
                    <span className="rounded-full border border-navy-deep/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy-mid">
                      Invite-only
                    </span>
                  )}
                </div>
                <h3 className="mt-5 max-w-[28ch] font-sora text-2xl font-semibold leading-snug text-navy-deep">
                  {t.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-navy-mid/80">{t.d}</p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {t.who.map((w) => (
                    <li
                      key={w}
                      className="rounded-full border border-navy-deep/10 bg-white px-3 py-1 text-xs text-navy-mid"
                    >
                      {w}
                    </li>
                  ))}
                </ul>

                <a
                  href="#apply"
                  className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-navy-deep transition-colors hover:text-blue-accent"
                >
                  {t.invite ? "Request an invite" : "Apply to this track"} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t border-navy-deep/5 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-accent">
            02 / The benefits
          </span>
          <h2 className="mt-3 max-w-[26ch] font-sora text-4xl font-semibold tracking-tight text-navy-deep sm:text-5xl">
            Everything you need to launch, market and monetize
          </h2>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-navy-deep/8 bg-navy-deep/8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.n} className="bg-white p-8">
                <div className="font-sora text-sm font-semibold text-blue-accent">{b.n}</div>
                <h3 className="mt-3 font-sora text-xl font-semibold text-navy-deep">{b.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-navy-mid/80">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="border-t border-navy-deep/5 bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-accent">
            03 / The journey
          </span>
          <h2 className="mt-3 max-w-[24ch] font-sora text-4xl font-semibold tracking-tight text-navy-deep sm:text-5xl">
            From application to first co-sold deal
          </h2>

          <ol className="mt-14 grid gap-6 md:grid-cols-4">
            {[
              {
                n: "01",
                t: "Apply",
                d: "Submit your company and pipeline. Reviewed in 5 business days.",
              },
              {
                n: "02",
                t: "Onboard",
                d: "Team access to the partner portal, training and sandbox.",
              },
              {
                n: "03",
                t: "Certify",
                d: "Complete technical and sales certifications for your tier.",
              },
              {
                n: "04",
                t: "Grow",
                d: "Co-market, co-sell and earn revenue share on every merchant.",
              },
            ].map((s) => (
              <li key={s.n} className="rounded-2xl border border-navy-deep/8 bg-off-white p-6">
                <div className="font-sora text-2xl font-semibold text-blue-accent">{s.n}</div>
                <div className="mt-2 font-sora text-lg font-semibold text-navy-deep">{s.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-navy-mid/80">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Requirements + Apply */}
      <section id="apply" className="border-t border-navy-deep/5 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-accent">
              04 / Requirements
            </span>
            <h2 className="mt-3 max-w-[22ch] font-sora text-4xl font-semibold tracking-tight text-navy-deep sm:text-5xl">
              What we look for
            </h2>
            <ul className="mt-8 space-y-4">
              {requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[15px] text-navy-mid/85">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-blue-accent" />
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-navy-mid/70">
              Full benefits and requirements are outlined in the Partner Agreement, shared after
              your application is approved.
            </p>
          </div>

          <div className="rounded-2xl border border-navy-deep/8 bg-white p-8 shadow-[0_1px_0_rgb(15_27_61/0.04)]">
            <div className="font-sora text-lg font-semibold text-navy-deep">
              Apply to the Partner Program
            </div>
            <p className="mt-2 text-sm text-navy-mid/75">
              Tell us about your company. A partner manager will follow up within 5 business days.
            </p>
            <form className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-medium text-navy-deep/80">
                  Full name
                  <input
                    type="text"
                    className="mt-1.5 h-10 w-full rounded-lg border border-navy-deep/12 bg-off-white px-3 text-sm outline-none focus:border-blue-accent"
                  />
                </label>
                <label className="text-xs font-medium text-navy-deep/80">
                  Work email
                  <input
                    type="email"
                    className="mt-1.5 h-10 w-full rounded-lg border border-navy-deep/12 bg-off-white px-3 text-sm outline-none focus:border-blue-accent"
                  />
                </label>
              </div>
              <label className="text-xs font-medium text-navy-deep/80">
                Company
                <input
                  type="text"
                  className="mt-1.5 h-10 w-full rounded-lg border border-navy-deep/12 bg-off-white px-3 text-sm outline-none focus:border-blue-accent"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-medium text-navy-deep/80">
                  Volume mensuel
                  <select className="mt-1.5 h-10 w-full rounded-lg border border-navy-deep/12 bg-off-white px-3 text-sm outline-none focus:border-blue-accent">
                    <option>$0 – $400k</option>
                    <option>$400k – $1M</option>
                    <option>$1M – $5M</option>
                    <option>$5M – $20M</option>
                    <option>$20M – $50M</option>
                    <option>$50M+</option>
                  </select>
                </label>
                <label className="text-xs font-medium text-navy-deep/80">
                  Nombre de merchants
                  <input
                    type="number"
                    min={0}
                    className="mt-1.5 h-10 w-full rounded-lg border border-navy-deep/12 bg-off-white px-3 text-sm outline-none focus:border-blue-accent"
                  />
                </label>
              </div>
              <label className="text-xs font-medium text-navy-deep/80">
                Tell us about your business
                <textarea
                  rows={4}
                  className="mt-1.5 w-full rounded-lg border border-navy-deep/12 bg-off-white p-3 text-sm outline-none focus:border-blue-accent"
                />
              </label>
              <button
                type="button"
                className="mt-2 h-11 rounded-full bg-navy-deep text-sm font-medium text-off-white transition-colors hover:bg-navy-mid"
              >
                Submit application
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-navy-deep/5 bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-accent">
            05 / FAQ
          </span>
          <h2 className="mt-3 font-sora text-4xl font-semibold tracking-tight text-navy-deep sm:text-5xl">
            Partner Program questions, answered
          </h2>
          <div className="mt-10 divide-y divide-navy-deep/10 border-y border-navy-deep/10">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-sora text-lg font-medium text-navy-deep">
                  {f.q}
                  <span className="text-blue-accent transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-[70ch] text-[15px] leading-relaxed text-navy-mid/80">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-navy-deep/5 py-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 text-sm text-navy-mid/70">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            All systems processing
          </div>
          <div className="flex gap-6">
            <Link to="/integrations" className="hover:text-navy-deep">
              Integrations
            </Link>
            <Link to="/pricing" className="hover:text-navy-deep">
              Pricing
            </Link>
            <Link to="/partners" className="hover:text-navy-deep">
              Partner Program
            </Link>
          </div>
          <div>© {new Date().getFullYear()} Zippay</div>
        </div>
      </footer>
    </div>
  );
}
