import { createFileRoute, Link } from "@tanstack/react-router";
import { BrandLogo, BrandWordmark } from "@/components/BrandLogo";

export const Route = createFileRoute("/integrations")({
  component: Integrations,
  head: () => ({
    meta: [
      { title: "Integrations — Zippay for Shopify, WooCommerce & more" },
      {
        name: "description",
        content:
          "One-click apps for Shopify and WooCommerce, plus native support for Apple Pay, Google Pay, Klarna, Afterpay and every major card network. Ship Zippay in minutes.",
      },
      { property: "og:title", content: "Zippay Integrations" },
      {
        property: "og:description",
        content:
          "Native apps for Shopify and WooCommerce, wallets, BNPL, card networks and orchestration partners — all in one payments OS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type Item = {
  name: string;
  domain: string;
  tag: string;
  desc: string;
  status?: "Live" | "Beta" | "Soon";
};

const categories: { h: string; sub: string; items: Item[] }[] = [
  {
    h: "Ecommerce platforms",
    sub: "1-click apps that replace your checkout and payment stack.",
    items: [
      {
        name: "Shopify",
        domain: "shopify.com",
        tag: "App Store",
        desc: "Native checkout, subscriptions and payouts inside your Shopify admin.",
        status: "Live",
      },
      {
        name: "WooCommerce",
        domain: "woocommerce.com",
        tag: "Plugin",
        desc: "WordPress plugin with block-based checkout and Apple/Google Pay.",
        status: "Live",
      },
      {
        name: "WordPress",
        domain: "wordpress.org",
        tag: "Plugin",
        desc: "Accept payments on any WP site — forms, memberships, donations.",
        status: "Live",
      },
    ],
  },
  {
    h: "Wallets & 1-tap checkout",
    sub: "Mobile-first payment methods that lift conversion.",
    items: [
      {
        name: "Apple Pay",
        domain: "apple.com",
        tag: "Wallet",
        desc: "1-tap checkout on Safari and iOS with device biometrics.",
        status: "Live",
      },
      {
        name: "Google Pay",
        domain: "pay.google.com",
        tag: "Wallet",
        desc: "Frictionless Chrome and Android checkout with saved cards.",
        status: "Live",
      },
      {
        name: "Shop Pay",
        domain: "shop.app",
        tag: "Wallet",
        desc: "Accelerated checkout for the 100M+ Shop Pay network.",
        status: "Live",
      },
    ],
  },
  {
    h: "Buy Now, Pay Later",
    sub: "Split the cart, lift AOV — merchant is paid upfront.",
    items: [
      {
        name: "Klarna",
        domain: "klarna.com",
        tag: "BNPL",
        desc: "Pay in 3 or 4 across EU, UK and US, embedded in the Zippay checkout.",
        status: "Live",
      },
      {
        name: "Afterpay",
        domain: "afterpay.com",
        tag: "BNPL",
        desc: "Interest-free installments for US, AU and CA shoppers.",
        status: "Live",
      },
      {
        name: "Affirm",
        domain: "affirm.com",
        tag: "BNPL",
        desc: "Longer-term financing on high-ticket carts.",
        status: "Beta",
      },
    ],
  },
  {
    h: "Card networks",
    sub: "Direct acquiring on every major network — no middleman markup.",
    items: [
      {
        name: "Visa",
        domain: "visa.com",
        tag: "Network",
        desc: "Global acceptance with Visa Secure 3DS2 built-in.",
        status: "Live",
      },
      {
        name: "Mastercard",
        domain: "mastercard.com",
        tag: "Network",
        desc: "Full Mastercard Identity Check and installments support.",
        status: "Live",
      },
      {
        name: "American Express",
        domain: "americanexpress.com",
        tag: "Network",
        desc: "Amex OptBlue pricing passed through at cost.",
        status: "Live",
      },
    ],
  },
  {
    h: "Orchestration & PSPs",
    sub: "Route to the acquirer with the best cost and auth rate — automatically.",
    items: [
      {
        name: "Adyen",
        domain: "adyen.com",
        tag: "PSP",
        desc: "Enterprise merchants can plug Adyen as a secondary route.",
        status: "Live",
      },
      {
        name: "Airwallex",
        domain: "airwallex.com",
        tag: "PSP",
        desc: "Multi-currency routing for APAC and MENA volumes.",
        status: "Live",
      },
      {
        name: "PayPal",
        domain: "paypal.com",
        tag: "Alt",
        desc: "Add the PayPal button next to card and wallets in one flow.",
        status: "Live",
      },
    ],
  },
];

const featured: { name: string; domain: string }[] = [
  { name: "Shopify", domain: "shopify.com" },
  { name: "WooCommerce", domain: "woocommerce.com" },
  { name: "PayPal", domain: "paypal.com" },
  { name: "Apple Pay", domain: "apple.com" },
  { name: "Google Pay", domain: "pay.google.com" },
  { name: "WordPress", domain: "wordpress.org" },
  { name: "Klarna", domain: "klarna.com" },
  { name: "Afterpay", domain: "afterpay.com" },
  { name: "American Express", domain: "americanexpress.com" },
  { name: "Visa", domain: "visa.com" },
  { name: "Mastercard", domain: "mastercard.com" },
  { name: "Adyen", domain: "adyen.com" },
  { name: "Airwallex", domain: "airwallex.com" },
];

function Integrations() {
  return (
    <main className="min-h-screen bg-off-white font-manrope text-navy-deep">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-navy-deep/5 bg-off-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="font-sora text-xl font-semibold tracking-tight text-navy-deep">
            zippay<span className="text-blue-accent">.</span>
          </Link>
          <div className="hidden items-center gap-9 lg:flex">
            <Link to="/integrations" className="text-sm font-semibold text-navy-deep">
              Integrations
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium text-navy-deep/70 hover:text-navy-deep"
            >
              Pricing
            </Link>
            <Link
              to="/partners"
              className="text-sm font-medium text-navy-deep/70 hover:text-navy-deep"
            >
              Partner Program
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-navy-deep/70 hover:text-navy-deep"
            >
              Contact
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
      <section
        className="relative overflow-hidden border-b border-navy-deep/5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(15,27,61,0.08) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-24 text-center lg:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-navy-deep/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy-mid">
            <span className="size-1.5 rounded-full bg-blue-accent" />
            50+ integrations
          </span>
          <h1 className="mt-6 font-sora text-4xl font-semibold leading-[1.05] tracking-tight text-navy-deep sm:text-5xl lg:text-6xl">
            One integration.
            <br />
            <span className="text-blue-accent">Every</span> payment method.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-navy-mid/70 sm:text-lg">
            Ship Zippay in minutes with native apps for Shopify and WooCommerce, then unlock
            wallets, BNPL, card networks and orchestration partners — all from a single dashboard.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/auth"
              className="inline-flex h-11 items-center rounded-full bg-navy-deep px-6 text-sm font-semibold text-off-white transition-colors hover:bg-blue-accent"
            >
              Start free today
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center rounded-full border border-navy-deep/15 bg-white px-6 text-sm font-semibold text-navy-deep transition-colors hover:border-navy-deep/40"
            >
              Talk to sales
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="relative overflow-hidden border-b border-navy-deep/5 bg-white py-10">
        <div
          className="flex gap-16 whitespace-nowrap"
          style={{ animation: "zp-marquee 45s linear infinite" }}
        >
          {[...featured, ...featured].map((l, i) => (
            <div key={`${l.name}-${i}`} className="flex items-center" title={l.name}>
              <BrandWordmark domain={l.domain} name={l.name} height={26} greyscale />
            </div>
          ))}
        </div>
        <style>{`@keyframes zp-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="grid gap-2 text-center">
          <span className="font-sora text-xs font-semibold uppercase tracking-[0.2em] text-blue-accent">
            The catalogue
          </span>
          <h2 className="mx-auto max-w-2xl font-sora text-3xl font-semibold tracking-tight text-navy-deep sm:text-4xl">
            Everything a modern merchant needs to get paid
          </h2>
        </div>

        <div className="mt-20 space-y-20">
          {categories.map((cat) => (
            <div key={cat.h}>
              <div className="flex flex-col justify-between gap-2 border-b border-navy-deep/10 pb-6 sm:flex-row sm:items-end">
                <div>
                  <h3 className="font-sora text-2xl font-semibold tracking-tight text-navy-deep">
                    {cat.h}
                  </h3>
                  <p className="mt-1 text-sm text-navy-mid/70">{cat.sub}</p>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-navy-mid/50">
                  {cat.items.length} integrations
                </span>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((it) => (
                  <div
                    key={it.name}
                    className="group relative flex flex-col rounded-2xl border border-navy-deep/10 bg-white p-6 transition-colors hover:border-navy-deep/30"
                  >
                    <div className="flex items-center justify-between">
                      <BrandLogo domain={it.domain} name={it.name} size={44} rounded={12} />

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                          it.status === "Beta"
                            ? "bg-amber-50 text-amber-700"
                            : it.status === "Soon"
                              ? "bg-navy-deep/[0.04] text-navy-mid/60"
                              : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            it.status === "Beta"
                              ? "bg-amber-500"
                              : it.status === "Soon"
                                ? "bg-navy-mid/40"
                                : "bg-emerald-500"
                          }`}
                        />
                        {it.status ?? "Live"}
                      </span>
                    </div>
                    <div className="mt-5 flex items-center gap-2">
                      <h4 className="font-sora text-lg font-semibold text-navy-deep">{it.name}</h4>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-navy-mid/50">
                        · {it.tag}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-navy-mid/70">{it.desc}</p>
                    <div className="mt-6 flex items-center text-xs font-semibold text-navy-deep/60 transition-colors group-hover:text-blue-accent">
                      Read docs
                      <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-navy-deep/5 bg-navy-deep text-off-white">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center lg:py-24">
          <h2 className="font-sora text-3xl font-semibold tracking-tight sm:text-4xl">
            Don't see your stack?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-off-white/70">
            Our API and webhooks plug into any custom checkout, ERP or headless storefront. Tell us
            what you run — we'll scope the integration.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex h-11 items-center rounded-full bg-off-white px-6 text-sm font-semibold text-navy-deep transition-colors hover:bg-blue-accent hover:text-off-white"
            >
              Request an integration
            </Link>
            <Link
              to="/partners"
              className="inline-flex h-11 items-center rounded-full border border-off-white/20 px-6 text-sm font-semibold text-off-white transition-colors hover:border-off-white/60"
            >
              Become a partner
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-navy-deep/5 bg-off-white px-6 py-16">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <span className="font-sora text-lg font-semibold tracking-tight text-navy-deep">
            zippay<span className="text-blue-accent">.</span>
          </span>
          <div className="flex flex-wrap items-center gap-6 text-sm text-navy-mid/60">
            <Link to="/integrations" className="hover:text-navy-deep">
              Integrations
            </Link>
            <Link to="/pricing" className="hover:text-navy-deep">
              Pricing
            </Link>
            <Link to="/partners" className="hover:text-navy-deep">
              Partner Program
            </Link>
            <Link to="/contact" className="hover:text-navy-deep">
              Contact
            </Link>
          </div>
          <p className="text-[11px] font-medium text-navy-mid/40">© 2026 Zippay Financial Inc.</p>
        </div>
      </footer>
    </main>
  );
}
