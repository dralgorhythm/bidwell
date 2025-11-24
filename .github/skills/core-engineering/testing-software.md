---
name: testing-software
description: The ability to define and execute a comprehensive testing plan that ensures software quality, reliability, and maintainability.
---

# Testing Software

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Pyramid**: Are we writing mostly unit tests?
- [ ] **Edge Cases**: Do tests cover nulls, empty strings, and boundaries?
- [ ] **Independence**: Can tests run in parallel?
- [ ] **Cleanup**: Do integration tests clean up the DB after running?

## Feedback Loops
<!-- Validation steps -->
1. Write failing test (Red).
2. Implement code (Green).
3. Refactor.
4. Run full suite to ensure no regressions.

## Utility Scripts
<!-- Reference executable scripts -->
- `scaffold-test.sh`: Creates a standard test file structure based on the source file name.

```bash
#!/bin/bash
# scaffold-test.sh
# Usage: ./scaffold-test.sh <SourceFile>
# Example: ./scaffold-test.sh src/utils/math.ts

SRC_FILE=$1

if [ -z "$SRC_FILE" ]; then
  echo "Usage: $0 <SourceFile>"
  exit 1
fi

# Simple heuristic for test file location (colocation or __tests__)
TEST_FILE="${SRC_FILE%.*}.test.ts"

if [ -f "$TEST_FILE" ]; then
  echo "Test file already exists: $TEST_FILE"
  exit 1
fi

cat <<EOF > "$TEST_FILE"
import { describe, it, expect } from 'vitest';
// import { subject } from './$(basename "${SRC_FILE%.*}")';

describe('$(basename "${SRC_FILE%.*}")', () => {
  it('should behave as expected', () => {
    // Arrange
    const input = 1;

    // Act
    // const result = subject(input);

    // Assert
    expect(true).toBe(true);
  });
});
EOF

echo "Created test file: $TEST_FILE"
```

## Reference Implementation
<!-- Code patterns -->

### AAA Pattern (Arrange, Act, Assert)

Standard pattern for organizing unit tests.

```typescript
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

describe('UserService', () => {
  it('should create a new user when valid data is provided', async () => {
    // 1. ARRANGE: Prepare the environment and dependencies
    const mockRepo = { save: jest.fn() } as unknown as UserRepository;
    const service = new UserService(mockRepo);
    const userData = { email: 'test@example.com' };

    // 2. ACT: Execute the code under test
    const result = await service.createUser(userData);

    // 3. ASSERT: Verify the outcome
    expect(result.email).toBe(userData.email);
    expect(mockRepo.save).toHaveBeenCalledWith(expect.objectContaining(userData));
  });
});
```

## Resources
<!-- Links to external docs or local reference files -->
- [Testing Instructions](../../instructions/testing.instructions.md)
