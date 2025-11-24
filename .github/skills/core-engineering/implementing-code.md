---
name: implementing-code
description: Writing clean, efficient, maintainable, and secure code across various programming languages, adhering to industry best practices.
---

# Implementing Code

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Security Check**: Injection flaws, auth issues, sensitive data exposure.
- [ ] **Performance Check**: N+1 queries, memory leaks, inefficient algorithms.
- [ ] **Readability Check**: SOLID principles, naming conventions, comments.
- [ ] **Testing Check**: Edge cases, error paths, happy paths.

## Feedback Loops
<!-- Validation steps -->
1. Implement feature or fix.
2. Run local tests (unit/integration).
3. Run linter/formatter.
4. If failure, fix and repeat.

## Utility Scripts
<!-- Reference executable scripts -->
- `scaffold-module.sh`: Creates a standard module structure with source and test files.

```bash
#!/bin/bash
# scaffold-module.sh
# Usage: ./scaffold-module.sh <ModuleName> <Extension>
# Example: ./scaffold-module.sh user-service ts

MODULE_NAME=$1
EXT=$2

if [ -z "$MODULE_NAME" ] || [ -z "$EXT" ]; then
  echo "Usage: $0 <ModuleName> <Extension>"
  exit 1
fi

mkdir -p "src/$MODULE_NAME"
mkdir -p "tests/$MODULE_NAME"

# Create Source File
touch "src/$MODULE_NAME/$MODULE_NAME.$EXT"
echo "// Implementation for $MODULE_NAME" > "src/$MODULE_NAME/$MODULE_NAME.$EXT"

# Create Test File
touch "tests/$MODULE_NAME/$MODULE_NAME.test.$EXT"
echo "// Tests for $MODULE_NAME" > "tests/$MODULE_NAME/$MODULE_NAME.test.$EXT"

echo "Scaffolding complete for module: $MODULE_NAME"
```

## Reference Implementation
<!-- Code patterns -->

### SOLID Compliant Class (TypeScript)

Demonstrates Dependency Injection (DIP) and Single Responsibility (SRP).

```typescript
// Abstraction (Interface Segregation)
interface ILogger {
  log(message: string): void;
}

interface IUserRepository {
  save(user: User): Promise<void>;
}

// Domain Entity
class User {
  constructor(public readonly id: string, public readonly email: string) {}
}

// Implementation (Single Responsibility: Business Logic only)
class UserService {
  // Dependency Injection (Dependency Inversion)
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly logger: ILogger
  ) {}

  public async registerUser(email: string): Promise<User> {
    // Validation (Defensive Programming)
    if (!email.includes('@')) {
      throw new Error("Invalid email format");
    }

    const user = new User(crypto.randomUUID(), email);
    
    await this.userRepository.save(user);
    this.logger.log(`User registered: ${user.id}`);
    
    return user;
  }
}
```

## Resources
<!-- Links to external docs or local reference files -->
- [Core Engineering Instructions](../../instructions/core-engineering.instructions.md)

