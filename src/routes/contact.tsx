import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Schedule a demo — Zippay" },
      {
        name: "description",
        content:
          "Book a 30-minute demo with the Zippay team. See checkout, routing and subscriptions live on Shopify and WooCommerce.",
      },
      { property: "og:title", content: "Schedule a demo — Zippay" },
      {
        property: "og:description",
        content: "Talk to our team about payments, checkout and subscriptions for your store.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const volumes = [
  "$0 – $400k / mo",
  "$400k – $1M / mo",
  "$1M – $5M / mo",
  "$5M – $20M / mo",
  "$20M – $50M / mo",
  "+$50M / mo",
];

const platforms = ["Shopify", "WooCommerce", "Custom / Headless", "Other"];

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Placeholder — replace with real submission handler
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    (e.target as HTMLFormElement).reset();
    toast.success("Thanks — our team will reach out shortly.");
  }

  return (
    <main className="min-h-screen bg-off-white">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-navy-deep/5 bg-off-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-md bg-navy-deep font-sora text-sm font-bold text-white">
              Z
            </span>
            <span className="font-sora text-base font-semibold tracking-tight text-navy-deep">
              zippay
            </span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-navy-mid/80 md:flex">
            <Link to="/integrations" className="hover:text-navy-deep">
              Integrations
            </Link>
            <Link to="/pricing" className="hover:text-navy-deep">
              Pricing
            </Link>
            <Link to="/partners" className="hover:text-navy-deep">
              Partner Program
            </Link>
            <Link to="/contact" className="text-navy-deep">
              Contact
            </Link>
          </nav>
          <Link
            to="/auth"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-navy-deep px-4 text-xs font-semibold text-white transition-colors hover:bg-blue-accent"
          >
            Go to App →
          </Link>
        </div>
      </header>

      {/* Hero + form */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_1fr]">
          {/* Left: intro */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-accent">
              Talk to our team
            </div>
            <h1 className="mt-4 font-sora text-4xl font-semibold leading-[1.1] tracking-tight text-navy-deep sm:text-5xl">
              Schedule a <span className="text-blue-accent">30-minute demo</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-navy-mid/75">
              See Zippay live on Shopify or WooCommerce — checkout, smart routing, subscriptions and
              payouts. Bring your questions on pricing, migration or integration.
            </p>

            <ul className="mt-10 space-y-4 text-sm text-navy-deep">
              {[
                "Tailored walkthrough for your stack",
                "Live checkout & routing simulation",
                "Migration plan from Stripe / PayPal",
                "Custom pricing above $500k / mo",
              ].map((l) => (
                <li key={l} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-5 place-items-center rounded-full bg-blue-accent/10 text-blue-accent">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M1.5 5.2L4 7.5L8.5 2.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {l}
                </li>
              ))}
            </ul>

            {/* Calendly placeholder */}
            <div className="mt-12 rounded-2xl border border-dashed border-navy-deep/15 bg-white p-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-navy-mid/50">
                Or book directly
              </div>
              <p className="mt-2 text-sm text-navy-mid/70">
                A Calendly embed will appear here once connected.
              </p>
              {/* TODO: paste Calendly inline widget script here */}
              <div id="calendly-inline-widget" className="mt-4 h-24 rounded-lg bg-off-white" />
            </div>
          </div>

          {/* Right: form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-navy-deep/10 bg-white p-8 shadow-[0_20px_60px_-30px_rgba(15,27,61,0.25)] lg:p-10"
          >
            <h2 className="font-sora text-xl font-semibold text-navy-deep">
              Tell us about your business
            </h2>

            <div className="mt-6 grid gap-4">
              <Field label="Full name" name="name" placeholder="Alex Morgan" required />
              <Field
                label="Work email"
                name="email"
                type="email"
                placeholder="alex@company.com"
                required
              />
              <Field label="Company" name="company" placeholder="Acme Inc." required />
              <Field label="Website" name="website" placeholder="https://acme.com" />

              <div className="grid gap-4 sm:grid-cols-2">
                <Select label="Platform" name="platform" options={platforms} />
                <Select label="Monthly volume" name="volume" options={volumes} />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-navy-deep">
                  What would you like to see?
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Checkout conversion, subscriptions, routing…"
                  className="w-full rounded-xl border border-navy-deep/15 bg-off-white/40 px-3.5 py-2.5 text-sm text-navy-deep placeholder:text-navy-mid/40 focus:border-blue-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-accent/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-accent px-6 text-sm font-semibold text-white shadow-lg shadow-blue-accent/25 transition-colors hover:bg-blue-accent/90 disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Request a demo →"}
            </button>
            <p className="mt-3 text-center text-[11px] text-navy-mid/50">
              We reply within one business day.
            </p>
          </form>
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
            <Link to="/partners" className="hover:text-navy-deep">
              Partners
            </Link>
            <Link to="/contact" className="hover:text-navy-deep">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-navy-deep">
        {label}
        {required && <span className="ml-1 text-blue-accent">*</span>}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-navy-deep/15 bg-off-white/40 px-3.5 py-2.5 text-sm text-navy-deep placeholder:text-navy-mid/40 focus:border-blue-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-accent/20"
      />
    </div>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-navy-deep">{label}</label>
      <select
        name={name}
        className="w-full rounded-xl border border-navy-deep/15 bg-off-white/40 px-3.5 py-2.5 text-sm text-navy-deep focus:border-blue-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-accent/20"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
