import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";
import { AppShell, PageHeader, Card, PrimaryButton, T } from "@/components/app/AppShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [
      { title: "Profile — Tally" },
      { name: "description", content: "Your personal profile and account details." },
      { property: "og:title", content: "Profile — Tally" },
      { property: "og:description", content: "Your personal profile and account details." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function ProfilePage() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);
  return (
    <AppShell>
      <PageHeader
        title="Profile"
        description="Personal details, avatar and login credentials."
        actions={<PrimaryButton>Save</PrimaryButton>}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <div className="flex flex-col items-center text-center">
            <div
              className="grid h-20 w-20 place-items-center rounded-full text-[28px] font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.violet})` }}
            >
              {(email?.[0] ?? "M").toUpperCase()}
            </div>
            <p className="mt-3 text-[14px] font-semibold">{email ?? "Merchant"}</p>
            <p className="text-[12px]" style={{ color: T.textMuted }}>
              Owner
            </p>
          </div>
        </Card>
        <div className="lg:col-span-2">
          <Card>
            <h3 className="mb-4 text-[14.5px] font-semibold">Personal details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { l: "Full name", v: "" },
                { l: "Email", v: email ?? "" },
                { l: "Phone", v: "" },
                { l: "Timezone", v: "Europe/Paris" },
              ].map((f) => (
                <label key={f.l} className="block">
                  <span
                    className="mb-1 block text-[11.5px] font-medium"
                    style={{ color: T.textMuted }}
                  >
                    {f.l}
                  </span>
                  <input
                    defaultValue={f.v}
                    className="w-full rounded-lg px-3 py-2 text-[13px] outline-none"
                    style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text }}
                  />
                </label>
              ))}
            </div>
          </Card>
          <div className="mt-4">
            <Card>
              <div className="flex items-center gap-3">
                <UserCircle className="h-5 w-5" style={{ color: T.blue }} />
                <div className="flex-1">
                  <p className="text-[13.5px] font-semibold">Change password</p>
                  <p className="text-[12px]" style={{ color: T.textMuted }}>
                    We'll email you a secure reset link.
                  </p>
                </div>
                <PrimaryButton>Send link</PrimaryButton>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
