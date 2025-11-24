# Cloud Native Instructions
> **Apply To**: `Dockerfile`, `k8s/*.yaml`, `serverless.yml`, `terraform/**/*.tf`

Guidelines for designing and building applications specifically for cloud environments, leveraging microservices, containers, and immutable infrastructure.

## <coding_standards>
1.  **12-Factor App**: Adhere to the 12-Factor App methodology (e.g., Config in Env, Stateless processes).
2.  **Containerization**: All applications MUST be containerized (Docker) for consistent deployment.
3.  **Health Checks**: Implement Liveness and Readiness probes for all services.
</coding_standards>

## <best_practices>
*   **Design for Failure**: Assume everything will fail. Implement retries, circuit breakers, and fallbacks.
*   **Loose Coupling**: Services should be independent and communicate via well-defined APIs.
*   **Observability**: Systems must be observable from the outside (Logs, Metrics, Traces) to understand internal state.
*   **Immutable Infrastructure**: Replacing servers/containers for every deployment rather than updating them in place.
</best_practices>

## <testing_protocols>
*   **Contract Testing**: Verify API contracts between microservices.
*   **Integration Testing**: Test interactions with external services (databases, queues) using testcontainers.
</testing_protocols>

## <tooling>
*   **Container Runtime**: Docker, containerd.
*   **Orchestration**: Kubernetes, AWS ECS.
*   **Service Mesh**: Istio, Linkerd.
</tooling>

## <concepts>
1.  **Microservices**: Architecting an application as a collection of loosely coupled services.
2.  **Service Mesh**: A dedicated infrastructure layer for facilitating service-to-service communications (e.g., Istio, Linkerd).
3.  **Event-Driven Architecture**: Decoupling services by producing and consuming events rather than direct synchronous calls.
4.  **The 12-Factor App**: A methodology for building software-as-a-service apps (e.g., Config in Env, Backing Services as attached resources, Stateless processes).
</concepts>

