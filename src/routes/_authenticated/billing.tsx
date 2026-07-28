import { createFileRoute } from "@tanstack/react-router";
import { Receipt, Download } from "lucide-react";
import {
  AppShell,
  PageHeader,
  Card,
  EmptyState,
  PrimaryButton,
  SecondaryButton,
  T,
} from "@/components/app/AppShell";

export const Route = createFileRoute("/_authenticated/billing")({
  component: BillingPage,
  head: () => ({
    meta: [
      { title: "Billing — Tally" },
      { name: "description", content: "Plan, invoices and payment methods." },
      { property: "og:title", content: "Billing — Tally" },
      { property: "og:description", content: "Plan, invoices and payment methods." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function BillingPage() {
  return (
    <AppShell>
      <PageHeader
        title="Billing"
        description="Manage your plan, invoices and payment methods."
        actions={
          <SecondaryButton>
            <Download className="h-4 w-4" /> Invoices
          </SecondaryButton>
        }
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px]" style={{ color: T.textMuted }}>
                  Current plan
                </p>
                <h3 className="mt-1 text-[22px] font-semibold">Growth · 1.2% + 20¢</h3>
                <p className="mt-1 text-[12.5px]" style={{ color: T.textMuted }}>
                  Free until you process $10,000 in payments.
                </p>
              </div>
              <PrimaryButton>Upgrade</PrimaryButton>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                { l: "This month", v: "$0.00" },
                { l: "Trial credit left", v: "$10,000" },
                { l: "Next invoice", v: "—" },
              ].map((k) => (
                <div
                  key={k.l}
                  className="rounded-xl p-4"
                  style={{ background: T.bg, border: `1px solid ${T.border}` }}
                >
                  <p className="text-[11.5px]" style={{ color: T.textMuted }}>
                    {k.l}
                  </p>
                  <p className="mt-1 text-[18px] font-semibold">{k.v}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <Card>
          <h3 className="mb-3 text-[14.5px] font-semibold">Payment method</h3>
          <p className="text-[12.5px]" style={{ color: T.textMuted }}>
            No card on file. Add one so we can bill you when your trial ends.
          </p>
          <div className="mt-4">
            <PrimaryButton>Add card</PrimaryButton>
          </div>
        </Card>
      </div>
      <div className="mt-6">
        <Card padded={false}>
          <EmptyState
            icon={Receipt}
            title="No invoices yet"
            description="Once we bill you, invoices will show up here in PDF and CSV."
          />
        </Card>
      </div>
    </AppShell>
  );
}
