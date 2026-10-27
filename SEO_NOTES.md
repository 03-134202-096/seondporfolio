# SEO & UI Polish — Change Log and Setup Steps

**Project:** DeepDivers (`deepdivers.services`)
**Stack detected:** Next.js 16 (App Router) + React 19
**Date:** October 2026

This document records (1) every SEO and UI improvement applied and (2) the
exact steps for the owner to finish the deployment and verify everything in
Google Search Console / Bing Webmaster Tools / Yandex Webmaster.

---

## 1. Summary of What Changed

### SEO improvements

| Area | File | Change |
|---|---|---|
| Root metadata | `src/app/layout.tsx` | Expanded keyword set (now ~90 targeted phrases across research, data, ML/AI, LaTeX, dev, platform-targeted terms), stronger `title`/`description`, extended `openGraph`, added `twitter.site`, added `applicationName`, added `shortcut` icon, added `icons.icon` for 192 + 512 PNG sizes. |
| Viewport & theme | `src/app/layout.tsx` | New `export const viewport` with correct mobile viewport, light + dark `themeColor` meta, `colorScheme`, `viewportFit`. Required for correct PWA / mobile Safari behavior and Core Web Vitals. |
| Head preloads | `src/app/layout.tsx` | `<link rel="preconnect">` for Google Fonts, `dns-prefetch` for GA, `<link rel="preload">` for `landingIntro.webp` (LCP image). Improves LCP in Lighthouse. |
| Verification | `src/app/layout.tsx` | Added commented placeholders for Google, Bing, Yandex, Facebook domain verification — ready to uncomment and fill in. |
| Social metadata | `src/app/layout.tsx` | `other` block adds `msapplication-TileColor/Image`, `apple-mobile-web-app-*`, `mobile-web-app-capable`, `og:locale:alternate` for en_GB/IN/CA/AU. |
| RSS discovery | `src/app/layout.tsx` | `alternates.types["application/rss+xml"]` points to `/blog/rss.xml`. |
| Accessibility | `src/app/layout.tsx` | Added skip-link `<a href="#hero" class="skip-link">`. Required for WCAG 2.4.1 and improves Lighthouse accessibility. |
| Sitemap | `src/app/sitemap.ts` | Dynamic `lastModified` (fresh on every build), per-URL `images` array (home, about, blog cover images) — enables Google Image Search indexing, home now includes 3 primary images. |
| robots.txt | `src/app/robots.ts` | Explicit `Googlebot`, `Googlebot-Image`, `Bingbot` rules; blocked AI-training scrapers (GPTBot, ChatGPT-User, CCBot, anthropic-ai, ClaudeBot, PerplexityBot, Google-Extended) to protect proprietary catalog content; added `host`. |
| Blog RSS feed | `src/app/blog/rss.xml/route.ts` *(new)* | RSS 2.0 feed with `content:encoded`, auto-escaped XML, revalidated hourly, discoverable via the `<link rel="alternate">` the layout now advertises. |

**What was already strong (kept intact):**
- Rich JSON-LD graph: Organization, LocalBusiness, ProfessionalService, WebSite with `SearchAction`, BreadcrumbList, FAQPage, HowTo, Product + reviews, ItemList of services, WebPage, Article (per blog post), Person (about page) — this is excellent coverage.
- Per-page `Metadata` exports on `/about`, `/blog`, `/blog/[slug]`, `/terms` with unique titles, descriptions, and canonicals.
- `next.config.ts` already sets security headers (HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy), AVIF/WebP image formats, and 1-year caching for static assets.
- `manifest.json` is well-formed with maskable icons.

### UI / Visual polish

| Area | File | Change |
|---|---|---|
| Design tokens | `src/app/globals.css` | Expanded CSS variables: new `--border-strong`, `--card-elevated`, `--accent-warm`, `--gradient-aurora`, `--shadow-brand`, `--shadow-ring`, `--radius-2xl`, `--ease-out-expo`. Light + dark versions. Tinted shadows for premium feel. |
| Typography | `src/app/globals.css` | H1 is now 800 weight with tighter `-0.035em` tracking (clamp up to 4.25rem); OpenType `font-feature-settings` enabled; `text-rendering: optimizeLegibility`. `prefers-reduced-motion` honoured globally. |
| Buttons | `src/app/globals.css` | `.btn-primary` now uses 3-stop brand gradient with a soft inner highlight on hover, deeper brand-tinted shadow, better focus ring (`--shadow-ring`). `.btn-secondary` picks up a blur backdrop. |
| Accessibility | `src/app/globals.css` | `:focus-visible` fallback for every element, `.skip-link` style, `::selection` tinted. |
| Utilities | `src/app/globals.css` | New `.card-elite` with animated gradient border on hover, `.grain` for subtle SVG noise overlay. |
| Hero | `src/components/Hero/Hero.module.css` | Multi-layer aurora gradient background (3 radial gradients + base), subtle grid lattice with mask fade, animated conic gradient halo behind portrait, floating cards gained glass blur (`backdrop-filter`), portrait gets brand-tinted shadow, headline + description get staggered fade-in. |
| Service catalog | `src/components/ServiceCatalog/ServiceCatalog.module.css` | Service cards gain gradient top-edge accent on hover + radial glow + brand-tinted shadow + stronger lift. Popular tag redesigned as a top-flag with gold shadow and star icon. Category tabs: active state uses brand gradient + brand-tinted shadow; hover gets subtle lift. Search input: softer border with ring focus. Order button: gradient hover with brand shadow. Catalog CTA: elevated with aurora wash. |
| Header | `src/components/Header/Header.module.css` | Stronger glass (`backdrop-filter: saturate(180%) blur(16px)`), scrolled state darkens background + adds soft brand shadow, logo rotates subtly on hover, nav underline grows from center with gradient. |
| Footer | `src/components/Footer/Footer.module.css` | Aurora wash background (blue + teal radial gradients on secondary dark), thin brand-gradient top border, social links now use glass base with brand gradient on hover + lift + shadow. |

### Why these UI changes elevate the "look"

- **Depth and hierarchy** — multi-layer radial gradients and tinted shadows read as premium instead of flat. The eye naturally follows depth.
- **Micro-interactions** — gradient hovers, directional underline growth, logo rotation, card lift are small-but-consistent cues used by Apple, Linear, Stripe.
- **Typography** — tighter display tracking (-0.035em on H1), 800 weight, and OpenType stylistic features (`ss01`, `cv02`) are the single biggest "it looks expensive" signal.
- **Glassmorphism, used sparingly** — only on the header and the floating hero cards, where it reinforces hierarchy without becoming a trend-driven gimmick.
- **Accessibility stays strong** — all changes respect `prefers-reduced-motion` and `prefers-color-scheme`, use `:focus-visible` rings, and the skip-link is now in place.

### Keywords targeted (derived from the actual service catalog)

Primary clusters:
1. **Research writing** — research paper writing services, Q1 journal paper writing, systematic review, PRISMA, manuscript formatting, thesis writing help.
2. **Editing / formatting** — LaTeX IEEE/Springer/Elsevier, Overleaf, copyediting, proofreading, APA/MLA/Chicago citation, humanizing AI text.
3. **Data / AI / ML** — SPSS analysis, R programming, Python data analysis, YOLO training, vision transformer, GAT, radiomics, medical AI cancer detection, GPU experiment execution, hyperparameter tuning, computer vision.
4. **Web / infra** — Next.js developer, Nest.js backend, AWS ECS/S3/ElastiCache, web scraping Scrapy/BeautifulSoup/Selenium, API development.
5. **Platform-targeted** — Upwork data scientist, Fiverr research writer, freelance AI developer, DeepDivers services, Asad Farooq researcher.

---

## 2. Google Search Console setup — step-by-step

> Do this once the site is deployed to `https://deepdivers.services`.

### Step 1 — Add the property

1. Go to <https://search.google.com/search-console>.
2. Click **Add property** → choose **URL prefix**.
3. Enter: `https://deepdivers.services` (note the `https://`, no trailing slash).

### Step 2 — Verify ownership

Pick **HTML tag** verification (fastest with this stack):

1. Google will show a line like:
   `<meta name="google-site-verification" content="ABC123..." />`
2. Copy the `content` value only (not the whole tag).
3. Open `src/app/layout.tsx`, find the `verification` block, and uncomment + set:
   ```ts
   verification: {
     google: "ABC123...",
   },
   ```
4. Commit, deploy to Vercel, then click **Verify** in Search Console.

Alternative verification methods also supported:
- **DNS TXT record** — add a TXT at your domain's DNS. Works regardless of hosting.
- **HTML file** — drop a file into `/public/`. Also fine.

### Step 3 — Submit the sitemap

1. In Search Console → **Sitemaps** (left nav).
2. Enter: `sitemap.xml` and click **Submit**.
3. The full URL submitted will be `https://deepdivers.services/sitemap.xml` — Next.js generates it automatically from `src/app/sitemap.ts`.
4. Verify it shows **Success** within 24 hours (large sites can take longer).

### Step 4 — Submit the RSS feed (optional but recommended)

In Search Console → **Sitemaps**, you can also submit `blog/rss.xml` as an additional feed. Google uses RSS as a secondary freshness signal.

### Step 5 — Request indexing for key pages

For each page below, use **URL Inspection** → **Request Indexing**:
- `https://deepdivers.services/`
- `https://deepdivers.services/about`
- `https://deepdivers.services/blog`
- Each blog post URL you want prioritized

> This nudges Google to crawl them within 1–2 days instead of waiting weeks.

### Step 6 — Verify rich results

Use the **Rich Results Test**: <https://search.google.com/test/rich-results>

Paste `https://deepdivers.services/` and confirm Google detects:
- Organization
- LocalBusiness / ProfessionalService
- FAQPage (should show "Eligible for FAQ enhancement")
- Product with Reviews (star-rating snippet eligibility)
- BreadcrumbList
- HowTo

For blog posts, confirm `Article` is detected.

### Step 7 — Core Web Vitals

In Search Console → **Core Web Vitals**. Expect green within a few days of real traffic.
If a URL is flagged, check <https://pagespeed.web.dev/> for the fix list.

---

## 3. Bing Webmaster Tools (recommended)

1. Go to <https://www.bing.com/webmasters>.
2. **Add a site** → paste `https://deepdivers.services`.
3. The fastest path: **Import from Google Search Console** (requires GSC to be set up first; takes one click).
4. Otherwise verify via HTML tag — add the `msvalidate.01` value to the `verification.other` block in `src/app/layout.tsx`:
   ```ts
   verification: {
     google: "...",
     other: {
       "msvalidate.01": "YOUR_BING_CODE",
     },
   },
   ```
5. Submit the sitemap at **Sitemaps** → `sitemap.xml`.

Bing powers DuckDuckGo, Yahoo, Ecosia, and the Microsoft Edge default — meaningful share of search.

---

## 4. Yandex Webmaster (optional — for Russia/CIS traffic)

1. <https://webmaster.yandex.com> → **Add site**.
2. Verify via meta tag — add `yandex-verification` to `verification.other` (same pattern as above).
3. Submit `sitemap.xml`.

---

## 5. Google Business Profile (big for local SEO)

The site has `LocalBusiness` schema with the Islamabad address. To rank in "research services near me" / Google Maps:

1. Go to <https://business.google.com> → sign in.
2. **Add your business** → use the exact business name: **DeepDivers**.
3. Address: `Street 30, House 40B, F-8, Islamabad, Pakistan` (match the schema).
4. Category: `Research service` (closest match available).
5. Phone: `+92 312 5065538`.
6. Website: `https://deepdivers.services`.
7. Verify by postcard, phone, or email (Google will offer whichever works for your address).

Local SEO benefit is substantial — Google Maps + the local "3-pack" show above organic results for geo-targeted searches.

---

## 6. Social & citation signals (worth 1 hour)

Links from these profiles back to the site are DA signals Google reads:

- **Google Scholar** — already linked in `aboutme.md` (`4TMJnYEAAAAJ`). Add `https://deepdivers.services` to the author profile.
- **ORCID** `0009-0005-5090-159X` — add the site in your biography.
- **LinkedIn** — add the site to the Experience/Featured section.
- **GitHub profile** (`03-134202-096`) — add the site to the profile README.
- **Fiverr / Upwork / Freelancer profiles** — these are already in the Organization JSON-LD `sameAs` array. If the actual URLs differ, update `src/app/layout.tsx` (`sameAs` is used three times — top-level, LocalBusiness, ProfessionalService).

---

## 7. Deployment / build checklist

Before shipping:

```bash
pnpm install
pnpm run build
pnpm run start   # smoke-test the production bundle
```

Then on Vercel (or wherever you deploy):
- Set environment variable `NEXT_PUBLIC_GA_MEASUREMENT_ID` to your GA4 ID (`G-XXXXXXX`) — the layout wires it up conditionally.
- Confirm `https://deepdivers.services/sitemap.xml` returns XML.
- Confirm `https://deepdivers.services/robots.txt` returns the programmatic rules.
- Confirm `https://deepdivers.services/blog/rss.xml` returns valid RSS 2.0.
- Run a Lighthouse audit (Chrome DevTools → Lighthouse → Performance + SEO + Accessibility). Target: 90+ on all three.

---

## 8. Content SEO (ongoing — biggest ranking lever)

The structural work is done. Rankings now depend on **content velocity**:

1. **Publish one blog post per week** targeting specific long-tail keywords. The RSS feed will pick them up automatically.
2. Each post should target one primary keyword + 3–5 LSI keywords, be 1,500+ words, and include at least one original image.
3. Internal link from new posts back to the service catalog (anchor text = the keyword).
4. **Case studies** convert catalog traffic — add a case study page per high-value service (e.g., "How We Published a Q1 Paper in 6 Weeks"). Each is a new indexed URL with its own targeting.
5. **Testimonials** — the Review schema is already in place. More real reviews (with Person name + date) = more rich-result real estate.

---

## 9. Fast reference — files touched

```
src/app/layout.tsx                              (SEO + accessibility + preloads)
src/app/sitemap.ts                              (dynamic + images)
src/app/robots.ts                               (bot-specific rules + AI blocklist)
src/app/globals.css                             (design tokens + typography + utilities)
src/app/blog/rss.xml/route.ts                   (NEW — RSS 2.0 feed)
src/components/Hero/Hero.module.css             (aurora bg, animated halo, glass cards)
src/components/Header/Header.module.css         (stronger glass, directional underline)
src/components/Footer/Footer.module.css         (aurora wash, polished socials)
src/components/ServiceCatalog/ServiceCatalog.module.css  (elite cards, popular tag, gradient tabs)
```

No content, no copy, no component structure was removed. Every change is additive and themeable.

---

_Last updated: 2026-10-27_
