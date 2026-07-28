import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { LegalFooter } from "./LegalFooter";
import { LegalNav } from "./LegalNav";

export type TocItem = { id: string; label: string };

export function LegalLayout({
  eyebrow,
  title,
  intro,
  updated,
  toc,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  toc: TocItem[];
  children: ReactNode;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [readingMin, setReadingMin] = useState<number>(0);
  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? "");

  // Estimate reading time from rendered text.
  useEffect(() => {
    const text = bodyRef.current?.innerText ?? "";
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    setReadingMin(Math.max(1, Math.round(words / 220)));
  }, [children]);

  // Scroll-spy for TOC.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );
    toc.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [toc]);

  const shareUrl = useMemo(() => (typeof window !== "undefined" ? window.location.href : ""), []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="min-h-screen bg-white font-manrope text-[#111111]">
      <LegalNav />

      <header className="border-b border-[#EAEAEA]">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:pt-24 lg:pb-16">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
            {eyebrow}
          </span>
          <h1 className="mt-4 font-sora text-4xl font-semibold leading-[1.05] tracking-tight text-[#111111] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#4B5563]">{intro}</p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#EAEAEA] pt-6 text-xs text-[#6B7280]">
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
              <span className="font-medium uppercase tracking-[0.14em]">
                Last updated · {updated}
              </span>
            </span>
            <span>{readingMin} min read</span>
            <span className="hidden sm:inline">·</span>
            <div className="flex items-center gap-2">
              <button
                onClick={copyLink}
                className="rounded-full border border-[#EAEAEA] px-3 py-1 font-medium text-[#111111] transition-colors hover:bg-[#F5F6F7]"
              >
                Copy link
              </button>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#EAEAEA] px-3 py-1 font-medium text-[#111111] transition-colors hover:bg-[#F5F6F7]"
              >
                Share
              </a>
              <button
                onClick={() => typeof window !== "undefined" && window.print()}
                className="rounded-full border border-[#EAEAEA] px-3 py-1 font-medium text-[#111111] transition-colors hover:bg-[#F5F6F7]"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                On this page
              </p>
              <ul className="mt-4 space-y-2 border-l border-[#EAEAEA]">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className={`-ml-px block border-l-2 py-1 pl-4 text-sm transition-colors ${
                        activeId === t.id
                          ? "border-[#2563EB] font-medium text-[#111111]"
                          : "border-transparent text-[#6B7280] hover:text-[#111111]"
                      }`}
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Body */}
          <div
            ref={bodyRef}
            className="prose-legal max-w-none text-[15.5px] leading-[1.75] text-[#374151]"
          >
            {children}
          </div>
        </div>
      </section>

      <LegalFooter />
    </div>
  );
}

/** Content primitives used across legal pages. Styling is scoped here for consistency. */
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-[#EAEAEA] pt-10 first:border-0 first:pt-0"
    >
      <h2 className="font-sora text-2xl font-semibold tracking-tight text-[#111111] sm:text-3xl">
        {title}
      </h2>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-[15.5px] leading-[1.8] text-[#374151]">{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="ml-5 list-disc space-y-2 text-[15.5px] leading-[1.75] text-[#374151] marker:text-[#9CA3AF]">
      {children}
    </ul>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#EAEAEA] bg-[#F9FAFB] p-5 text-[14.5px] leading-relaxed text-[#4B5563]">
      {children}
    </div>
  );
}

export function Placeholder({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-[#FEF3C7] px-1.5 py-0.5 font-mono text-[13px] text-[#92400E]">
      {label}
    </span>
  );
}

export function LinkTo({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="font-medium text-[#2563EB] underline-offset-2 hover:underline">
      {children}
    </Link>
  );
}
