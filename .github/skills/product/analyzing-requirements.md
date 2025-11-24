---
name: analyzing-requirements
description: The process of eliciting, analyzing, documenting, and validating the requirements for a software product to ensure it meets stakeholder needs.
---

# Analyzing Requirements

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Problem**: Is the problem statement clear and user-focused?
- [ ] **Cost of Delay**: Have we quantified the economic impact of delay?
- [ ] **Cognitive Load**: Does this feature introduce unnecessary complexity for the team?
- [ ] **Ambiguity**: Are vague terms (fast, easy) quantified?
- [ ] **Completeness**: Are edge cases and error states considered?
- [ ] **Feasibility**: Is the requirement technically possible within constraints?
- [ ] **Testability**: Can we write a test case for every requirement?

## Feedback Loops
<!-- Validation steps -->
1. Draft PRD.
2. Review with Product Manager (Value & Cost of Delay).
3. Review with Engineering (Feasibility & Cognitive Load).
4. Review with Design (Usability).
5. Finalize PRD.

## Utility Scripts
<!-- Reference executable scripts -->
- `scaffold-prd.sh`: Creates a standard PRD template.

```bash
#!/bin/bash
# scaffold-prd.sh
# Usage: ./scaffold-prd.sh <FeatureName>

FEATURE_NAME=$1

if [ -z "$FEATURE_NAME" ]; then
  echo "Usage: $0 <FeatureName>"
  exit 1
fi

FILENAME="PRD-$FEATURE_NAME.md"

cat <<EOF > "$FILENAME"
# PRD: $FEATURE_NAME

## 1. Problem Statement
*   **What**: [Describe the problem]
*   **Who**: [Target User]
*   **Why**: [Business Value]

## 2. Economic Framework
*   **Cost of Delay**: [High/Medium/Low - Justification]
*   **Value Proposition**: [Revenue/Retention/Efficiency]

## 3. User Stories
| ID | As a... | I want to... | So that... |
| :--- | :--- | :--- | :--- |
| US-1 | [Role] | [Action] | [Benefit] |

## 4. Functional Requirements
1.  [Requirement 1]
2.  [Requirement 2]

## 5. Non-Functional Requirements
*   **Performance**: [Metric]
*   **Security**: [Constraint]
*   **Reliability**: [SLA]

## 6. Acceptance Criteria (Gherkin)
\`\`\`gherkin
Scenario: [Name]
  Given [Context]
  When [Event]
  Then [Outcome]
\`\`\`

## 7. Out of Scope
*   [Item 1]
EOF

echo "Created PRD template: $FILENAME"
```

## Reference Implementation
<!-- Code patterns -->

### Standard User Story with Gherkin

```markdown
### User Story: Password Reset

**As a** registered user,
**I want to** reset my password via email,
**So that** I can regain access to my account if I forget my credentials.

### Acceptance Criteria

```gherkin
Scenario: Successful Password Reset Request
  Given the user is on the "Forgot Password" page
  And the user enters a valid email address "user@example.com"
  When they click the "Send Reset Link" button
  Then a confirmation message "Check your email" is displayed
  And a password reset email is sent to "user@example.com"
  And the email contains a unique, time-limited token link
```

## Resources
<!-- Links to external docs or local reference files -->
- [Requirements Analysis Instructions](../../instructions/requirements-analysis.instructions.md)
