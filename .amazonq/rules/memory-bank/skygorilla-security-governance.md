# SKYGORILLA Security & Governance

## Organization-Wide Security Controls

### Multi-Factor Authentication (MFA)
- **Mandatory**: All GitHub, AWS, Firebase accounts
- **Hardware Keys**: YubiKey for admin accounts
- **Backup Codes**: Secure storage in password manager
- **Session Management**: 8-hour timeout, re-auth for sensitive ops

### Branch Protection Rules
```yaml
# SKYGORILLA Branch Protection
branches:
  main:
    protection:
      required_status_checks:
        strict: true
        contexts: ["security-scan", "tests", "build"]
      enforce_admins: true
      required_pull_request_reviews:
        required_approving_review_count: 2
        dismiss_stale_reviews: true
        require_code_owner_reviews: true
      restrictions:
        users: []
        teams: ["skygorilla-core"]
```

### CODEOWNERS Configuration
```bash
# SKYGORILLA Code Ownership
* @skygorilla-core
/src/security/ @security-team @skygorilla-core
/infrastructure/ @devops-team @skygorilla-core
/.github/ @skygorilla-core
/docs/security/ @security-team
```

## Secret Scanning & Dependency Management

### GitHub Advanced Security
```yaml
# .github/workflows/security.yml
name: Security Scanning
on: [push, pull_request]
jobs:
  secret-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run TruffleHog
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: main
          head: HEAD
```

### Dependency Scanning
```json
// .github/dependabot.yml
{
  "version": 2,
  "updates": [
    {
      "package-ecosystem": "npm",
      "directory": "/",
      "schedule": {"interval": "weekly"},
      "reviewers": ["@skygorilla-core"],
      "assignees": ["@security-team"]
    }
  ]
}
```

### Software Bill of Materials (SBOM)
```typescript
// SKYGORILLA SBOM Generation
export const generateSBOM = async (): Promise<void> => {
  const dependencies = await analyzeDependencies();
  const sbom = {
    bomFormat: "CycloneDX",
    specVersion: "1.4",
    serialNumber: `urn:uuid:${generateUUID()}`,
    version: 1,
    metadata: {
      timestamp: new Date().toISOString(),
      tools: ["npm", "yarn"],
      component: {
        type: "application",
        name: "skygorilla-app",
        version: process.env.APP_VERSION
      }
    },
    components: dependencies.map(dep => ({
      type: "library",
      name: dep.name,
      version: dep.version,
      licenses: dep.licenses,
      hashes: dep.hashes
    }))
  };
  
  await fs.writeFile('sbom.json', JSON.stringify(sbom, null, 2));
};
```

## Encryption & Key Management

### KMS Key Policy
```typescript
// SKYGORILLA KMS Configuration
export const kmsKeyPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "Enable IAM User Permissions",
      Effect: "Allow",
      Principal: { AWS: `arn:aws:iam::${accountId}:root` },
      Action: "kms:*",
      Resource: "*"
    },
    {
      Sid: "Allow SKYGORILLA Services",
      Effect: "Allow",
      Principal: { AWS: "arn:aws:iam::${accountId}:role/SkygorillaServiceRole" },
      Action: [
        "kms:Decrypt",
        "kms:GenerateDataKey"
      ],
      Resource: "*"
    }
  ]
};

export const keyRotationSchedule = {
  automatic: true,
  rotationPeriod: 365, // days
  alertBeforeExpiry: 30 // days
};
```

### PII Encryption Implementation
```typescript
// SKYGORILLA PII Protection
export class PIIProtection {
  private kmsClient: KMSClient;
  private keyId: string;
  
  constructor(keyId: string) {
    this.kmsClient = new KMSClient({});
    this.keyId = keyId;
  }
  
  async encryptPII(data: string): Promise<string> {
    const command = new EncryptCommand({
      KeyId: this.keyId,
      Plaintext: Buffer.from(data, 'utf8')
    });
    
    const result = await this.kmsClient.send(command);
    return Buffer.from(result.CiphertextBlob!).toString('base64');
  }
  
  async decryptPII(encryptedData: string): Promise<string> {
    const command = new DecryptCommand({
      CiphertextBlob: Buffer.from(encryptedData, 'base64')
    });
    
    const result = await this.kmsClient.send(command);
    return Buffer.from(result.Plaintext!).toString('utf8');
  }
}
```

## WAF & DDoS Protection

### CloudFront + WAF Configuration
```typescript
// SKYGORILLA WAF Rules
export const wafRules = [
  {
    name: "RateLimitRule",
    priority: 1,
    action: { block: {} },
    statement: {
      rateBasedStatement: {
        limit: 2000, // requests per 5 minutes
        aggregateKeyType: "IP"
      }
    }
  },
  {
    name: "SQLInjectionRule", 
    priority: 2,
    action: { block: {} },
    statement: {
      sqliMatchStatement: {
        fieldToMatch: { allQueryArguments: {} },
        textTransformations: [
          { priority: 0, type: "URL_DECODE" },
          { priority: 1, type: "HTML_ENTITY_DECODE" }
        ]
      }
    }
  },
  {
    name: "XSSRule",
    priority: 3,
    action: { block: {} },
    statement: {
      xssMatchStatement: {
        fieldToMatch: { body: {} },
        textTransformations: [
          { priority: 0, type: "URL_DECODE" },
          { priority: 1, type: "HTML_ENTITY_DECODE" }
        ]
      }
    }
  }
];
```

### API Rate Limiting
```typescript
// SKYGORILLA API Protection
export const rateLimiter = {
  // Per-IP limits
  global: { requests: 1000, window: 3600 }, // 1000/hour
  auth: { requests: 10, window: 60 }, // 10/minute for auth
  api: { requests: 100, window: 60 }, // 100/minute for API
  
  // Per-user limits (authenticated)
  userLimits: {
    free: { requests: 100, window: 3600 },
    premium: { requests: 1000, window: 3600 },
    enterprise: { requests: 10000, window: 3600 }
  }
};

export const implementRateLimit = (req: Request, limits: RateLimit) => {
  const key = req.ip || req.headers.get('x-forwarded-for');
  const current = cache.get(key) || 0;
  
  if (current >= limits.requests) {
    throw new Error('Rate limit exceeded');
  }
  
  cache.set(key, current + 1, limits.window);
};
```

## Log Security & PII Redaction

### Structured Logging with PII Protection
```typescript
// SKYGORILLA Secure Logging
export class SecureLogger {
  private piiPatterns = [
    /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/, // Credit cards
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Emails
    /\b\d{3}-\d{2}-\d{4}\b/, // SSN
    /\b\d{11}\b/ // Croatian OIB
  ];
  
  redactPII(message: string): string {
    let redacted = message;
    this.piiPatterns.forEach(pattern => {
      redacted = redacted.replace(pattern, '[REDACTED]');
    });
    return redacted;
  }
  
  secureLog(level: string, message: string, metadata?: any): void {
    const sanitized = {
      timestamp: new Date().toISOString(),
      level,
      message: this.redactPII(message),
      metadata: metadata ? this.sanitizeMetadata(metadata) : undefined,
      correlationId: this.getCorrelationId()
    };
    
    console.log(JSON.stringify(sanitized));
  }
  
  private sanitizeMetadata(metadata: any): any {
    const sanitized = { ...metadata };
    
    // Remove sensitive fields
    delete sanitized.password;
    delete sanitized.token;
    delete sanitized.apiKey;
    
    // Redact PII in remaining fields
    Object.keys(sanitized).forEach(key => {
      if (typeof sanitized[key] === 'string') {
        sanitized[key] = this.redactPII(sanitized[key]);
      }
    });
    
    return sanitized;
  }
}
```

## Autonomous Security Monitoring

### Threat Detection
- **Anomaly Detection**: Unusual access patterns, failed auth attempts
- **Vulnerability Scanning**: Automated dependency updates, security patches
- **Compliance Monitoring**: GDPR, security policy violations
- **Incident Response**: Automated containment, evidence collection

### Security Metrics
```typescript
// SKYGORILLA Security KPIs
export const securityMetrics = {
  authFailures: { threshold: 10, window: 300 }, // 10 failures in 5min
  suspiciousIPs: { threshold: 5, window: 3600 }, // 5 different countries in 1hr
  dataAccess: { threshold: 1000, window: 3600 }, // 1000 records in 1hr
  adminActions: { threshold: 50, window: 3600 } // 50 admin ops in 1hr
};
```