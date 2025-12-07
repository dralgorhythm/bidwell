# Refactoring and Clean Code (Polyglot)
> **Apply To**: `*`

These guidelines govern how agents and developers should refactor code to be robust, maintainable, and "agent-friendly" (high cognitive resonance), regardless of the implementation language.

## <ontology>
The practice of code evolution is divided into three distinct pillars. **Per the "Two Hats" metaphor, you must never mix these modes.**

1.  **Refactoring**: Improving the design of existing code *without* changing its external behavior.
    *   *Goal*: Malleability (Easy to maintain).
    *   *Metric*: Cognitive Complexity.
    *   *Hat*: "Refactoring Hat" (Tests must always pass).
2.  **Optimization**: Improving the efficiency of the software (Time/Space complexity).
    *   *Goal*: Efficiency (Speed/Memory).
    *   *Metric*: Latency, Throughput, Big O.
    *   *Hat*: "Optimization Hat" (Benchmarks must improve).
3.  **Clean Code**: Ensuring code is written for human/agent consumption.
    *   *Goal*: Communication (Intent).
    *   *Metric*: Semantic Density, Naming Quality.
</ontology>

## <architectural_models>
### The SOLID Principles
1.  **SRP (Single Responsibility)**: A module should have one reason to change. Separate concerns based on *actors* (e.g., CFO vs CTO requirements).
2.  **OCP (Open/Closed)**: Open for extension, closed for modification. Use polymorphism to avoid brittle `switch` statements.
3.  **LSP (Liskov Substitution)**: Subtypes must be substitutable for base types. Avoid "Refused Bequest".
4.  **ISP (Interface Segregation)**: Clients should not be forced to depend on interfaces they do not use. Split "God Interfaces".
5.  **DIP (Dependency Inversion)**: Depend on abstractions, not concretions. Use Dependency Injection.

### Pragmatic Heuristics
*   **DRY (Don't Repeat Yourself)**: Single representation of knowledge. *Beware of coincidental duplication.*
*   **KISS (Keep It Simple, Stupid)**: Avoid unnecessary complexity.
*   **YAGNI (You Aren't Gonna Need It)**: Do not implement future-proof features. Implementation is expensive; speculation is waste.
*   **Law of Demeter**: "Don't talk to strangers". usage `x.method()` not `x.getY().getZ().method()`.
</architectural_models>

## <metrics>
### Cyclomatic vs. Cognitive Complexity
*   **Cyclomatic Complexity**: Measures linear paths (testability). Target: < 10 per method.
*   **Cognitive Complexity**: Measures effort to understand (maintainability). Penalizes nesting and breaks in flow. Target: < 15 per method.
*   **Agent Priority**: Agents must optimize for **Cognitive Complexity**. Low cognitive load reduces hallucination rates.

### Optimization Metrics
*   **Big O**: Time/Space complexity.
*   **Arithmetic Intensity**: Ratio of FLOPs to Bytes (Roofline Model).
</metrics>

## <coding_standards>
1.  **Safety First**: You **MUST** utilize the strictest available static analysis tools for the language (e.g., `strict` in TS, `mypy --strict` in Python, clippy in Rust).
2.  **Explicit Contracts**: You **MUST** define explicit return types and argument types at module boundaries. Avoid implicit `any` or `dynamic` typing.
3.  **Immutability by Default**: You **MUST** prefer immutable data structures to prevent side-effect bugs, unless performance critical paths require mutation.
4.  **Naming as Indexing**: Names are vector embeddings for agents. Use descriptive names (e.g., `calculate_amortized_interest` over `calc_int`) to increase semantic density.
</coding_standards>

## <polyglot_idioms>
*   **Python**: Prefer List Comprehensions `[x*x for x in nums]` over loops for readability. Use `numpy` for vectorization.
*   **Java**: Prefer usage of `Streams` for declarative readability, unless in a hot loop (latency-critical) where `for` loops may be faster.
*   **Rust**: Iterators (`iter().map()`) are often faster than loops due to compiler bounds check elision. Zero-cost abstractions are real.
*   **C++**: Optimize for Data-Oriented Design (Struct of Arrays) in performance paths to maximize Cache Locality.
</polyglot_idioms>
