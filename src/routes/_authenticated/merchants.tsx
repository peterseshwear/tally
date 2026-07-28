import { createFileRoute } from "@tanstack/react-router";
import { Store, Plus, Search } from "lucide-react";
import {
  AppShell,
  PageHeader,
  Card,
  EmptyState,
  PrimaryButton,
  SecondaryButton,
  T,
} from "@/components/app/AppShell";

export const Route = createFileRoute("/_authenticated/merchants")({
  component: MerchantsPage,
  head: () => ({
    meta: [
      { title: "Merchants — Tally" },
      { name: "description", content: "Manage merchant accounts and sub-stores." },
      { property: "og:title", content: "Merchants — Tally" },
      { property: "og:description", content: "Manage merchant accounts and sub-stores." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function MerchantsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Merchants"
        description="Manage merchant accounts, sub-stores and their onboarding status."
        actions={
          <>
            <SecondaryButton>Import</SecondaryButton>
            <PrimaryButton>
              <Plus className="h-4 w-4" /> Add merchant
            </PrimaryButton>
          </>
        }
      />
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { l: "Total merchants", v: "0" },
          { l: "Active", v: "0" },
          { l: "Onboarding", v: "0" },
          { l: "Suspended", v: "0" },
        ].map((k) => (
          <Card key={k.l}>
            <p className="text-[12px]" style={{ color: T.textMuted }}>
              {k.l}
            </p>
            <p className="mt-2 text-[28px] font-semibold">{k.v}</p>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Card padded={false}>
          <EmptyState
            icon={Store}
            title="No merchants yet"
            description="Invite your first merchant to start processing on their behalf."
            action={
              <PrimaryButton>
                <Plus className="h-4 w-4" /> Add merchant
              </PrimaryButton>
            }
          />
        </Card>
      </div>
    </AppShell>
  );
}
