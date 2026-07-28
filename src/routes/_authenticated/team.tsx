import { createFileRoute } from "@tanstack/react-router";
import { UsersRound, UserPlus } from "lucide-react";
import {
  AppShell,
  PageHeader,
  Card,
  EmptyState,
  PrimaryButton,
  T,
} from "@/components/app/AppShell";

export const Route = createFileRoute("/_authenticated/team")({
  component: TeamPage,
  head: () => ({
    meta: [
      { title: "Team — Tally" },
      { name: "description", content: "Invite teammates and manage roles." },
      { property: "og:title", content: "Team — Tally" },
      { property: "og:description", content: "Invite teammates and manage roles." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const ROLES = [
  { name: "Owner", desc: "Full access to everything, including billing." },
  { name: "Admin", desc: "Manage users, payments, payouts and integrations." },
  { name: "Developer", desc: "API keys, webhooks and technical settings." },
  { name: "Analyst", desc: "Read-only access to analytics and reports." },
];

function TeamPage() {
  return (
    <AppShell>
      <PageHeader
        title="Team"
        description="Invite teammates, assign roles and control workspace access."
        actions={
          <PrimaryButton>
            <UserPlus className="h-4 w-4" /> Invite
          </PrimaryButton>
        }
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card padded={false}>
            <EmptyState
              icon={UsersRound}
              title="You're the only member"
              description="Invite teammates by email to collaborate on your Tally workspace."
              action={
                <PrimaryButton>
                  <UserPlus className="h-4 w-4" /> Invite teammate
                </PrimaryButton>
              }
            />
          </Card>
        </div>
        <Card>
          <h3 className="mb-3 text-[14.5px] font-semibold">Roles</h3>
          <ul className="space-y-3">
            {ROLES.map((r) => (
              <li key={r.name}>
                <p className="text-[13px] font-semibold">{r.name}</p>
                <p className="text-[12px]" style={{ color: T.textMuted }}>
                  {r.desc}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
