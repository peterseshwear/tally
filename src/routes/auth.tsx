import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Sign in — Zippay" },
      { name: "description", content: "Sign in or create your Zippay merchant account." },
      { property: "og:title", content: "Sign in — Zippay" },
      { property: "og:description", content: "Access your Zippay merchant dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

type Mode = "signin" | "signup" | "forgot";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already signed in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/app" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) navigate({ to: "/app" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function handleGoogle() {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/auth",
    });
    if (result.error) {
      toast.error(result.error.message || "Google sign-in failed");
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/app" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + "/auth",
            data: { full_name: fullName, company_name: company },
          },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + "/reset-password",
        });
        if (error) throw error;
        toast.success("Password reset link sent");
        setMode("signin");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-deep px-4 py-12 font-manrope text-off-white">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="mx-auto mb-8 flex items-center justify-center">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-off-white text-2xl font-bold text-navy-deep">
            +
          </div>
        </Link>

        <div className="text-center">
          <h1 className="font-sora text-3xl font-semibold tracking-tight">
            {mode === "signin" && "Welcome back"}
            {mode === "signup" && "Create your account"}
            {mode === "forgot" && "Reset your password"}
          </h1>
          <p className="mt-2 text-sm text-off-white/60">
            {mode === "signin" && "Please enter your details to sign in"}
            {mode === "signup" && "Start accepting payments in minutes"}
            {mode === "forgot" && "We'll send you a link to reset it"}
          </p>
        </div>

        {mode !== "forgot" && (
          <div className="mt-8 space-y-3">
            <button
              onClick={handleGoogle}
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-off-white/15 bg-navy-mid/40 text-sm font-medium text-off-white transition-colors hover:bg-navy-mid/70 disabled:opacity-50"
            >
              <GoogleIcon />
              Continue with Google
            </button>
            <button
              disabled
              title="Coming soon"
              className="flex h-12 w-full cursor-not-allowed items-center justify-center gap-3 rounded-full border border-off-white/15 bg-navy-mid/40 text-sm font-medium text-off-white/50"
            >
              <XIcon />
              Continue with X
              <span className="ml-2 rounded-full bg-off-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider">
                Soon
              </span>
            </button>

            <div className="flex items-center gap-3 pt-2 text-xs uppercase tracking-widest text-off-white/40">
              <div className="h-px flex-1 bg-off-white/15" />
              or
              <div className="h-px flex-1 bg-off-white/15" />
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          {mode === "signup" && (
            <>
              <Input
                placeholder="Full name"
                value={fullName}
                onChange={(v) => setFullName(v)}
                required
              />
              <Input placeholder="Company name" value={company} onChange={(v) => setCompany(v)} />
            </>
          )}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(v) => setEmail(v)}
            required
            autoComplete="email"
          />
          {mode !== "forgot" && (
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(v) => setPassword(v)}
              required
              minLength={6}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
            />
          )}

          {mode === "signin" && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="text-xs text-off-white/70 underline-offset-4 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-blue-accent text-sm font-semibold text-off-white transition-colors hover:bg-blue-accent/90 disabled:opacity-50"
          >
            {loading
              ? "Please wait…"
              : mode === "signin"
                ? "Continue with Email"
                : mode === "signup"
                  ? "Create account"
                  : "Send reset link"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-off-white/60">
          {mode === "signin" && (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-off-white underline underline-offset-4"
              >
                Sign Up
              </button>
            </>
          )}
          {mode === "signup" && (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("signin")}
                className="text-off-white underline underline-offset-4"
              >
                Sign in
              </button>
            </>
          )}
          {mode === "forgot" && (
            <button
              onClick={() => setMode("signin")}
              className="text-off-white underline underline-offset-4"
            >
              Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({
  value,
  onChange,
  ...rest
}: {
  value: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-12 w-full rounded-full border border-off-white/15 bg-navy-mid/40 px-5 text-sm text-off-white placeholder:text-off-white/40 focus:border-blue-accent focus:outline-none focus:ring-2 focus:ring-blue-accent/40"
      {...rest}
    />
  );
}

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}
