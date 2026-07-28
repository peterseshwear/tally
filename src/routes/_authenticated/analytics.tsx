import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import {
  AppShell,
  PageHeader,
  Card,
  EmptyState,
  SecondaryButton,
  T,
} from "@/components/app/AppShell";

export const Route = createFileRoute("/_authenticated/analytics")({
  component: AnalyticsPage,
  head: () => ({
    meta: [
      { title: "Analytics — Tally" },
      { name: "description", content: "Deep analytics across revenue, conversion and cohorts." },
      { property: "og:title", content: "Analytics — Tally" },
      {
        property: "og:description",
        content: "Deep analytics across revenue, conversion and cohorts.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function AnalyticsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Analytics"
        description="Deep analytics across revenue, conversion, geography and cohorts."
        actions={<SecondaryButton>Last 30 days</SecondaryButton>}
      />
      <div className="grid gap-4 md:grid-cols-4">
        {["Revenue", "Orders", "Conversion", "AOV"].map((k) => (
          <Card key={k}>
            <p className="text-[12px]" style={{ color: T.textMuted }}>
              {k}
            </p>
            <p className="mt-2 text-[28px] font-semibold">0</p>
            <div className="mt-3 h-10 rounded-md" style={{ background: T.hairline }} />
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[15px] font-semibold">Revenue over time</h3>
            <SecondaryButton>Compare</SecondaryButton>
          </div>
          <div
            className="grid h-72 place-items-center rounded-xl"
            style={{ background: T.bg, border: `1px dashed ${T.border}` }}
          >
            <EmptyState
              icon={BarChart3}
              title="No data yet"
              description="Charts will populate as you begin processing payments."
            />
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
