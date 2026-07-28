import { Link } from "@tanstack/react-router";

const cols = [
  {
    h: "Platform",
    items: [
      { l: "Integrations", to: "/integrations" as const },
      { l: "Pricing", to: "/pricing" as const },
      { l: "Partner Program", to: "/partners" as const },
    ],
  },
  {
    h: "Resources",
    items: [
      { l: "Blog", to: "/blog" as const },
      { l: "Contact", to: "/contact-us" as const },
      { l: "Sign in", to: "/auth" as const },
    ],
  },
  {
    h: "Legal",
    items: [
      { l: "Privacy Policy", to: "/legal/privacy" as const },
      { l: "Cookie Policy", to: "/legal/cookies" as const },
      { l: "Terms of Service", to: "/legal/terms" as const },
      { l: "Acceptable Use", to: "/legal/acceptable-use" as const },
      { l: "Security", to: "/legal/security" as const },
      { l: "GDPR & Privacy", to: "/legal/gdpr" as const },
    ],
  },
];

export function LegalFooter() {
  return (
    <footer className="border-t border-[#EAEAEA] bg-white py-16 print:hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="col-span-2">
            <span className="font-sora text-lg font-semibold tracking-tight text-[#111111]">
              tally<span className="text-[#2563EB]">.</span>
            </span>
            <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-[#6B7280]">
              The growth engine for modern Shopify and WooCommerce merchants. Operated by Nesta
              Business LLC.
            </p>
          </div>
          {cols.map((col) => (
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
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
