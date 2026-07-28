import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LegalNav } from "@/components/legal/LegalNav";
import { LegalFooter } from "@/components/legal/LegalFooter";

const URL = "https://golden-tally-revamp.lovable.app/blog";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog — Tally: payments, ecommerce and merchant growth" },
      {
        name: "description",
        content:
          "Product updates, ecommerce playbooks, developer guides and merchant stories from the Tally team. Operated by Nesta Business LLC.",
      },
      { property: "og:title", content: "Tally Blog" },
      {
        property: "og:description",
        content:
          "The latest from Tally: product updates, payments, ecommerce, developer guides, security and merchant stories.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
});

type Category =
  | "Product Updates"
  | "Payments"
  | "Ecommerce"
  | "Developers"
  | "Security"
  | "Guides"
  | "Merchant Stories";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  author: { name: string; role: string };
  date: string;
  minutes: number;
};

const posts: Post[] = [
  {
    slug: "checkout-conversion-2026",
    title: "How the top 1% of Shopify merchants win checkout conversion in 2026",
    excerpt:
      "A structured framework for measuring, isolating and improving checkout drop-off — with benchmarks from thousands of stores.",
    category: "Ecommerce",
    author: { name: "Amelia Rowe", role: "Head of Commerce" },
    date: "Feb 04, 2026",
    minutes: 9,
  },
  {
    slug: "smart-routing-launch",
    title: "Introducing Smart Routing: fewer declined payments, better margins",
    excerpt:
      "Automatically send each transaction to the acquirer most likely to authorize it — and get a full audit trail of every decision.",
    category: "Product Updates",
    author: { name: "Julien Marchand", role: "Product Manager" },
    date: "Jan 28, 2026",
    minutes: 5,
  },
  {
    slug: "3ds-authentication-guide",
    title: "A pragmatic guide to 3-D Secure in 2026",
    excerpt:
      "When to trigger challenges, how to design exemption strategies and how to keep your fraud rate under control without hurting conversion.",
    category: "Payments",
    author: { name: "Nadia Okafor", role: "Payments Lead" },
    date: "Jan 21, 2026",
    minutes: 8,
  },
  {
    slug: "webhooks-you-can-trust",
    title: "Webhooks you can trust: signing, retries and idempotency",
    excerpt:
      "A reference implementation for consuming Tally webhooks in production, with worked examples in TypeScript and Python.",
    category: "Developers",
    author: { name: "Idris Thornton", role: "DX Engineer" },
    date: "Jan 14, 2026",
    minutes: 7,
  },
  {
    slug: "keeping-secrets-safe",
    title: "Keeping secrets safe: rotating API keys without downtime",
    excerpt:
      "A short operations playbook for rotating keys across production environments with zero customer impact.",
    category: "Security",
    author: { name: "Priya Nair", role: "Security Engineer" },
    date: "Jan 07, 2026",
    minutes: 4,
  },
  {
    slug: "atlas-outdoors-story",
    title: "How Atlas Outdoors doubled AOV after moving to Tally",
    excerpt:
      "A 6-month deep dive into how a modern outdoor brand rethought checkout, wallets and subscriptions with the Tally team.",
    category: "Merchant Stories",
    author: { name: "Sofia Blake", role: "Editor" },
    date: "Dec 18, 2025",
    minutes: 6,
  },
  {
    slug: "vat-eu-quick-guide",
    title: "The quick guide to EU VAT for global merchants",
    excerpt:
      "Rates, thresholds, OSS and IOSS — the essentials every DTC brand selling into the EU should know.",
    category: "Guides",
    author: { name: "Marcus Alva", role: "Finance Editor" },
    date: "Dec 10, 2025",
    minutes: 10,
  },
];

const categories: (Category | "All")[] = [
  "All",
  "Product Updates",
  "Payments",
  "Ecommerce",
  "Developers",
  "Security",
  "Guides",
  "Merchant Stories",
];

function BlogPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesCat = cat === "All" || p.category === cat;
      const needle = q.trim().toLowerCase();
      const matchesQ =
        !needle ||
        p.title.toLowerCase().includes(needle) ||
        p.excerpt.toLowerCase().includes(needle) ||
        p.author.name.toLowerCase().includes(needle);
      return matchesCat && matchesQ;
    });
  }, [q, cat]);

  const featured = posts[0];
  const rest = filtered.filter((p) => p.slug !== featured.slug);

  return (
    <div className="min-h-screen bg-white font-manrope text-[#111111]">
      <LegalNav />

      <header className="border-b border-[#EAEAEA]">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-10 lg:pt-24 lg:pb-14">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
            The Tally Blog
          </span>
          <h1 className="mt-4 max-w-3xl font-sora text-4xl font-semibold leading-[1.05] tracking-tight text-[#111111] sm:text-5xl lg:text-6xl">
            Stories, product updates and playbooks for modern merchants.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#4B5563]">
            Published by the team at Nesta Business LLC. Practical writing on payments, ecommerce
            and the operating system behind fast-growing online stores.
          </p>

          {/* Search + newsletter */}
          <div className="mt-10 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="relative">
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search articles, authors, topics…"
                className="h-12 w-full rounded-full border border-[#EAEAEA] bg-white px-5 text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:border-[#111111] focus:outline-none"
              />
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex h-12 items-stretch overflow-hidden rounded-full border border-[#EAEAEA] bg-white"
            >
              <input
                type="email"
                placeholder="Get the monthly Tally newsletter"
                className="min-w-0 flex-1 bg-transparent px-5 text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none"
              />
              <button className="shrink-0 bg-[#111111] px-5 text-sm font-medium text-white transition-colors hover:bg-black/85">
                Subscribe
              </button>
            </form>
          </div>

          {/* Category chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  cat === c
                    ? "bg-[#111111] text-white"
                    : "border border-[#EAEAEA] text-[#4B5563] hover:bg-[#F5F6F7]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Featured */}
      {cat === "All" && !q && (
        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 overflow-hidden rounded-3xl border border-[#EAEAEA] bg-[#F9FAFB] p-6 sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
                Featured · {featured.category}
              </span>
              <h2 className="mt-4 font-sora text-2xl font-semibold leading-tight tracking-tight text-[#111111] sm:text-3xl lg:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[#4B5563]">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-3 text-xs text-[#6B7280]">
                <Avatar name={featured.author.name} />
                <div>
                  <p className="font-medium text-[#111111]">{featured.author.name}</p>
                  <p>
                    {featured.author.role} · {featured.date} · {featured.minutes} min read
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.12), transparent 55%), radial-gradient(circle at 80% 80%, rgba(17,17,17,0.08), transparent 55%)",
                }}
              />
              <div className="relative flex h-full min-h-[220px] flex-col justify-end p-6">
                <p className="font-sora text-xs uppercase tracking-[0.18em] text-[#6B7280]">
                  Deep dive
                </p>
                <p className="mt-2 font-sora text-3xl font-semibold text-[#111111]">+34%</p>
                <p className="text-sm text-[#4B5563]">
                  average lift in checkout conversion across the merchants featured.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-sora text-2xl font-semibold tracking-tight text-[#111111]">
            {cat === "All" ? "Latest articles" : cat}
          </h2>
          <p className="text-xs text-[#6B7280]">
            {filtered.length} article{filtered.length === 1 ? "" : "s"}
          </p>
        </div>
        {rest.length === 0 ? (
          <p className="rounded-2xl border border-[#EAEAEA] bg-[#F9FAFB] p-10 text-center text-sm text-[#6B7280]">
            No articles match your search. Try a different keyword or category.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <article
                key={p.slug}
                className="group flex flex-col rounded-2xl border border-[#EAEAEA] bg-white p-6 transition-colors hover:border-[#111111]/30"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2563EB]">
                  {p.category}
                </span>
                <h3 className="mt-3 font-sora text-lg font-semibold leading-snug tracking-tight text-[#111111]">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">{p.excerpt}</p>
                <div className="mt-auto pt-6 flex items-center gap-3 text-xs text-[#6B7280]">
                  <Avatar name={p.author.name} />
                  <div className="min-w-0">
                    <p className="truncate font-medium text-[#111111]">{p.author.name}</p>
                    <p className="truncate">
                      {p.date} · {p.minutes} min read
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-16 rounded-3xl border border-[#EAEAEA] bg-[#F9FAFB] p-8 sm:p-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-sora text-xl font-semibold tracking-tight text-[#111111]">
                Get the Tally newsletter
              </h3>
              <p className="mt-2 max-w-lg text-sm text-[#4B5563]">
                One email a month. Product news, ecommerce playbooks and the occasional deep dive.
                No spam. Unsubscribe anytime.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex h-12 w-full items-stretch overflow-hidden rounded-full border border-[#EAEAEA] bg-white sm:max-w-md"
            >
              <input
                type="email"
                placeholder="you@company.com"
                className="min-w-0 flex-1 bg-transparent px-5 text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none"
              />
              <button className="shrink-0 bg-[#111111] px-5 text-sm font-medium text-white transition-colors hover:bg-black/85">
                Subscribe
              </button>
            </form>
          </div>
          <p className="mt-4 text-[11px] text-[#6B7280]">
            By subscribing you agree to our{" "}
            <Link to="/legal/privacy" className="underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>

      <LegalFooter />
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#111111] font-sora text-[11px] font-semibold text-white">
      {initials}
    </div>
  );
}
