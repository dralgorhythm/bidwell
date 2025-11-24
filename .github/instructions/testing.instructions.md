# Testing Instructions
> **Apply To**: `**/*.test.*`, `**/*.spec.*`, `tests/**/*`

Guidelines for defining and executing a comprehensive testing plan that ensures software quality, reliability, and maintainability.

## <coding_standards>
1.  **Co-location**: Tests should be co-located with the code they test (e.g., `Component.tsx` and `Component.test.tsx`).
2.  **Naming**: Test files should have a distinct suffix (`.test.ts`, `_test.go`).
3.  **Assertions**: Use strict assertions. Avoid loose equality checks.
</coding_standards>

## <best_practices>
1.  **Test Behavior, Not Implementation**: Tests should verify *what* the code does, not *how* it does it (avoids brittle tests).
2.  **Fast Feedback**: Developers should be able to run relevant tests in seconds, not minutes.
3.  **Determinism**: Tests must produce the same result every time. Flaky tests are worse than no tests.
4.  **Isolation**: Tests should not depend on each other or shared mutable state (e.g., database records).
</best_practices>

## <testing_protocols>
1.  **TDD (Test Driven Development)**: Writing the test *before* the code (Red -> Green -> Refactor).
2.  **BDD (Behavior Driven Development)**: Defining tests in natural language (Given/When/Then) to align with business requirements.
3.  **Code Coverage**: Aim for high coverage but prioritize critical paths over 100% line coverage.
</testing_protocols>

## <tooling>
*   **Unit/Integration**: Jest, Vitest (JS/TS); Pytest (Python); XUnit (.NET).
*   **E2E**: Playwright, Cypress, Selenium.
*   **Mocks**: unittest.mock (Python).
*   **Containers**: Testcontainers (Go/Node) for real integration dependencies.
</tooling>

## <concepts>
1.  **Test Pyramid**: A strategy prioritizing many fast unit tests, fewer integration tests, and very few slow E2E tests.
2.  **Mock vs Stub**: A Stub provides canned answers to calls; a Mock allows verifying that specific calls were made.
</concepts>

