---
name: testing-anti-patterns
description: Identifying and avoiding common pitfalls in automated testing that lead to flaky, slow, or ineffective tests.
---

# Testing Anti-Patterns

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Review Tests**: Audit existing test suite for bad patterns.
- [ ] **Identify Flakiness**: Look for tests that fail intermittently.
- [ ] **Check Isolation**: Ensure tests do not depend on shared global state or execution order.
- [ ] **Verify Assertions**: Ensure tests actually assert something meaningful.
- [ ] **Refactor**: Rewrite tests to use best practices.

## Feedback Loops
<!-- Validation steps -->
1. Run tests in random order to check for dependencies.
2. Run tests in parallel to check for resource contention.
3. Measure test execution time.

## Utility Scripts
<!-- Reference executable scripts -->
- `scripts/detect-flaky-tests.sh`: Runs tests multiple times to catch intermittency.

## Reference Implementation
<!-- Code patterns -->
```typescript
// Anti-Pattern: The Sleeper (Flaky)
it('should load data', async () => {
  loadData();
  await new Promise(r => setTimeout(r, 1000)); // Arbitrary wait
  expect(data).toBeLoaded();
});

// Best Practice: Wait for Condition (Robust)
it('should load data', async () => {
  loadData();
  await waitFor(() => expect(data).toBeLoaded()); // Polls until true
});

// Anti-Pattern: Global State Dependency
let user;
it('creates user', () => { user = createUser(); });
it('deletes user', () => { deleteUser(user); }); // Fails if run alone

// Best Practice: Setup/Teardown
beforeEach(() => { user = createUser(); });
afterEach(() => { deleteUser(user); });
```

## Resources
<!-- Links to external docs or local reference files -->
- [Testing Software](./testing-software.md)
- [Refactoring and Optimizing](./refactoring-and-optimizing.md)
