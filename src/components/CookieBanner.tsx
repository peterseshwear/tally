import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type Prefs = { necessary: true; functional: boolean; analytics: boolean; marketing: boolean };
const STORAGE_KEY = "tally-cookie-consent-v1";

function load(): Prefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Prefs) : null;
  } catch {
    return null;
  }
}
function save(prefs: Prefs) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* noop */
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [center, setCenter] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const existing = load();
    if (!existing) {
      // Delay slightly so it doesn't compete with hero paint.
      const t = setTimeout(() => setVisible(true), 700);
      return () => clearTimeout(t);
    }
    setPrefs(existing);
  }, []);

  const acceptAll = () => {
    const next: Prefs = { necessary: true, functional: true, analytics: true, marketing: true };
    save(next);
    setPrefs(next);
    setVisible(false);
  };
  const rejectOptional = () => {
    const next: Prefs = { necessary: true, functional: false, analytics: false, marketing: false };
    save(next);
    setPrefs(next);
    setVisible(false);
  };
  const savePrefs = () => {
    save(prefs);
    setVisible(false);
    setCenter(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6 print:hidden">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)]">
        {!center ? (
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
            <div>
              <p className="font-sora text-sm font-semibold text-[#111111]">
                We use cookies to improve your experience
              </p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-[#4B5563]">
                Some cookies are strictly necessary to operate Tally. Others help us understand
                product usage and improve the platform. Read our{" "}
                <Link
                  to="/legal/cookies"
                  className="font-medium text-[#2563EB] underline-offset-2 hover:underline"
                >
                  Cookie Policy
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
              <button
                onClick={rejectOptional}
                className="rounded-full border border-[#EAEAEA] px-4 py-2 text-xs font-medium text-[#111111] transition-colors hover:bg-[#F5F6F7]"
              >
                Reject optional
              </button>
              <button
                onClick={() => setCenter(true)}
                className="rounded-full border border-[#EAEAEA] px-4 py-2 text-xs font-medium text-[#111111] transition-colors hover:bg-[#F5F6F7]"
              >
                Manage preferences
              </button>
              <button
                onClick={acceptAll}
                className="rounded-full bg-[#111111] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-black/85"
              >
                Accept all
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-sora text-base font-semibold text-[#111111]">
                  Cookie preferences
                </p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-[#4B5563]">
                  Choose which categories of cookies you allow. You can change this at any time from
                  the footer.
                </p>
              </div>
              <button
                onClick={() => setCenter(false)}
                className="rounded-md p-1 text-[#6B7280] hover:bg-[#F5F6F7]"
                aria-label="Close preferences"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 divide-y divide-[#EAEAEA] rounded-xl border border-[#EAEAEA]">
              <Row
                title="Necessary"
                desc="Required for authentication, security and core platform functions. Always on."
                checked
                disabled
              />
              <Row
                title="Functional"
                desc="Remember preferences such as language and layout choices to improve your experience."
                checked={prefs.functional}
                onChange={(v) => setPrefs({ ...prefs, functional: v })}
              />
              <Row
                title="Analytics"
                desc="Aggregate, anonymized usage data that helps us understand how Tally is used and improve it."
                checked={prefs.analytics}
                onChange={(v) => setPrefs({ ...prefs, analytics: v })}
              />
              <Row
                title="Marketing"
                desc="Used to measure the effectiveness of campaigns and show more relevant content."
                checked={prefs.marketing}
                onChange={(v) => setPrefs({ ...prefs, marketing: v })}
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
              <button
                onClick={rejectOptional}
                className="rounded-full border border-[#EAEAEA] px-4 py-2 text-xs font-medium text-[#111111] transition-colors hover:bg-[#F5F6F7]"
              >
                Reject optional
              </button>
              <button
                onClick={savePrefs}
                className="rounded-full bg-[#111111] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-black/85"
              >
                Save preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({
  title,
  desc,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 p-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#111111]">{title}</p>
        <p className="mt-0.5 text-[13px] leading-relaxed text-[#6B7280]">{desc}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={`Toggle ${title} cookies`}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          checked ? "bg-[#111111]" : "bg-[#E5E7EB]"
        } ${disabled ? "opacity-60" : ""}`}
      >
        <span
          className={`inline-block size-5 transform rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
