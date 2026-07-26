"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: {
    regular: string;
    gradient: string;
  };
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  secondaryText?: string;
  onSecondaryClick?: () => void;
  gridOptions?: {
    angle?: number;
    cellSize?: number;
    opacity?: number;
    lineColor?: string;
  };
}

function RetroGrid({
  angle = 65,
  cellSize = 60,
  opacity = 0.35,
  lineColor = "rgba(60, 45, 30, 0.16)",
}: NonNullable<HeroSectionProps["gridOptions"]>) {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--line-color": lineColor,
  } as React.CSSProperties;

  return (
    <div
      className="pointer-events-none absolute size-full overflow-hidden opacity-[var(--opacity)] [perspective:200px]"
      style={gridStyles}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,var(--line-color)_1px,transparent_0),linear-gradient(to_bottom,var(--line-color)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--oat)] to-transparent to-90%" />
    </div>
  );
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title = "Trusted by small businesses everywhere",
      subtitle = {
        regular: "Payments that ",
        gradient: "make sense.",
      },
      description = "Tally lets small businesses take payments in person and online, see their money clearly, and get paid out daily — one simple fee, no jargon.",
      ctaText = "Create Account",
      ctaHref = "#",
      onCtaClick,
      secondaryText,
      onSecondaryClick,
      gridOptions,
      ...props
    },
    ref,
  ) => {
    const handleCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onCtaClick) {
        e.preventDefault();
        onCtaClick();
      }
    };
    const handleSecondary = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onSecondaryClick) {
        e.preventDefault();
        onSecondaryClick();
      }
    };

    return (
      <div className={cn("relative", className)} ref={ref} {...props}>
        <div className="absolute top-0 z-0 h-screen w-screen bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(42,102,179,0.15),rgba(255,255,255,0))]" />
        <section className="relative max-w-full mx-auto z-1">
          <RetroGrid {...gridOptions} />
          <div className="max-w-screen-xl z-10 mx-auto px-4 py-28 gap-12 md:px-8">
            <div className="space-y-5 max-w-3xl mx-auto text-center">
              <p className="leading-normal text-sm text-[var(--ink-2)] group [font-family:var(--font-body)] mx-auto px-5 py-2 bg-[var(--accent-tint)] border-[1.5px] border-black/5 rounded-3xl w-fit">
                {title}
                <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
              </p>
              <h1
                className="tracking-tighter bg-clip-text text-transparent mx-auto bg-[linear-gradient(180deg,_var(--ink)_0%,_var(--ink-2)_100%)]"
                style={{
                  fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  marginTop: "1.25rem",
                  marginBottom: 0,
                }}
              >
                {subtitle.regular}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-sky-400">
                  {subtitle.gradient}
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-[var(--ink-2)] [font-family:var(--font-body)]">
                {description}
              </p>
              <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e2ecf7_0%,#20508a_50%,#e2ecf7_100%)]" />
                  <div className="relative inline-flex h-full w-full items-center justify-center rounded-full bg-white text-xs font-medium">
                    <a
                      href={ctaHref}
                      onClick={handleCta}
                      className="inline-flex rounded-full text-center group items-center w-full justify-center bg-[var(--accent-tint)] text-[var(--ink)] border border-black/5 hover:bg-[var(--accent-tint)]/70 transition-all sm:w-auto py-4 px-10 cursor-pointer font-bold [font-family:var(--font-body)]"
                    >
                      {ctaText}
                    </a>
                  </div>
                </span>
                {secondaryText && (
                  <a
                    href="#"
                    onClick={handleSecondary}
                    className="inline-flex items-center justify-center rounded-full border-[1.5px] border-black/10 py-4 px-10 text-sm font-bold text-[var(--ink)] cursor-pointer hover:bg-black/[0.03] transition-all [font-family:var(--font-body)]"
                  >
                    {secondaryText}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  },
);
HeroSection.displayName = "HeroSection";

export { HeroSection };
