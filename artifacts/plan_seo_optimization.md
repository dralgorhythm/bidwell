# Plan: Comprehensive SEO Update — Twin Cities Software Consulting

**Status**: PR1 (technical foundation) implemented · PR2 (content & IA) planned
**Date**: 2026-07-21
**Goal**: Rank bidwell.info for the Minneapolis–St. Paul software-consulting market using on-site work only — no new tools, accounts, or services (GA4/Search Console deferred).

## Context

The site returned from a months-long outage (domain reclaimed 2026-07-21, see
`postmortem_site_outage_2026-07.md`) with zero geographic signals — schema said
`areaServed: 'Worldwide'`, `occupationLocation: 'Remote'` — and technical-SEO defects
suppressing indexing sitewide:

- The root layout hardcoded `<link rel="canonical" href="https://bidwell.info">` on
  **every** route, telling Google all sub-pages were duplicates of the homepage.
- 12 coming-soon experiment stubs shared one inherited title/description, indexable
  and sitemapped; `/career-guidance` — the only sales page — was absent from the sitemap.
- robots.txt blocked `/_next/` (starving Google's renderer) and all AI crawlers.
- Blog JSON-LD carried a wrong domain and a publish date regenerated every build.
- One OG card served every page; the `?title=` param was ignored.

## Decisions (locked with owner)

| Decision | Choice |
|---|---|
| Location disclosure | "Minneapolis, MN" + "serving the Twin Cities metro" — no street address |
| Contact email | `jordan@bidwell.info` (Namecheap forwarding alias; published only after the alias exists — isolated final PR2 commit) |
| Service pages | software-consulting, ai-consulting, engineering-practice-improvement + career coaching nested as `/services/career-coaching` (moved from `/career-guidance`) |
| AI crawlers | Unblock all — AI answers are a discovery channel |
| New dependency | `schema-dts` (dev-only, typed JSON-LD); rejected next-sitemap/next-seo/feed |

## PR1 — Technical foundation (this PR)

1. **`lib/site-config.ts`** — dependency-free single source of truth (name, origin,
   email, founder, location); all `baseUrl` importers migrated; tsx-executed
   health-check script unaffected.
2. **Typed structured data** (`lib/structured-data.ts` + `JsonLd` renderer):
   `@id`-linked entity graph — ProfessionalService (city-level Minneapolis address,
   Twin Cities areaServed), Person (Jordan Winters, Minneapolis), WebSite (SearchAction
   removed), plus blogPosting/faq/service/breadcrumb builders. FAQPage live on
   career-guidance. schema-dts caught `serviceType` being invalid on Organization.
3. **Blog integrity** — `posts.ts` registry with the true publish date (2025-11-27);
   valid article metadata; entity-linked JSON-LD; breadcrumb on the post.
4. **Canonicals** — hardcoded layout canonical removed; every page declares a relative
   self-canonical; 12 stubs get registry-driven unique metadata + noindex;
   `metadata-policy.test.ts` globs all pages and enforces completeness + uniqueness forever.
5. **robots/sitemap** — all crawlers allowed; sitemap lists only indexable pages
   (+career-guidance, −stubs), no fabricated lastModified; health-check contract
   (`url` absolute + numeric `priority`) test-guarded.
6. **OG images** — per-route `opengraph-image.tsx` (build-time ImageResponse, verified
   under `output: 'export'`); `/og` route deleted; `twitter:card` global; `e2e/seo.spec.ts`
   asserts the rendered export.
7. **Hygiene** — placeholder verification tokens removed; icons regenerated as real PNGs
   (512/180, were 376 KB JPEGs masquerading as .png); manifest icon refs fixed; viewport
   moved to the `viewport` export.

## PR2 — Content & information architecture (planned)

**Static-redirect pattern**: `lib/redirects.ts` map + a stub page emitting
`<meta http-equiv="refresh" content="0;url=…">` with canonical → destination.
`/career-guidance` → `/services/career-coaching`; stub never sitemapped or linked.

**Keyword → page map** (title template `%s | Bidwell Consulting`):

| Page | Primary query | Title | H1 |
|---|---|---|---|
| `/` | software consulting twin cities | Twin Cities Software Consulting | Software Consulting in the Twin Cities |
| `/services` | software consulting services minneapolis | Software & AI Consulting Services | Consulting Services |
| `/services/software-consulting` | software consultant minneapolis | Software Consulting in Minneapolis | Software Consulting in Minneapolis |
| `/services/ai-consulting` | ai consulting minneapolis | AI Consulting in Minneapolis | AI Consulting & Agent Engineering |
| `/services/engineering-practice-improvement` | engineering process improvement consultant | Engineering Practice Improvement | Engineering Practice Improvement Consulting |
| `/services/career-coaching` | tech career coach minneapolis | Tech Career Coaching in Minneapolis | Tech Career Coaching |
| `/about` | jordan winters consultant | About Jordan Winters | About Jordan Winters |
| `/contact` | (navigational) | Contact | Contact |
| `/blog/agent-coordination` | coordinating ai coding agents | Coordinating AI Coding Agents | Agent Coordination Structure (unchanged) |

Modifier split: home owns *Twin Cities*; software-consulting owns *Minneapolis*.

**Per page**: 600–900 words of distinct copy, one distinct-angle local paragraph, 5-6
real-search FAQs with `faqSchema`, `serviceSchema`, breadcrumb, own OG image, colocated
test (structure + metadata + a11y + link safety), sitemap entry in the same PR.
Nav becomes `home, services, coaching, blog, about, contact`; footer gains three link
columns + one NAP line (`Bidwell Consulting · Minneapolis, MN · Serving the Twin Cities
metro`). Discovery surfaces: `public/llms.txt` + hand-rolled `/rss.xml`.
Root default title/description and all positioning strings change here (kept out of PR1
to avoid a title↔content mismatch window).

**Content roadmap** (future posts): Twin Cities teams adopting AI coding agents ·
consultant cost/engagement models · consultant vs agency vs fractional CTO · legacy
modernization for MN manufacturers/med-device · changing tech jobs in the Twin Cities.

## Guardrails

No suburb doorway pages · no keyword-stuffed footers · **no fake reviews or
aggregateRating schema** · no "we/our team" plurality (solo voice is the trust asset) ·
no geo-modifier in every H1 · no thin near-duplicate service pages · no exact-match
anchor repetition · no further URL moves after career-coaching · no fabricated
credentials (claims: ~20 years, practice-improvement leadership, the essay/repo).

## Verification

Per commit `npm run qa`; per PR `npm run qa:full` + `npm run test:e2e` (SEO spec runs
against the real export). Post-deploy: health-check workflow (sitemap-derived), spot
`curl -s https://bidwell.info | grep canonical`, Lighthouse gate ≥ 90. Rich-results and
schema validation against the live site once deployed.
