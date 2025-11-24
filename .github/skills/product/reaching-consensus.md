---
name: reaching-consensus
description: Mechanisms for agents to agree on decisions, architectural choices, or conflict resolution in a multi-agent environment.
---

# Reaching Consensus

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Documented**: Has the decision been recorded in an ADR?
- [ ] **Consensus**: Have all relevant agents been consulted?
- [ ] **Authority**: Is it clear who has the final say?
- [ ] **Dissent**: Have objections been documented?
- [ ] **Commit**: Are all agents proceeding with the decision?

## Feedback Loops
<!-- Validation steps -->
1. Propose decision.
2. Consult relevant agents.
3. Check for vetoes (Security/SRE).
4. Record ADR.
5. Proceed.

## Utility Scripts
<!-- Reference executable scripts -->
- `scaffold-adr.sh`: Generates a lightweight Architecture Decision Record template.

```bash
#!/bin/bash
# scaffold-adr.sh
# Usage: ./scaffold-adr.sh <DecisionTitle>

TITLE=$1
DATE=$(date +%Y-%m-%d)
NUM=$(ls -1 docs/adr/ 2>/dev/null | wc -l | xargs)
NUM=$((NUM + 1))
FILENAME="docs/adr/$(printf "%04d" $NUM)-${TITLE// /-}.md"

mkdir -p docs/adr

cat <<EOF > "$FILENAME"
# ADR $NUM: $TITLE

**Date**: $DATE
**Status**: Proposed

## Context
[What is the issue we're addressing?]

## Decision
[What have we decided to do?]

## Consequences
### Positive
*   [Pro 1]

### Negative
*   [Con 1]

### Risks
*   [Risk 1]
EOF

echo "Created ADR: $FILENAME"
```

## Reference Implementation
<!-- Code patterns -->

### Conflict Resolution Matrix

| Priority | Domain | Owner Agent |
| :--- | :--- | :--- |
| 1 (Highest) | Security & Compliance | `security-auditor` |
| 2 | System Stability | `site-reliability-engineer` |
| 3 | Architecture & Scalability | `system-architect` |
| 4 | Feature Implementation | `builder` |

**Rule**: If `security-auditor` flags a risk, it blocks all lower-priority decisions until resolved.

## Resources
<!-- Links to external docs or local reference files -->
- [Product Instructions](../../instructions/product.instructions.md)

