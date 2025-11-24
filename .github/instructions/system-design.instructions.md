# System Design Instructions
> **Apply To**: `*.mermaid`, `*.puml`, `docs/architecture/**/*.md`

Guidelines for designing scalable, reliable, and maintainable software systems.

## <coding_standards>
1.  **Diagrams**: Use Mermaid or PlantUML for diagrams. Store as code.
2.  **Documentation**: Keep architecture documentation close to the code (in `docs/architecture`).
</coding_standards>

## <best_practices>
*   **Trade-off Analysis**: Evaluating decisions based on CAP theorem, latency vs. throughput, etc.
*   **C4 Model**: Use the C4 model (Context, Container, Component, Code) for diagramming.
*   **Document Decisions**: Use ADRs (Architecture Decision Records) to document key choices.
</best_practices>

## <testing_protocols>
*   **Load Testing**: Validate system design assumptions under load (e.g., k6, Gatling).
</testing_protocols>

## <tooling>
*   **Diagramming**: Mermaid, PlantUML.
*   **Documentation**: Markdown, ADR Tools.
</tooling>

## <concepts>
1.  **CAP Theorem**: Consistency, Availability, Partition Tolerance - pick two.
2.  **Scalability**: The ability to handle increased load by adding resources.
3.  **Reliability**: The probability that a system will function correctly for a specified period.
4.  **Maintainability**: The ease with which a system can be modified to correct faults or improve performance.
</concepts>

