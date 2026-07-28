import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { AppShell, PageHeader, Card, EmptyState, T } from "@/components/app/AppShell";

export const Route = createFileRoute("/_authenticated/notifications")({
  component: NotificationsPage,
  head: () => ({
    meta: [
      { title: "Notifications — Tally" },
      { name: "description", content: "Alerts, activity and delivery preferences." },
      { property: "og:title", content: "Notifications — Tally" },
      { property: "og:description", content: "Alerts, activity and delivery preferences." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const PREFS = [
  { name: "Successful payment", email: true, push: false },
  { name: "Failed payment", email: true, push: true },
  { name: "New dispute", email: true, push: true },
  { name: "Payout completed", email: true, push: false },
  { name: "Weekly digest", email: true, push: false },
];

function NotificationsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Notifications"
        description="Choose what you want to be alerted about, and where."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card padded={false}>
          <EmptyState
            icon={Bell}
            title="You're all caught up"
            description="No new notifications. Alerts will appear here as things happen."
          />
        </Card>
        <Card>
          <h3 className="mb-4 text-[14.5px] font-semibold">Delivery preferences</h3>
          <ul className="divide-y" style={{ borderColor: T.border }}>
            {PREFS.map((p) => (
              <li key={p.name} className="flex items-center justify-between py-3">
                <span className="text-[13px]">{p.name}</span>
                <div
                  className="flex items-center gap-3 text-[11.5px]"
                  style={{ color: T.textMuted }}
                >
                  <span style={{ color: p.email ? T.green : T.textFaint }}>
                    Email {p.email ? "✓" : "✕"}
                  </span>
                  <span style={{ color: p.push ? T.green : T.textFaint }}>
                    Push {p.push ? "✓" : "✕"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
