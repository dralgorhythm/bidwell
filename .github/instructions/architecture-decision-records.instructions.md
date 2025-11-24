# Architecture Decision Records (ADR) Instructions
> **Apply To**: `**/artifacts/adr_*.md`, `docs/architecture/decisions/adr_*.md`

Guidelines for documenting significant architectural decisions using Architecture Decision Records (ADRs).

## <coding_standards>
1.  **Template Adherence**: Use the standard ADR template structure (Title, Status, Context, Decision, Consequences).
2.  **Naming Convention**: Use descriptive names with optional sequential numbering (e.g., `adr_001_database_choice.md` or `adr_authentication.md`) for easy reference.
3.  **Status Tracking**: Mark ADRs as "Proposed", "Accepted", "Rejected", "Deprecated", or "Superseded".
4.  **Immutability**: ADRs must be immutable after acceptance; use a new ADR to supersede an old one.
5.  **Co-location**: Store ADRs in the repository alongside the code they affect.
</coding_standards>

## <best_practices>
*   **One Decision Per Record**: Keep each ADR focused on a single architectural choice.
*   **Explain the "Why"**: The Context and Rationale sections are critical. Explain the problem and the factors influencing the decision.
*   **Document Alternatives**: List other options considered and why they were rejected.
*   **Be Honest About Trade-offs**: Explicitly state the negative consequences (cons) alongside the positive ones (pros).
*   **Review and Collaborate**: ADRs should be reviewed by the team before being accepted.
</best_practices>

## <testing_protocols>
*   **Clarity Review**: Can a new team member understand the decision and its context without asking questions?
*   **Completeness Review**: Are all sections filled out? Are alternatives and consequences adequately described?
</testing_protocols>

## <tooling>
*   **Markdown**: Use standard Markdown for formatting.
*   **ADR Tools**: (Optional) Tools like `adr-tools` can help manage the ADR lifecycle.
</tooling>

## <concepts>
*   **ADR**: A document that captures an important architectural decision made along with its context and consequences.
*   **Immutability**: The principle that past decisions should not be edited, but rather superseded by new decisions.
*   **Trade-off Analysis**: Weighing the pros and cons of different options.
</concepts>

## <visual_reasoning>
*   **Scannability**: Use lists and bold text to make the document scannable.
</visual_reasoning>
