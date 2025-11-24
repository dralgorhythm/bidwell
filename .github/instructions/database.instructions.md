# Database Engineering Instructions
> **Apply To**: `**/*.sql`, `**/*.prisma`, `migrations/*`

Guidelines for database design, management, and optimization following modern engineering practices.

## <coding_standards>
1.  **Primary Keys**: MUST use UUIDv7 (time-sortable) for primary keys in distributed systems to ensure index locality and prevent fragmentation.
2.  **Foreign Keys**: MUST enforce referential integrity at the database level using Foreign Key constraints.
3.  **Migrations**: Database schema changes MUST be version-controlled and applied via automated migration tools (e.g., sqlx-cli, prisma migrate).
4.  **Connection Pooling**: Serverless applications MUST use an external connection pooler (e.g., PgBouncer) if not provided by the platform.
5.  **Zero Egress**: Prefer object storage providers with low/zero egress fees where possible, or cache aggressively.
</coding_standards>

## <best_practices>
1.  **Database Branching**: Use local Docker containers to provide isolated, production-like preview environments for every Pull Request.
2.  **Edge vs. Core**: Use centralized Postgres (Railway/AWS RDS) for core relational data requiring strict ACID guarantees.
3.  **Local Fidelity**: Use Docker-based emulators (Postgres) to mirror production infrastructure locally.
4.  **Vector Search**: Use `pgvector` within the primary Postgres instance for hybrid search (relational + semantic).
</best_practices>

## <testing_protocols>
*   **Migration Testing**: Test migrations on a local Docker instance before applying to production.
</testing_protocols>

## <tooling>
*   **Postgres**: Standard relational store (Railway or AWS RDS).
*   **AWS S3**: Object storage.
*   **pgvector**: Vector search extension for Postgres.
*   **Docker**: Local database emulation.
</tooling>

## <additional_section>
### Driver Standards
*   **Rust**: `sqlx` (Async, Compile-time checked queries). Alternative: `diesel` (only if sync/ORM is strictly required).
*   **Go**: `pgx` (High performance, native pooling). Tune `max_conns` to be less than the upstream pooler limit.
*   **Python**: `psqlpy` (Rust-backed, high perf) or `SQLAlchemy` (Async 2.0+). Avoid sync drivers like `psycopg2` in async contexts.

### Migration Patterns
#### Zero-Downtime
Schema changes must be backward compatible.
1.  Add column (nullable).
2.  Deploy code writing to both.
3.  Backfill data.
4.  Add constraint (not null).
5.  Remove old column.

#### Branching Workflow (Local)
1.  PR created -> Trigger CI.
2.  CI spins up ephemeral Postgres container.
3.  Run migrations on container.
4.  Run tests against container.
5.  Merge PR -> Tear down container.
</additional_section>

