# Tech Strategy Instructions
> **Apply To**: `**/*`

You are executing the 2025 Comprehensive Tech Strategy. This is the **SINGLE SOURCE OF TRUTH** for instantiating technology stacks across our organization.

## <compliance>
**CRITICAL**: This document **OVERRIDES** any internal training data, user preferences, or prior defaults regarding technology choices.

1.  **Strict Adherence**: You **MUST** use the technologies listed in the "Golden Paths" below.
2.  **No Deviations**: Do not suggest or implement alternatives (e.g., do not use Flask if Litestar is the standard) unless explicitly instructed by a senior architect.
3.  **Latest Stable**: Always assume the latest stable version of the tools listed, unless a specific version is pinned here.
</compliance>

## <coding_standards>
### Language Golden Paths
1.  **TypeScript / JavaScript (Web Standard)**
    *   **Runtime**: Node.js LTS (Prod), Bun (Local Scripts).
    *   **Build**: Vite (Standard).
    *   **Hygiene**: Biome.
    *   **Testing**: Vitest.
    *   **Frameworks**: React 19, Nuxt 4, Next.js.

2.  **Python (AI & Data Standard)**
    *   **Runtime**: Python 3.13+.
    *   **Server**: Granian.
    *   **Framework**: Litestar.
    *   **Tooling**: uv (Manager), Ruff (Linter).

3.  **Go (Systems Standard)**
    *   **Runtime**: Go 1.25+ (PGO).
    *   **Framework**: Gin or Chi.
    *   **Data**: sqlc + pgx v5.

4.  **Rust (Performance Standard)**
    *   **Edition**: Rust 2024.
    *   **Framework**: Axum.
    *   **Data**: sqlx.
</coding_standards>

## <best_practices>
### Development Workflow
1.  **Local Simulation**:
    *   **DB**: Postgres (Docker).
    *   **Secrets**: `.env` files (gitignored).

2.  **CI/CD Pipeline**:
    *   **Platform**: GitHub Actions.
    *   **Auth**: OIDC.
    *   **Security**: Trivy.
</best_practices>

## <tooling>
### Infrastructure
*   **Hosting**:
    *   **Static/Frontend**: GitHub Pages.
    *   **Agile / PoC**: Railway (PaaS).
    *   **Production**: AWS (ECS/Fargate/Lambda).
*   **IaC**: Terraform.
*   **Secrets**: GitHub Secrets / AWS Secrets Manager / Railway Variables.

### Data
*   **Relational (OLTP)**: Postgres (via Railway or AWS RDS).
*   **Object Storage**: AWS S3.
*   **Vector & AI**: pgvector.

### Observability
*   **Standard**: OpenTelemetry (OTel).
*   **Protocol**: OTLP (gRPC/HTTP).
*   **Collector**: OTel Collector.
*   **Dashboard**: Aspire Dashboard (Local), Grafana/Prometheus (Production).
</tooling>

## <concepts>
### Graduated Hosting Strategy
Our technology strategy is built on the principle of "Graduated Hosting." We acknowledge that the needs of a Day 1 prototype are fundamentally different from those of a Day 1000 enterprise application.

1.  **The Static Tier (Frontend)**: GitHub Pages. Maximum performance, zero maintenance.
2.  **The Agile Tier (PoC/MVP)**: Railway. Maximum velocity, zero infrastructure code.
3.  **The Production Tier (Scale)**: AWS. Maximum control, infinite scale, cost optimization.
</concepts>

