# Product Management Instructions
> **Apply To**: `**/*`

Guidelines for product management, flow efficiency, and team organization to maximize value delivery.

## <coding_standards>
1.  **Flow Efficiency**: Prioritize reducing queues and wait times over resource utilization. Optimize for the speed of value delivery, not "busyness".
2.  **Cognitive Load**: Explicitly manage team cognitive load. Stream-aligned teams MUST NOT be overloaded with extraneous platform or infrastructure tasks.
3.  **WIP Limits**: Enforce Work-In-Progress limits at every stage of the value stream to prevent context switching and congestion.
4.  **Batch Size**: Reduce batch sizes to the smallest economically viable unit (e.g., single-piece flow) to lower transaction costs and accelerate feedback.
</coding_standards>

## <best_practices>
1.  **Cost of Delay**: Use Cost of Delay (CoD) as the primary metric for prioritization. Quantify the economic impact of delaying a feature.
2.  **Reverse Conway Maneuver**: Design the organization to mirror the desired software architecture. Decoupled architecture requires decoupled teams.
3.  **X-as-a-Service**: Platform teams should provide capabilities as self-service APIs/tools to minimize coordination overhead (hand-offs).
4.  **Thinnest Viable Platform**: Build only the platform capabilities that are strictly necessary to reduce the cognitive load of stream-aligned teams.
</best_practices>

## <testing_protocols>
*   **Hypothesis Testing**: Treat every feature as a hypothesis. Define success metrics before implementation.
</testing_protocols>

## <tooling>
*   **Value Stream Mapping**: Tools/Techniques to visualize the flow of value and identify bottlenecks.
</tooling>

## <concepts>
### Team Topologies
1.  **Stream-aligned Team**: End-to-end delivery of value for a specific stream (product, user journey, persona). Focus on maximizing germane cognitive load.
2.  **Enabling Team**: Upskilling stream-aligned teams on new technologies or domains. Temporary facilitation.
3.  **Complicated Subsystem Team**: Encapsulating deep specialist knowledge to reduce load on stream teams.
4.  **Platform Team**: Providing the underlying substrate (tools, infra) as a product to stream teams to reduce extraneous cognitive load.

### Interaction Modes
1.  **Collaboration**: Two teams working closely together to discover a solution. High bandwidth, high cognitive load. Use sparingly.
2.  **X-as-a-Service**: One team consuming a service provided by another with minimal interaction. Low bandwidth, fast flow.
3.  **Facilitating**: One team helping another clear impediments or learn.

### Cognitive Load Types
1.  **Intrinsic**: Fundamental complexity of the task (e.g., language syntax). Mitigation: Training, pairing.
2.  **Extraneous**: Environmental noise (e.g., "how do I deploy?"). Mitigation: Automation, Platform-as-a-Service.
3.  **Germane**: Value-adding problem solving (e.g., business rules). Goal: Maximize this capacity.
</concepts>

