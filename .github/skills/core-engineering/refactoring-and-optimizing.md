---
name: refactoring-and-optimizing
description: The ability to restructure existing code without changing its external behavior to improve readability, maintainability, and performance.
---

# Refactoring and Optimizing

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Tests**: Do tests pass before AND after the change?
- [ ] **Readability**: Is the code easier to understand?
- [ ] **Complexity**: Is the Cyclomatic Complexity reduced?
- [ ] **Behavior**: Are NO new features added during refactoring?
- [ ] **Performance**: If optimizing, is there a benchmark proving the improvement?

## Feedback Loops
<!-- Validation steps -->
1. Run existing tests (Green).
2. Apply refactoring.
3. Run existing tests (Green).
4. If Red, revert and retry.
5. If optimizing, run benchmark.

## Utility Scripts
<!-- Reference executable scripts -->
- `find-complex-files.sh`: Finds the largest source files, often candidates for refactoring.

```bash
#!/bin/bash
# find-complex-files.sh
# Usage: ./find-complex-files.sh <Directory> <Extension>

DIR=$1
EXT=$2

if [ -z "$DIR" ]; then
  DIR="."
fi

if [ -z "$EXT" ]; then
  EXT="ts"
fi

echo "Top 10 largest .$EXT files in $DIR:"
find "$DIR" -name "*.$EXT" -type f -exec wc -l {} + | sort -rn | head -n 10
```

## Reference Implementation
<!-- Code patterns -->

### Refactoring: Extract Method

**Before (Long Method)**:

```typescript
function printOwing(invoice: Invoice) {
  let outstanding = 0;

  console.log("***********************");
  console.log("**** Customer Owes ****");
  console.log("***********************");

  // calculate outstanding
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  // print details
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
}
```

**After (Refactored)**:

```typescript
function printOwing(invoice: Invoice) {
  printBanner();
  const outstanding = calculateOutstanding(invoice);
  printDetails(invoice, outstanding);
}

function printBanner() {
  console.log("***********************");
  console.log("**** Customer Owes ****");
  console.log("***********************");
}

function calculateOutstanding(invoice: Invoice): number {
  return invoice.orders.reduce((total, order) => total + order.amount, 0);
}

function printDetails(invoice: Invoice, outstanding: number) {
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
}
```

## Resources
<!-- Links to external docs or local reference files -->
- [Core Engineering Instructions](../../instructions/core-engineering.instructions.md)

