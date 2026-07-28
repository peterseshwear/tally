import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart, Download, Plus } from "lucide-react";
import {
  AppShell,
  PageHeader,
  Card,
  EmptyState,
  PrimaryButton,
  SecondaryButton,
  T,
} from "@/components/app/AppShell";

export const Route = createFileRoute("/_authenticated/reports")({
  component: ReportsPage,
  head: () => ({
    meta: [
      { title: "Reports — Tally" },
      { name: "description", content: "Schedule, export and download financial reports." },
      { property: "og:title", content: "Reports — Tally" },
      { property: "og:description", content: "Schedule, export and download financial reports." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const TEMPLATES = [
  { name: "Revenue by day", desc: "Gross & net revenue by day" },
  { name: "Payout reconciliation", desc: "Match payouts to bank transfers" },
  { name: "Chargebacks & refunds", desc: "Full dispute and refund ledger" },
  { name: "Tax report", desc: "VAT collected by country" },
];

function ReportsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Reports"
        description="Schedule, export and download financial reports."
        actions={
          <>
            <SecondaryButton>
              <Download className="h-4 w-4" /> Export
            </SecondaryButton>
            <PrimaryButton>
              <Plus className="h-4 w-4" /> New report
            </PrimaryButton>
          </>
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        {TEMPLATES.map((t) => (
          <Card key={t.name}>
            <h3 className="text-[14.5px] font-semibold">{t.name}</h3>
            <p className="mt-1 text-[12.5px]" style={{ color: T.textMuted }}>
              {t.desc}
            </p>
            <div className="mt-4 flex gap-2">
              <SecondaryButton>Preview</SecondaryButton>
              <PrimaryButton>Generate</PrimaryButton>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Card padded={false}>
          <EmptyState
            icon={FileBarChart}
            title="No reports generated yet"
            description="Pick a template above to generate your first report."
          />
        </Card>
      </div>
    </AppShell>
  );
}
