```
---
name: refactoring-code
description: Systematically improving code structure without altering external behavior.
---

# Refactoring Code (Polyglot)

## The Discipline of Refactoring
Refactoring is the "Refactoring Hat". **You cannot add functionality. You cannot optimize performance.** You can only move code to improve design.

## The Automated Refactoring Loop
1.  **Scanner**: Identify "Hotspots" (High Cognitive Complexity > 15).
2.  **Planner**: Select extraction/simplification strategy.
3.  **Coder**: Implement the refactoring.
4.  **Verifier**: **Run Tests**. If Red, Revert.

## Workflows

- [ ] **Phase 1: Characterization**
    - [ ] Ensure existing tests are passing (Green).
    - [ ] If no tests exist, write "Golden Master" tests to capture current behavior.

- [ ] **Phase 2: Structural Moves**
    - [ ] **Extract Method**: Reduce method length to fits-on-screen (~20 lines).
    - [ ] **Extract Class**: Split God Classes.
    - [ ] **Invert Conditional**: Replace `if (!x)` with `if (x)` to reduce cognitive load.
    - [ ] **Polymorphism**: Replace `switch` on type with Polymorphic dispatch.

- [ ] **Phase 3: Clean Code Hygiene**
    - [ ] **Naming**: Rename variables to be semantically dense.
    - [ ] **Comments**: Delete "What" comments. Keep "Why" comments.
    - [ ] **Magic Numbers**: Extract to named constants.

## Reference Implementation (Refactoring)

```typescript
// BEFORE: High Cognitive Complexity, Arrow Code
function updateQuality() {
  if (name != "Aged Brie") {
    if (quality > 0) {
      if (name != "Sulfuras") {
        quality = quality - 1;
      }
    }
  } else {
     // ...
  }
}

// AFTER: Extracted, Inverted, Polymorphic
function updateQuality() {
  // Main dispatch loop
  items.forEach(item => item.update());
}

class AgedBrie implements Item {
  update() {
    if (this.quality < 50) this.quality++;
  }
}
```

## Resources
- [Refactoring and Clean Code](../../instructions/core-engineering/refactoring-clean-code.md)
```
