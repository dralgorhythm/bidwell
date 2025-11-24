---
name: Modeling Threats
description: Systematically identifying and mitigating potential security threats in a system design or implementation.
---

# Modeling Threats

## Workflows

### 1. Scaffold Threat Model

Creates a standard Threat Model document.

```bash
#!/bin/bash
# scaffold-threat-model.sh
# Usage: ./scaffold-threat-model.sh <ComponentName>

COMPONENT_NAME=$1

if [ -z "$COMPONENT_NAME" ]; then
  echo "Usage: $0 <ComponentName>"
  exit 1
fi

FILENAME="./artifacts/threat_model_${COMPONENT_NAME}.md"
mkdir -p ./artifacts

cat <<EOF > "$FILENAME"
# Threat Model: $COMPONENT_NAME

## 1. System Description
*   **Description**: [What does it do?]
*   **Data Sensitivity**: [Public/Internal/Confidential]

## 2. Data Flow Diagram (Mermaid)
\`\`\`mermaid
graph LR
    User -->|HTTPS| LoadBalancer
    LoadBalancer -->|HTTP| WebServer
    WebServer -->|SQL| Database
\`\`\`

## 3. STRIDE Analysis

| Threat Category | Description | Mitigation | Status |
| :--- | :--- | :--- | :--- |
| **S**poofing | Attacker impersonates admin | MFA, Strong Auth | Open |
| **T**ampering | SQL Injection in search | Parameterized Queries | Mitigated |
| **R**epudiation | User denies deleting data | Audit Logs | Open |
| **I**nformation Disclosure | API leaks PII | Encryption, Masking | Mitigated |
| **D**enial of Service | API flooding | Rate Limiting | Open |
| **E**levation of Privilege | IDOR in profile edit | Access Control Checks | Open |

## 4. Security Requirements
1.  [Requirement 1]
2.  [Requirement 2]
EOF

echo "Created Threat Model template: $FILENAME"
```

### 2. Threat Analysis

Analyze a system design for potential threats.

1. **Boundary Check**: Are boundaries between trusted and untrusted zones clearly defined?
2. **Flow Check**: Are all data flows across boundaries identified?
3. **Secrets Check**: Are secrets (keys, passwords) stored securely (Vault, HSM)?
4. **Input Check**: Is all input from untrusted sources validated?
5. **Output Check**: Is output encoded to prevent injection (XSS)?
6. **Log Check**: Are security-critical events logged (without sensitive data)?

## Feedback Loops

### 1. Design Review

* **Trigger**: New feature design or architecture change.
* **Action**: Security team reviews the threat model and proposed mitigations.
* **Outcome**: Approval to proceed or request for changes.

### 2. Penetration Test Validation

* **Trigger**: Post-implementation.
* **Action**: Verify that the identified threats were effectively mitigated.

## Resources
<!-- Links to external docs or local reference files -->
- [Security Instructions](../../instructions/security.instructions.md)

