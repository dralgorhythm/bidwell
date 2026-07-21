# Post-Mortem: bidwell.info Outage (detected 2026-07-21)

## Summary

The production site (https://bidwell.info) served GitHub's 404 page for an
extended period — every route, including the apex domain, the www subdomain,
and the underlying https://dralgorhythm.github.io/bidwell/ URL. Detected
2026-07-21 during a routine repository check; the outage began silently at an
unknown point after 2026-02-28.

## Root Cause

**GitHub Pages was disabled because the repository is private and the account
plan does not support GitHub Pages on private repositories.**

Confirmed by the Pages API, which rejects both deployments and configuration
updates with:

> `Page is disabled because current plan does not support private GitHub Pages` (HTTP 422)

When Pages was disabled, GitHub also removed the custom-domain binding
(`cname: null` in the Pages config), which is why bidwell.info 404s even
though DNS still points correctly at GitHub Pages
(A records 185.199.108–111.153, `www` CNAME to `dralgorhythm.github.io`).

The site last deployed successfully on 2025-12-08 and worked at that time, so
the repository visibility (or the account plan) changed sometime afterward.

## Contributing Causes

1. **No independent uptime monitoring.** The Post-Deploy Health Check workflow
   only ran via `workflow_run` after a deploy. With no deploys happening, an
   outage between deploys could never be detected. The site was down for
   months with zero signal.
2. **CI was red on `main` since December, halting all merges (and therefore
   all deploys).** PR #32 (career-guidance page) was merged on 2025-12-08 with
   a failing pipeline: its test suite asserted generated marketing copy that
   had been rewritten before merge, leaving 18 permanently failing tests on
   `main`. All three subsequent dependabot PRs inherited the failing test leg
   and could not go green.
3. **Merging with a red pipeline** (PR #32) established the broken baseline.
   No branch protection requires checks to pass before merge.

## Timeline

| Date | Event |
|------|-------|
| 2025-12-07/08 | PR #32 pipeline fails 3×; merged anyway. Deploy succeeds; site healthy. Failing tests now on `main`. |
| 2025-12-12 → 2026-02-28 | Dependabot PRs (#35 lodash-es, #36 next, #37 rollup) all fail the inherited test leg; nothing merges; no deploys. |
| After 2026-02-28 | Repo private / plan state disables GitHub Pages; custom domain binding removed; site 404s. Exact date unknown (no monitoring). |
| 2026-07-21 | Outage detected. Triage, CI fix, and monitoring added (PR #38). Redeploy blocked pending account-level decision. |

## Resolution

- **CI restored** (PR #38): career-guidance tests rewritten against the actual
  page content — structural assertions (headings, services, engagement
  options, FAQ, link safety, a11y via axe, metadata) instead of verbatim
  marketing copy. Full suite green: 189/189.
- **Weekly scheduled health check added** (PR #38): the health-check workflow
  now runs Mondays 08:00 UTC in addition to post-deploy, so a dead site fails
  the workflow and GitHub emails the failure notification.
- **Dependabot PRs unblocked**: verified locally against the fixed test suite
  (including a full typecheck/test/build pass on the `next` 16.1.5 bump).

## Remaining Action (account-level decision required)

Restoring the site requires one of:

1. **Make the repository public** — free; Pages works immediately. Full git
   history was scanned with gitleaks (166 commits): no secrets found. Content
   is a portfolio site plus site-planning docs.
2. **Upgrade the GitHub plan** (Pro) — keeps the repo private with Pages.
3. **Move hosting** (e.g. Cloudflare Pages) — supports private repos on free
   tier, but deviates from the tech-strategy golden path (GitHub Pages for
   static frontend).

After option 1 or 2, recovery is:

```bash
# Re-attach the custom domain (may require re-enabling Pages in Settings → Pages first)
gh api -X PUT repos/dralgorhythm/bidwell/pages -f build_type=workflow -f cname=bidwell.info
# Redeploy
gh workflow run deploy.yml --ref main
# Verify
gh workflow run health-check.yml
```

HTTPS for the custom domain may take a few minutes while GitHub re-provisions
the certificate.

## Lessons

- Uptime monitoring must be independent of the deploy pipeline; an outage
  that only manifests between deploys is otherwise invisible.
- Never merge red: consider branch protection requiring the validate checks.
- Note: GitHub disables `schedule:` workflow triggers after ~60 days of
  repository inactivity — the weekly health check protects an active repo,
  but a fully dormant one still needs external monitoring.
