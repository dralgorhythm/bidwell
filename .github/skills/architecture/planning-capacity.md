---
name: planning-capacity
description: Estimating resource needs, planning for scale, and ensuring system stability under varying load conditions.
---

# Planning Capacity

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Baseline**: Do we know the current max RPS of a single instance?
- [ ] **Bottlenecks**: Have we identified the limiting factor (CPU, Memory, DB Connections, Network)?
- [ ] **Auto-scaling**: Are scaling triggers (CPU %, Latency) configured correctly?
- [ ] **Quotas**: Have we checked cloud provider quotas (e.g., max vCPUs)?
- [ ] **Failover**: Is there enough capacity in a secondary region/zone to handle failover traffic?

## Feedback Loops
<!-- Validation steps -->
1. Estimate capacity (Calculator).
2. Provision environment.
3. Run load test (k6).
4. Analyze metrics (Latency, Errors, Resource Usage).
5. Adjust capacity/config and repeat.

## Utility Scripts
<!-- Reference executable scripts -->
- `calculate-capacity.sh`: Estimates required instances based on target RPS and instance throughput.

```bash
#!/bin/bash
# calculate-capacity.sh
# Usage: ./calculate-capacity.sh <TargetRPS> <LatencyMS> <CoresPerInstance>
# Simple estimation using Little's Law and CPU utilization buffer.

TARGET_RPS=$1
LATENCY_MS=$2
CORES=$3

if [ -z "$CORES" ]; then
  echo "Usage: $0 <TargetRPS> <LatencyMS> <CoresPerInstance>"
  exit 1
fi

# Convert Latency to Seconds
LATENCY_SEC=$(echo "scale=4; $LATENCY_MS / 1000" | bc)

# Little's Law: Concurrent Requests = RPS * Latency
CONCURRENT_REQS=$(echo "scale=2; $TARGET_RPS * $LATENCY_SEC" | bc)

# Assume 1 Core handles X concurrent requests (simplified model, e.g., 10 for async IO)
# Adjust this factor based on workload type (CPU bound vs IO bound)
CONCURRENCY_FACTOR=10 
REQUIRED_CORES=$(echo "scale=2; $CONCURRENT_REQS / $CONCURRENCY_FACTOR" | bc)

# Add 50% Buffer for spikes/overhead
BUFFERED_CORES=$(echo "scale=2; $REQUIRED_CORES * 1.5" | bc)

# Calculate Instances
INSTANCES=$(echo "scale=0; ($BUFFERED_CORES / $CORES) + 1" | bc)

echo "--- Capacity Estimate ---"
echo "Target RPS: $TARGET_RPS"
echo "Avg Latency: ${LATENCY_MS}ms"
echo "Concurrent Reqs: $CONCURRENT_REQS"
echo "Required Cores (w/ 50% buffer): $BUFFERED_CORES"
echo "Recommended Instances ($CORES cores each): $INSTANCES"
```

## Reference Implementation
<!-- Code patterns -->

### Load Test Scenario (k6)

Standard load test defining ramp-up, steady state, and ramp-down.

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up to 100 users
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.01'],   // http errors should be less than 1%
  },
};

export default function () {
  const res = http.get('https://api.example.com/health');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
```

## Resources
<!-- Links to external docs or local reference files -->
- [Capacity Planning Instructions](../../instructions/capacity-planning.instructions.md)
