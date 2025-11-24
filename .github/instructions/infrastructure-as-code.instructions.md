# Infrastructure as Code Instructions
> **Apply To**: `**/*.tf`, `**/*.tfvars`, `**/sst.config.ts`, `**/Pulumi.yaml`

Guidelines for designing, deploying, and managing infrastructure using code, following the 2025 Graduated Hosting Strategy.

## <coding_standards>
1.  **IaC Tool**: Use **Terraform** as the standard for AWS. Use **Railway** configuration (toml/cli) for Agile tier.
2.  **Secrets Management**: Use **GitHub Secrets** for CI/CD, **AWS Secrets Manager** for Prod, and **Railway Variables** for Agile.
3.  **Authentication**: Use **OIDC** (OpenID Connect) for AWS access. No long-lived keys.
4.  **State Management**: Store Terraform state remotely and securely (S3 + DynamoDB locking).
5.  **Tagging**: Tag all resources with Owner, Environment, and CostCenter for cost attribution.
</coding_standards>

## <best_practices>
*   **Declarative over Imperative**: Define *what* the infrastructure should look like, not *how* to build it step-by-step.
*   **Cattle, not Pets**: Treat servers as disposable resources that can be replaced at any time.
*   **Least Privilege**: Grant only the permissions necessary to perform a task.
*   **Immutable Infrastructure**: Servers are never modified after they are deployed.
*   **GitOps**: Manage infrastructure and application configurations using Git as the source of truth.
*   **Deletion Protection**: Enable deletion protection for stateful resources (databases, buckets).
</best_practices>

## <testing_protocols>
*   **Drift Detection**: Regularly check for drift between code and actual infrastructure.
</testing_protocols>

## <tooling>
*   **IaC**: **Terraform**
*   **Secrets**: **GitHub Secrets**, **AWS Secrets Manager**
*   **CI/CD**: **GitHub Actions** with OIDC
*   **Local DB**: **Postgres** (Docker)
</tooling>

## <concepts>
### Graduated Hosting Strategy
1.  **Static Tier (Frontend)**: Use **GitHub Pages** for SPAs and static sites.
2.  **Agile Tier (PoC/MVP)**: Use **Railway** for rapid prototyping, internal tools, ephemeral environments.
3.  **Production Tier (Scale)**: Use **AWS** (ECS/Fargate/Lambda) for long-running services and compliance workloads.

### Core Concepts
1.  **Idempotency**: The property that applying the same configuration multiple times results in the same state.
2.  **Drift**: The difference between the desired state (defined in code) and the actual state of the infrastructure.
3.  **GitOps**: A set of practices to manage infrastructure and application configurations using Git.
</concepts>

## <additional_section>
### Data Storage Strategy
*   **Relational Database**: Use **Postgres** (Railway or AWS RDS).
*   **Object Storage**: Use **AWS S3**.
*   **Vector & AI**: Use **pgvector**.

### Local Development
*   **Database**: Use **Postgres** (Docker) to support branching workflow locally.
*   **Secrets**: Use `.env` files (gitignored).
</additional_section>


