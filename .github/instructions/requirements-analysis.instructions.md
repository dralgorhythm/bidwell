# Requirements Analysis Instructions
> **Apply To**: `PRD-*.md`, `specs/*.md`

Guidelines for eliciting, analyzing, documenting, and validating the requirements for a software product to ensure it meets stakeholder needs while optimizing for flow and cognitive load.

## <coding_standards>
1.  **Format**: Use Markdown for all requirements documents.
2.  **Versioning**: All requirements must be versioned and stored in git.
3.  **Structure**: Follow the standard PRD template (Problem, Solution, Requirements, Risks).
</coding_standards>

## <best_practices>
*   **Problem over Solution**: Focus on the user's problem before jumping to technical solutions.
*   **Cost of Delay**: Quantify the economic impact of delaying a feature to prioritize effectively (Weighted Shortest Job First).
*   **Cognitive Load Management**: Ensure requirements do not overload Stream-aligned teams with extraneous complexity.
*   **Ambiguity Reduction**: Vague terms like "fast", "secure", or "scalable" must be quantified.
*   **Traceability**: Every requirement should be traceable to a business goal and a test case.
*   **INVEST**: Acronym for good user stories: Independent, Negotiable, Valuable, Estimable, Small, Testable.
</best_practices>

## <testing_protocols>
*   **Stakeholder Review**: Validate requirements with key stakeholders before implementation.
*   **Feasibility Check**: Engineering review to assess technical feasibility and cost.
</testing_protocols>

## <tooling>
*   **Tracking**: Jira, Linear, GitHub Issues.
*   **Documentation**: Notion, Confluence, Markdown.
</tooling>

## <concepts>
1.  **Functional Requirements**: What the system should do (e.g., "User can log in").
2.  **Non-Functional Requirements (NFRs)**: How the system should perform (e.g., "Login takes < 1s"). Also known as Quality Attributes.
3.  **Acceptance Criteria**: Conditions that a software product must satisfy to be accepted by a user, customer, or other consuming system.
4.  **Flow Efficiency**: Prioritizing the movement of work through the system over resource utilization.
5.  **Invisible Inventory**: Recognizing that backlog items and work-in-process are inventory that carries a holding cost.
</concepts>

