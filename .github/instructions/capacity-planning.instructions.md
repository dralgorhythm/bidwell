# Capacity Planning Instructions
> **Apply To**: `k6.js`, `jmeter.jmx`, `hpa.yaml`, `scaling-policy.json`

Guidelines for estimating resource needs, planning for scale, and ensuring system stability under varying load conditions.

## <coding_standards>
1.  **Resource Limits**: All containerized applications MUST have CPU and Memory requests and limits defined.
2.  **Autoscaling**: Define Horizontal Pod Autoscalers (HPA) based on CPU or custom metrics (e.g., queue depth).
</coding_standards>

## <best_practices>
*   **Horizontal over Vertical**: Prefer adding more nodes (scaling out) over adding more power to a single node (scaling up) for resilience and cost-efficiency.
*   **No Single Point of Failure (SPOF)**: Ensure redundancy for every component in the critical path.
*   **Graceful Degradation**: The system should maintain partial functionality when some components fail or are overloaded.
*   **Measure, Don't Guess**: Base capacity decisions on load testing data and production metrics, not intuition.
</best_practices>

## <testing_protocols>
*   **Load Testing**: Simulate expected peak load to verify system stability.
*   **Stress Testing**: Push the system beyond its limits to identify breaking points and recovery behavior.
*   **Soak Testing**: Run tests over a long duration to identify memory leaks or resource exhaustion.
</testing_protocols>

## <tooling>
*   **Load Testing**: k6, JMeter, Locust.
*   **Autoscaling**: Kubernetes HPA, AWS Auto Scaling Groups.
*   **Monitoring**: Prometheus, Grafana.
</tooling>

## <concepts>
1.  **Little's Law**: The long-term average number of customers in a stable system $L$ is equal to the long-term average effective arrival rate $\lambda$ multiplied by the average time a customer spends in the system $W$ ($L = \lambda W$).
2.  **Headroom**: The difference between the maximum capacity of the system and the current load.
3.  **Backpressure**: A mechanism for a system to signal to upstream producers that it is overwhelmed and cannot accept more work.
4.  **Throttling/Rate Limiting**: Controlling the rate of traffic sent or received by a network interface or controller.
</concepts>

