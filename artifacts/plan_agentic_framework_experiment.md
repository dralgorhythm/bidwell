# Plan: Claude Agentic Framework Experiment Page

> **Author**: Builder
> **Status**: Implemented
> **Created**: 2026-07-21
> **Related**: [prd_experiments_hub.md](./prd_experiments_hub.md), [adr_experiments_layout.md](./adr_experiments_layout.md)

---

## Goal

Add an experiment page for [claude-agentic-framework](https://github.com/dralgorhythm/claude-agentic-framework)
— part sales pitch, part technical explainer — as the first real `active` experiment in the
hub (alongside the `sample` demo). Ceremony per core-directives Rule 6: the change is
describable in one sentence, so this plan artifact is the only planning doc required.

## Scope

| Change | File |
|:---|:---|
| Register experiment (`active`, new `Agentic Engineering` category) | `app/(main)/experiments/config.ts` |
| Full-width experiment page in the `(wide)` route group | `app/(wide)/experiments/claude-agentic-framework/page.tsx` |
| Unit tests for the new page (rendering, links, axe) | `app/(wide)/experiments/claude-agentic-framework/page.test.tsx` |
| Update config tests (count 13→14, new slug, new category) | `app/(main)/experiments/config.test.ts` |
| Update hub tests (two `Active` badges, new card link) | `app/(main)/experiments/page.test.tsx` |
| E2E flow for the new experiment | `e2e/smoke.spec.ts` |

Sitemap picks the route up automatically from `config.ts` (priority 0.8 for `active`).
No nav changes — the hub already lives in the main navigation.

## Design decisions

1. **Follows the sample experiment's section rhythm** (the only prior `active` page):
   full-bleed hero with bottom fade → alternating white/neutral content sections →
   dark stats band with gradient numerals → footer CTA back to the hub.
2. **Palette**: neutral base with the blue/cyan accent family the hub cards already use
   (`blue-600` hover/link accents), instead of the sample's indigo→pink. Dark slate hero
   with a mock terminal transcript sells the "governed swarm" idea in the framework's own
   command vocabulary.
3. **Content grounded in the framework README** (fetched 2026-07-21) and this repo's
   v3.1.0 alignment: 10 commands (6 expert modes + 4 swarm orchestrators), 5 worker
   types, 14 knowledge + 10 workflow skills, fail-soft safety hooks, 4 MCP servers,
   raw drop-in install via `scripts/init-framework.sh`, plugin install alternative.
   The enforcement-ladder section mirrors `.claude/rules/security.md`.
4. **Indexable** (unlike the noindex sample demo) — this is real portfolio content.
   OG image via the existing `/og?title=` route, matching the home page.
5. **Dogfooding section** cites the real artifacts in `./artifacts/` and links the
   related blog post at `/blog/agent-coordination`.

## Quality gates

`npm run qa:full` (type-check, Biome, Vitest + vitest-axe, static build) plus
`npm run test:e2e` for the new flow.
