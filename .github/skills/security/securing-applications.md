---
name: Securing Applications
description: Securing application code and dependencies by identifying and mitigating vulnerabilities (e.g., OWASP Top 10).
---

# Securing Applications

## Workflows

### 1. Scaffold Security Headers

Generate a secure headers configuration (e.g., for Express.js).

```bash
#!/bin/bash
# scaffold-headers.sh
# Usage: ./scaffold-headers.sh <Framework>

FRAMEWORK=$1

if [ "$FRAMEWORK" == "express" ]; then
  cat <<EOF
const helmet = require('helmet');

app.use(helmet());

// Custom CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-scripts.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);
EOF
else
  echo "Unsupported framework. Currently supports: express"
fi
```

### 2. Security Code Review

Review code for common security vulnerabilities.

1. **Input Check**: Is all input validated against a strict allowlist?
2. **Output Check**: Is all output encoded for the specific context (HTML, JS, SQL)?
3. **Auth Check**: Is authentication handled by a proven library (not custom)?
4. **Secrets Check**: Are secrets stored in environment variables (not code)?
5. **Dependency Check**: Have dependencies been scanned for CVEs?

## Feedback Loops

### 1. SAST/DAST Scanning

* **Trigger**: Code commit or pull request.
* **Action**: Run Static Application Security Testing (SAST) and Dynamic Application Security Testing (DAST) tools.
* **Outcome**: Identify and remediate vulnerabilities before deployment.

### 2. Penetration Testing

* **Trigger**: Major release or periodic schedule.
* **Action**: Simulate attacks against the application to find exploitable weaknesses.

## Resources
<!-- Links to external docs or local reference files -->
- [Security Instructions](../../instructions/security.instructions.md)

