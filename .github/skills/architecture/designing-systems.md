---
name: designing-systems
description: Designing scalable, reliable, and maintainable software systems using architectural patterns and trade-off analysis.
---

# Designing Systems

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Requirements**: Have functional and non-functional requirements been gathered?
- [ ] **Diagrams**: Are C4 diagrams (Context, Container) created?
- [ ] **Data**: Is the data model and storage strategy defined?
- [ ] **API**: Are interfaces defined?
- [ ] **Risks**: Are single points of failure identified?

## Feedback Loops
<!-- Validation steps -->
1. Draft design document and save to `./artifacts/adr_[topic].md` or `./artifacts/plan_[task].md`.
2. Review with stakeholders.
3. Create POC for risky components.
4. Refine design based on POC.
5. Finalize ADR.

## Utility Scripts
<!-- Reference executable scripts -->
- None currently.

## Reference Implementation
<!-- Code patterns -->

### Blueprint Template

When designing a system, produce a blueprint containing:

1. **High-level Diagram**: Mermaid graph showing components.
2. **Boundaries**: Clear definition of component responsibilities.
3. **API Definitions**: OpenAPI or GraphQL specs.
4. **Data Models**: Schema definitions.
5. **Trade-off Analysis**: Rationale for key decisions.

## Resources
<!-- Links to external docs or local reference files -->
- [System Design Instructions](../../instructions/system-design.instructions.md)
- [System Design Template](./resources/system-design.template.md)
- [Architecture Patterns](./resources/architecture-patterns.md)
