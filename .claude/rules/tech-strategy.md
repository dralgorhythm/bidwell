# Tech Strategy - Golden Paths (Bidwell Consulting Website)

This is the **SINGLE SOURCE OF TRUTH** for technology choices in this repository.

This repo is a statically exported marketing/portfolio site (bidwell.info). It has one
golden path — there is no backend, no database, and no multi-language surface. Stacks
not listed here (Python, Go, Rust, mobile, etc.) are out of scope for this repo.

## Compliance

1. **Follow This File**: Use the technologies listed in the Golden Paths below
2. **No Deviations**: Do not suggest alternatives unless explicitly instructed
3. **Latest Stable**: Always use the latest stable version unless pinned in `package.json`

## Golden Path — TypeScript / Next.js Static Site

| Component | Choice |
|-----------|--------|
| Runtime | Node.js 24 (pinned via `.nvmrc`) |
| Package Manager | npm (`package-lock.json` is the committed lockfile; `.npmrc` sets `legacy-peer-deps`) |
| Framework | Next.js 16, App Router, `output: 'export'` (static export — no server runtime) |
| UI | React 19 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/postcss`), Geist font |
| Types & Validation | TypeScript (strict, `tsc --noEmit` for checks), Zod |
| Hygiene | Biome (lint + format — single quotes, semicolons as needed; config in `biome.json`) |
| Unit Testing | Vitest + Testing Library (jsdom), `vitest-axe` for a11y assertions |
| E2E Testing | Playwright |
| Images | `next-image-export-optimizer` (build-time optimization for static export) |
| Bundle Analysis | `@next/bundle-analyzer` (`npm run analyze`) |

Deliberate divergences from the framework's generic defaults, do not "fix" these:

- **npm, not pnpm** — CI, Dependabot, and the committed lockfile all use npm.
- **Next.js build, not Vite** — Vite appears only as Vitest's test-runner plumbing
  (`@vitejs/plugin-react`), never as the app build tool.
- **Static export only** — never add server actions, API routes, ISR, or middleware
  that require a Node server; GitHub Pages serves plain files.

## Infrastructure

| Component | Choice |
|-----------|--------|
| Hosting | GitHub Pages (static tier — maximum performance, zero maintenance) |
| Domain | bidwell.info (see `artifacts/postmortem_site_outage_2026-07.md` for domain/Pages recovery runbook) |
| Secrets | GitHub Secrets (CI only — the site itself ships no secrets) |

## CI/CD

| Component | Choice |
|-----------|--------|
| Platform | GitHub Actions (`.github/workflows/`: `deploy.yml`, `pull-request.yml`, `health-check.yml`) |
| Deploy | Push to `main` → build → deploy to GitHub Pages |
| Dependency Safety | `audit-ci`, Dependabot |

## Quality Gates

All merges to `main` must pass: `npm run type-check`, `npm run lint`,
`npm run test:quick`, and `npm run build` (`npm run qa:full` runs the full set).
