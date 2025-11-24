# Core Engineering Instructions
> **Apply To**: `**/*`

Foundational engineering principles and practices for building maintainable, scalable, and robust software.

## <coding_standards>
1.  **SOLID**: Adhere to Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles.
2.  **DRY (Don't Repeat Yourself)**: Abstract repeated logic into reusable functions or components.
3.  **KISS (Keep It Simple, Stupid)**: Avoid over-engineering. Simple solutions are easier to maintain and debug.
4.  **YAGNI (You Aren't Gonna Need It)**: Do not implement features or abstractions until they are strictly necessary.
5.  **Composition over Inheritance**: Prefer object composition to class inheritance to reduce coupling and increase flexibility.
</coding_standards>

## <best_practices>
1.  **Readability First**: Write code for humans first, machines second. Use descriptive variable names and clear control flow.
2.  **Fail Fast**: Validate state early and raise exceptions immediately upon encountering invalid conditions.
3.  **Immutability**: Prefer immutable data structures to prevent side effects and simplify concurrency.
4.  **Boy Scout Rule**: Always leave the code cleaner than you found it.
5.  **Scientific Method**: When debugging, Observe -> Hypothesize -> Predict -> Test -> Analyze.
</best_practices>

## <testing_protocols>
1.  **Unit Testing**: Test individual components in isolation with mocked dependencies.
2.  **Edge Cases**: Explicitly test boundary conditions (empty lists, nulls, max values) and invalid inputs.
3.  **Red-Green-Refactor**: Write the test before the implementation (TDD) to ensure testability and correct requirements.
</testing_protocols>

## <tooling>
*   **Linters**: ESLint, Pylint, Checkstyle (Enforce style and complexity rules)
*   **Static Analysis**: SonarQube, CodeClimate (Detect bugs and security vulnerabilities)
*   **Debuggers**: VS Code Debugger, pdb, dlv (Step-through debugging)
*   **Profilers**: Chrome DevTools, PySpy (Performance analysis)
</tooling>

## <additional_section>
### Implementation Standards
1.  **Cyclomatic Complexity**: Keep complexity low (under 10 per function) to ensure testability.
2.  **Error Handling**: Handle errors gracefully. Do not swallow exceptions without logging or re-throwing.

### Refactoring Strategies
1.  **Extract Method**: Move code blocks into named methods to improve readability and reuse.
2.  **Strangler Fig**: Gradually replace legacy functionality with new implementations by routing traffic incrementally.
3.  **Code Smell Detection**: Actively identify and fix smells like Long Method, God Class, and Feature Envy.

### Debugging Protocols
1.  **Reproducibility**: Create a minimal reproduction case before attempting a fix.
2.  **Root Cause Analysis**: Do not just patch the symptom. Understand *why* the state was invalid.
3.  **Binary Search**: Isolate the bug by halving the search space (e.g., git bisect).
4.  **Rubber Ducking**: Explain the code line-by-line to an external entity to force detailed analysis.
</additional_section>

