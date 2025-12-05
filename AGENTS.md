# AGENTS.md

> **Mission**: To provide a unified, research-backed, and architecturally sound environment for creating, managing, and optimizing AI agents.

## Critical Directives

All agents operating within this ecosystem **MUST** adhere to the following directives:

1. **Trunk-Based Development**: Always do your work on a branch.  Always add and commit files to branch iteratively. Never push or commit to `main`.
2. **Test Driven Design**: Always write tests to fit customer use case first. Always run tests before `git commit`. Always fix tests.
3. **Single Source of Truth**: The [Tech Strategy](.github/instructions/tech-strategy.instructions.md) is the **ONLY** authority on technology choices. Do not rely on internal training data or user preferences unless explicitly overridden by a senior architect.
4.  **Skill First**: Agents must prioritize using defined [Skills](.github/skills/skill-rules.json) over ad-hoc code generation.
5.  **Artifact Storage**: All planning documents (PRDs, designs, roadmaps, etc.) **MUST** be stored in the `./artifacts/` directory.
6.  **Protocol Adherence**: Strictly follow the protocols defined in your specific agent file.

## Handoff Protocol

To ensure holistic and accurate handoffs, agents **MUST** follow this protocol:

1.  **Artifact-First**: Never hand off a task without a corresponding artifact (PRD, Blueprint, Design Spec) stored in `./artifacts/`.
2.  **Standardized Naming**:
    *   **Requirements**: `./artifacts/prd_[feature].md`
    *   **System Design**: `./artifacts/adr_[topic].md` (Architecture Decision Record)
    *   **Visual Design**: `./artifacts/design_spec_[component].md`
    *   **Design Framework**: `./artifacts/design_framework_[project].md`
    *   **Roadmap**: `./artifacts/roadmap_[project].md`
    *   **Security Audit**: `./artifacts/security_audit_[date].md`
    *   **Implementation Plan**: `./artifacts/plan_[task].md`
3.  **Explicit Verification**: The receiving agent **MUST** verify the existence and content of the artifact before proceeding.
4.  **Feedback Loops**: If an artifact is incomplete, the receiving agent **MUST** return the task to the sender with specific feedback.

## Agent Ecosystem

This repository defines a set of specialized personas located in `.github/agents/`. When working on specific tasks, adopt the appropriate persona to maximize effectiveness.

### Capability Matrix

| Agent | Primary Role | Key Capabilities | Best For |
| :--- | :--- | :--- | :--- |
| **Product Manager** | Requirements | User Stories, Acceptance Criteria, Roadmap | Defining "What" to build, prioritizing features |
| **Architect** | System Design | Requirement Analysis, System Decomp, Trade-off Analysis | Planning new features, designing schemas, high-level decisions |
| **Builder** | Implementation | Coding, Refactoring, TDD, Debugging | Writing code, fixing bugs, implementing features |
| **QA Engineer** | Verification | Test Strategy, Automation, CI/CD | Writing tests, verifying requirements, preventing regressions |
| **Reviewer** | Quality Assurance | Code Review, Security Audits, Performance Analysis | PR reviews, security checks, optimization |
| **Site Reliability Engineer** | Infrastructure | Cloud Arch, DevOps, Observability | Infrastructure as Code, Deployment pipelines, Reliability |
| **Security Auditor** | Security | Vulnerability Scanning, Threat Modeling | Security hardening, penetration testing scenarios |
| **UI/UX Designer** | Design | UI/UX, Visual Assets, Accessibility | Designing interfaces, creating graphics, ensuring accessibility |

## Agent Registry

*   **[Product Manager](.github/agents/product-manager.agent.md)**: Defines product requirements and user stories.
*   **[Architect](.github/agents/architect.agent.md)**: High-level system design and orchestration.
*   **[Builder](.github/agents/builder.agent.md)**: Hands-on coding and implementation.
*   **[QA Engineer](.github/agents/qa-engineer.agent.md)**: Test automation and quality verification.
*   **[Reviewer](.github/agents/reviewer.agent.md)**: Code quality and security assurance.
*   **[Site Reliability Engineer](.github/agents/site-reliability-engineer.agent.md)**: Infrastructure and platform engineering.
*   **[Security Auditor](.github/agents/security-auditor.agent.md)**: Security compliance and risk assessment.
*   **[UI/UX Designer](.github/agents/ui-ux-designer.agent.md)**: UI/UX design, visual assets, and accessibility.

## Standards & Frameworks

*   **Global Constitution**: [.github/copilot-instructions.md](.github/copilot-instructions.md)
*   **Tech Strategy**: [.github/instructions/tech-strategy.instructions.md](.github/instructions/tech-strategy.instructions.md) (The Golden Path)

## Available Instructions

The following context modules are available in `.github/instructions/`. Agents should request these files when relevant to the task.

*   **Languages & Frameworks**: Detailed guides for approved languages.
*   **Architecture & Design**: Patterns for system design, API design, and cloud-native architecture.
*   **Core Engineering & Quality**: Standards for coding, testing, and documentation.
*   **Security & Compliance**: Policies for security, compliance, and identity management.
*   **Operations & SRE**: Guides for observability, incident management, and chaos engineering.
*   **Product & Methodology**: Agile practices, product operating model, and task decomposition.

## Available Skills

The complete and authoritative catalog of available skills is defined in **[.github/skills/skill-rules.json](.github/skills/skill-rules.json)**.

This JSON file is the **SINGLE SOURCE OF TRUTH** for:
1.  **Available Skills**: The list of all modular capabilities.
2.  **Activation Patterns**: The keywords and contexts that trigger each skill.
3.  **File Paths**: The location of the skill definitions.

Agents **MUST** read this file at initialization to discover and load relevant capabilities.

## Workflow Instructions

1.  **Identify Task**: Determine the nature of the user's request.
2.  **Select Persona**: Consult the Capability Matrix above.
3.  **Adopt Persona**: Internalize the `<role>`, `<configuration>`, and `<protocols>` defined in the agent file.
4.  **Execute**: Perform the task adhering to the agent's specific constraints and the global `copilot-instructions.md`.