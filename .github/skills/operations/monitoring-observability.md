---
name: monitoring-observability
description: The ability to understand the internal state of a system based on its external outputs (logs, metrics, traces) to ensure reliability and performance.
---

# Monitoring Observability

## Workflows
<!-- Checklist for complex tasks -->
- [ ] **Logs**: Are logs structured (JSON)?
- [ ] **Correlation**: Is a correlation ID propagated across service boundaries?
- [ ] **Metrics**: Are RED metrics defined for all HTTP endpoints?
- [ ] **Alerts**: Are alerts defined for high error rates or latency (SLO breaches)?
- [ ] **Privacy**: Is PII redacted from logs and traces?

## Feedback Loops
<!-- Validation steps -->
1. Instrument code (OpenTelemetry).
2. Local: Run `docker run ... aspire-dashboard`.
3. Local: Verify traces in Aspire Dashboard (http://localhost:18888).
4. Deploy to staging.
5. Generate traffic.
6. Verify logs/metrics in Grafana Cloud or Datadog.

## Utility Scripts
<!-- Reference executable scripts -->
- `prometheus.yml`: Creates a basic Prometheus scrape config.

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'node_exporter'
    static_configs:
      - targets: ['localhost:9100']

  - job_name: 'app_service'
    metrics_path: '/metrics'
    static_configs:
      - targets: ['app:8080']
```

## Reference Implementation
<!-- Code patterns -->

### OpenTelemetry Instrumentation (Node.js)

Demonstrates setting up tracing and metrics using the OTLP exporter (Unified Signal Graph).

```javascript
// instrumentation.js
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-grpc');
const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    // Default: localhost:4317
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      // Default: localhost:4317
    }),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
```

## Resources
<!-- Links to external docs or local reference files -->
- [Observability Instructions](../../instructions/observability.instructions.md)
