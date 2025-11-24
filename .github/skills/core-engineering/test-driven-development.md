---
name: test-driven-development
description: Writing failing tests before implementing code to ensure requirements are met, design is modular, and code is testable.
---

# Test Driven Development (TDD)

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Red**: Write a failing test that defines the desired behavior.
- [ ] **Green**: Write the minimum amount of code necessary to make the test pass.
- [ ] **Refactor**: Clean up the code while ensuring tests remain green.
- [ ] **Repeat**: Move to the next requirement or edge case.

## Feedback Loops
<!-- Validation steps -->
1. Run the test suite (should fail first, then pass).
2. Check code coverage to ensure the new code is fully exercised.
3. Review code quality metrics (complexity, duplication).

## Utility Scripts
<!-- Reference executable scripts -->
- `npm test -- --watch`: Run tests in watch mode for rapid feedback.

## Reference Implementation
<!-- Code patterns -->
```typescript
// 1. Red: Write the test
describe('Calculator', () => {
  it('should add two numbers', () => {
    const calc = new Calculator();
    expect(calc.add(1, 2)).toBe(3); // Fails: Calculator or add not defined
  });
});

// 2. Green: Implement minimal code
class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
}

// 3. Refactor: (If needed, e.g., extract interface)
```

## Resources
<!-- Links to external docs or local reference files -->
- [Testing Software](./testing-software.md)
- [Implementing Code](./implementing-code.md)
