---
name: applying-cloud-native-patterns
description: Designing and building applications specifically for cloud environments, leveraging microservices, containers, and immutable infrastructure.
---

# Applying Cloud Native Patterns

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Statelessness**: Is the application stateless (no local session storage)?
- [ ] **Config**: Is configuration stored in environment variables?
- [ ] **Resilience**: Are retries and circuit breakers implemented for external calls?
- [ ] **Observability**: Are logs structured and metrics exported?
- [ ] **Security**: are secrets managed externally (e.g., Vault, K8s Secrets)?

## Feedback Loops
<!-- Validation steps -->
1. Design architecture.
2. Audit against 12-Factor App checklist.
3. Implement service.
4. Deploy to staging.
5. Run chaos tests (kill pods/services).
6. Verify recovery.

## Utility Scripts
<!-- Reference executable scripts -->
- `audit-12factor.sh`: Creates a checklist to audit an application against 12-Factor principles.

```bash
#!/bin/bash
# audit-12factor.sh
# Usage: ./audit-12factor.sh <AppName>

APP_NAME=$1

if [ -z "$APP_NAME" ]; then
  echo "Usage: $0 <AppName>"
  exit 1
fi

FILENAME="12factor-audit-$APP_NAME.md"

cat <<EOF > "$FILENAME"
# 12-Factor Audit: $APP_NAME

| Factor | Description | Status | Notes |
| :--- | :--- | :--- | :--- |
| **1. Codebase** | One codebase tracked in revision control, many deploys. | [ ] | |
| **2. Dependencies** | Explicitly declare and isolate dependencies. | [ ] | |
| **3. Config** | Store config in the environment. | [ ] | |
| **4. Backing Services** | Treat backing services as attached resources. | [ ] | |
| **5. Build, Release, Run** | Strictly separate build and run stages. | [ ] | |
| **6. Processes** | Execute the app as one or more stateless processes. | [ ] | |
| **7. Port Binding** | Export services via port binding. | [ ] | |
| **8. Concurrency** | Scale out via the process model. | [ ] | |
| **9. Disposability** | Maximize robustness with fast startup and graceful shutdown. | [ ] | |
| **10. Dev/Prod Parity** | Keep development, staging, and production as similar as possible. | [ ] | |
| **11. Logs** | Treat logs as event streams. | [ ] | |
| **12. Admin Processes** | Run admin/management tasks as one-off processes. | [ ] | |

EOF

echo "Created Audit File: $FILENAME"
```

## Reference Implementation
<!-- Code patterns -->

### Circuit Breaker Pattern (TypeScript)

Prevents cascading failures by stopping calls to a failing service.

```typescript
enum CircuitState {
  CLOSED,   // Normal operation
  OPEN,     // Failing, block requests
  HALF_OPEN // Testing recovery
}

class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount = 0;
  private lastFailureTime = 0;
  
  constructor(
    private threshold: number = 5, 
    private timeout: number = 10000
  ) {}

  public async call(action: () => Promise<any>): Promise<any> {
    if (this.state === CircuitState.OPEN) {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = CircuitState.HALF_OPEN;
      } else {
        throw new Error("Circuit is OPEN");
      }
    }

    try {
      const result = await action();
      this.reset();
      return result;
    } catch (error) {
      this.recordFailure();
      throw error;
    }
  }

  private recordFailure() {
    this.failureCount++;
    if (this.failureCount >= this.threshold) {
      this.state = CircuitState.OPEN;
      this.lastFailureTime = Date.now();
    }
  }

  private reset() {
    this.failureCount = 0;
    this.state = CircuitState.CLOSED;
  }
}
```

## Resources
<!-- Links to external docs or local reference files -->
- [Cloud Native Instructions](../../instructions/cloud-native.instructions.md)
