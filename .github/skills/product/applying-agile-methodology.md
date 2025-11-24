---
name: applying-agile-methodology
description: Applying Agile principles (Scrum, Kanban) to the development flow to deliver value iteratively and incrementally.
---

# Applying Agile Methodology

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Value**: Does this story deliver value to the user?
- [ ] **Flow**: Is the batch size small enough to ensure fast flow?
- [ ] **Queues**: Are we creating invisible inventory or bottlenecks?
- [ ] **Clarity**: Is the acceptance criteria clear and testable?
- [ ] **Dependencies**: Are external dependencies identified and managed?
- [ ] **DoD**: Is the Definition of Done clearly understood?

## Feedback Loops
<!-- Validation steps -->
1. Write User Story.
2. Refine with team (Estimation & Flow Check).
3. Implement (Small Batches).
4. Review (Demo).
5. Retrospective (Flow Analysis).

## Utility Scripts
<!-- Reference executable scripts -->
- `scaffold-story.sh`: Generates a template for a comprehensive user story.

```bash
#!/bin/bash
# scaffold-story.sh
# Usage: ./scaffold-story.sh <StoryTitle>

TITLE=$1
FILENAME="story-$(date +%s).md"

cat <<EOF > "$FILENAME"
# Story: $TITLE

**As a** [Role]
**I want** [Feature]
**So that** [Benefit]

## Acceptance Criteria
- [ ] Scenario 1: [Description]
- [ ] Scenario 2: [Description]
- [ ] Scenario 3: [Description]

## Technical Notes
- API Endpoint: \`GET /api/v1/resource\`
- Database Schema: [Link]

## Definition of Done
- [ ] Unit Tests Passed
- [ ] Integration Tests Passed
- [ ] Code Reviewed
- [ ] Documentation Updated
EOF

echo "Created User Story Template: $FILENAME"
```

## Reference Implementation
<!-- Code patterns -->

### Team Interaction Modes (Team Topologies)

1.  **Collaboration**: High-bandwidth working together (e.g., Stream-aligned + Platform for new feature).
2.  **X-as-a-Service**: Low-bandwidth consumption of a service (e.g., consuming a database API).
3.  **Facilitating**: Helping another team learn or clear impediments (e.g., Enabling team teaching AI tools).

### Scrum Ceremony Checklist

1.  **Sprint Planning**: Define the Sprint Goal and select items from the backlog.
2.  **Daily Standup**: 15-min sync. Walk the board (Right to Left). Focus on flow.
3.  **Sprint Review**: Demo the increment to stakeholders.
4.  **Sprint Retrospective**: Team improvement discussion. Focus on flow metrics.
5.  **Backlog Refinement**: Clarify and estimate future items.

## Resources
<!-- Links to external docs or local reference files -->
- [Agile Methodology Instructions](../../instructions/agile-methodology.instructions.md)
