import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { trace } from '@opentelemetry/api';

let tracer;

// Initialize OpenTelemetry in the browser and expose a tracer.
export function initTelemetry() {
  // Provider collects spans from instrumentation libraries.
  const provider = new WebTracerProvider();
  // Console exporter is lightweight and dev friendly; replace for production.
  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  provider.register();
  tracer = trace.getTracer('lilithtv');
}

// Getter avoids direct import cycles and ensures init first.
export function getTracer() {
  if (!tracer) {
    throw new Error('Telemetry not initialized');
  }
  return tracer;
}
