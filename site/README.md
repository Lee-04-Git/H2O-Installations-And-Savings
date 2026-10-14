# H2O Installations And Savings Cape Town — website

React 19 + TypeScript + Vite, styled with Tailwind CSS v4, animated with Framer Motion, smooth-scrolled with Lenis.

Adapted from an existing site build: the layout, type and motion system are documented in [`design-system/MASTER.md`](design-system/MASTER.md). Colours come from the H2O logo (petrol blue, teal, water aqua).

```bash
npm install
npm run dev      # local development
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```

## Deploying (Vercel)

The site deploys to **Vercel** from the GitHub repo. Everything Vercel needs is in `vercel.json` (framework, install/build commands, `dist` output, page routing so `/about` etc. work on refresh, caching and security headers).

1. In Vercel: **Add New → Project → import** `Lee-04-Git/H2O-Installations-And-Savings`.
2. Set **Root Directory** to `site` (the website lives in this subfolder). Leave the other build settings as detected — `vercel.json` supplies them.
3. **Deploy.** Every push to `main` redeploys automatically; other branches get preview URLs.
4. Add the custom domain under **Project → Settings → Domains**, then redeploy once so the address is baked into the build.

### Site address

Link-preview images (WhatsApp, Facebook, LinkedIn), the business's structured data for Google, canonical URLs and `sitemap.xml` need the site's full address. On Vercel this is automatic: the build uses the project's production address — the custom domain once attached, otherwise `*.vercel.app`. To force a specific address, set `VITE_SITE_URL` (with `https://`, no trailing slash) in **Project → Settings → Environment Variables** or in `site/.env`.

After the domain is live, submit `https://<domain>/sitemap.xml` in Google Search Console.

## Where things live

| What | Where |
| --- | --- |
| Contact details, services, reviews, tips, Our Work entries | `src/data/site.ts` |
| Design tokens (colour, type, radii, shadows) | `src/index.css` (`@theme`) |
| Pages: Home, About, Services, Our Work, Contact, 404 | `src/pages/*` |
| Header, mobile menu, footer, page curtain, floating WhatsApp button | `src/components/layout/*` |
| Logo (compact on phones, full from 640px) | `src/components/ui/Logo.tsx`, `public/images/h2o-ripple-logo*.{webp,png}` |
| Favicons, web app manifest | `public/favicon*`, `public/apple-touch-icon.png`, `public/site.webmanifest` |
| robots.txt / sitemap.xml (generated at build) | `vite.config.ts` |
| Shared UI (buttons, reveals, polaroids, tip rail, CTA panel…) | `src/components/ui/*` |

## Content sources

- **Logo and favicon:** made from `assets/H2O Plumbing Water Ripple Logo.png` and `assets/h2O-favicon.png` (keep these — they're the sources).
- **Business details and the outdoor-pipework job photo** (`public/images/h2o-job-outdoor-pipe-wide.webp`): the business's Snupit profile; email and address also match its CIPC certificate.
- **Reviews:** Snupit profile reviews (About page) and Google reviews supplied by the client (Home page), quoted as written.
- **Other photos:** Pexels (free licence, no attribution required). Replace them with the business's own photos at the same paths when available.

## Contact form

The form validates inline and opens the visitor's own email app (or WhatsApp, if they choose it) with the enquiry filled in — nothing is sent from the site itself. To receive submissions server-side, swap `onSubmit` in `src/pages/Contact.tsx` for a form service (Formspree, Netlify Forms, etc.).

## QA scripts

Run against `npm run preview -- --port 5391` (they use `playwright-core` with a locally installed Chrome):
`scripts/shoot.mjs` (full-page screenshots), `scripts/sections.mjs` (viewport shot per section — use for the pinned tip rail), `scripts/interact.mjs` (nav, form, filter, mobile menu, reduced motion), `scripts/stuck.mjs` (reveals left hidden), `scripts/static-audit.mjs`, `scripts/perf.mjs`.
