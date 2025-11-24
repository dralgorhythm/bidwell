---
name: managing-context
description: Managing shared knowledge, state, and handoffs between agents to ensure continuity, reduce hallucinations, and maintain a coherent narrative throughout complex tasks.
---

# Managing Context

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Summary**: Is the handoff summary concise and accurate?
- [ ] **Files**: Are all relevant files listed?
- [ ] **Goal**: Is the next step clearly defined?
- [ ] **State**: Is the shared state updated?
- [ ] **Pruning**: Has irrelevant history been summarized?

## Feedback Loops
<!-- Validation steps -->
1. Complete task.
2. Update Swarm State.
3. Generate Handoff Summary.
4. Pass control to next agent.
5. Next agent verifies context.

## Utility Scripts
<!-- Reference executable scripts -->
- `update-state.sh`: Updates the shared state file.

```bash
#!/bin/bash
# update-state.sh
# Usage: ./update-state.sh <Phase> <Status>

PHASE=$1
STATUS=$2
DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
FILE="swarm-state.json"

if [ ! -f "$FILE" ]; then
  echo "{}" > "$FILE"
fi

# Use jq to update the JSON file
tmp=$(mktemp)
jq --arg p "$PHASE" --arg s "$STATUS" --arg d "$DATE" \
   '.phase = $p | .status = $s | .lastUpdated = $d' "$FILE" > "$tmp" && mv "$tmp" "$FILE"

echo "Updated Swarm State: $PHASE - $STATUS"
```

## Reference Implementation
<!-- Code patterns -->

### Handoff Summary Template

Use this structure when passing control.

```markdown
## Handoff Summary

### 1. Accomplished
*   [x] Implemented Feature X
*   [x] Added Unit Tests

### 2. Current State
*   **Phase**: Testing
*   **Blockers**: None
*   **Open Files**: `src/feature-x.ts`, `test/feature-x.test.ts`

### 3. Next Steps (Request)
*   @QA-Engineer: Please run the test suite and verify the edge cases.
```

## Resources
<!-- Links to external docs or local reference files -->
- [Prompt Engineering Instructions](../../instructions/prompt-engineering.instructions.md)

