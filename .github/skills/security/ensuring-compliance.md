---
name: Ensuring Compliance
description: Ensuring adherence to legal, regulatory, and organizational standards (GDPR, HIPAA, SOC2).
---

# Ensuring Compliance

## Workflows

### 1. Scaffold Privacy Policy Section

Generate a standard data collection disclosure.

```bash
#!/bin/bash
# scaffold-privacy-notice.sh
# Usage: ./scaffold-privacy-notice.sh <DataType> <Purpose>

DATA_TYPE=$1
PURPOSE=$2

if [ -z "$DATA_TYPE" ] || [ -z "$PURPOSE" ]; then
  echo "Usage: $0 <DataType> <Purpose>"
  exit 1
fi

cat <<EOF
### Data Collection Disclosure

**Data Type**: $DATA_TYPE
**Purpose**: $PURPOSE
**Retention Period**: [Duration]
**Third-Party Sharing**: [Yes/No]

We collect $DATA_TYPE solely for the purpose of $PURPOSE. This data is encrypted at rest and is not shared with third parties without explicit consent.
EOF
```

### 2. Compliance Audit

Review the system for compliance gaps.

1. **Inventory Check**: Do we know exactly what PII we are collecting?
2. **Consent Check**: Did the user explicitly consent to this collection?
3. **Encryption Check**: Is the database encrypted at rest?
4. **Log Check**: Are we accidentally logging PII?
5. **Deletion Check**: Can we delete a user's data if they ask?

## Feedback Loops

### 1. Automated Compliance Scanning

* **Trigger**: Infrastructure changes or code deployment.
* **Action**: Run compliance scanning tools (e.g., Vanta agent, cloud config checks).
* **Outcome**: Alert on non-compliant configurations (e.g., unencrypted S3 buckets).

### 2. Internal Audit

* **Trigger**: Quarterly or Annually.
* **Action**: Manual review of policies, procedures, and evidence.

## Resources
<!-- Links to external docs or local reference files -->
- [Compliance Instructions](../../instructions/compliance-governance.instructions.md)

