import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy, MessageCircle, BookOpen, Mail } from "lucide-react";
import { AppShell, PageHeader, Card, PrimaryButton, T } from "@/components/app/AppShell";

export const Route = createFileRoute("/_authenticated/support")({
  component: SupportPage,
  head: () => ({
    meta: [
      { title: "Support — Tally" },
      { name: "description", content: "Talk to our team or browse help articles." },
      { property: "og:title", content: "Support — Tally" },
      { property: "og:description", content: "Talk to our team or browse help articles." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const CHANNELS = [
  { icon: MessageCircle, name: "Live chat", desc: "Median response < 2 min, 24/5." },
  { icon: Mail, name: "Email us", desc: "support@tally.io — reply within 4h." },
  { icon: BookOpen, name: "Help center", desc: "Guides, troubleshooting and API docs." },
];

const FAQS = [
  { q: "When do I get paid?", a: "Payouts land in T+3. Instant payouts available on request." },
  { q: "How do refunds work?", a: "Full and partial refunds are free within 90 days." },
  { q: "Can I test in sandbox?", a: "Yes — every account has a fully-featured test mode." },
];

function SupportPage() {
  return (
    <AppShell>
      <PageHeader
        title="Support"
        description="We're here whenever you need us."
        actions={
          <PrimaryButton>
            <LifeBuoy className="h-4 w-4" /> New ticket
          </PrimaryButton>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        {CHANNELS.map((c) => (
          <Card key={c.name}>
            <c.icon className="h-5 w-5" style={{ color: T.blue }} />
            <h3 className="mt-3 text-[14.5px] font-semibold">{c.name}</h3>
            <p className="mt-1 text-[12.5px]" style={{ color: T.textMuted }}>
              {c.desc}
            </p>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Card>
          <h3 className="mb-4 text-[14.5px] font-semibold">Frequently asked</h3>
          <ul className="divide-y" style={{ borderColor: T.border }}>
            {FAQS.map((f) => (
              <li key={f.q} className="py-3">
                <p className="text-[13px] font-semibold">{f.q}</p>
                <p className="mt-1 text-[12.5px]" style={{ color: T.textMuted }}>
                  {f.a}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
