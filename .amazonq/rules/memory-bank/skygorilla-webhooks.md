# SKYGORILLA Webhook Hardening

## Signature Verification - Zero-Trust Security

### Stripe Webhook Verification
```typescript
// SKYGORILLA Stripe Webhook Security
import crypto from 'crypto';

export class StripeWebhookHandler {
  private endpointSecret: string;
  
  constructor(endpointSecret: string) {
    this.endpointSecret = endpointSecret;
  }
  
  verifySignature(payload: string, signature: string): boolean {
    try {
      const elements = signature.split(',');
      const signatureHash = elements.find(el => el.startsWith('v1='))?.split('=')[1];
      const timestamp = elements.find(el => el.startsWith('t='))?.split('=')[1];
      
      if (!signatureHash || !timestamp) {
        throw new Error('Invalid signature format');
      }
      
      // Check timestamp (prevent replay attacks)
      const webhookTimestamp = parseInt(timestamp);
      const currentTime = Math.floor(Date.now() / 1000);
      const timeDifference = Math.abs(currentTime - webhookTimestamp);
      
      if (timeDifference > 300) { // 5 minutes tolerance
        throw new Error('Webhook timestamp too old');
      }
      
      // Verify signature
      const expectedSignature = crypto
        .createHmac('sha256', this.endpointSecret)
        .update(`${timestamp}.${payload}`)
        .digest('hex');
      
      return crypto.timingSafeEqual(
        Buffer.from(signatureHash, 'hex'),
        Buffer.from(expectedSignature, 'hex')
      );
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return false;
    }
  }
}
```

### PayPal Webhook Verification
```typescript
// SKYGORILLA PayPal Webhook Security
export class PayPalWebhookHandler {
  private webhookId: string;
  private clientId: string;
  private clientSecret: string;
  
  constructor(webhookId: string, clientId: string, clientSecret: string) {
    this.webhookId = webhookId;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }
  
  async verifyWebhook(headers: any, body: string): Promise<boolean> {
    try {
      const authToken = await this.getAccessToken();
      
      const verificationRequest = {
        auth_algo: headers['paypal-auth-algo'],
        cert_id: headers['paypal-cert-id'],
        transmission_id: headers['paypal-transmission-id'],
        transmission_sig: headers['paypal-transmission-sig'],
        transmission_time: headers['paypal-transmission-time'],
        webhook_id: this.webhookId,
        webhook_event: JSON.parse(body)
      };
      
      const response = await fetch('https://api.paypal.com/v1/notifications/verify-webhook-signature', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(verificationRequest)
      });
      
      const result = await response.json();
      return result.verification_status === 'SUCCESS';
    } catch (error) {
      console.error('PayPal webhook verification failed:', error);
      return false;
    }
  }
  
  private async getAccessToken(): Promise<string> {
    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
    
    const response = await fetch('https://api.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });
    
    const result = await response.json();
    return result.access_token;
  }
}
```

## Idempotent Handlers - Duplicate Prevention

### Idempotency Key Management
```typescript
// SKYGORILLA Idempotency Framework
export class IdempotencyManager {
  private cache = new Map<string, { result: any; timestamp: number }>();
  private ttl = 24 * 60 * 60 * 1000; // 24 hours
  
  generateKey(webhookId: string, eventType: string, resourceId: string): string {
    return `webhook:${webhookId}:${eventType}:${resourceId}`;
  }
  
  async processIdempotent<T>(
    key: string,
    processor: () => Promise<T>
  ): Promise<{ result: T; wasProcessed: boolean }> {
    // Check if already processed
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.ttl) {
      return { result: cached.result, wasProcessed: true };
    }
    
    try {
      // Process the webhook
      const result = await processor();
      
      // Cache the result
      this.cache.set(key, {
        result,
        timestamp: Date.now()
      });
      
      return { result, wasProcessed: false };
    } catch (error) {
      // Don't cache errors, allow retry
      throw error;
    }
  }
  
  // Cleanup expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.ttl) {
        this.cache.delete(key);
      }
    }
  }
}
```

## Retry Logic with Exponential Backoff

### Webhook Processing Pipeline
```typescript
// SKYGORILLA Webhook Processing
export class WebhookProcessor {
  private maxRetries = 5;
  private baseDelay = 1000; // 1 second
  private maxDelay = 300000; // 5 minutes
  
  async processWebhook(
    webhook: WebhookEvent,
    handler: (event: WebhookEvent) => Promise<void>
  ): Promise<void> {
    const idempotencyKey = this.generateIdempotencyKey(webhook);
    
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        await this.idempotencyManager.processIdempotent(
          idempotencyKey,
          () => handler(webhook)
        );
        
        // Success - log and return
        console.log(JSON.stringify({
          type: 'webhook_success',
          webhookId: webhook.id,
          eventType: webhook.type,
          attempt: attempt + 1,
          processingTime: Date.now() - webhook.receivedAt
        }));
        
        return;
      } catch (error) {
        const isLastAttempt = attempt === this.maxRetries;
        
        if (isLastAttempt) {
          // Send to DLQ
          await this.sendToDLQ(webhook, error);
          
          console.error(JSON.stringify({
            type: 'webhook_failed',
            webhookId: webhook.id,
            eventType: webhook.type,
            totalAttempts: attempt + 1,
            error: error.message
          }));
          
          throw error;
        }
        
        // Calculate delay with exponential backoff + jitter
        const delay = Math.min(
          this.baseDelay * Math.pow(2, attempt) + Math.random() * 1000,
          this.maxDelay
        );
        
        console.warn(JSON.stringify({
          type: 'webhook_retry',
          webhookId: webhook.id,
          eventType: webhook.type,
          attempt: attempt + 1,
          nextRetryIn: delay,
          error: error.message
        }));
        
        await this.sleep(delay);
      }
    }
  }
  
  private async sendToDLQ(webhook: WebhookEvent, error: Error): Promise<void> {
    const dlqMessage = {
      originalWebhook: webhook,
      error: {
        message: error.message,
        stack: error.stack,
        timestamp: Date.now()
      },
      retryCount: this.maxRetries,
      dlqTimestamp: Date.now()
    };
    
    // Send to SQS DLQ
    await sqs.sendMessage({
      QueueUrl: process.env.WEBHOOK_DLQ_URL!,
      MessageBody: JSON.stringify(dlqMessage),
      MessageAttributes: {
        'webhook-type': {
          DataType: 'String',
          StringValue: webhook.type
        },
        'webhook-provider': {
          DataType: 'String',
          StringValue: webhook.provider
        }
      }
    }).promise();
  }
  
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

## DLQ Management & Recovery

### DLQ Processing Lambda
```typescript
// SKYGORILLA DLQ Recovery
export class DLQProcessor {
  async processDLQMessages(): Promise<void> {
    const messages = await sqs.receiveMessage({
      QueueUrl: process.env.WEBHOOK_DLQ_URL!,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20
    }).promise();
    
    if (!messages.Messages) return;
    
    for (const message of messages.Messages) {
      try {
        const dlqData = JSON.parse(message.Body!);
        const webhook = dlqData.originalWebhook;
        
        // Analyze failure reason
        const shouldRetry = await this.analyzeFailure(dlqData);
        
        if (shouldRetry) {
          // Requeue to main processing
          await this.requeueWebhook(webhook);
          
          console.log(JSON.stringify({
            type: 'dlq_requeue',
            webhookId: webhook.id,
            reason: 'retry_approved'
          }));
        } else {
          // Move to permanent failure storage
          await this.archiveFailedWebhook(dlqData);
          
          console.log(JSON.stringify({
            type: 'dlq_archive',
            webhookId: webhook.id,
            reason: 'permanent_failure'
          }));
        }
        
        // Delete from DLQ
        await sqs.deleteMessage({
          QueueUrl: process.env.WEBHOOK_DLQ_URL!,
          ReceiptHandle: message.ReceiptHandle!
        }).promise();
        
      } catch (error) {
        console.error('DLQ processing error:', error);
      }
    }
  }
  
  private async analyzeFailure(dlqData: any): Promise<boolean> {
    const error = dlqData.error;
    const webhook = dlqData.originalWebhook;
    
    // Don't retry if webhook is too old (>24 hours)
    if (Date.now() - webhook.receivedAt > 24 * 60 * 60 * 1000) {
      return false;
    }
    
    // Don't retry validation errors
    if (error.message.includes('validation') || error.message.includes('invalid')) {
      return false;
    }
    
    // Retry transient errors
    if (error.message.includes('timeout') || error.message.includes('connection')) {
      return true;
    }
    
    // Default: don't retry
    return false;
  }
}
```

## Financial Audit Log - Immutable Records

### Audit Trail Implementation
```typescript
// SKYGORILLA Financial Audit Log
export class FinancialAuditLog {
  async recordTransaction(transaction: FinancialTransaction): Promise<void> {
    const auditEntry = {
      id: generateUUID(),
      timestamp: Date.now(),
      transactionId: transaction.id,
      type: transaction.type,
      amount: transaction.amount,
      currency: transaction.currency,
      status: transaction.status,
      paymentMethod: transaction.paymentMethod,
      customerId: transaction.customerId,
      hash: await this.calculateHash(transaction),
      previousHash: await this.getPreviousHash(),
      correlationId: transaction.correlationId
    };
    
    // Store in immutable log (DynamoDB with WORM characteristics)
    await dynamodb.putItem({
      TableName: 'SkygorillaAuditLog',
      Item: marshall(auditEntry),
      ConditionExpression: 'attribute_not_exists(id)' // Prevent overwrites
    }).promise();
    
    // Also log to CloudWatch for monitoring
    console.log(JSON.stringify({
      type: 'financial_audit',
      ...auditEntry
    }));
  }
  
  async recordRefund(refund: RefundTransaction): Promise<void> {
    const auditEntry = {
      id: generateUUID(),
      timestamp: Date.now(),
      type: 'refund',
      originalTransactionId: refund.originalTransactionId,
      refundAmount: refund.amount,
      reason: refund.reason,
      processedBy: refund.processedBy,
      hash: await this.calculateHash(refund),
      previousHash: await this.getPreviousHash()
    };
    
    await dynamodb.putItem({
      TableName: 'SkygorillaAuditLog',
      Item: marshall(auditEntry),
      ConditionExpression: 'attribute_not_exists(id)'
    }).promise();
  }
  
  private async calculateHash(data: any): Promise<string> {
    const content = JSON.stringify(data, Object.keys(data).sort());
    return crypto.createHash('sha256').update(content).digest('hex');
  }
  
  private async getPreviousHash(): Promise<string> {
    const lastEntry = await dynamodb.query({
      TableName: 'SkygorillaAuditLog',
      IndexName: 'TimestampIndex',
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: { ':pk': { S: 'AUDIT' } },
      ScanIndexForward: false,
      Limit: 1
    }).promise();
    
    return lastEntry.Items?.[0]?.hash?.S || '0';
  }
}
```

## Autonomous Webhook Monitoring

### Real-time Health Checks
- **Signature Validation**: Track verification success rates
- **Processing Latency**: Monitor end-to-end processing times
- **Retry Patterns**: Analyze failure modes and retry effectiveness
- **DLQ Depth**: Alert on accumulating failed webhooks

### Performance Optimization
- **Batch Processing**: Group similar webhooks for efficiency
- **Circuit Breakers**: Prevent cascade failures
- **Load Balancing**: Distribute webhook processing across instances
- **Caching**: Cache frequently accessed data for faster processing