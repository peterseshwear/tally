import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { TrendingUp, Globe, BarChart3, Sparkles, ArrowRight, Zap, Code2 } from "lucide-react";
import { BrandWordmark } from "@/components/BrandLogo";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Zippay — The growth engine for Shopify & WooCommerce merchants" },
      {
        name: "description",
        content:
          "Zippay orchestrates checkout, payments and subscriptions for Shopify and WooCommerce merchants. 1.2% + 20¢, 3-day payouts, one integration.",
      },
      {
        property: "og:title",
        content: "Zippay — The growth engine for ecommerce merchants",
      },
      {
        property: "og:description",
        content:
          "Checkout, payment routing and subscriptions in one orchestration layer for Shopify and WooCommerce.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const integrations = [
  "SHOPIFY",
  "WOOCOMMERCE",
  "STRIPE",
  "PAYPAL",
  "APPLE PAY",
  "GOOGLE PAY",
  "WORDPRESS",
  "KLARNA",
  "AFTERPAY",
  "AMEX",
  "VISA",
  "MASTERCARD",
  "ADYEN",
  "AIRWALLEX",
];

const journey = [
  { n: "01", t: "Install", d: "1-click on Shopify or Woo" },
  { n: "02", t: "Checkout", d: "Native, Apple/Google Pay" },
  { n: "03", t: "Capture", d: "Smart routing, high auth" },
  { n: "04", t: "Payout", d: "T+3 to your bank" },
  { n: "05", t: "Retain", d: "Subscriptions & recovery" },
];

const leaks = [
  {
    n: "01",
    t: "Fees eat your margin",
    d: "Stripe-tier providers charge 2.9% + 30¢ on every order. On $1M processed, that's $30k gone before Ops.",
  },
  {
    n: "02",
    t: "Payouts sit for a week",
    d: "7-day rolling holds strangle your cash flow. You can't restock inventory with money that isn't in your bank.",
  },
  {
    n: "03",
    t: "Checkout kills conversion",
    d: "Redirects, 3-page flows and card-only support drop your mobile conversion by 20–40%. That's paid traffic wasted.",
  },
  {
    n: "04",
    t: "Chargebacks arrive silently",
    d: "Fraud tools and dispute alerts live in three different dashboards. By the time you notice, the fee is already deducted.",
  },
];

function Index() {
  return (
    <div className="min-h-dvh bg-white font-manrope text-[#111111] antialiased selection:bg-[#2563EB]/15">
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#111111] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      {/* Nav */}
      <nav
        aria-label="Primary"
        className="sticky top-0 z-50 border-b border-[#EAEAEA]/80 bg-white/80 backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link
            to="/"
            aria-label="Zippay home"
            className="font-sora text-xl font-semibold tracking-tight text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 rounded-sm"
          >
            zippay<span className="text-[#2563EB]">.</span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {[
              { l: "Integrations", to: "/integrations" as const },
              { l: "Pricing", to: "/pricing" as const },
              { l: "Partner Program", to: "/partners" as const },
              { l: "Contact", to: "/contact" as const },
            ].map((i) => (
              <Link
                key={i.l}
                to={i.to}
                className="text-sm font-medium text-[#6B7280] transition-colors hover:text-[#111111] focus-visible:outline-none focus-visible:text-[#111111]"
              >
                {i.l}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/auth"
              className="inline-flex h-10 items-center rounded-full bg-[#111111] px-4 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
            >
              Go to App
            </Link>
          </div>
        </div>
      </nav>

      <main id="main">
        {/* Hero */}
        <section className="relative overflow-hidden pb-24 pt-16 sm:pt-20 lg:pt-24">
          {/* Soft radial background */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(37,99,235,0.06), transparent 60%), radial-gradient(ellipse 40% 30% at 85% 20%, rgba(16,185,129,0.04), transparent 70%), #ffffff",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-40 -z-10 h-72 w-72 rounded-full bg-[#2563EB]/8 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 top-10 -z-10 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl"
          />

          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
            {/* Left column */}
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-white px-3 py-1 text-xs font-medium text-[#6B7280] shadow-sm">
                <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
                New · Growth OS for ecommerce
              </span>

              <h1 className="mt-6 font-sora text-[44px] font-semibold leading-[1.05] tracking-[-0.025em] text-[#111111] sm:text-5xl lg:text-[64px]">
                Grow your ecommerce{" "}
                <span className="bg-gradient-to-r from-[#111111] to-[#2563EB] bg-clip-text text-transparent">
                  without limits.
                </span>
              </h1>

              <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-[#6B7280]">
                Increase conversion, expand internationally and manage your business from one
                powerful platform. Automate operations and unlock sustainable growth — built for
                modern Shopify and WooCommerce brands.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/auth"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#111111] px-6 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(17,17,17,0.4)] transition-all hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_12px_28px_-8px_rgba(17,17,17,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
                >
                  Start Growing
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#EAEAEA] bg-white px-6 text-sm font-semibold text-[#111111] transition-all hover:-translate-y-0.5 hover:border-[#111111]/20 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
                >
                  Book a Demo
                </Link>
              </div>

              {/* Trust indicators */}
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#6B7280]">
                {["No setup fees", "Fast onboarding", "Global merchants"].map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="text-emerald-500"
                      aria-hidden
                    >
                      <path
                        d="M4 10.5l4 4 8-9"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column — dashboard mockup */}
            <HeroDashboard />
          </div>
        </section>

        {/* Social proof */}
        <SocialProofSection />

        {/* Problem framing */}
        <ProblemSection />

        {/* Solution */}
        <SolutionSection />

        {/* Dashboard showcase */}
        <DashboardShowcase />

        {/* Growth stats */}
        <GrowthSection />

        {/* Customer testimonials */}
        <TestimonialsSection />

        {/* Security & trust */}
        <SecuritySection />

        {/* Global transactions map */}
        <WorldTransactionsSection />

        {/* Journey */}
        <section className="bg-[#FAFAFA] py-28 sm:py-36">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-white px-3 py-1 text-xs font-medium text-[#6B7280] shadow-sm">
                How it works
              </span>
              <h2 className="mt-6 font-sora text-3xl font-semibold tracking-tight text-[#111111] sm:text-4xl lg:text-[52px] lg:leading-[1.05]">
                From install to retention, in five steps.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-[#6B7280] sm:text-lg">
                A single flow — from the first click to the loyal customer — so you never leave
                revenue on the table.
              </p>
            </div>

            <div className="mt-16 rounded-2xl border border-[#EAEAEA] bg-white p-6 shadow-[0_1px_2px_rgba(17,17,17,0.03)] sm:p-10">
              <div className="relative grid grid-cols-2 gap-8 md:grid-cols-5">
                <div
                  aria-hidden
                  className="absolute left-6 right-6 top-6 hidden h-px bg-gradient-to-r from-[#EAEAEA] via-[#111111]/20 to-[#EAEAEA] md:block"
                />
                {journey.map((s, i) => (
                  <div key={s.n} className="relative flex flex-col">
                    <div className="mb-5 flex items-center gap-3">
                      <span
                        className={
                          "grid size-11 place-items-center rounded-full font-sora text-sm font-semibold ring-4 ring-white " +
                          (i === 2
                            ? "bg-[#111111] text-white"
                            : "bg-[#FAFAFA] text-[#111111] border border-[#EAEAEA]")
                        }
                        aria-hidden
                      >
                        {s.n}
                      </span>
                    </div>
                    <h3 className="font-sora text-lg font-semibold text-[#111111]">{s.t}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">{s.d}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-xl border border-[#EAEAEA] bg-[#FAFAFA] p-6">
                <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                      Live · today
                    </div>
                    <div className="mt-1 font-sora text-2xl font-semibold tracking-tight text-[#111111]">
                      $28,412 <span className="text-[#6B7280]">captured</span>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EAEAEA]">
                      <div className="h-full w-[78%] rounded-full bg-[#111111]" />
                    </div>
                    <div className="mt-2 flex justify-between text-[11px] font-medium text-[#6B7280]">
                      <span>412 orders · 92.3% auth</span>
                      <span>Payout in 3 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <FeaturesSection />

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-[#0A0A0A] py-28 sm:py-36">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.3) 1px, transparent 0)",
              backgroundSize: "28px 28px",
              maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 80%)",
            }}
          />
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <h2 className="mx-auto max-w-[22ch] font-sora text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[56px] lg:leading-[1.05]">
              Ready to grow without limits?
            </h2>
            <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-white/70">
              Join thousands of Shopify and WooCommerce merchants using Zippay to increase
              conversion, expand globally and automate their operations.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/auth"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#111111] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
              >
                Start Growing
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
              <Link
                to="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#EAEAEA] bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-5 lg:gap-12">
            <div className="col-span-2">
              <span className="font-sora text-lg font-semibold tracking-tight text-[#111111]">
                zippay<span className="text-[#2563EB]">.</span>
              </span>
              <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-[#6B7280]">
                The growth engine for modern Shopify and WooCommerce merchants.
              </p>
            </div>
            {[
              {
                h: "Platform",
                items: [
                  { l: "Integrations", to: "/integrations" as const },
                  { l: "Pricing", to: "/pricing" as const },
                ],
              },
              {
                h: "Company",
                items: [
                  { l: "Partner Program", to: "/partners" as const },
                  { l: "Blog", to: "/blog" as const },
                  { l: "Contact", to: "/contact-us" as const },
                ],
              },
              {
                h: "Legal",
                items: [
                  { l: "Privacy", to: "/legal/privacy" as const },
                  { l: "Cookies", to: "/legal/cookies" as const },
                  { l: "Terms", to: "/legal/terms" as const },
                  { l: "Security", to: "/legal/security" as const },
                  { l: "GDPR", to: "/legal/gdpr" as const },
                ],
              },
            ].map((col) => (
              <div key={col.h}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#111111]">
                  {col.h}
                </h3>
                <ul className="mt-6 space-y-3">
                  {col.items.map((i) => (
                    <li key={i.l}>
                      <Link
                        to={i.to}
                        className="text-sm text-[#6B7280] transition-colors hover:text-[#111111]"
                      >
                        {i.l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-col justify-between gap-4 border-t border-[#EAEAEA] pt-8 sm:flex-row sm:items-center">
            <p className="text-xs text-[#6B7280]">
              © {new Date().getFullYear()} Nesta Business LLC. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#6B7280]">
                All systems processing
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ---------- Global transactions globe ----------

// Rotated-ellipse land blobs shaped to match real coastlines.
// [lat, lon, rLat, rLon, rotDeg, weight]
const CONTINENTS_LL: Array<[number, number, number, number, number, number]> = [
  // ---- North America ----
  [62, -105, 14, 34, 0, 1.0], // Canadian shield
  [70, -95, 8, 30, 0, 0.9], // Arctic archipelago
  [45, -100, 10, 24, -10, 1.0], // US mainland
  [37, -95, 8, 20, 0, 1.0],
  [30, -92, 6, 14, 15, 0.9], // Gulf coast
  [63, -150, 10, 18, 20, 1.0], // Alaska
  [17, -92, 4, 8, 55, 0.9], // Central America isthmus
  [22, -78, 3, 10, 25, 0.8], // Cuba / Caribbean arc
  // ---- Greenland ----
  [72, -40, 11, 12, -10, 1.0],
  [80, -40, 6, 10, 0, 0.9],
  // ---- South America ----
  [2, -62, 8, 14, -10, 1.0], // Amazon basin
  [-12, -60, 10, 12, -15, 1.0],
  [-25, -60, 9, 8, -25, 1.0],
  [-38, -66, 8, 5, -20, 0.95], // Argentina cone
  [-48, -71, 6, 3, -15, 0.9], // Patagonia
  // ---- Europe ----
  [50, 10, 6, 18, -10, 1.0], // Central Europe
  [45, 25, 5, 14, -5, 0.95],
  [40, -3, 4, 8, 10, 0.95], // Iberia
  [54, -3, 4, 5, -20, 0.9], // British Isles
  [63, 15, 8, 8, -30, 1.0], // Scandinavia
  // ---- Africa ----
  [15, 5, 12, 18, 0, 1.0], // Sahara / West Africa
  [8, 25, 10, 14, -5, 1.0],
  [0, 22, 8, 10, 0, 1.0], // Central Africa
  [-10, 25, 8, 8, -10, 1.0],
  [-22, 25, 7, 6, -20, 1.0],
  [-30, 24, 4, 5, -30, 0.9], // Southern tip
  [-20, 47, 5, 2.5, -30, 0.9], // Madagascar
  // ---- Middle East / Arabia ----
  [25, 45, 8, 8, -20, 1.0],
  [35, 45, 4, 10, -10, 0.9],
  // ---- Russia / Siberia ----
  [60, 60, 10, 22, -5, 1.0],
  [62, 95, 10, 25, 0, 1.0],
  [65, 130, 9, 22, 5, 1.0],
  [55, 155, 7, 15, 20, 0.95],
  // ---- Central & East Asia ----
  [42, 90, 8, 22, 0, 1.0],
  [35, 105, 8, 18, -5, 1.0],
  [30, 115, 6, 12, -15, 1.0],
  [22, 78, 8, 10, -20, 1.0], // India
  [16, 100, 6, 8, -30, 0.95], // SE Asia peninsula
  [38, 138, 4, 3, -55, 0.9], // Japan
  [12, 122, 3, 3, -45, 0.85], // Philippines
  // ---- Indonesia / Malay ----
  [-2, 115, 3, 12, -5, 0.95],
  [-6, 140, 3, 6, -15, 0.9], // New Guinea
  // ---- Australia / NZ ----
  [-25, 134, 7, 14, -5, 1.0],
  [-41, 172, 3, 4, -40, 0.9],
  // ---- Antarctica hint ----
  [-78, 0, 6, 60, 0, 0.8],
];

function landIntensityLL(lat: number, lon: number) {
  let best = 0;
  for (const [la, lo, rla, rlo, rot, w] of CONTINENTS_LL) {
    let dlon = lon - lo;
    if (dlon > 180) dlon -= 360;
    else if (dlon < -180) dlon += 360;
    // Scale longitude by latitude cosine so ellipses don't smear near poles
    const dx0 = dlon * Math.cos((lat * Math.PI) / 180);
    const dy0 = lat - la;
    const r = (rot * Math.PI) / 180;
    const dx = (dx0 * Math.cos(r) + dy0 * Math.sin(r)) / rlo;
    const dy = (-dx0 * Math.sin(r) + dy0 * Math.cos(r)) / rla;
    const d = Math.sqrt(dx * dx + dy * dy);
    const v = Math.max(0, 1 - d) * w;
    if (v > best) best = v;
  }
  return best;
}

type CityRow = { city: string; lat: number; lon: number; amt: string };

const CITIES: CityRow[] = [
  { city: "London", lat: 51.5, lon: -0.1, amt: "£1,240" },
  { city: "Paris", lat: 48.9, lon: 2.3, amt: "€890" },
  { city: "Berlin", lat: 52.5, lon: 13.4, amt: "€2,110" },
  { city: "Dubai", lat: 25.2, lon: 55.3, amt: "AED 3.4k" },
  { city: "Mumbai", lat: 19.1, lon: 72.9, amt: "₹58,200" },
  { city: "Singapore", lat: 1.3, lon: 103.8, amt: "S$620" },
  { city: "Tokyo", lat: 35.7, lon: 139.7, amt: "¥94,500" },
  { city: "Sydney", lat: -33.9, lon: 151.2, amt: "A$1,780" },
  { city: "São Paulo", lat: -23.5, lon: -46.6, amt: "R$4,120" },
  { city: "Mexico City", lat: 19.4, lon: -99.1, amt: "MX$980" },
  { city: "Toronto", lat: 43.7, lon: -79.4, amt: "C$1,050" },
  { city: "Lagos", lat: 6.5, lon: 3.4, amt: "₦620k" },
];

const HUB_CITY = { lat: 39.5, lon: -98.4 };
const PHI0 = 15; // slight tilt

type Projected = { x: number; y: number; depth: number } | null;

function project(
  lat: number,
  lon: number,
  lambda0: number,
  R: number,
  cx: number,
  cy: number,
): Projected {
  const rad = Math.PI / 180;
  const phi = lat * rad;
  const lam = (lon - lambda0) * rad;
  const phi0r = PHI0 * rad;
  const cosc = Math.sin(phi0r) * Math.sin(phi) + Math.cos(phi0r) * Math.cos(phi) * Math.cos(lam);
  if (cosc < 0) return null;
  const x = R * Math.cos(phi) * Math.sin(lam);
  const y = R * (Math.cos(phi0r) * Math.sin(phi) - Math.sin(phi0r) * Math.cos(phi) * Math.cos(lam));
  return { x: cx + x, y: cy - y, depth: cosc };
}

function drawPolyline(
  ctx: CanvasRenderingContext2D,
  pts: Array<{ lat: number; lon: number }>,
  lambda0: number,
  R: number,
  cx: number,
  cy: number,
) {
  ctx.beginPath();
  let started = false;
  for (const q of pts) {
    const p = project(q.lat, q.lon, lambda0, R, cx, cy);
    if (!p) {
      started = false;
      continue;
    }
    if (!started) {
      ctx.moveTo(p.x, p.y);
      started = true;
    } else {
      ctx.lineTo(p.x, p.y);
    }
  }
  ctx.stroke();
}

function drawGraticule(
  ctx: CanvasRenderingContext2D,
  lambda0: number,
  R: number,
  cx: number,
  cy: number,
) {
  ctx.strokeStyle = "rgba(30, 58, 95, 0.10)";
  ctx.lineWidth = 1;
  for (let phi = -60; phi <= 60; phi += 30) {
    const pts = [];
    for (let lon = -180; lon <= 180; lon += 3) pts.push({ lat: phi, lon });
    drawPolyline(ctx, pts, lambda0, R, cx, cy);
  }
  for (let lon = -180; lon < 180; lon += 30) {
    const pts = [];
    for (let lat = -80; lat <= 80; lat += 3) pts.push({ lat, lon });
    drawPolyline(ctx, pts, lambda0, R, cx, cy);
  }
  // Equator — a touch stronger
  ctx.strokeStyle = "rgba(30, 58, 95, 0.18)";
  ctx.lineWidth = 1.1;
  const eq = [];
  for (let lon = -180; lon <= 180; lon += 2) eq.push({ lat: 0, lon });
  drawPolyline(ctx, eq, lambda0, R, cx, cy);
}

function drawGreatArc(
  ctx: CanvasRenderingContext2D,
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  lambda0: number,
  R: number,
  cx: number,
  cy: number,
  dashOffset: number,
) {
  const rad = Math.PI / 180;
  const toVec = (la: number, lo: number) => {
    const a = la * rad;
    const b = lo * rad;
    return [Math.cos(a) * Math.cos(b), Math.cos(a) * Math.sin(b), Math.sin(a)];
  };
  const v1 = toVec(lat1, lon1);
  const v2 = toVec(lat2, lon2);
  const dot = Math.max(-1, Math.min(1, v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]));
  const omega = Math.acos(dot);
  if (omega < 1e-4) return;
  const sinO = Math.sin(omega);
  const steps = 72;
  ctx.setLineDash([5, 5]);
  ctx.lineDashOffset = -dashOffset;
  ctx.lineWidth = 1.4;
  ctx.strokeStyle = "rgba(59, 111, 160, 0.9)";
  ctx.beginPath();
  let started = false;
  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    const a = Math.sin((1 - t) * omega) / sinO;
    const b = Math.sin(t * omega) / sinO;
    const vx = a * v1[0] + b * v2[0];
    const vy = a * v1[1] + b * v2[1];
    const vz = a * v1[2] + b * v2[2];
    const len = Math.sqrt(vx * vx + vy * vy + vz * vz);
    const lat = (Math.asin(vz / len) * 180) / Math.PI;
    const lon = (Math.atan2(vy, vx) * 180) / Math.PI;
    const p = project(lat, lon, lambda0, R, cx, cy);
    if (!p) {
      started = false;
      continue;
    }
    // subtle lift so arcs feel like they bulge above the surface
    const lift = 1 + 0.18 * Math.sin(Math.PI * t);
    const px = cx + (p.x - cx) * lift;
    const py = cy + (p.y - cy) * lift;
    if (!started) {
      ctx.moveTo(px, py);
      started = true;
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.stroke();
  ctx.setLineDash([]);
}

function WorldTransactionsSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lambda0, setLambda0] = useState(-30);
  const size = 720;
  const R = size * 0.4;
  const cx = size / 2;
  const cy = size / 2;

  const dots = useMemo(() => {
    const arr: Array<{ lat: number; lon: number; o: number }> = [];
    const N = 6500;
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = i * 2.399963229728653;
      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);
      const lat = (Math.asin(y) * 180) / Math.PI;
      const lon = (Math.atan2(z, x) * 180) / Math.PI;
      const intensity = landIntensityLL(lat, lon);
      if (intensity > 0.18) arr.push({ lat, lon, o: 0.45 + intensity * 0.55 });
    }
    return arr;
  }, []);

  const draggingRef = useRef(false);
  const lastInteractionRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const step = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      const idleFor = (t - lastInteractionRef.current) / 1000;
      if (!draggingRef.current && idleFor > 1.5) {
        setLambda0((l) => (l + dt * 6) % 360);
      } else {
        // trigger a redraw so the pulse/arcs keep animating
        setLambda0((l) => l);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    // Atmosphere halo
    const halo = ctx.createRadialGradient(cx, cy, R * 0.98, cx, cy, R * 1.12);
    halo.addColorStop(0, "rgba(59, 111, 160, 0.25)");
    halo.addColorStop(1, "rgba(59, 111, 160, 0)");
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, size, size);

    // Ocean sphere body — bluish so land dots read as continents
    const body = ctx.createRadialGradient(cx - R * 0.4, cy - R * 0.45, R * 0.15, cx, cy, R);
    body.addColorStop(0, "#eaf2fb");
    body.addColorStop(0.55, "#cddcee");
    body.addColorStop(1, "#a9bfd6");
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = body;
    ctx.fill();

    // Graticule
    drawGraticule(ctx, lambda0, R, cx, cy);

    // Polar ice caps (subtle white glow at poles)
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.clip();
    for (const poleLat of [90, -90]) {
      const p = project(poleLat, lambda0, lambda0, R, cx, cy);
      if (!p) continue;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, R * 0.45);
      g.addColorStop(0, "rgba(255,255,255,0.85)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
    }
    ctx.restore();

    // Land dots — darker, denser, so continents read clearly
    for (const d of dots) {
      const p = project(d.lat, d.lon, lambda0, R, cx, cy);
      if (!p) continue;
      const alpha = d.o * (0.55 + p.depth * 0.45);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(15, 27, 61, ${alpha})`;
      ctx.fill();
    }

    // Terminator shading (subtle right-side shadow)
    const shade = ctx.createRadialGradient(cx + R * 0.4, cy + R * 0.35, R * 0.3, cx, cy, R);
    shade.addColorStop(0, "rgba(15, 27, 61, 0)");
    shade.addColorStop(1, "rgba(15, 27, 61, 0.18)");
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, size, size);
    ctx.restore();

    // Arcs
    const now = performance.now();
    for (let i = 0; i < CITIES.length; i++) {
      const c = CITIES[i];
      drawGreatArc(
        ctx,
        c.lat,
        c.lon,
        HUB_CITY.lat,
        HUB_CITY.lon,
        lambda0,
        R,
        cx,
        cy,
        (now / 40 + i * 6) % 10,
      );
    }

    // City dots
    for (const c of CITIES) {
      const p = project(c.lat, c.lon, lambda0, R, cx, cy);
      if (!p) continue;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#1e3a5f";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Hub pulse
    const hub = project(HUB_CITY.lat, HUB_CITY.lon, lambda0, R, cx, cy);
    if (hub) {
      const pulse = (Math.sin(now / 400) + 1) / 2;
      ctx.beginPath();
      ctx.arc(hub.x, hub.y, 16 + pulse * 14, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(239, 68, 68, ${0.2 * (1 - pulse)})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(hub.x, hub.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(239, 68, 68, 0.35)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(hub.x, hub.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#ef4444";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [lambda0, dots]);

  const hubOverlay = project(HUB_CITY.lat, HUB_CITY.lon, lambda0, R, cx, cy);

  return (
    <section className="relative overflow-hidden bg-off-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-accent">
            Sell worldwide · get paid at home
          </span>
          <h2 className="mx-auto mt-4 max-w-[22ch] text-balance font-sora text-4xl font-semibold tracking-tight text-navy-deep lg:text-5xl">
            Turn every country into a checkout.{" "}
            <span className="text-navy-mid/50">One payout, straight to your bank.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[60ch] text-pretty text-navy-mid/70">
            We're obsessed with helping Shopify and WooCommerce merchants sell more abroad. Zippay
            unlocks 130+ local currencies and wallets at checkout, auto-converts every sale, and
            settles a single clean USD payout to your account — no FX headaches, no lost carts at
            the border.
          </p>
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: "+38%", v: "int'l conversion uplift" },
              { k: "130+", v: "currencies accepted" },
              { k: "4,247", v: "merchants selling global" },
              { k: "T+3", v: "USD payout to your bank" },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-2xl border border-navy-deep/10 bg-white px-4 py-3 text-left"
              >
                <div className="font-sora text-xl font-semibold text-navy-deep">{s.k}</div>
                <div className="mt-0.5 text-[11px] font-medium text-navy-mid/60">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-white p-4 shadow-sm ring-1 ring-navy-deep/5 sm:p-8">
          {/* Live stats strip */}
          <div className="mb-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-navy-deep/5 pb-5 text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-red-500" />
              </span>
              <span className="font-bold uppercase tracking-widest text-navy-deep">
                Live · settling to USD
              </span>
            </div>
            <span className="text-navy-mid/50">
              <b className="font-sora text-navy-deep">18,924</b> transactions / min
            </span>
            <span className="text-navy-mid/50">
              <b className="font-sora text-navy-deep">130+</b> currencies
            </span>
            <span className="text-navy-mid/50">
              <b className="font-sora text-navy-deep">$4.2M</b> collected today
            </span>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[720px]">
            <canvas
              ref={canvasRef}
              style={{ width: "100%", height: "100%", touchAction: "none" }}
              className="cursor-grab select-none active:cursor-grabbing"
              aria-label="Interactive globe — drag to rotate. Shows transactions collected worldwide and settled in USD."
              onPointerDown={(e) => {
                const el = e.currentTarget;
                el.setPointerCapture(e.pointerId);
                draggingRef.current = true;
                lastInteractionRef.current = performance.now();
                (el as HTMLCanvasElement).dataset.px = String(e.clientX);
              }}
              onPointerMove={(e) => {
                if (!draggingRef.current) return;
                const el = e.currentTarget as HTMLCanvasElement;
                const prev = Number(el.dataset.px ?? e.clientX);
                const dx = e.clientX - prev;
                el.dataset.px = String(e.clientX);
                const rect = el.getBoundingClientRect();
                // 1 px ≈ (180 / R_css) degrees of rotation
                const degPerPx = 180 / (rect.width * 0.4);
                setLambda0((l) => (l - dx * degPerPx) % 360);
                lastInteractionRef.current = performance.now();
              }}
              onPointerUp={(e) => {
                draggingRef.current = false;
                lastInteractionRef.current = performance.now();
                e.currentTarget.releasePointerCapture(e.pointerId);
              }}
              onPointerCancel={() => {
                draggingRef.current = false;
                lastInteractionRef.current = performance.now();
              }}
            />

            {/* City amount pills */}
            {CITIES.map((c) => {
              const p = project(c.lat, c.lon, lambda0, R, cx, cy);
              if (!p) return null;
              const leftPct = (p.x / size) * 100;
              const topPct = (p.y / size) * 100;
              const opacity = 0.3 + p.depth * 0.7;
              const above = c.lat >= 0;
              return (
                <div
                  key={c.city}
                  className="pointer-events-none absolute -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-[10px] font-medium text-navy-deep shadow-sm ring-1 ring-navy-deep/10 transition-opacity"
                  style={{
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                    transform: `translate(-50%, ${above ? "-140%" : "40%"})`,
                    opacity,
                  }}
                >
                  <span className="font-sora font-semibold">{c.amt}</span>
                  <span className="ml-1 text-navy-mid/50">{c.city}</span>
                </div>
              );
            })}

            {/* Hub label */}
            {hubOverlay && (
              <div
                className="pointer-events-none absolute -translate-x-1/2 whitespace-nowrap rounded-lg bg-navy-deep px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg"
                style={{
                  left: `${(hubOverlay.x / size) * 100}%`,
                  top: `${(hubOverlay.y / size) * 100}%`,
                  transform: "translate(-50%, 40px)",
                  opacity: 0.4 + hubOverlay.depth * 0.6,
                }}
              >
                <span className="mr-1.5 inline-block size-1.5 rounded-full bg-red-400" />
                Zippay HQ · Collecting USD
              </div>
            )}

            {/* Earth label */}
            <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-navy-mid/70 shadow-sm ring-1 ring-navy-deep/5 backdrop-blur">
              <span className="size-1.5 rounded-full bg-blue-accent" />
              Earth · Drag to rotate
            </div>
          </div>

          {/* Footer legend */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-navy-deep/5 pt-5 text-[11px] font-medium text-navy-mid/60">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-blue-accent" />
                Merchant transaction
              </span>
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-red-500" />
                USD collection point
              </span>
            </div>
            <span className="uppercase tracking-widest">
              FX applied at mid-market · No conversion markup
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroDashboard() {
  const spark = "M0,42 L18,38 L36,40 L54,30 L72,32 L90,22 L108,26 L126,16 L144,20 L162,10 L180,14";
  return (
    <div className="relative mx-auto w-full max-w-[640px] lg:mx-0">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-tr from-blue-accent/15 via-transparent to-emerald-200/30 blur-2xl"
      />

      <div
        className="relative rounded-2xl border border-[#EAEAEA] bg-white p-5 shadow-[0_30px_80px_-30px_rgba(17,17,17,0.25)] sm:p-6"
        style={{ animation: "zp-hero-rise 700ms cubic-bezier(0.22,1,0.36,1) both" }}
      >
        <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-4">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#EAEAEA]" />
            <span className="size-2.5 rounded-full bg-[#EAEAEA]" />
            <span className="size-2.5 rounded-full bg-[#EAEAEA]" />
            <span className="ml-3 text-xs font-medium text-[#6B7280]">app.tally.io / overview</span>
          </div>
          <span className="hidden rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 sm:inline">
            ● Live
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { l: "Revenue", v: "$284,120", d: "+18.2%" },
            { l: "Conversion", v: "3.84%", d: "+0.6pt" },
            { l: "Orders", v: "1,247", d: "+9.1%" },
            { l: "GMV", v: "$412K", d: "+12.4%" },
          ].map((k) => (
            <div key={k.l} className="rounded-xl border border-[#EAEAEA] bg-[#FAFAFA] p-3">
              <div className="text-[10px] font-medium uppercase tracking-wider text-[#6B7280]">
                {k.l}
              </div>
              <div className="mt-1 font-sora text-[15px] font-bold text-[#111111]">{k.v}</div>
              <div className="mt-0.5 text-[10px] font-semibold text-emerald-600">{k.d}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-[#EAEAEA] bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-wider text-[#6B7280]">
                Revenue · last 30 days
              </div>
              <div className="mt-0.5 font-sora text-lg font-bold text-[#111111]">$284,120</div>
            </div>
            <div className="flex gap-1 text-[10px] text-[#6B7280]">
              {["7D", "30D", "90D"].map((x, i) => (
                <span
                  key={x}
                  className={`rounded-md px-2 py-0.5 ${i === 1 ? "bg-[#111111] text-white" : "bg-[#FAFAFA]"}`}
                >
                  {x}
                </span>
              ))}
            </div>
          </div>
          <svg viewBox="0 0 180 60" className="h-20 w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="hg" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${spark} L180,60 L0,60 Z`} fill="url(#hg)" />
            <path
              d={spark}
              fill="none"
              stroke="#2563EB"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-[#EAEAEA] bg-white p-4">
            <div className="mb-2 text-[10px] font-medium uppercase tracking-wider text-[#6B7280]">
              Top countries
            </div>
            <ul className="space-y-1.5">
              {[
                { c: "🇺🇸 United States", p: 42 },
                { c: "🇬🇧 United Kingdom", p: 21 },
                { c: "🇫🇷 France", p: 14 },
                { c: "🇩🇪 Germany", p: 9 },
              ].map((r) => (
                <li key={r.c} className="flex items-center gap-2 text-xs text-[#111111]">
                  <span className="w-28 truncate">{r.c}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#FAFAFA]">
                    <span
                      className="block h-full rounded-full bg-[#111111]"
                      style={{ width: `${r.p}%` }}
                    />
                  </span>
                  <span className="w-8 text-right text-[#6B7280]">{r.p}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-[#EAEAEA] bg-white p-4">
            <div className="mb-2 text-[10px] font-medium uppercase tracking-wider text-[#6B7280]">
              Recent orders
            </div>
            <ul className="divide-y divide-[#EAEAEA] text-xs">
              {[
                { n: "#4823", a: "$128.00" },
                { n: "#4822", a: "$56.40" },
                { n: "#4821", a: "$342.10" },
                { n: "#4820", a: "$74.20" },
              ].map((o) => (
                <li key={o.n} className="flex items-center justify-between py-1.5">
                  <span className="font-medium text-[#111111]">{o.n}</span>
                  <span className="text-[#6B7280]">{o.a}</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    Paid
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        className="absolute -left-4 top-24 hidden rounded-xl border border-[#EAEAEA] bg-white p-3 shadow-lg sm:block"
        style={{ animation: "zp-hero-float 6s ease-in-out infinite" }}
      >
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full bg-emerald-50 text-emerald-600">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 10.5l4 4 8-9"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <div className="text-xs font-semibold text-[#111111]">Order approved</div>
            <div className="text-[10px] text-[#6B7280]">#4823 · $128.00</div>
          </div>
        </div>
      </div>

      <div
        className="absolute -right-4 top-8 hidden rounded-xl border border-[#EAEAEA] bg-white p-3 shadow-lg sm:block"
        style={{ animation: "zp-hero-float 7s ease-in-out infinite 1s" }}
      >
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full bg-blue-accent/10 text-blue-accent">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 14l4-4 3 3 5-7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <div className="text-xs font-semibold text-[#111111]">Revenue +18%</div>
            <div className="text-[10px] text-[#6B7280]">vs. last week</div>
          </div>
        </div>
      </div>

      <div
        className="absolute -bottom-4 left-10 hidden rounded-xl border border-[#EAEAEA] bg-white p-3 shadow-lg sm:block"
        style={{ animation: "zp-hero-float 8s ease-in-out infinite 0.5s" }}
      >
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full bg-[#FAFAFA] text-[#111111]">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="M3 17c1.5-3 4-4.5 7-4.5s5.5 1.5 7 4.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <div>
            <div className="text-xs font-semibold text-[#111111]">New customer</div>
            <div className="text-[10px] text-[#6B7280]">from 🇩🇪 Berlin</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes zp-hero-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
        @keyframes zp-hero-rise { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  );
}

const FEATURES = [
  {
    icon: TrendingUp,
    title: "Increase Conversion",
    desc: "Turn more visitors into buyers with a checkout designed to reduce friction and lift revenue on every store.",
  },
  {
    icon: Globe,
    title: "Expand Globally",
    desc: "Reach new customers in 100+ countries with local currencies, languages and buying preferences handled for you.",
  },
  {
    icon: Sparkles,
    title: "Automate Operations",
    desc: "Let workflows handle refunds, reporting and repetitive tasks so your team can focus on growth.",
  },
  {
    icon: BarChart3,
    title: "Revenue Insights",
    desc: "See what's actually driving growth with real-time metrics on sales, customers and product performance.",
  },
  {
    icon: Zap,
    title: "Faster Checkout",
    desc: "A one-tap buying experience that keeps shoppers moving from cart to confirmation in seconds.",
  },
  {
    icon: Code2,
    title: "Developer Friendly",
    desc: "Clean APIs, webhooks and SDKs your engineering team can ship with in an afternoon, not a quarter.",
  },
];

function FeaturesSection() {
  return (
    <section className="bg-[#FAFAFA] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        {/* Intro */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-white px-3 py-1 text-xs font-medium text-[#6B7280] shadow-sm">
            Built for ecommerce founders
          </span>
          <h2 className="mt-6 font-sora text-4xl font-bold tracking-[-0.02em] text-[#111111] lg:text-5xl">
            Everything you need to grow your business.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#6B7280]">
            Six focused capabilities to help you sell more, expand faster and run your store with
            less overhead.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative flex flex-col rounded-2xl border border-[#EAEAEA] bg-white p-8 shadow-[0_1px_2px_rgba(17,17,17,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#111111]/15 hover:shadow-[0_24px_48px_-24px_rgba(17,17,17,0.18)]"
              >
                <span className="mb-6 grid size-12 place-items-center rounded-xl border border-[#EAEAEA] bg-[#FAFAFA] text-[#111111] transition-all duration-300 group-hover:scale-105 group-hover:bg-white">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <h3 className="font-sora text-lg font-bold tracking-tight text-[#111111]">
                  {f.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7280]">{f.desc}</p>
                <Link
                  to="/integrations"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#111111] transition-colors group-hover:text-[#2563EB]"
                >
                  Learn more
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---- Social proof section ----
function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const proofLogos: { name: string; domain: string }[] = [
  { name: "Shopify", domain: "shopify.com" },
  { name: "WooCommerce", domain: "woocommerce.com" },
  { name: "Adobe Commerce", domain: "business.adobe.com" },
  { name: "BigCommerce", domain: "bigcommerce.com" },
  { name: "PrestaShop", domain: "prestashop.com" },
  { name: "Stripe", domain: "stripe.com" },
  { name: "HubSpot", domain: "hubspot.com" },
  { name: "Zapier", domain: "zapier.com" },
  { name: "Klaviyo", domain: "klaviyo.com" },
];

const proofKpis = [
  { value: "100+", label: "Countries Supported" },
  { value: "24/7", label: "Monitoring" },
  { value: "99.9%", label: "Platform Availability" },
  { value: "Fast", label: "Merchant Onboarding" },
];

function SocialProofSection() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section className="bg-white py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <h2
          className={`mx-auto max-w-[24ch] text-center font-sora text-2xl font-semibold tracking-tight text-[#111111] sm:text-3xl transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          Trusted by modern ecommerce businesses.
        </h2>

        {/* Logos row */}
        <div
          className={`mt-14 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-9 lg:gap-x-10 transition-all duration-700 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {proofLogos.map((l) => (
            <div key={l.name} className="flex items-center justify-center" title={l.name}>
              <BrandWordmark domain={l.domain} name={l.name} height={26} greyscale />
            </div>
          ))}
        </div>

        {/* KPI cards */}
        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {proofKpis.map((kpi, i) => (
            <div
              key={kpi.label}
              className={`rounded-2xl border border-[#EAEAEA] bg-white p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_32px_-16px_rgba(17,17,17,0.15)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <div className="font-sora text-4xl font-semibold tracking-tight text-[#111111] sm:text-5xl">
                {kpi.value}
              </div>
              <div className="mt-3 text-sm text-[#6B7280]">{kpi.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Problem section ----
import { Layers, MousePointerClick, Globe2, PieChart } from "lucide-react";

const painPoints = [
  {
    icon: Layers,
    title: "Managing multiple platforms",
    desc: "Stitching together disparate tools slows every team down.",
  },
  {
    icon: MousePointerClick,
    title: "Poor checkout conversion",
    desc: "Friction at the last step quietly erodes revenue.",
  },
  {
    icon: Globe2,
    title: "Limited international reach",
    desc: "Local currencies and methods are hard to launch and maintain.",
  },
  {
    icon: PieChart,
    title: "Scattered reporting",
    desc: "Numbers live in five dashboards and never quite agree.",
  },
];

function DisconnectedToolsIllustration() {
  const nodes = [
    { x: 32, y: 40, label: "Checkout" },
    { x: 220, y: 30, label: "Payments" },
    { x: 60, y: 170, label: "Analytics" },
    { x: 240, y: 190, label: "CRM" },
    { x: 140, y: 300, label: "Shipping" },
    { x: 300, y: 320, label: "Tax" },
  ];
  return (
    <svg
      viewBox="0 0 400 380"
      className="h-auto w-full max-w-md"
      role="img"
      aria-label="Disconnected ecommerce tools"
    >
      <defs>
        <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#EAEAEA" />
        </pattern>
      </defs>
      <rect width="400" height="380" fill="url(#dots)" opacity="0.6" />
      {/* Broken/dashed connectors */}
      <g stroke="#D1D5DB" strokeWidth="1.2" strokeDasharray="4 6" fill="none">
        <path d="M80 60 C 140 20, 180 20, 240 50" />
        <path d="M100 190 C 160 210, 190 210, 250 200" />
        <path d="M90 80 C 90 130, 90 140, 90 170" />
        <path d="M260 60 C 280 130, 280 160, 280 200" />
        <path d="M160 310 C 220 320, 240 320, 300 330" />
      </g>
      {/* Tool cards */}
      {nodes.map((n, i) => (
        <g key={i} transform={`translate(${n.x} ${n.y})`}>
          <rect width="110" height="52" rx="10" fill="#FFFFFF" stroke="#EAEAEA" />
          <circle cx="18" cy="26" r="6" fill="#111111" opacity="0.85" />
          <rect x="34" y="18" width="60" height="6" rx="3" fill="#111111" opacity="0.85" />
          <rect x="34" y="30" width="40" height="5" rx="2.5" fill="#6B7280" opacity="0.5" />
        </g>
      ))}
    </svg>
  );
}

function ProblemSection() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section className="bg-white py-28 sm:py-36">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className={`font-sora text-3xl font-semibold tracking-tight text-[#111111] sm:text-4xl lg:text-[44px] lg:leading-[1.1] transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Running an ecommerce business shouldn't be this complicated.
          </h2>
          <p
            className={`mx-auto mt-5 max-w-2xl text-base text-[#6B7280] sm:text-lg transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Most merchants juggle multiple tools to manage payments, analytics, international
            expansion and customer experience.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div
            className={`flex justify-center transition-all duration-700 delay-150 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
          >
            <DisconnectedToolsIllustration />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {painPoints.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className={`rounded-2xl border border-[#EAEAEA] bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_32px_-16px_rgba(17,17,17,0.15)] ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${250 + i * 90}ms` }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#EAEAEA] bg-[#FAFAFA]">
                    <Icon size={18} className="text-[#111111]" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 font-sora text-base font-semibold tracking-tight text-[#111111]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Solution section ----
import { DollarSign, ShoppingBag, CreditCard, LineChart } from "lucide-react";

const solutionCards = [
  {
    icon: DollarSign,
    label: "Revenue",
    value: "$482,910",
    delta: "+12.4%",
    pos: "top-4 -left-6 sm:-left-16",
    float: "zp-float-a",
  },
  {
    icon: ShoppingBag,
    label: "Orders",
    value: "3,284",
    delta: "+8.1%",
    pos: "top-24 -right-6 sm:-right-20",
    float: "zp-float-b",
  },
  {
    icon: CreditCard,
    label: "Checkout",
    value: "4.7%",
    delta: "conv. rate",
    pos: "top-1/2 -left-8 sm:-left-24",
    float: "zp-float-c",
  },
  {
    icon: LineChart,
    label: "Analytics",
    value: "Live",
    delta: "real-time",
    pos: "top-1/2 -right-8 sm:-right-24",
    float: "zp-float-a",
  },
  {
    icon: Globe,
    label: "Countries",
    value: "42",
    delta: "active",
    pos: "bottom-16 -left-4 sm:-left-16",
    float: "zp-float-b",
  },
  {
    icon: Zap,
    label: "Automation",
    value: "126",
    delta: "workflows",
    pos: "bottom-8 -right-4 sm:-right-20",
    float: "zp-float-c",
  },
];

function SolutionDashboard() {
  const bars = [42, 58, 46, 72, 64, 88, 76, 92, 84, 96, 88, 100];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white shadow-[0_40px_80px_-40px_rgba(17,17,17,0.25)]">
      {/* top chrome */}
      <div className="flex items-center justify-between border-b border-[#EAEAEA] px-5 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#EAEAEA]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#EAEAEA]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#EAEAEA]" />
        </div>
        <div className="rounded-md border border-[#EAEAEA] px-2.5 py-1 text-[10px] font-medium tracking-wide text-[#6B7280]">
          app.zippay.io / overview
        </div>
        <div className="h-4 w-16" />
      </div>

      <div className="grid grid-cols-12 gap-0">
        {/* sidebar */}
        <div className="col-span-3 border-r border-[#EAEAEA] p-4 hidden md:block">
          <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6B7280]/70">
            Workspace
          </div>
          {["Overview", "Orders", "Customers", "Payouts", "Automations", "Settings"].map(
            (i, idx) => (
              <div
                key={i}
                className={`mb-1 flex items-center gap-2 rounded-md px-2.5 py-2 text-[12px] ${
                  idx === 0 ? "bg-[#F5F5F5] font-semibold text-[#111111]" : "text-[#6B7280]"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#111111]/30" />
                {i}
              </div>
            ),
          )}
        </div>

        {/* main */}
        <div className="col-span-12 md:col-span-9 p-6">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-[#6B7280]">
                Gross volume
              </div>
              <div className="mt-1 font-sora text-3xl font-semibold tracking-tight text-[#111111]">
                $1,284,902
              </div>
            </div>
            <div className="flex gap-1 rounded-md border border-[#EAEAEA] p-0.5 text-[11px]">
              {["7d", "30d", "90d", "YTD"].map((t, i) => (
                <span
                  key={t}
                  className={`rounded px-2 py-1 ${
                    i === 1 ? "bg-[#111111] text-white" : "text-[#6B7280]"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* chart */}
          <div className="mt-6 flex h-40 items-end gap-2">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md bg-gradient-to-t from-[#F0F0F0] to-[#111111]/85"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          {/* mini stats */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { l: "AOV", v: "$146.20" },
              { l: "Refunds", v: "0.8%" },
              { l: "MRR", v: "$62,410" },
            ].map((s) => (
              <div key={s.l} className="rounded-lg border border-[#EAEAEA] p-3">
                <div className="text-[10px] font-medium uppercase tracking-wider text-[#6B7280]">
                  {s.l}
                </div>
                <div className="mt-1 font-sora text-lg font-semibold text-[#111111]">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SolutionSection() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section className="relative overflow-hidden bg-white py-28 sm:py-36">
      {/* soft radial backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[520px] max-w-5xl -translate-y-1/2 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(17,17,17,0.06) 0%, rgba(17,17,17,0) 60%)",
        }}
      />

      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className={`font-sora text-3xl font-semibold tracking-tight text-[#111111] sm:text-4xl lg:text-[52px] lg:leading-[1.05] transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            One platform.
            <br />
            <span className="text-[#6B7280]">Everything connected.</span>
          </h2>
          <p
            className={`mx-auto mt-5 max-w-2xl text-base text-[#6B7280] sm:text-lg transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Tally centralizes your commerce operations so you can focus on growing your business.
          </p>
        </div>

        {/* Dashboard + floating cards */}
        <div
          className={`relative mx-auto mt-20 max-w-5xl transition-all duration-1000 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <SolutionDashboard />

          {solutionCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={c.label}
                className={`absolute z-10 hidden rounded-xl border border-[#EAEAEA] bg-white/95 p-3.5 shadow-[0_16px_40px_-20px_rgba(17,17,17,0.25)] backdrop-blur md:block ${c.pos}`}
                style={{
                  animation: `${c.float} ${6 + (i % 3)}s ease-in-out ${i * 0.3}s infinite`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EAEAEA] bg-[#FAFAFA]">
                    <Icon size={16} className="text-[#111111]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-[10px] font-medium uppercase tracking-wider text-[#6B7280]">
                      {c.label}
                    </div>
                    <div className="font-sora text-sm font-semibold text-[#111111]">{c.value}</div>
                  </div>
                </div>
                <div className="mt-2 text-[10px] font-medium text-[#6B7280]">{c.delta}</div>
              </div>
            );
          })}

          <style>{`
            @keyframes zp-float-a { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
            @keyframes zp-float-b { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
            @keyframes zp-float-c { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
          `}</style>
        </div>
      </div>
    </section>
  );
}

// ---- Dashboard showcase ----
import {
  Activity,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";

const REV_SERIES = [32, 44, 38, 56, 49, 62, 58, 71, 66, 78, 74, 82, 79, 91, 88, 96];
const CONV_SERIES = [
  2.8, 3.1, 3.0, 3.4, 3.6, 3.5, 3.8, 4.1, 4.0, 4.3, 4.5, 4.4, 4.7, 4.6, 4.8, 4.9,
];

const TOP_COUNTRIES = [
  { c: "United States", flag: "🇺🇸", pct: 42, v: "$186,204" },
  { c: "United Kingdom", flag: "🇬🇧", pct: 18, v: "$79,812" },
  { c: "Germany", flag: "🇩🇪", pct: 12, v: "$53,208" },
  { c: "France", flag: "🇫🇷", pct: 9, v: "$39,906" },
  { c: "Canada", flag: "🇨🇦", pct: 7, v: "$31,038" },
];

const TRANSACTIONS = [
  {
    id: "tx_9F2A",
    name: "Aria Weston",
    email: "aria@northsupply.co",
    amt: "$248.00",
    method: "Visa •• 4242",
    status: "succeeded",
  },
  {
    id: "tx_8C11",
    name: "Kenji Osaka",
    email: "kenji@lumen.jp",
    amt: "$1,204.50",
    method: "Apple Pay",
    status: "succeeded",
  },
  {
    id: "tx_7B90",
    name: "Lucia Romano",
    email: "lucia@romano.it",
    amt: "$76.20",
    method: "MC •• 8811",
    status: "processing",
  },
  {
    id: "tx_6A44",
    name: "Noah Fischer",
    email: "noah@fischer.de",
    amt: "$512.00",
    method: "SEPA",
    status: "succeeded",
  },
  {
    id: "tx_5D12",
    name: "Emma Laurent",
    email: "emma@laurent.fr",
    amt: "$34.90",
    method: "Google Pay",
    status: "failed",
  },
];

const PAY_METHODS = [
  { l: "Cards", pct: 62 },
  { l: "Wallets", pct: 24 },
  { l: "BNPL", pct: 9 },
  { l: "Bank", pct: 5 },
];

const PERF = [
  { l: "Auth rate", v: "98.4%", d: "+0.6", up: true },
  { l: "Avg. latency", v: "184ms", d: "-12ms", up: true },
  { l: "Refund rate", v: "0.9%", d: "+0.1", up: false },
  { l: "3DS success", v: "96.1%", d: "+1.2", up: true },
];

const FRAUD = [
  { sev: "high", txt: "Velocity spike from IP 91.204.11.7", time: "2m ago" },
  { sev: "med", txt: "Card tested 4× across 3 stores", time: "12m ago" },
  { sev: "low", txt: "New device flagged for review", time: "38m ago" },
];

function Sparkline({
  data,
  animate,
  color = "#111111",
  fill = true,
  height = 60,
}: {
  data: number[];
  animate: boolean;
  color?: string;
  fill?: boolean;
  height?: number;
}) {
  const w = 300;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((d, i) => `${i * step},${height - ((d - min) / range) * (height - 8) - 4}`);
  const path = `M ${pts.join(" L ")}`;
  const area = `${path} L ${w},${height} L 0,${height} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#grad-${color.replace("#", "")})`} />}
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 800,
          strokeDashoffset: animate ? 0 : 800,
          transition: "stroke-dashoffset 1.6s ease-out",
        }}
      />
    </svg>
  );
}

function DashCard({
  children,
  className = "",
  delay = 0,
  visible,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  visible: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#EAEAEA] bg-white p-5 shadow-[0_1px_2px_rgba(17,17,17,0.03)] transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function DashboardShowcase() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section className="bg-[#FAFAFA] py-28 sm:py-36">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-white px-3 py-1 text-xs font-medium text-[#6B7280] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Live dashboard
          </span>
          <h2
            className={`mt-6 font-sora text-3xl font-semibold tracking-tight text-[#111111] sm:text-4xl lg:text-5xl transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Every metric that matters, in one view.
          </h2>
          <p
            className={`mx-auto mt-5 max-w-xl text-base text-[#6B7280] sm:text-lg transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            A calm, real-time overview of your entire business — from revenue and conversion to
            fraud and payment mix.
          </p>
        </div>

        {/* Dashboard frame */}
        <div
          className={`mt-16 overflow-hidden rounded-3xl border border-[#EAEAEA] bg-white shadow-[0_50px_100px_-40px_rgba(17,17,17,0.25)] transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Chrome */}
          <div className="flex items-center justify-between border-b border-[#EAEAEA] bg-[#FAFAFA] px-5 py-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#E5E5E5]" />
            </div>
            <div className="rounded-md border border-[#EAEAEA] bg-white px-3 py-1 text-[11px] font-medium text-[#6B7280]">
              app.tally.io / overview
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#6B7280]">
              <span className="hidden sm:inline">Nov 12, 2026</span>
              <span className="h-6 w-6 rounded-full bg-[#111111]/85" />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-12 gap-4 p-4 sm:p-6">
            {/* Revenue chart - big */}
            <DashCard visible={inView} delay={0} className="col-span-12 lg:col-span-8">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wider text-[#6B7280]">
                    Revenue
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-sora text-3xl font-semibold text-[#111111]">
                      $482,910
                    </span>
                    <span className="inline-flex items-center gap-0.5 rounded-md bg-green-50 px-1.5 py-0.5 text-[11px] font-semibold text-green-700">
                      <ArrowUpRight size={11} /> 12.4%
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 rounded-md border border-[#EAEAEA] p-0.5 text-[11px]">
                  {["7d", "30d", "90d", "YTD"].map((t, i) => (
                    <span
                      key={t}
                      className={`rounded px-2 py-1 ${
                        i === 1 ? "bg-[#111111] text-white" : "text-[#6B7280]"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <Sparkline data={REV_SERIES} animate={inView} height={140} />
              </div>
              <div className="mt-3 grid grid-cols-4 gap-3 text-xs">
                {[
                  { l: "Gross", v: "$482,910" },
                  { l: "Net", v: "$461,238" },
                  { l: "Refunds", v: "$4,120" },
                  { l: "Fees", v: "$17,552" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-[10px] uppercase tracking-wider text-[#6B7280]">{s.l}</div>
                    <div className="mt-0.5 font-sora text-sm font-semibold text-[#111111]">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </DashCard>

            {/* Orders + Conversion stacked */}
            <div className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-4">
              <DashCard visible={inView} delay={80}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-wider text-[#6B7280]">
                      Orders
                    </div>
                    <div className="mt-1 font-sora text-2xl font-semibold text-[#111111]">
                      3,284
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-0.5 rounded-md bg-green-50 px-1.5 py-0.5 text-[11px] font-semibold text-green-700">
                    <ArrowUpRight size={11} /> 8.1%
                  </span>
                </div>
                <div className="mt-3">
                  <Sparkline data={REV_SERIES.slice(2)} animate={inView} height={44} fill={false} />
                </div>
              </DashCard>

              <DashCard visible={inView} delay={160}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-wider text-[#6B7280]">
                      Conversion rate
                    </div>
                    <div className="mt-1 font-sora text-2xl font-semibold text-[#111111]">4.9%</div>
                  </div>
                  <span className="inline-flex items-center gap-0.5 rounded-md bg-green-50 px-1.5 py-0.5 text-[11px] font-semibold text-green-700">
                    <ArrowUpRight size={11} /> 0.4pt
                  </span>
                </div>
                <div className="mt-3">
                  <Sparkline
                    data={CONV_SERIES}
                    animate={inView}
                    height={44}
                    fill={false}
                    color="#2563EB"
                  />
                </div>
              </DashCard>
            </div>

            {/* Top countries */}
            <DashCard visible={inView} delay={220} className="col-span-12 lg:col-span-4">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-medium uppercase tracking-wider text-[#6B7280]">
                  Top countries
                </div>
                <Globe size={14} className="text-[#6B7280]" />
              </div>
              <div className="mt-4 space-y-3">
                {TOP_COUNTRIES.map((c, i) => (
                  <div key={c.c} className="flex items-center gap-3">
                    <span className="text-base">{c.flag}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-[#111111]">{c.c}</span>
                        <span className="text-[#6B7280]">{c.v}</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#F5F5F5]">
                        <div
                          className="h-full rounded-full bg-[#111111]"
                          style={{
                            width: inView ? `${c.pct * 2.3}%` : "0%",
                            transition: `width 1.2s ease-out ${300 + i * 80}ms`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DashCard>

            {/* Recent transactions */}
            <DashCard visible={inView} delay={280} className="col-span-12 lg:col-span-8">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-medium uppercase tracking-wider text-[#6B7280]">
                  Recent transactions
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#2563EB]">
                  View all <ArrowRight size={11} />
                </span>
              </div>
              <div className="mt-3 overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-left text-[10px] uppercase tracking-wider text-[#6B7280]">
                      <th className="py-2 font-medium">Customer</th>
                      <th className="py-2 font-medium">Method</th>
                      <th className="py-2 font-medium">Amount</th>
                      <th className="py-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#111111]">
                    {TRANSACTIONS.map((t, i) => (
                      <tr
                        key={t.id}
                        className="border-t border-[#F3F3F3] transition-opacity"
                        style={{
                          opacity: inView ? 1 : 0,
                          transition: `opacity 400ms ease-out ${400 + i * 80}ms`,
                        }}
                      >
                        <td className="py-2.5">
                          <div className="font-medium">{t.name}</div>
                          <div className="text-[10px] text-[#6B7280]">{t.email}</div>
                        </td>
                        <td className="py-2.5 text-[#6B7280]">{t.method}</td>
                        <td className="py-2.5 font-sora font-semibold">{t.amt}</td>
                        <td className="py-2.5">
                          {t.status === "succeeded" && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-green-50 px-1.5 py-0.5 text-[10px] font-semibold text-green-700">
                              <CheckCircle2 size={10} /> Succeeded
                            </span>
                          )}
                          {t.status === "processing" && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                              <Clock size={10} /> Processing
                            </span>
                          )}
                          {t.status === "failed" && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-1.5 py-0.5 text-[10px] font-semibold text-red-700">
                              <AlertTriangle size={10} /> Failed
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DashCard>

            {/* Payment methods */}
            <DashCard
              visible={inView}
              delay={340}
              className="col-span-12 sm:col-span-6 lg:col-span-4"
            >
              <div className="text-[11px] font-medium uppercase tracking-wider text-[#6B7280]">
                Payment methods
              </div>
              <div className="mt-4 space-y-3">
                {PAY_METHODS.map((m, i) => (
                  <div key={m.l}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-[#111111]">{m.l}</span>
                      <span className="text-[#6B7280]">{m.pct}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#F5F5F5]">
                      <div
                        className="h-full rounded-full bg-[#2563EB]"
                        style={{
                          width: inView ? `${m.pct}%` : "0%",
                          transition: `width 1.2s ease-out ${450 + i * 80}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </DashCard>

            {/* Performance */}
            <DashCard
              visible={inView}
              delay={400}
              className="col-span-12 sm:col-span-6 lg:col-span-4"
            >
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-medium uppercase tracking-wider text-[#6B7280]">
                  Performance
                </div>
                <Activity size={14} className="text-[#6B7280]" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {PERF.map((p) => (
                  <div key={p.l} className="rounded-lg border border-[#EAEAEA] p-3">
                    <div className="text-[10px] uppercase tracking-wider text-[#6B7280]">{p.l}</div>
                    <div className="mt-1 font-sora text-base font-semibold text-[#111111]">
                      {p.v}
                    </div>
                    <div
                      className={`mt-0.5 inline-flex items-center gap-0.5 text-[10px] font-semibold ${
                        p.up ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {p.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />} {p.d}
                    </div>
                  </div>
                ))}
              </div>
            </DashCard>

            {/* Fraud alerts */}
            <DashCard visible={inView} delay={460} className="col-span-12 lg:col-span-4">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-medium uppercase tracking-wider text-[#6B7280]">
                  Fraud alerts
                </div>
                <ShieldAlert size={14} className="text-[#6B7280]" />
              </div>
              <div className="mt-4 space-y-3">
                {FRAUD.map((a) => {
                  const color =
                    a.sev === "high"
                      ? "bg-red-500"
                      : a.sev === "med"
                        ? "bg-amber-500"
                        : "bg-blue-500";
                  return (
                    <div
                      key={a.txt}
                      className="flex items-start gap-3 rounded-lg border border-[#EAEAEA] p-3"
                    >
                      <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${color}`}>
                        <span
                          className={`block h-2 w-2 animate-ping rounded-full ${color} opacity-60`}
                        />
                      </span>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-[#111111]">{a.txt}</div>
                        <div className="mt-0.5 text-[10px] text-[#6B7280]">{a.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </DashCard>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Growth section ----
const GROWTH_CARDS = [
  {
    metric: "+38%",
    label: "Higher Conversion",
    desc: "Tally's optimized checkout, smart payment method ordering and one-tap wallets turn more visitors into paying customers on every store.",
    kind: "bars" as const,
    data: [38, 46, 52, 49, 58, 64, 71, 76, 82, 88, 92, 96],
  },
  {
    metric: "-42%",
    label: "Lower Checkout Abandonment",
    desc: "Fewer form fields, saved payment details and instant retries recover the carts that most merchants lose at the final step.",
    kind: "area" as const,
    data: [92, 88, 82, 74, 70, 64, 58, 52, 48, 44, 40, 36],
  },
  {
    metric: "3.2×",
    label: "Faster Expansion",
    desc: "Launch in a new country with local currencies, tax rules and payment methods handled — without touching your codebase.",
    kind: "line" as const,
    data: [4, 6, 8, 11, 14, 19, 25, 32, 41, 52, 63, 74],
  },
];

function GrowthChart({
  kind,
  data,
  animate,
}: {
  kind: "bars" | "area" | "line";
  data: number[];
  animate: boolean;
}) {
  const w = 300;
  const h = 90;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((d, i) => `${i * step},${h - ((d - min) / range) * (h - 10) - 4}`);
  const path = `M ${pts.join(" L ")}`;
  const area = `${path} L ${w},${h} L 0,${h} Z`;

  if (kind === "bars") {
    const bw = w / data.length - 4;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
        {data.map((d, i) => {
          const bh = ((d - min) / range) * (h - 8) + 6;
          return (
            <rect
              key={i}
              x={i * (w / data.length) + 2}
              y={h - (animate ? bh : 0)}
              width={bw}
              height={animate ? bh : 0}
              rx={2}
              fill="#111111"
              style={{
                transition: `all 900ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 40}ms`,
              }}
            />
          );
        })}
      </svg>
    );
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`gg-${kind}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#111111" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#111111" stopOpacity="0" />
        </linearGradient>
      </defs>
      {kind === "area" && <path d={area} fill={`url(#gg-${kind})`} />}
      <path
        d={path}
        fill="none"
        stroke="#111111"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 900,
          strokeDashoffset: animate ? 0 : 900,
          transition: "stroke-dashoffset 1.6s ease-out",
        }}
      />
    </svg>
  );
}

function GrowthSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <section className="bg-white py-28 sm:py-36">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-white px-3 py-1 text-xs font-medium text-[#6B7280] shadow-sm">
            Growth outcomes
          </span>
          <h2
            className={`mt-6 font-sora text-3xl font-semibold tracking-tight text-[#111111] sm:text-4xl lg:text-[52px] lg:leading-[1.05] transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Built to increase your revenue.
          </h2>
          <p
            className={`mx-auto mt-5 max-w-xl text-base text-[#6B7280] sm:text-lg transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Real business outcomes measured across thousands of Shopify and WooCommerce merchants
            running on Tally.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {GROWTH_CARDS.map((c, i) => (
            <div
              key={c.label}
              className={`group flex flex-col rounded-2xl border border-[#EAEAEA] bg-white p-8 shadow-[0_1px_2px_rgba(17,17,17,0.03)] transition-all duration-700 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(17,17,17,0.18)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${200 + i * 120}ms` }}
            >
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#6B7280]">
                {c.label}
              </div>
              <div className="mt-3 font-sora text-6xl font-semibold tracking-tight text-[#111111] sm:text-7xl">
                {c.metric}
              </div>

              <div className="mt-8">
                <GrowthChart kind={c.kind} data={c.data} animate={inView} />
              </div>

              <p className="mt-8 text-sm leading-relaxed text-[#6B7280]">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Testimonials section ----
const TESTIMONIALS = [
  {
    initials: "SM",
    name: "Sofia Martins",
    role: "Head of Ecommerce",
    company: "Nord & Fern",
    logo: "NORD/FERN",
    quote:
      "Tally rebuilt our checkout in a weekend. Wallet payments, saved cards and smart retries made a real difference on our top SKUs.",
    impact: "+18%",
    impactLabel: "Conversion uplift",
    accent: "#111111",
  },
  {
    initials: "JR",
    name: "Jordan Reyes",
    role: "Co-founder",
    company: "Halda Skincare",
    logo: "HALDA",
    quote:
      "We were losing carts at the payment step. Since switching to Tally, abandonment dropped fast and support tickets went with it.",
    impact: "-32%",
    impactLabel: "Reduced checkout abandonment",
    accent: "#2563EB",
  },
  {
    initials: "AK",
    name: "Amelia Kato",
    role: "Director of Growth",
    company: "Roami Outdoor",
    logo: "ROAMI°",
    quote:
      "Launching in Europe and Japan used to take a quarter. With Tally handling local methods and currencies, we shipped in 11 days.",
    impact: "3.2×",
    impactLabel: "Faster international expansion",
    accent: "#111111",
  },
];

function TestimonialsSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  return (
    <section className="bg-[#FAFAFA] py-28 sm:py-36">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-white px-3 py-1 text-xs font-medium text-[#6B7280] shadow-sm">
            Customer stories
          </span>
          <h2
            className={`mt-6 font-sora text-3xl font-semibold tracking-tight text-[#111111] sm:text-4xl lg:text-[52px] lg:leading-[1.05] transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Merchants growing with Tally.
          </h2>
          <p
            className={`mx-auto mt-5 max-w-xl text-base text-[#6B7280] sm:text-lg transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Real teams running Shopify and WooCommerce stores, sharing what changed after moving to
            Tally.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={t.name}
              className={`group flex flex-col rounded-2xl border border-[#EAEAEA] bg-white p-8 shadow-[0_1px_2px_rgba(17,17,17,0.03)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-28px_rgba(17,17,17,0.22)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${200 + i * 120}ms` }}
            >
              {/* Logo placeholder */}
              <div className="flex h-10 items-center">
                <div className="flex h-8 items-center rounded-md border border-[#EAEAEA] bg-[#FAFAFA] px-3 font-sora text-[11px] font-semibold uppercase tracking-[0.22em] text-[#111111]">
                  {t.logo}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="mt-6 flex-1 font-sora text-lg leading-relaxed text-[#111111]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Impact */}
              <div className="mt-8 rounded-xl border border-[#EAEAEA] bg-[#FAFAFA] p-5">
                <div
                  className="font-sora text-3xl font-semibold tracking-tight"
                  style={{ color: t.accent }}
                >
                  {t.impact}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-[#6B7280]">
                  {t.impactLabel}
                </div>
              </div>

              {/* Merchant */}
              <div className="mt-8 flex items-center gap-3 border-t border-[#EAEAEA] pt-6">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111111] font-sora text-sm font-semibold text-white ring-2 ring-white"
                  aria-hidden
                >
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-[#111111]">{t.name}</div>
                  <div className="truncate text-xs text-[#6B7280]">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Security section ----
import { ShieldCheck, Server, Lock, Radar, Activity as ActivityIcon } from "lucide-react";

const SECURITY_ITEMS = [
  {
    icon: ShieldCheck,
    title: "PCI Compliance",
    desc: "Certified PCI DSS Level 1. Cardholder data never touches your servers — Tally handles tokenization end to end.",
  },
  {
    icon: Server,
    title: "Enterprise Infrastructure",
    desc: "Multi-region deployments, automatic failover and 99.99% uptime designed to scale with your busiest launches.",
  },
  {
    icon: Lock,
    title: "Data Encryption",
    desc: "AES-256 at rest and TLS 1.3 in transit. Every secret is managed through hardware-backed key stores.",
  },
  {
    icon: ActivityIcon,
    title: "24/7 Monitoring",
    desc: "A dedicated reliability team watches every payment path with real-time alerts and automated remediation.",
  },
  {
    icon: Radar,
    title: "Fraud Protection",
    desc: "Adaptive risk models score every transaction, block bad actors and let genuine customers check out uninterrupted.",
  },
];

function SecuritySection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  return (
    <section className="bg-white py-28 sm:py-36">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#EAEAEA] bg-white px-3 py-1 text-xs font-medium text-[#6B7280] shadow-sm">
            Reliability & trust
          </span>
          <h2
            className={`mt-6 font-sora text-3xl font-semibold tracking-tight text-[#111111] sm:text-4xl lg:text-[52px] lg:leading-[1.05] transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Built for reliability and trust.
          </h2>
          <p
            className={`mx-auto mt-5 max-w-xl text-base text-[#6B7280] sm:text-lg transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Enterprise-grade foundations so your team can focus on growth, not on keeping the lights
            on.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECURITY_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`group flex flex-col rounded-2xl border border-[#EAEAEA] bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#D4D4D4] hover:shadow-[0_18px_40px_-24px_rgba(17,17,17,0.15)] ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${180 + i * 90}ms` }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#EAEAEA] bg-[#FAFAFA]">
                  <Icon size={18} strokeWidth={1.75} className="text-[#111111]" />
                </div>
                <h3 className="mt-6 font-sora text-lg font-semibold text-[#111111]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
