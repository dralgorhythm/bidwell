# Domain-Driven Design Instructions
> **Apply To**: `src/**/domain/**/*`, `src/**/application/**/*`, `src/**/infrastructure/**/*`

Guidelines for modeling software to match a domain (Entities, Aggregates, Bounded Contexts).

## <coding_standards>
1.  **Layered Architecture**: Enforce strict separation of concerns: Domain (Inner) -> Application -> Infrastructure (Outer).
2.  **Dependencies**: Domain layer MUST NOT depend on outer layers (Dependency Inversion).
3.  **Immutability**: Value Objects MUST be immutable.
</coding_standards>

## <best_practices>
*   **Ubiquitous Language**: Use the same terminology in the code as the domain experts use in conversation.
*   **Rich Domain Models**: Encapsulate business logic within domain entities, not in "anemic" service classes.
*   **Bounded Contexts**: Clearly define the boundaries of each model to prevent ambiguity.
</best_practices>

## <testing_protocols>
*   **Unit Testing**: Test domain logic in isolation without mocking infrastructure (pure functions/objects).
</testing_protocols>

## <tooling>
*   **Modeling**: EventStorming, Context Mapping.
*   **Diagrams**: C4 Model, UML.
</tooling>

## <concepts>
1.  **Bounded Context**: Explicit boundary within which a domain model exists.
2.  **Ubiquitous Language**: Common language shared by developers and domain experts.
3.  **Aggregate**: Cluster of domain objects that can be treated as a single unit.
4.  **Entity**: Object defined by its identity.
5.  **Value Object**: Object defined by its attributes (immutable).
</concepts>

