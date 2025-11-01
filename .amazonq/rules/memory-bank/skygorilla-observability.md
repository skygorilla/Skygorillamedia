# SKYGORILLA Observability Standards

## CloudWatch Alarms - World-Class Monitoring

### Lambda Function Alarms
- **Error Rate**: ≥1% for 5min triggers alert
- **Throttles/Timeouts**: Any occurrence = immediate alert
- **Memory/Duration**: Track against baseline + 20% threshold
- **Custom KPIs**: Business metrics (orders, bookings, payments)

### DynamoDB Monitoring
- **Throttling**: ReadThrottleEvents/WriteThrottleEvents ≥1
- **Capacity**: RCU/WCU utilization >80%
- **Errors**: UserErrors, SystemErrors immediate alert

### Implementation Pattern
```typescript
// SKYGORILLA CloudWatch Pattern
const errorRate = new MathExpression({
  expression: "100*errors/invocations",
  usingMetrics: { errors, invocations },
  period: Duration.minutes(1)
});

new Alarm(stack, `${functionName}-ErrorRate`, {
  metric: errorRate,
  threshold: 1,
  evaluationPeriods: 5,
  datapointsToAlarm: 3
});
```

## Secrets Management - Zero-Trust Security

### Naming Convention
- Pattern: `skygorilla/{env}/{service}/{secret}`
- Examples: `skygorilla/prod/payments/stripe`, `skygorilla/dev/db/password`

### Rotation Policy
- **Automatic**: 30-60 days for API keys
- **Manual**: Database passwords quarterly
- **Emergency**: Immediate rotation capability

### Retrieval Pattern
```typescript
// SKYGORILLA Secrets Pattern with caching
const secretCache = new Map<string, {value: string, timestamp: number}>();

export async function getSecret(name: string): Promise<string> {
  const cached = secretCache.get(name);
  if (cached && Date.now() - cached.timestamp < 300000) { // 5min cache
    return cached.value;
  }
  
  try {
    const result = await secretsManager.getSecretValue({ SecretId: name }).promise();
    const value = result.SecretString!;
    secretCache.set(name, { value, timestamp: Date.now() });
    return value;
  } catch (error) {
    logger.error('Secret retrieval failed', { secretName: name, error });
    throw error;
  }
}
```

## Dead Letter Queue Strategy

### Configuration
- **Retention**: 14 days minimum
- **Max Receive Count**: 3 attempts before DLQ
- **Redrive Policy**: Automated replay with exponential backoff

### Error Classification
- **TRANSIENT**: Network timeouts, rate limits → retry
- **PERMANENT**: Invalid data, auth failures → DLQ
- **POISON**: Malformed messages → quarantine

## Performance Thresholds - SKYGORILLA Standards

### Core Web Vitals
- **LCP**: ≤2.5s (75th percentile)
- **CLS**: ≤0.1
- **INP**: ≤200ms

### Bundle Size Limits
- **Initial JS**: ≤180KB gzipped
- **Route Chunks**: ≤120KB gzipped
- **CSS**: ≤50KB gzipped

### Memory Management
- **Growth**: <10% over 2min idle
- **Cleanup**: All intervals/listeners cleared
- **Leaks**: Zero memory leaks in production

## Autonomous Monitoring Actions

### Alert Escalation
1. **Warning**: Slack notification
2. **Critical**: PagerDuty + SMS
3. **Emergency**: Auto-rollback + executive notification

### Self-Healing
- **Lambda**: Auto-restart on memory threshold
- **DynamoDB**: Auto-scaling on capacity alerts
- **CDN**: Cache invalidation on error spike

### Compliance Tracking
- **GDPR**: Data retention enforcement
- **Croatian VAT**: Invoice sequence validation
- **Security**: TLS/CSP header compliance