---
name: decomposing-tasks
description: Breaking down complex requirements or architectural designs into actionable, atomic sub-tasks for implementation.
---

# Decomposing Tasks

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Small Batches**: Is the work broken down into the smallest possible units to reduce holding cost?
- [ ] **Sizing**: Is each task estimated to take < 1 hour (or 1 turn)?
- [ ] **Dependencies**: Are blockers explicitly listed?
- [ ] **Verification**: Does each task have a "Definition of Done"?
- [ ] **Completeness**: Do the tasks cover the entire scope of the requirement?
- [ ] **Sequence**: Is the order logical (e.g., DB before API)?

## Feedback Loops
<!-- Validation steps -->
1. Analyze Requirement.
2. Draft Task List.
3. Review for Vertical Slicing.
4. Check Dependencies.
5. Execute Task 1.
6. Verify.

## Utility Scripts
<!-- Reference executable scripts -->
- `scaffold-plan.sh`: Creates a standard plan document for tracking tasks.

```bash
#!/bin/bash
# scaffold-plan.sh
# Usage: ./scaffold-plan.sh <PlanName>

PLAN_NAME=$1

if [ -z "$PLAN_NAME" ]; then
  echo "Usage: $0 <PlanName>"
  exit 1
fi

FILENAME="./artifacts/plan_$PLAN_NAME.md"
mkdir -p ./artifacts

cat <<EOF > "$FILENAME"
# Plan: $PLAN_NAME

## Goal
[Description of the high-level goal]

## Task List

- [ ] **Task 1**: [Title]
  - *Description*: [Details]
  - *Dependencies*: None
  - *Files*: \`src/...\`
  - *Verification*: [Test command or check]

- [ ] **Task 2**: [Title]
  - *Description*: [Details]
  - *Dependencies*: Task 1
  - *Files*: \`src/...\`
  - *Verification*: [Test command or check]

## Status
*   **Current Phase**: Planning
*   **Blockers**: None
EOF

echo "Created Plan: $FILENAME"
```

## Reference Implementation
<!-- Code patterns -->

### Example Decomposition: "Implement User Login"

**Bad (Horizontal Slicing)**:

1. Create User Table
2. Create User Repository
3. Create User Service
4. Create Login Controller

**Good (Vertical Slicing)**:

1. **Task 1**: Implement Basic Login API (Happy Path)
   - *Desc*: Endpoint accepts email/password, checks DB (mocked), returns JWT.
   - *Verify*: `curl` returns 200 and token.
2. **Task 2**: Connect Real Database
   - *Desc*: Replace mock with SQL query. Add migration.
   - *Verify*: Login works with seeded user.
3. **Task 3**: Handle Invalid Credentials
   - *Desc*: Return 401 for bad password.
   - *Verify*: Test case for 401.

## Resources
<!-- Links to external docs or local reference files -->
- [Task Decomposition Instructions](../../instructions/task-decomposition.instructions.md)
