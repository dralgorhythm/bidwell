---
name: Reviewing Security
description: Systematically analyzing code, configurations, and architecture for security vulnerabilities and compliance issues.
---

# Reviewing Security

## Workflows

### 1. Scaffold Security Review Checklist

Generate a markdown checklist for a manual security review.

```bash
#!/bin/bash
# scaffold-security-review.sh
# Usage: ./scaffold-security-review.sh <ComponentName>

COMPONENT=$1
DATE=$(date +%Y_%m_%d)
FILENAME="./artifacts/security_audit_${DATE}_${COMPONENT}.md"
mkdir -p ./artifacts

cat <<EOF > "$FILENAME"
# Security Review: $COMPONENT

## Authentication & Authorization
- [ ] Are strong passwords enforced?
- [ ] Is MFA available/enforced?
- [ ] Are sessions invalidated on logout?
- [ ] Is access control (RBAC) enforced on all endpoints?

## Data Protection
- [ ] Is data encrypted at rest?
- [ ] Is TLS used for all network traffic?
- [ ] Are secrets managed securely (Vault/Env Vars)?
- [ ] Is PII identified and protected?

## Input Validation
- [ ] Is all user input validated?
- [ ] Is output encoded to prevent XSS?
- [ ] Are SQL queries parameterized?

## Logging & Monitoring
- [ ] Are security events logged?
- [ ] Are logs protected from tampering?
- [ ] Is PII excluded from logs?
EOF

echo "Created Security Review Checklist: $FILENAME"
```

### 2. Manual Code Review

Perform a manual review of critical code paths.

1. **Input Check**: Are all inputs validated?
2. **Auth Check**: Is authentication required for sensitive actions?
3. **Secrets Check**: Are secrets stored securely?
4. **Logging Check**: Is logging enabled for security events?
5. **Dependency Check**: Are dependencies up to date?

## Feedback Loops

### 1. Peer Review

* **Trigger**: Pull Request.
* **Action**: Another engineer reviews the code for security flaws.
* **Outcome**: Improved code quality and security awareness.

### 2. Security Champion Review

* **Trigger**: High-risk feature or architectural change.
* **Action**: Designated security champion reviews the design and implementation.

## Resources
<!-- Links to external docs or local reference files -->
- [Security Instructions](../../instructions/security.instructions.md)

