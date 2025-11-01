# SKYGORILLA Distributed Tracing

## OpenTelemetry Integration - World-Class Observability

### Correlation ID Propagation
```typescript
// SKYGORILLA Tracing Configuration
import { trace, context, SpanStatusCode } from '@opentelemetry/api';
import { NodeSDK } from '@opentelemetry/auto-instrumentations-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

export class SkygorillaTracer {
  private tracer = trace.getTracer('skygorilla-app');
  
  generateCorrelationId(): string {
    return `sg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  async traceOperation<T>(
    operationName: string,
    operation: () => Promise<T>,
    attributes?: Record<string, string | number>
  ): Promise<T> {
    const span = this.tracer.startSpan(operationName, {
      attributes: {
        'service.name': 'skygorilla',
        'service.version': process.env.APP_VERSION || 'unknown',
        ...attributes
      }
    });
    
    try {
      const result = await context.with(trace.setSpan(context.active(), span), operation);
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      span.recordException(error as Error);
      throw error;
    } finally {
      span.end();
    }
  }
}

// Initialize SDK
const sdk = new NodeSDK({
  instrumentations: [getNodeAutoInstrumentations()],
  serviceName: 'skygorilla-app',
  serviceVersion: process.env.APP_VERSION
});

sdk.start();
```

### Frontend → API → Database Tracing
```typescript
// SKYGORILLA End-to-End Tracing

// Frontend (Next.js)
export const traceFrontendOperation = async (operationName: string, fn: () => Promise<any>) => {
  const correlationId = generateCorrelationId();
  
  // Add to request headers
  const headers = {
    'X-Correlation-ID': correlationId,
    'X-Trace-ID': trace.getActiveSpan()?.spanContext().traceId || correlationId
  };
  
  try {
    const result = await fn();
    
    // Log successful operation
    console.log(JSON.stringify({
      type: 'frontend_operation',
      operation: operationName,
      correlationId,
      status: 'success',
      timestamp: Date.now()
    }));
    
    return result;
  } catch (error) {
    console.error(JSON.stringify({
      type: 'frontend_operation',
      operation: operationName,
      correlationId,
      status: 'error',
      error: error.message,
      timestamp: Date.now()
    }));
    throw error;
  }
};

// API Layer (Lambda/Express)
export const traceAPIOperation = async (req: Request, res: Response, next: NextFunction) => {
  const correlationId = req.headers['x-correlation-id'] || generateCorrelationId();
  const traceId = req.headers['x-trace-id'] || correlationId;
  
  // Add to response headers
  res.setHeader('X-Correlation-ID', correlationId);
  res.setHeader('X-Trace-ID', traceId);
  
  // Create span for API operation
  const span = tracer.startSpan(`API ${req.method} ${req.path}`, {
    attributes: {
      'http.method': req.method,
      'http.url': req.url,
      'http.route': req.path,
      'correlation.id': correlationId,
      'trace.id': traceId
    }
  });
  
  // Add correlation ID to request context
  req.correlationId = correlationId;
  req.traceId = traceId;
  
  const originalSend = res.send;
  res.send = function(data) {
    span.setAttributes({
      'http.status_code': res.statusCode,
      'response.size': Buffer.byteLength(data)
    });
    
    if (res.statusCode >= 400) {
      span.setStatus({ code: SpanStatusCode.ERROR });
    }
    
    span.end();
    return originalSend.call(this, data);
  };
  
  next();
};

// Database Layer
export const traceDatabaseOperation = async <T>(
  operation: string,
  query: () => Promise<T>,
  correlationId?: string
): Promise<T> => {
  const span = tracer.startSpan(`DB ${operation}`, {
    attributes: {
      'db.system': 'dynamodb',
      'db.operation': operation,
      'correlation.id': correlationId || 'unknown'
    }
  });
  
  try {
    const result = await query();
    span.setStatus({ code: SpanStatusCode.OK });
    return result;
  } catch (error) {
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: error.message
    });
    throw error;
  } finally {
    span.end();
  }
};
```

## Golden Dashboards - Business Metrics

### Checkout Funnel Tracking
```typescript
// SKYGORILLA Checkout Funnel Metrics
export const checkoutFunnelMetrics = {
  async trackFunnelStep(step: string, correlationId: string, metadata?: any) {
    const metric = {
      namespace: 'SKYGORILLA/Checkout',
      metricName: 'FunnelStep',
      dimensions: {
        Step: step,
        CorrelationId: correlationId
      },
      value: 1,
      unit: 'Count',
      timestamp: Date.now(),
      metadata
    };
    
    // Send to CloudWatch
    await cloudWatch.putMetricData({
      Namespace: metric.namespace,
      MetricData: [{
        MetricName: metric.metricName,
        Dimensions: Object.entries(metric.dimensions).map(([Name, Value]) => ({ Name, Value })),
        Value: metric.value,
        Unit: metric.unit,
        Timestamp: new Date(metric.timestamp)
      }]
    }).promise();
    
    // Log for tracing
    console.log(JSON.stringify({
      type: 'funnel_metric',
      ...metric
    }));
  },
  
  steps: {
    CART_VIEW: 'cart_view',
    CHECKOUT_START: 'checkout_start',
    PAYMENT_INFO: 'payment_info',
    PAYMENT_SUBMIT: 'payment_submit',
    ORDER_COMPLETE: 'order_complete'
  }
};
```

### Webhook Success Monitoring
```typescript
// SKYGORILLA Webhook Monitoring
export const webhookMetrics = {
  async trackWebhookEvent(
    provider: string,
    eventType: string,
    status: 'success' | 'failure' | 'retry',
    correlationId: string,
    processingTime?: number
  ) {
    const metrics = [
      {
        MetricName: 'WebhookEvents',
        Dimensions: [
          { Name: 'Provider', Value: provider },
          { Name: 'EventType', Value: eventType },
          { Name: 'Status', Value: status }
        ],
        Value: 1,
        Unit: 'Count'
      }
    ];
    
    if (processingTime) {
      metrics.push({
        MetricName: 'WebhookProcessingTime',
        Dimensions: [
          { Name: 'Provider', Value: provider },
          { Name: 'EventType', Value: eventType }
        ],
        Value: processingTime,
        Unit: 'Milliseconds'
      });
    }
    
    await cloudWatch.putMetricData({
      Namespace: 'SKYGORILLA/Webhooks',
      MetricData: metrics
    }).promise();
  }
};
```

### DLQ Depth Monitoring
```typescript
// SKYGORILLA DLQ Monitoring
export const dlqMetrics = {
  async monitorDLQDepth() {
    const queues = [
      'skygorilla-payments-dlq',
      'skygorilla-notifications-dlq',
      'skygorilla-webhooks-dlq'
    ];
    
    for (const queueName of queues) {
      try {
        const attributes = await sqs.getQueueAttributes({
          QueueUrl: await getQueueUrl(queueName),
          AttributeNames: ['ApproximateNumberOfMessages']
        }).promise();
        
        const messageCount = parseInt(attributes.Attributes?.ApproximateNumberOfMessages || '0');
        
        await cloudWatch.putMetricData({
          Namespace: 'SKYGORILLA/DLQ',
          MetricData: [{
            MetricName: 'MessageCount',
            Dimensions: [{ Name: 'QueueName', Value: queueName }],
            Value: messageCount,
            Unit: 'Count'
          }]
        }).promise();
        
        // Alert if DLQ has messages
        if (messageCount > 0) {
          console.error(JSON.stringify({
            type: 'dlq_alert',
            queue: queueName,
            messageCount,
            severity: messageCount > 10 ? 'high' : 'medium'
          }));
        }
      } catch (error) {
        console.error(`Failed to monitor DLQ ${queueName}:`, error);
      }
    }
  }
};
```

## Alarm Rollup Dashboard
```typescript
// SKYGORILLA Alarm Aggregation
export const alarmRollup = {
  async getSystemHealth(): Promise<SystemHealth> {
    const alarms = await cloudWatch.describeAlarms({
      StateValue: 'ALARM',
      MaxRecords: 100
    }).promise();
    
    const criticalAlarms = alarms.MetricAlarms?.filter(alarm => 
      alarm.AlarmName?.includes('Critical') || alarm.AlarmName?.includes('P0')
    ) || [];
    
    const warningAlarms = alarms.MetricAlarms?.filter(alarm => 
      alarm.AlarmName?.includes('Warning') || alarm.AlarmName?.includes('P1')
    ) || [];
    
    return {
      status: criticalAlarms.length > 0 ? 'critical' : 
              warningAlarms.length > 0 ? 'warning' : 'healthy',
      criticalCount: criticalAlarms.length,
      warningCount: warningAlarms.length,
      totalAlarms: alarms.MetricAlarms?.length || 0,
      lastUpdated: new Date().toISOString()
    };
  }
};

interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  criticalCount: number;
  warningCount: number;
  totalAlarms: number;
  lastUpdated: string;
}
```

## Autonomous Tracing Enhancement

### Intelligent Sampling
- **High-value transactions**: 100% sampling for payments, auth
- **Normal operations**: 10% sampling for regular API calls
- **Background jobs**: 1% sampling for batch operations
- **Error conditions**: 100% sampling when errors detected

### Performance Correlation
- **Slow queries**: Automatic correlation with database metrics
- **Memory spikes**: Link to specific operations and user actions
- **Network issues**: Correlate with external service dependencies
- **Cache misses**: Track impact on response times