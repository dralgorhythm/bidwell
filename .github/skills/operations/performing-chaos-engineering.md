---
name: performing-chaos-engineering
description: Proactively testing system resilience by injecting faults to identify weaknesses before they cause outages.
---

# Performing Chaos Engineering

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Steady State**: Do we have a baseline metric (e.g., error rate < 1%)?
- [ ] **Hypothesis**: Do we know what *should* happen (e.g., "Circuit breaker opens")?
- [ ] **Rollback**: Can we stop the experiment immediately if things go wrong?
- [ ] **Observability**: Do we have logs/metrics to see the effect?
- [ ] **Environment**: Are we running this in a safe environment (Staging) first?

## Feedback Loops
<!-- Validation steps -->
1. Define steady state (Hypothesis).
2. Start experiment (Inject Fault).
3. Monitor metrics.
4. If steady state lost, stop experiment.
5. Analyze results and fix weakness.

## Utility Scripts
<!-- Reference executable scripts -->
- `inject-latency.sh`: Simulates network delay using `tc` (Traffic Control).

```bash
#!/bin/bash
# inject-latency.sh
# Usage: ./inject-latency.sh <Interface> <DelayMS>
# Example: ./inject-latency.sh eth0 100

IFACE=$1
DELAY=$2

if [ -z "$IFACE" ] || [ -z "$DELAY" ]; then
  echo "Usage: $0 <Interface> <DelayMS>"
  exit 1
fi

echo "Injecting ${DELAY}ms latency on $IFACE..."
tc qdisc add dev $IFACE root netem delay ${DELAY}ms

echo "To remove: tc qdisc del dev $IFACE root netem"
```

## Reference Implementation
<!-- Code patterns -->

### Chaos Experiment Definition (Chaos Mesh)

Example YAML for injecting pod failure.

```yaml
apiVersion: chaos-mesh.org/v1alpha1
kind: PodChaos
metadata:
  name: pod-failure-example
  namespace: chaos-testing
spec:
  action: pod-failure
  mode: one
  duration: '30s'
  selector:
    namespaces:
      - default
    labelSelectors:
      'app': 'my-service'
```

## Resources
<!-- Links to external docs or local reference files -->
- [Chaos Engineering Instructions](../../instructions/chaos-engineering.instructions.md)
