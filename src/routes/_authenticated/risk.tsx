import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Sliders } from "lucide-react";
import {
  AppShell,
  PageHeader,
  Card,
  EmptyState,
  PrimaryButton,
  T,
} from "@/components/app/AppShell";

export const Route = createFileRoute("/_authenticated/risk")({
  component: RiskPage,
  head: () => ({
    meta: [
      { title: "Risk — Tally" },
      { name: "description", content: "Configure fraud rules and monitor risk signals." },
      { property: "og:title", content: "Risk — Tally" },
      { property: "og:description", content: "Configure fraud rules and monitor risk signals." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const RULES = [
  { name: "Block CVC failures > 3", on: true },
  { name: "Require 3DS for high-risk BINs", on: true },
  { name: "Velocity: 5 attempts / hour", on: false },
  { name: "IP country ≠ Billing country", on: false },
];

function RiskPage() {
  return (
    <AppShell>
      <PageHeader
        title="Risk"
        description="Configure fraud rules, allow-lists and monitor risk signals in real time."
        actions={
          <PrimaryButton>
            <Sliders className="h-4 w-4" /> New rule
          </PrimaryButton>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { l: "Risk score", v: "—" },
          { l: "Blocked (24h)", v: "0" },
          { l: "Reviewed (24h)", v: "0" },
        ].map((k) => (
          <Card key={k.l}>
            <p className="text-[12px]" style={{ color: T.textMuted }}>
              {k.l}
            </p>
            <p className="mt-2 text-[28px] font-semibold">{k.v}</p>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 text-[15px] font-semibold">Active rules</h3>
          <ul className="space-y-2.5">
            {RULES.map((r) => (
              <li
                key={r.name}
                className="flex items-center justify-between rounded-lg px-3 py-2.5"
                style={{ background: T.bg, border: `1px solid ${T.border}` }}
              >
                <span className="text-[13px]">{r.name}</span>
                <span
                  className="text-[11px] font-semibold"
                  style={{ color: r.on ? T.green : T.textFaint }}
                >
                  {r.on ? "ACTIVE" : "OFF"}
                </span>
              </li>
            ))}
          </ul>
        </Card>
        <Card padded={false}>
          <EmptyState
            icon={ShieldCheck}
            title="No risk events yet"
            description="Suspicious activity and blocked attempts will surface here."
          />
        </Card>
      </div>
    </AppShell>
  );
}
