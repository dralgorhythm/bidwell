# Kubernetes Instructions
> **Apply To**: `**/*.yaml`, `**/*.yml` (in k8s, kubernetes, manifests, helm directories)

You are writing Kubernetes manifests. Adhere to the following strict standards.

## <coding_standards>
1.  **API Version**: Use stable API versions (e.g., `apps/v1`, `v1`) over beta versions.
2.  **Labels**: Include standard labels (`app`, `version`, `component`, `managed-by`).
3.  **Namespaces**: Explicitly specify namespaces. Avoid using `default` namespace.
4.  **Resource Limits**: Always set resource requests and limits for containers.
5.  **Health Checks**: Define `livenessProbe` and `readinessProbe` for all pods.
6.  **Security Context**: Set `securityContext` with `runAsNonRoot: true`, drop capabilities.
7.  **Secrets**: Store sensitive data in Secrets, not ConfigMaps. Consider external secret managers.
8.  **RBAC**: Use Role-Based Access Control. Apply principle of least privilege.
9.  **Network Policies**: Define NetworkPolicies to restrict pod-to-pod communication.
10. **Pod Security**: Enable Pod Security Standards (restricted profile preferred).
</coding_standards>

## <best_practices>
1.  **Dry Run**: Use `kubectl apply --dry-run=client` to validate before applying.
</best_practices>

## <testing_protocols>
1.  **Testing**: Use `helm test` for Helm charts or `kind` for integration testing.
</testing_protocols>

## <tooling>
*   **Syntax**: `yamllint` or `kubeval` (Validate YAML syntax).
*   **Policy**: `kyverno` or `OPA/Gatekeeper` (Policy enforcement).
*   **Linting**: `kube-linter` or `polaris` (Check best practices).
</tooling>

## <concepts>
1.  **Pod**: The smallest deployable unit in Kubernetes.
2.  **Service**: An abstract way to expose an application running on a set of Pods.
3.  **Ingress**: Manages external access to the services in a cluster.
</concepts>

