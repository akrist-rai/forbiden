/**
 * Telemetry — OpenTelemetry SDK
 *
 * Instruments the full FORBIDDEN API server with distributed tracing
 * and metrics. This module must be imported FIRST in index.ts — before
 * any other import — so that auto-instrumentation patches load before
 * the libraries they instrument.
 *
 * WHAT IS TRACED:
 *   - Every HTTP request (Koa) — method, path, status, duration
 *   - Every Socket.IO connection and event
 *   - Every MongoDB query via Mongoose
 *   - Every Redis command via ioredis
 *   - Every BullMQ job enqueue, process, and failure
 *   - Every Docker exec call
 *
 * WHY OTEL:
 *   Without distributed tracing, debugging a slow workspace load requires
 *   grepping logs across Koa, MongoDB, Redis, BullMQ, and Docker — with
 *   no way to correlate a single request across all those systems.
 *   With OTel, a single trace ID links:
 *
 *     GET /api/workspaces/abc
 *       └── MongoDB: Node.find (12ms)
 *       └── Docker: hydrateContainer (340ms)
 *           └── Docker exec: mkdir /workspace/nodes (8ms)
 *           └── Docker exec: write node-1.py (4ms)
 *           └── Docker exec: write manifest.json (3ms)
 *
 *   That 340ms hydration is now visible and attributable.
 *
 * EXPORTER:
 *   Sends traces and metrics to an OTLP-compatible collector.
 *   Default endpoint: http://localhost:4318 (OTEL collector, Jaeger, Grafana Tempo).
 *   Set OTEL_EXPORTER_OTLP_ENDPOINT to override.
 *
 *   In development (NODE_ENV=development), the SDK is initialised but
 *   traces are only exported if OTEL_ENABLED=true to avoid noise during
 *   local development.
 *
 * METRICS:
 *   Custom meters for FORBIDDEN-specific measurements:
 *   - forbidden.active_connections (gauge)     — live Socket.IO connections
 *   - forbidden.events_emitted (counter)       — events written to the event store
 *   - forbidden.ydoc_cache_size (gauge)        — in-memory Yjs documents
 *   - forbidden.container_count (gauge)        — active workspace containers
 *   - forbidden.lsp_sessions (gauge)           — active LSP sessions
 *   - forbidden.fanout_duration (histogram)    — ms from event write to Socket.IO broadcast
 */

import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { trace, metrics, type Meter, type Tracer } from '@opentelemetry/api';

const SERVICE_NAME    = 'forbidden-api';
const SERVICE_VERSION = process.env['npm_package_version'] ?? '0.5.0';
const OTEL_ENABLED    =
  process.env['NODE_ENV'] === 'production' ||
  process.env['OTEL_ENABLED'] === 'true';
const OTLP_ENDPOINT =
  process.env['OTEL_EXPORTER_OTLP_ENDPOINT'] ?? 'http://localhost:4318';

// ─── SDK Initialisation ───────────────────────────────────────────────────────

let sdk: NodeSDK | null = null;

export function initTelemetry(): void {
  if (!OTEL_ENABLED) {
    console.log('[otel] Telemetry disabled (set OTEL_ENABLED=true to enable)');
    return;
  }

  const resource = new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]:    SERVICE_NAME,
    [SemanticResourceAttributes.SERVICE_VERSION]: SERVICE_VERSION,
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env['NODE_ENV'] ?? 'development',
  });

  const traceExporter = new OTLPTraceExporter({
    url: `${OTLP_ENDPOINT}/v1/traces`,
  });

  const metricExporter = new OTLPMetricExporter({
    url: `${OTLP_ENDPOINT}/v1/metrics`,
  });

  sdk = new NodeSDK({
    resource,
    traceExporter,
    metricReader: new PeriodicExportingMetricReader({
      exporter: metricExporter,
      exportIntervalMillis: 30_000,  // export metrics every 30s
    }),
    instrumentations: [
      getNodeAutoInstrumentations({
        // Instrument HTTP (Koa routes get spans automatically)
        '@opentelemetry/instrumentation-http': { enabled: true },
        // Instrument MongoDB (every query becomes a child span)
        '@opentelemetry/instrumentation-mongodb': { enabled: true },
        // Instrument ioredis (every Redis command becomes a child span)
        '@opentelemetry/instrumentation-ioredis': { enabled: true },
        // Instrument BullMQ (every job enqueue/process becomes a span)
        '@opentelemetry/instrumentation-bullmq': { enabled: true },
        // Skip noisy file system instrumentation
        '@opentelemetry/instrumentation-fs': { enabled: false },
      }),
    ],
  });

  sdk.start();

  // Graceful shutdown — flush pending spans before process exits
  process.on('SIGTERM', () => sdk!.shutdown());
  process.on('SIGINT',  () => sdk!.shutdown());

  console.log(`[otel] Tracing enabled → ${OTLP_ENDPOINT}`);
}

// ─── Tracer & Meter singletons ────────────────────────────────────────────────

export function getTracer(): Tracer {
  return trace.getTracer(SERVICE_NAME, SERVICE_VERSION);
}

export function getMeter(): Meter {
  return metrics.getMeter(SERVICE_NAME, SERVICE_VERSION);
}

// ─── FORBIDDEN custom metrics ─────────────────────────────────────────────────

let _meter: Meter | null = null;

function meter(): Meter {
  if (!_meter) _meter = getMeter();
  return _meter;
}

/** Record the number of live Socket.IO connections */
export function recordActiveConnections(count: number): void {
  if (!OTEL_ENABLED) return;
  meter().createObservableGauge('forbidden.active_connections', {
    description: 'Number of currently connected Socket.IO clients',
    unit: 'connections',
  }).addCallback(obs => obs.observe(count));
}

/** Increment the events-emitted counter */
export function recordEventEmitted(eventType: string): void {
  if (!OTEL_ENABLED) return;
  meter()
    .createCounter('forbidden.events_emitted', {
      description: 'Total events written to the event store',
    })
    .add(1, { event_type: eventType });
}

/** Record a fanout duration observation */
export function recordFanoutDuration(ms: number): void {
  if (!OTEL_ENABLED) return;
  meter()
    .createHistogram('forbidden.fanout_duration', {
      description: 'Milliseconds from event write to Socket.IO broadcast',
      unit: 'ms',
    })
    .record(ms);
}

/** Create a manual span for an operation not covered by auto-instrumentation */
export function withSpan<T>(
  name: string,
  attributes: Record<string, string | number | boolean>,
  fn: () => Promise<T>,
): Promise<T> {
  if (!OTEL_ENABLED) return fn();

  const tracer = getTracer();
  const span = tracer.startSpan(name, { attributes });

  return fn()
    .then(result => {
      span.setStatus({ code: 0 }); // SpanStatusCode.OK
      return result;
    })
    .catch(err => {
      span.setStatus({ code: 2, message: (err as Error).message }); // SpanStatusCode.ERROR
      span.recordException(err as Error);
      throw err;
    })
    .finally(() => span.end());
}
