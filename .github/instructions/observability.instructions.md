# Observability Instructions
> **Apply To**: `otel-collector.yaml`, `prometheus.yml`, `grafana/*.json`, `fluentd.conf`

Guidelines for understanding the internal state of a system based on its external outputs, following the 2025 Unified Signal Graph approach.

## <coding_standards>
1.  **Architecture**: Use **OpenTelemetry (OTel)** for all instrumentation.
2.  **Protocol**: Use **OTLP** (OpenTelemetry Protocol). Backend: OTLP/gRPC (Port 4317). Web/Edge: OTLP/HTTP (Port 4318).
3.  **Instrumentation**: Use OpenTelemetry SDKs for all languages. Auto-instrumentation where available.
4.  **Structured Logging**: Use structured logging (JSON) for machine readability.
5.  **Correlation**: Include TraceID and SpanID in all log entries to link them across services.
6.  **Sampling**: Use intelligent sampling (tail-based) in production to control costs.
7.  **Privacy**: Redact PII from logs and traces. Use attribute processors in OTel Collector.
</coding_standards>

## <best_practices>
1.  **RED Method**: Monitor Rate, Errors, and Duration for services.
2.  **USE Method**: Monitor Utilization, Saturation, and Errors for resources.
3.  **Cardinality**: Be mindful of metric cardinality. High cardinality can crash monitoring systems.
4.  **Context Propagation**: Ensure trace context is propagated across service boundaries (HTTP headers, message queues).
5.  **Semantic Conventions**: Follow OpenTelemetry semantic conventions for attribute naming.
</best_practices>

## <tooling>
### Local Development
*   **Aspire Dashboard**: Single-container, lightweight UI for Traces, Metrics, and Logs. Replaces heavy Grafana/Prometheus/Jaeger local stacks.

### Production
*   **Backend**: Vendor-neutral OTel Collectors exporting to **Grafana Cloud** or **Datadog** (with aggressive sampling).
*   **Storage**: Use vendor backends for long-term storage and analysis.
</tooling>

## <concepts>
### Unified Signal Graph
We have moved beyond the "Three Pillars" to a **Unified Signal Graph** powered by OpenTelemetry.

1.  **Logs (Events)**: Immutable records of discrete events.
2.  **Metrics (Aggregates)**: Numerical data measured over time.
3.  **Traces (Context)**: The path of a request through a distributed system.
4.  **Spans**: Individual units of work within a trace.
5.  **Exemplars**: Links from metrics to traces for deep debugging.
</concepts>

## <additional_section>
### Implementation Details
1.  **Local**: Run Aspire Dashboard via Docker: `docker run -d -p 18888:18888 mcr.microsoft.com/dotnet/aspire-dashboard`
2.  **Production**: Deploy OTel Collector as sidecar or DaemonSet. Configure exporters to Grafana Cloud/Datadog.
3.  **SDK**: Initialize OTel SDK in application startup. Configure OTLP exporter endpoint.
</additional_section>


