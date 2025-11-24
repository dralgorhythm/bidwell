---
name: managing-dependencies
description: The practice of identifying, resolving, and maintaining third-party code libraries to ensure stability, security, and compatibility.
---

# Managing Dependencies

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Lock File**: Is the lock file committed to git?
- [ ] **Unused Deps**: Have unused dependencies been removed (`npm prune`)?
- [ ] **Dev vs Prod**: Are build tools correctly categorized as `devDependencies`?
- [ ] **Vulnerabilities**: Are there any critical CVEs unresolved?
- [ ] **Licenses**: Are we using any GPL libraries in a closed-source project?

## Feedback Loops
<!-- Validation steps -->
1. Add/Update dependency.
2. Run build/test suite.
3. Run security audit (`npm audit`).
4. Check license compliance.

## Utility Scripts
<!-- Reference executable scripts -->
- `audit-deps.sh`: Wrapper script to run the appropriate audit tool based on the project type.

```bash
#!/bin/bash
# audit-deps.sh
# Usage: ./audit-deps.sh

if [ -f "package-lock.json" ]; then
  echo "Detected Node.js project. Running npm audit..."
  npm audit
elif [ -f "yarn.lock" ]; then
  echo "Detected Yarn project. Running yarn audit..."
  yarn audit
elif [ -f "poetry.lock" ]; then
  echo "Detected Python (Poetry) project. Running poetry check..."
  poetry check
else
  echo "No supported lock file found."
  exit 1
fi
```

## Reference Implementation
<!-- Code patterns -->

### Secure `package.json` Configuration

Demonstrates strict versioning and script hooks.

```json
{
  "name": "secure-app",
  "version": "1.0.0",
  "scripts": {
    "preinstall": "npx only-allow npm",
    "audit": "npm audit --audit-level=high"
  },
  "dependencies": {
    "express": "4.18.2", 
    "helmet": "7.1.0"
  },
  "devDependencies": {
    "eslint": "8.56.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

## Resources
<!-- Links to external docs or local reference files -->
- [Dependency Management Instructions](../../instructions/dependency-management.instructions.md)
