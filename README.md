# Bidwell Consulting

A modern, high-performance portfolio website built with Next.js 15, showcasing software engineering expertise and organizational consulting services.

**🌐 Live Site:** [bidwell.info](https://bidwell.info)

## Tech Stack

- **Framework**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Quality**: Biome (lint/format), Vitest (unit), Playwright (E2E)

## Prerequisites

- **Node.js 24** — Use [nvm](https://github.com/nvm-sh/nvm) for version management
- **npm** — Comes with Node.js

## Quick Start

```bash
# Clone and setup
git clone <repository-url>
cd bidwell
nvm use        # Switches to Node 24 via .nvmrc
npm install

# Start development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run qa` | Quick quality check (typecheck + lint + test) |
| `npm run test` | Run unit tests (watch mode) |
| `npm run test:quick` | Run unit tests once |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run lint:fix` | Auto-fix linting issues |
| `npm run format:fix` | Auto-fix formatting issues |

## Agent Guidance

If you are an AI agent or looking for reusable skills and instructions:

- **[CLAUDE.md](CLAUDE.md)**: Project context, commands, and core principles.
- **[AGENTS.md](AGENTS.md)**: Instructions for any coding agent (task tracking, session completion).
- **[.claude/skills](.claude/skills)**: Reusable workflow and knowledge skills.
- **[.claude/rules](.claude/rules)**: Always-loaded standards (quality, security, debugging).

This repo follows the [claude-agentic-framework](https://github.com/dralgorhythm/claude-agentic-framework) (v3.1.0).
Please refer to **[.claude/rules/tech-strategy.md](.claude/rules/tech-strategy.md)** for the single source of truth regarding technology choices.
