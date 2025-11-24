# Task Decomposition Instructions
> **Apply To**: `plans/*.md`, `roadmaps/*.md`

Guidelines for breaking down complex requirements or architectural designs into actionable, atomic sub-tasks for implementation, optimizing for flow.

## <coding_standards>
1.  **Granularity**: Tasks should take no longer than 1-2 days to complete.
2.  **Format**: Tasks must start with a verb (e.g., "Implement", "Create", "Refactor").
3.  **Acceptance Criteria**: Every task must have explicit acceptance criteria.
</coding_standards>

## <best_practices>
*   **Small Batch Sizes**: Break work into the smallest possible batches to reduce holding costs and risk.
*   **Reduce Transaction Costs**: Invest in automation (CI/CD, testing) to make small batches economically viable.
*   **Vertical Slicing**: Breaking down work by feature (end-to-end) rather than by architectural layer (UI, API, DB).
*   **Independence**: Tasks should be as independent as possible to allow parallel execution.
*   **Testability**: Every task must have clear acceptance criteria that can be verified.
*   **Value Delivery**: Prioritize tasks that deliver user value early (Vertical Slicing).
</best_practices>

## <testing_protocols>
*   **Definition of Done**: Verify that all acceptance criteria are met before marking a task as complete.
</testing_protocols>

## <tooling>
*   **Project Management**: Jira, Linear, GitHub Projects.
*   **Estimation**: Planning Poker.
</tooling>

## <concepts>
1.  **Atomic Task**: A unit of work that is small enough to be completed in a single session or commit, and has a clear definition of done.
2.  **Critical Path**: The sequence of dependent tasks that determines the minimum time needed to complete the project.
3.  **Dependency Graph**: A directed graph representing the dependencies between tasks.
</concepts>

