# SyncUpAlarm marketing site

Hey Phil — this is the **Next.js** site for [syncupalarm.com](https://syncupalarm.com) (landing page, legal pages, and the **Journal** blog). Production runs on **Vercel**; you push code, Vercel builds and ships it.

---

## Quick setup

1. **Node.js** — use something recent (18+ or 20+ is fine).
2. Install deps and run locally:

```bash
npm install
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000).

Useful commands:

| Command        | What it does        |
|----------------|---------------------|
| `npm run dev`  | Local dev server    |
| `npm run build`| Production build (run before you assume something is fine) |
| `npm run lint` | ESLint              |
| `npm run format` | Prettier (writes files) |

---

## Where to change things

- **`app/`** — Pages and routes (App Router). Marketing stuff mostly lives under `app/(marketing)/`.
- **`components/`** — UI pieces (navbar, sections, blog markdown renderer, etc.).
- **`content/blog/*.md`** — Journal posts (Markdown + frontmatter). New file = new URL: `/blog/your-slug`.
- **`lib/constants.ts`** — Site name, nav links, App Store URLs, etc.
- **`public/`** — Static files (`llms.txt`, images, etc.).

Env reference: copy **`.env.example`** → **`.env.local`** if you need overrides (most local work does not).

---

## Deploy (Vercel)

1. Repo is connected to a **Vercel project** for this site (whoever owns the team did this once).
2. **Push to `main` (or merge a PR)** → Vercel runs `npm run build` and deploys to **production** (`syncupalarm.com` if that’s the production domain).
3. **Other branches / PRs** → **preview URLs** (Vercel comments on the PR or shows them in the Vercel dashboard).

If something breaks in prod, check the **Deployments** tab in Vercel for the failed build log.

---

## Google Analytics (GA4)

- **Dashboard**: [Google Analytics](https://analytics.google.com/) — open the property tied to this site.
- **Measurement ID** used by the app defaults to **`G-TVH2BHSQ6E`** (see `lib/gtag.ts`). You can override with **`NEXT_PUBLIC_GA_MEASUREMENT_ID`** in Vercel env vars if that ever changes.
- Optional: **`NEXT_PUBLIC_GTM_ID`** loads Tag Manager instead of raw gtag; configure GA4 *inside* GTM so you don’t double-count (see `.env.example`).

---

## Brief context

- **Product**: SyncUpAlarm — partner alarm sync for iPhone (App Store links are in the site constants).
- **SEO / content playbook** (for humans): `docs/organic-seo-playbook.md`.
- **RSS**: `/rss.xml`. **Sitemap**: `/sitemap.xml`.

Questions or access issues (Vercel, GA, domain): ping whoever owns the SyncUpAlarm accounts.
