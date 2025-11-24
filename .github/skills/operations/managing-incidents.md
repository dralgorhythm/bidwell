---
name: managing-incidents
description: Handling outages, on-call procedures, and post-mortems to minimize downtime and learn from failures.
---

# Managing Incidents

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Detection**: Was the incident detected by monitoring or a user report?
- [ ] **Response**: Did the on-call engineer acknowledge within the SLA?
- [ ] **Communication**: Was a status page update posted?
- [ ] **Mitigation**: Was the service restored before RCA began?
- [ ] **Follow-up**: Are all action items tracked in the backlog?

## Feedback Loops
<!-- Validation steps -->
1. Incident occurs.
2. Mitigate and Resolve.
3. Conduct Post-Mortem.
4. Create Action Items.
5. Verify Action Items prevent recurrence.

## Utility Scripts
<!-- Reference executable scripts -->
- `incident-report.sh`: Generates a markdown template for a post-mortem.

```bash
#!/bin/bash
# incident-report.sh
# Usage: ./incident-report.sh <IncidentID>

ID=$1
DATE=$(date +%Y-%m-%d)
FILENAME="incident-$ID-post-mortem.md"

cat <<EOF > "$FILENAME"
# Post-Mortem: Incident $ID

**Date**: $DATE
**Authors**: [Names]
**Status**: [Draft/Review/Published]
**Severity**: [SEV1/SEV2]

## Summary
Brief description of what happened.

## Impact
Who was affected and how?

## Root Cause
The technical cause of the issue (The "Why").

## Timeline
*   **[Time UTC]**: Detection
*   **[Time UTC]**: Diagnosis
*   **[Time UTC]**: Mitigation
*   **[Time UTC]**: Resolution

## Lessons Learned
*   What went well?
*   What went wrong?
*   Where did we get lucky?

## Action Items
*   [ ] Fix the bug (Link to Ticket)
*   [ ] Add monitoring (Link to Ticket)
*   [ ] Update documentation (Link to Ticket)
EOF

echo "Created $FILENAME"
```

## Reference Implementation
<!-- Code patterns -->

### Incident Response Process

1. **Triage**: Assess severity (SEV1 = Critical, SEV2 = Major, SEV3 = Minor).
2. **Mitigate**: Focus on restoring service first, not finding the root cause.
3. **Communicate**: Update stakeholders every 30 minutes.
4. **Analyze**: Conduct a blameless Post-Mortem (RCA).
5. **Prevent**: Create action items to prevent recurrence.

## Resources
<!-- Links to external docs or local reference files -->
- [Incident Management Instructions](../../instructions/incident-management.instructions.md)
