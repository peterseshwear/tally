# Project handoff summary — Zippay / peterseshwear/tally

## 0. Read this first — the repo's identity changed mid-history

This repo's GitHub name (`peterseshwear/tally`) and Vercel project name (`tally-theta-gold`) are **stale artifacts** from an earlier, unrelated project. Around commit `ed413a9` ("Replace project with Zippay Next.js template"), the entire codebase was **deliberately wiped and replaced** with a purchased shadcnblocks.com template called "Zippay" (a fintech/corporate-card marketing site), at the user's explicit request. The prior app (a payments product called "Tally," with Stripe + Supabase wiring, a custom onboarding flow, and a 21st.dev-sourced hero component) is **gone from the working tree** but fully recoverable via `git show ed413a9~1:<path>` if ever needed. Don't assume anything about "Tally" business logic exists — it doesn't, unless it was rebuilt after that commit (the auth system was rebuilt from scratch; see §4).

## 1. Where things live

- **Working directory**: `/Users/nesta/Documents/GitHub/tally/` — this is the live, git-connected clone. Work here.
- **GitHub**: `https://github.com/peterseshwear/tally.git`, branch `main`. No teammate activity observed recently, but a teammate (peterseshwear) does have push access — always `git fetch origin && git log --oneline main..origin/main` before pushing.
- **Vercel**: auto-deploys on push to `main` via the GitHub integration. Live URL: `https://tally-theta-gold.vercel.app`. Confirmed working (deployed and served the Zippay content) as of the Next.js-upgrade commit; not re-verified after the two most recent commits (WorldMap section, auth wiring) — worth a fresh check.
- **Also present on disk, likely irrelevant now**: `/Users/nesta/Desktop/zippay-nextjs-shadcnblocks/zippay-nextjs-template-1.0.0/` — the original extracted template zip, used only to test-drive the template before it was copied into the real repo. `/Users/nesta/Desktop/tally-main/` — an older, now-superseded local copy of the pre-replacement Tally app; not connected to anything current.

## 2. Stack & architecture

- **Next.js 15.5.22** (App Router), **React 19.2.x**, **TypeScript 5.9**, **Tailwind CSS v4** (CSS-first config: `@theme`, `@plugin`, `@custom-variant` inside `src/app/globals.css`, no `tailwind.config.js`).
- **`output: 'export'` in `next.config.ts` — this is a fully static site.** No server runtime on Vercel: no API routes, no Route Handlers with server logic, no middleware. Anything needing "server" behavior (auth callback, session checks) must be a client component that runs the logic in the browser. `next start` does **not** work here — to run a production build locally, `npm run build` then serve the `out/` folder (`npx serve out -l 3000`).
- **`npm run dev` deliberately omits `--turbopack`** (see `package.json`). Turbopack's CSS parser has a confirmed bug with this project's Tailwind v4 `@custom-variant`/`@plugin` syntax after the dependency upgrade (throws `CssSyntaxError: Unclosed block` on `globals.css`) — verified the exact same file parses fine through real PostCSS, and the webpack-based `next build` was never affected. Don't re-add `--turbopack` without re-testing.
- **MDX** via `@next/mdx` + `next-mdx-remote` v6 (`compileMDX`, called directly in `src/app/blog/[slug]/page.tsx` and `src/app/integrations/[slug]/page.tsx`). Content lives in `src/blog/*.mdx` and `src/integrations/*.mdx`.
- Package manager: npm (`package-lock.json`). Note: there's a persistent (harmless) Next.js warning about "multiple lockfiles" because a `package-lock.json` also exists one level up at `/Users/nesta/package-lock.json` — not this project's, never addressed, doesn't affect builds.

## 3. Folder structure

```
tally/
├── .env.example                  # documents required env vars (see §5)
├── next.config.ts                # output: 'export', @next/mdx wrapper
├── package.json
├── src/
│   ├── app/
│   │   ├── layout.tsx             # global: Banner, Navbar, ThemeProvider, Footer
│   │   ├── globals.css            # Tailwind v4 tokens; brand primary = #00E599 (oklch)
│   │   ├── page.tsx                # homepage — see §4 for section order
│   │   ├── about/ blog/ blog/[slug]/ contact/ cookie-policy/ faq/
│   │   │   feature1/ feature2/ integrations/ integrations/[slug]/
│   │   │   pricing/ privacy/ terms/            # marketing pages, mostly template-original
│   │   ├── login/page.tsx         # email/password + Google OAuth (rebuilt)
│   │   ├── signup/page.tsx        # email/password signup (rebuilt)
│   │   ├── dashboard/page.tsx     # post-auth landing (new, minimal)
│   │   └── auth/callback/page.tsx # OAuth code exchange, client-side (new)
│   ├── components/
│   │   ├── layout/                # banner.tsx, navbar.tsx, footer.tsx
│   │   ├── sections/               # Zippay*.tsx — homepage/marketing sections
│   │   │   └── zippay-world-map-section.tsx   # new, wraps ui/world-map.tsx
│   │   ├── ui/                     # shadcn-style primitives (button, input, card, ...)
│   │   │   └── world-map.tsx       # new — animated dotted world map
│   │   ├── theme-provider.tsx, theme-toggle.tsx
│   ├── lib/
│   │   ├── supabase/client.ts     # createBrowserClient() wrapper — the ONLY Supabase entry point
│   │   ├── blog.ts, integrations.ts   # MDX frontmatter loaders (fs-based, build-time)
│   │   ├── mdx.tsx                 # UNUSED dead code (getPost/getAllSlugs, never imported) — safe to delete, left alone so far
│   │   ├── utils.ts                # cn() helper (clsx + tailwind-merge)
│   │   └── animations/expense.ts
│   ├── blog/*.mdx, integrations/*.mdx   # content
│   └── types/
│       ├── post.ts
│       └── dotted-map.d.ts         # ambient module decl — dotted-map ships no types
└── public/
    ├── favicon/, fonts/satoshi/, icons/, images/{about,blog,faq,features,homepage,logos,pricing,solutions}/
```

Path alias: `@/*` → `./src/*`.

## 4. Auth system (built this session, from scratch)

The template's auth pages were **100% non-functional UI** (no `onClick`, no `@supabase/*` packages at all) until this session. Now wired with `@supabase/ssr` + `@supabase/supabase-js`:

- `src/lib/supabase/client.ts` — `createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)`. **This throws synchronously if either env var is missing/empty** — every call site wraps it in `try/catch` (see below); don't add a new call site without doing the same.
- `/login` — Google OAuth (`signInWithOAuth`) + email/password (`signInWithPassword`), both redirect to `/dashboard` on success.
- `/signup` — email/password only (Google/Twitter buttons present but **not wired** on this page). Validates passwords match + ≥6 chars client-side before calling `signUp()`. Redirects to `/dashboard` on success.
- `/dashboard` — client-side session check via `getSession()` + `onAuthStateChange()` (no server middleware possible, see §2). Three states: loading → "Confirm your email" (no session — e.g. pending email confirmation) → welcome + email + sign-out button (has session). **Currently just a shell — no real business data.** User said they want to test with a real account before deciding what dashboard content to add.
- `/auth/callback` — client-side page that reads `?code=` from the URL and calls `exchangeCodeForSession()`, then redirects to `/`.
- **Known gaps, not yet done**: Twitter OAuth button is a no-op on both `/login` and `/signup`. Google OAuth button is a no-op on `/signup` (only wired on `/login`).

## 5. Environment variables

Documented in `.env.example` (committed — note `.gitignore` has `.env*` then `!.env.example` to allow this one file through):
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```
**These are public-by-design (client-side) keys, safe to expose in the browser bundle — but I never confirmed they're actually set in the Vercel project's Environment Variables dashboard.** The user has a Supabase project already configured (Google provider, OAuth client ID/secret, callback URL, all done on the Supabase side, confirmed by the user in an earlier message) — but whether Vercel has the two `NEXT_PUBLIC_*` vars is unverified. **This is the top blocker if auth doesn't work in production** — ask the user to check Vercel → Project Settings → Environment Variables before debugging further.

No other secrets are used anywhere in this codebase (no Stripe, no service-role key — those belonged to the old, now-removed Tally app).

## 6. Security work done

- `next-mdx-remote` 5.0.0 → 6.0.0: fixed **CVE-2026-0969** (CVSS 8.8, RCE via untrusted MDX during SSR) — this was actively **blocking Vercel deployments**. No code changes needed; `compileMDX({ source, options, components })` API unchanged, and no MDX content here uses JS expressions in curly braces.
- `sharp` pinned to `0.35.3` via an explicit dependency + `"overrides"` in `package.json` — Next's own `optionalDependencies` was pinning a vulnerable `0.34.x`, and `next/image` is used across ~28 files.
- Deliberately **left alone**: a cluster of `npm audit` findings in ESLint/minimatch/brace-expansion (all devDependencies, never ship to the production bundle — confirmed this distinction matters because it's exactly why Vercel blocked `next-mdx-remote` specifically and not these). Fixing them means a major ESLint 9→10 bump — a real breaking-change migration, not attempted.
- Next.js itself was upgraded 15.1.1 → **15.5.22** (latest stable 15.x — intentionally *not* jumped to 16.x, per explicit instruction). `eslint-config-next` and `@next/mdx` bumped to match. All other deps updated to the latest version within their existing semver ranges only (no forced majors).

## 7. Conventions

- Homepage marketing sections are named `Zippay<Thing>` and live in `src/components/sections/`, each a self-contained default-exported component with sensible prop defaults (so they're usable standalone). Follow this pattern for new sections: tagline pill (`<span className="text-body-xs-medium bg-gray-0 ...">`) → `<h2 className="text-foreground text-heading-1 ...">` → `<p className="text-body-md ... text-gray-400">` → content.
- `src/components/ui/` is shadcn/ui-style: primitives only, no page-specific logic.
- **`next build` runs ESLint (via `next lint`, which is itself deprecated as of 15.x and slated for removal in 16 — a future migration to a plain ESLint CLI will eventually be needed) and fails the build on formatting violations** (prettier-plugin-tailwindcss enforces Tailwind class order too). After pasting in new/generated code, always run `npm run lint:fix` before `npm run build`, or the build will fail on things like import order and class order — this happened multiple times this session and is expected, not a sign of a real bug.
- TypeScript is strict. Packages without shipped types (e.g. `dotted-map`) get a hand-written ambient `.d.ts` in `src/types/`, not `@ts-ignore`.
- When adding a pasted/vendored component with an unfamiliar import (e.g. `framer-motion`), check `node_modules` first — this project resolves `framer-motion` transitively via `motion`, and that's the existing convention (four other files already `import ... from 'framer-motion'` directly), not a bug to "fix" by switching imports.
- Git commit messages in this repo are long-form and explain *why*, including what was verified — keep doing that; it's been the working style throughout.

## 8. A tooling gotcha worth knowing (not a code bug)

The browser-automation screenshot tool in this environment returns a **blank white image** for any scroll position beyond the first viewport height, on this specific site. Root cause: the template's `<body>` has a pre-existing `h-screen` (100vh) class (present since the original template, not introduced this session), which appears to confuse the screenshot tool's capture-region logic even though the real rendered page is fine (confirmed via `get_page_text`, DOM inspection, and reproducing the identical blank result on an untouched pre-existing section). **Don't conclude a component is broken just because a below-the-fold screenshot is blank** — verify via `get_page_text` / `javascript_tool` DOM queries (element counts, computed styles, `naturalWidth` on images) instead, and only trust screenshots for the first ~800px of a page.

## 9. Pending tasks / next priorities

1. **Confirm `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in Vercel**, then do a real end-to-end test of signup → email confirmation → login → dashboard on the live site (never possible locally — `createBrowserClient()` throws without real keys, by design).
2. Wire Twitter OAuth (or remove the button if not actually wanted) on `/login` and `/signup`.
3. Wire Google OAuth on `/signup` (currently only on `/login`).
4. Decide and build real `/dashboard` content — user explicitly deferred this until they can test with a real account.
5. Consider deleting the dead `src/lib/mdx.tsx` (unused `getPost`/`getAllSlugs`, superseded by `src/lib/blog.ts`).
6. Longer-term, low-priority: migrate off deprecated `next lint` before it's removed in Next 16; consider the ESLint 9→10 major-version cleanup if a fully clean `npm audit` is ever wanted.

## 10. Verification checklist to reuse for future changes

Every change this session went through: `npx tsc --noEmit` → `npm run lint:fix` if needed → `rm -rf .next out && npm run build` → serve `out/` with `npx serve out -l 3000` (since `next start` doesn't work under `output: 'export'`) → visual/DOM check in the Browser pane. Follow the same loop for consistency, and remember the local-Supabase-throws and blank-screenshot-below-fold caveats above so they don't get re-diagnosed as new bugs.
