# Bidwell Consulting

A modern, high-performance portfolio website built with Next.js 15, showcasing software engineering expertise and organizational consulting services.

**🌐 Live Site:** [bidwell.info](https://bidwell.info)

## Overview

This is a **production-ready, enterprise-level Next.js 15 application** demonstrating modern web development best practices. It serves as both a functional business website and a showcase of advanced technical expertise.

### Key Features

- **⚡ Performance Optimized**: Core Web Vitals focused with dynamic OG images and optimized fonts
- **🔒 Security Hardened**: Multi-layered security with CSP, HSTS, and rate limiting
- **🧪 Fully Tested**: Comprehensive test suite (70% coverage) with unit, integration, accessibility, and performance tests
- **♿ Accessible**: WCAG 2.1 AA compliant with automated accessibility testing
- **📱 Responsive**: Mobile-first design with perfect cross-device experience
- **🚀 SEO Ready**: Sitemap, robots.txt, JSON-LD schema, and OpenGraph metadata

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Font**: Geist
- **Testing**: [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/)
- **Deployment**: GitHub Pages (static)

## Quick Start

### Prerequisites

- **Node.js**: 18.x or 20.x (LTS recommended)
- **npm**: 8.x or higher

### Installation

```bash
# Clone and install
git clone <repository-url>
cd bidwell
npm install

# Start development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Development

### Project Structure

```text
app/                    # Next.js App Router pages and layouts
├── components/         # Reusable UI components
├── comparison/         # Interactive comparison tool feature
└── api/               # API routes with security and validation

lib/                   # Utility libraries and configurations
├── performance.ts     # Core Web Vitals optimization
├── security.ts        # Security utilities and headers
├── validation.ts      # Input validation with Zod schemas
└── font-optimization.ts # Advanced font loading strategies

__tests__/             # Comprehensive test suite
```

### Available Commands

| Command | Description |
| content | content |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run type-check` | Run TypeScript type checking |
| `npm run lint:fix` | Fix code style issues |

## Testing

We maintain a comprehensive testing strategy with a minimum **70% coverage** requirement.

### Test Categories

1.  **Unit Tests**: Individual components and utilities.
2.  **Integration Tests**: User journeys and page interactions.
3.  **Accessibility Tests**: Automated WCAG compliance using `jest-axe`.
4.  **Performance Tests**: Render performance and memory usage.

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Run specific test file
npm test -- nav.test.tsx
```

## Deployment

### Static Export (GitHub Pages)

To build for static hosting:

```bash
npm run build:static
```

The output will be in the `out/` directory.

## Contributing

We welcome contributions! Please follow these guidelines:

1.  **Fork & Clone**: Fork the repo and clone it locally.
2.  **Branch**: Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  **Code Standards**:
    *   Use TypeScript (strict mode).
    *   Use Tailwind CSS for styling.
    *   Ensure accessibility (WCAG 2.1 AA).
4.  **Test**: Ensure all tests pass and coverage is ≥ 70% (`npm run test:coverage`).
5.  **Commit**: Use descriptive commit messages.
6.  **Pull Request**: Submit a PR with a clear description of changes.
