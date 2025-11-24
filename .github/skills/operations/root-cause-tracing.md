---
name: root-cause-tracing
description: Systematically investigating incidents to identify the underlying cause rather than just treating symptoms.
---

# Root Cause Tracing

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Symptom Identification**: Clearly define what is going wrong (e.g., "High latency on API").
- [ ] **Timeline Construction**: Build a timeline of events leading up to the incident.
- [ ] **Hypothesis Generation**: Brainstorm potential causes based on evidence.
- [ ] **Verification**: Test hypotheses one by one (e.g., check logs, metrics, reproduce).
- [ ] **Fix & Prevent**: Implement a fix and a mechanism to prevent recurrence.

## Feedback Loops
<!-- Validation steps -->
1. Verify the fix in a staging environment.
2. Monitor metrics to ensure the symptom is gone.
3. Conduct a post-mortem (5 Whys) to find the root cause.

## Utility Scripts
<!-- Reference executable scripts -->
- `scripts/fetch-logs.sh`: Aggregates logs from multiple services.

## Reference Implementation
<!-- Code patterns -->
```python
# Example: 5 Whys Analysis
# Problem: The database CPU spiked to 100%.
# 1. Why? A complex query was running frequently.
# 2. Why? A new feature was deployed that polls the DB.
# 3. Why? The polling interval was set to 100ms instead of 10s.
# 4. Why? The configuration default was incorrect in the new service.
# 5. Why? There was no validation on the configuration value.

# Root Cause: Missing configuration validation.
# Action Item: Add schema validation for service config.
```

## Resources
<!-- Links to external docs or local reference files -->
- [Debugging and Troubleshooting](../core-engineering/debugging-and-troubleshooting.md)
- [Managing Incidents](./managing-incidents.md)
- [Observability Instructions](../../instructions/observability.instructions.md)

