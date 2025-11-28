# Architecture Documentation

## Overview
Bidwell Consulting is a static web application built with Next.js 15, designed for high performance, accessibility, and ease of maintenance.

## Technology Stack
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Testing**: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/)
- **Linting & Formatting**: [Biome](https://biomejs.dev/)
- **Deployment**: Static Export (GitHub Pages)

## System Architecture

### Frontend Application
- **Routing**: File-system based routing in `app/`.
- **Rendering**: Static Site Generation (SSG) via `output: 'export'`.
- **Image Optimization**: `next-image-export-optimizer` for static builds.

### Key Modules
- **Core**: `app/layout.tsx`, `app/page.tsx`, `app/components/`.
- **Experiments**: `/experiments` module for interactive tools.

## Project Structure
```
/
├── app/                  # Next.js App Router
│   ├── components/       # Shared UI components
│   ├── experiments/      # Experiments module
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── lib/                  # Utility functions
│   ├── security.ts       # Security utilities
│   └── ...
├── docs/                 # Documentation
├── public/               # Static assets
└── __tests__/            # Automated tests
```

## Design System
- **Typography**: Geist Sans & Geist Mono.
- **Theming**: Light/Dark mode via Tailwind.

## Security & Performance
- **CSP**: Content Security Policy configured.
- **Performance**: Core Web Vitals monitoring.
