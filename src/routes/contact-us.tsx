import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalNav } from "@/components/legal/LegalNav";
import { LegalFooter } from "@/components/legal/LegalFooter";

const URL = "https://golden-tally-revamp.lovable.app/contact-us";

export const Route = createFileRoute("/contact-us")({
  component: ContactHub,
  head: () => ({
    meta: [
      { title: "Contact — Tally" },
      {
        name: "description",
        content:
          "Get in touch with the right team at Tally: support, sales, partnerships, security, legal, privacy or media. Operated by Nesta Business LLC.",
      },
      { property: "og:title", content: "Contact — Tally" },
      {
        property: "og:description",
        content:
          "Reach the right team at Tally in one click — support, sales, partnerships, security and more.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
});

type Card = {
  h: string;
  desc: string;
  email: string;
  cta?: { label: string; to: string };
  hint?: string;
};

const cards: Card[] = [
  {
    h: "General support",
    desc: "Questions about your account, the dashboard or existing integrations.",
    email: "{{Support Email}}",
    hint: "Median response time: under 4 business hours.",
  },
  {
    h: "Sales",
    desc: "Talk to our team about pricing, migration, roadmap fit or a custom setup.",
    email: "{{Support Email}}",
    cta: { label: "Book a demo", to: "/contact" },
  },
  {
    h: "Partnerships",
    desc: "Agencies, developers, platforms and referral partners.",
    email: "{{Support Email}}",
    cta: { label: "Partner Program", to: "/partners" },
  },
  {
    h: "Security reports",
    desc: "Responsible disclosure and vulnerability reports.",
    email: "{{Support Email}}",
    cta: { label: "Security policy", to: "/legal/security" },
  },
  {
    h: "Legal requests",
    desc: "Contracts, DPAs, government or law-enforcement requests.",
    email: "{{Legal Email}}",
    cta: { label: "Terms of Service", to: "/legal/terms" },
  },
  {
    h: "Privacy requests",
    desc: "Access, correction, deletion, portability or objection requests.",
    email: "{{Privacy Email}}",
    cta: { label: "GDPR & Privacy", to: "/legal/gdpr" },
  },
  {
    h: "Media & press",
    desc: "Interviews, quotes, brand assets and speaking requests.",
    email: "{{Support Email}}",
  },
];

function ContactHub() {
  return (
    <div className="min-h-screen bg-white font-manrope text-[#111111]">
      <LegalNav />

      <header className="border-b border-[#EAEAEA]">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:pt-24 lg:pb-16">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
            Contact
          </span>
          <h1 className="mt-4 max-w-3xl font-sora text-4xl font-semibold leading-[1.05] tracking-tight text-[#111111] sm:text-5xl lg:text-6xl">
            Talk to the right team, faster.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#4B5563]">
            Tally is operated by Nesta Business LLC. Choose the team most relevant to your question
            and we’ll get back to you as soon as possible.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.h}
              className="flex flex-col rounded-2xl border border-[#EAEAEA] bg-white p-6 transition-colors hover:border-[#111111]/30"
            >
              <h2 className="font-sora text-lg font-semibold tracking-tight text-[#111111]">
                {c.h}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{c.desc}</p>
              <div className="mt-6 rounded-xl bg-[#F9FAFB] px-4 py-3 font-mono text-[13px] text-[#111111]">
                {c.email}
              </div>
              {c.hint && (
                <p className="mt-3 text-[11.5px] uppercase tracking-[0.14em] text-[#6B7280]">
                  {c.hint}
                </p>
              )}
              {c.cta && (
                <div className="mt-auto pt-6">
                  <Link
                    to={c.cta.to}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] hover:underline"
                  >
                    {c.cta.label} →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 rounded-3xl border border-[#EAEAEA] bg-[#F9FAFB] p-8 sm:p-10 lg:grid-cols-2">
          <div>
            <h3 className="font-sora text-xl font-semibold tracking-tight text-[#111111]">
              Company details
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
              <strong className="text-[#111111]">Nesta Business LLC</strong>
              <br />
              Registered address:{" "}
              <span className="rounded-md bg-white px-1.5 py-0.5 font-mono text-[13px] text-[#111111]">
                {"{{Registered Address}}"}
              </span>
              <br />
              Website:{" "}
              <span className="rounded-md bg-white px-1.5 py-0.5 font-mono text-[13px] text-[#111111]">
                {"{{Website}}"}
              </span>
            </p>
          </div>
          <div>
            <h3 className="font-sora text-xl font-semibold tracking-tight text-[#111111]">
              Emergencies
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
              If you believe your account has been compromised or you’re observing active fraud,
              email <span className="font-mono text-[#111111]">{"{{Support Email}}"}</span> with
              “Urgent” in the subject line so our on-call team is paged immediately.
            </p>
          </div>
        </div>
      </section>

      <LegalFooter />
    </div>
  );
}
