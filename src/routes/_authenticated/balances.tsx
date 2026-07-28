import { createFileRoute } from "@tanstack/react-router";
import { Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  AppShell,
  PageHeader,
  Card,
  EmptyState,
  PrimaryButton,
  SecondaryButton,
  T,
} from "@/components/app/AppShell";

export const Route = createFileRoute("/_authenticated/balances")({
  component: BalancesPage,
  head: () => ({
    meta: [
      { title: "Balances — Tally" },
      { name: "description", content: "Live view of your available and pending balances." },
      { property: "og:title", content: "Balances — Tally" },
      { property: "og:description", content: "Live view of your available and pending balances." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function BalancesPage() {
  return (
    <AppShell>
      <PageHeader
        title="Balances"
        description="Live view of your available, pending and reserve balances across currencies."
        actions={
          <>
            <SecondaryButton>Export</SecondaryButton>
            <PrimaryButton>Move funds</PrimaryButton>
          </>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { l: "Available", v: "€0.00", icon: Wallet },
          { l: "Pending", v: "€0.00", icon: ArrowUpRight },
          { l: "Reserve", v: "€0.00", icon: ArrowDownRight },
        ].map((k) => (
          <Card key={k.l}>
            <div className="flex items-center justify-between">
              <p className="text-[12px]" style={{ color: T.textMuted }}>
                {k.l}
              </p>
              <k.icon className="h-4 w-4" style={{ color: T.textFaint }} />
            </div>
            <p className="mt-2 text-[28px] font-semibold">{k.v}</p>
            <p className="mt-1 text-[11.5px]" style={{ color: T.textFaint }}>
              Updated just now
            </p>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Card padded={false}>
          <EmptyState
            icon={Wallet}
            title="No balance activity yet"
            description="Your balance ledger will appear here once you process your first payment."
          />
        </Card>
      </div>
    </AppShell>
  );
}
