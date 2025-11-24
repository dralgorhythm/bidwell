---
name: estimating-work
description: Estimating effort, complexity, and risk for tasks to enable predictable planning and delivery.
---

# Estimating Work

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Cost of Delay**: Have we estimated the economic impact of delay (CoD)?
- [ ] **Understanding**: Does everyone understand the requirement?
- [ ] **Risks**: Have technical risks been identified?
- [ ] **Dependencies**: Are there external blockers?
- [ ] **Testing**: Does the estimate include testing effort?
- [ ] **Decomposition**: Is the story small enough (Invest)?

## Feedback Loops
<!-- Validation steps -->
1. Read User Story.
2. Discuss implementation.
3. Vote (Planning Poker).
4. Discuss outliers.
5. Converge on estimate.

## Utility Scripts
<!-- Reference executable scripts -->
- `capacity-calc.sh`: Simple script to help calculate team capacity.

```bash
#!/bin/bash
# capacity-calc.sh
# Usage: ./capacity-calc.sh <Developers> <DaysOff> <FocusFactor>

DEVS=$1
OFF=$2
FOCUS=$3

if [ -z "$DEVS" ]; then
  echo "Usage: $0 <Developers> <DaysOff> <FocusFactor>"
  exit 1
fi

if [ -z "$FOCUS" ]; then
  FOCUS=0.8
fi

DAYS_IN_SPRINT=10
TOTAL_DAYS=$((DEVS * DAYS_IN_SPRINT))
AVAILABLE_DAYS=$((TOTAL_DAYS - OFF))
CAPACITY=$(echo "$AVAILABLE_DAYS * $FOCUS" | bc)

echo "Total Developer Days: $TOTAL_DAYS"
echo "Days Off: $OFF"
echo "Available Days: $AVAILABLE_DAYS"
echo "Focus Factor: $FOCUS"
echo "----------------"
echo "Estimated Capacity (Days): $CAPACITY"
```

## Reference Implementation
<!-- Code patterns -->

### Planning Poker Session

1. **Moderator** reads the User Story.
2. **Team** discusses technical implementation and risks.
3. **Team** privately selects a card (Fibonacci: 1, 2, 3, 5, 8, 13).
4. **Reveal**: Everyone shows their card simultaneously.
5. **Discuss**: Outliers (High/Low) explain their reasoning.
6. **Re-vote**: If no consensus, re-vote until convergence.

## Resources
<!-- Links to external docs or local reference files -->
- [Estimation Instructions](../../instructions/estimation-sizing.instructions.md)
