import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
  head: () => ({
    meta: [
      { title: "Reset password — Zippay" },
      { name: "description", content: "Choose a new password for your Zippay account." },
      { property: "og:title", content: "Reset password — Zippay" },
      { property: "og:description", content: "Set a new password to regain access to Zippay." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase parses the recovery hash automatically and fires PASSWORD_RECOVERY.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated");
    navigate({ to: "/auth" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-deep px-4 py-12 font-manrope text-off-white">
      <div className="w-full max-w-md">
        <Link to="/" className="mx-auto mb-8 flex items-center justify-center">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-off-white text-2xl font-bold text-navy-deep">
            +
          </div>
        </Link>
        <h1 className="text-center font-sora text-3xl font-semibold">Set a new password</h1>
        <p className="mt-2 text-center text-sm text-off-white/60">
          {ready ? "Choose a strong password to secure your account" : "Verifying your reset link…"}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-3">
          <input
            type="password"
            required
            minLength={6}
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!ready}
            className="h-12 w-full rounded-full border border-off-white/15 bg-navy-mid/40 px-5 text-sm text-off-white placeholder:text-off-white/40 focus:border-blue-accent focus:outline-none focus:ring-2 focus:ring-blue-accent/40 disabled:opacity-50"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={!ready}
            className="h-12 w-full rounded-full border border-off-white/15 bg-navy-mid/40 px-5 text-sm text-off-white placeholder:text-off-white/40 focus:border-blue-accent focus:outline-none focus:ring-2 focus:ring-blue-accent/40 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !ready}
            className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-blue-accent text-sm font-semibold text-off-white transition-colors hover:bg-blue-accent/90 disabled:opacity-50"
          >
            {loading ? "Updating…" : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}
