# Incident Management Instructions
> **Apply To**: `post-mortems/*.md`, `runbooks/*.md`

Guidelines for handling outages, on-call procedures, and post-mortems to minimize downtime and learn from failures.

## <coding_standards>
1.  **Runbooks**: All services MUST have a runbook in `runbooks/` directory.
2.  **Post-Mortems**: Must be written for all SEV1 and SEV2 incidents within 48 hours.
</coding_standards>

## <best_practices>
*   **Mitigate First**: Focus on restoring service first, not finding the root cause.
*   **Communicate**: Update stakeholders regularly (e.g., every 30 minutes for SEV1).
*   **Blameless Post-Mortem**: Focus on process and technology failures, not human error.
*   **Actionable Follow-up**: Ensure all lessons learned result in tracked action items.
</best_practices>

## <testing_protocols>
*   **Drills**: Regular fire drills to test runbooks and access.
*   **Review**: Peer review of post-mortems to ensure depth and blamelessness.
</testing_protocols>

## <tooling>
*   **Alerting**: PagerDuty, Opsgenie.
*   **Communication**: Slack, Zoom.
*   **Status Page**: Statuspage.io.
</tooling>

## <concepts>
1.  **Severity Levels**:
    *   **SEV1 (Critical)**: System down, data loss, or major business impact. Immediate response required.
    *   **SEV2 (Major)**: Significant degradation, workaround available. Response within 30 mins.
    *   **SEV3 (Minor)**: Minor bug or annoyance. Handle during business hours.
2.  **MTTR (Mean Time To Recovery)**: The average time it takes to restore service after a failure.
3.  **Incident Commander**: The person responsible for coordinating the response effort.
</concepts>

