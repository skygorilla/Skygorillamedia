# SKYGORILLA Compliance Standards

## Croatian Business Compliance - Legal Requirements

### GDPR Implementation
- **Data Mapping**: Purpose, retention, lawful basis documentation
- **Consent Management**: Granular consent with withdrawal capability
- **Data Subject Rights**: Export, rectification, erasure automation
- **Breach Notification**: 72-hour reporting to supervisory authority
- **Privacy by Design**: Default privacy settings, data minimization

### VAT Compliance (Croatia)
- **Standard Rate**: 25% (verify current rates)
- **Reduced Rates**: 13% (specific goods), 5% (books, medicines)
- **Reverse Charge**: B2B intra-EU transactions
- **Invoice Requirements**: Sequential numbering, OIB, VAT breakdown
- **Digital Services**: EU VAT rules for digital products

### Implementation Pattern
```typescript
// SKYGORILLA GDPR Compliance Pattern
export interface GDPRCompliantData {
  id: string;
  purpose: 'analytics' | 'marketing' | 'essential' | 'functional';
  lawfulBasis: 'consent' | 'contract' | 'legal_obligation' | 'legitimate_interest';
  retentionPeriod: number; // days
  consentTimestamp?: Date;
  dataSubject: string;
}

export const dataRetentionPolicy = {
  analytics: 26 * 30, // 26 months
  marketing: 365, // 1 year with consent
  essential: 10 * 365, // 10 years (invoices)
  functional: 30 // 30 days (sessions)
};

export const enforceRetention = async (data: GDPRCompliantData[]): Promise<void> => {
  const now = Date.now();
  const expired = data.filter(item => {
    const retentionMs = dataRetentionPolicy[item.purpose] * 24 * 60 * 60 * 1000;
    return now - item.consentTimestamp!.getTime() > retentionMs;
  });
  
  // Auto-delete expired data
  await Promise.all(expired.map(item => deletePersonalData(item.id)));
};
```

## Invoice & Fiscalization Standards

### Croatian Invoice Requirements
- **Unique Numbering**: Sequential, gapless per year
- **Required Fields**: Date, OIB, buyer/seller details, VAT breakdown
- **Currency**: EUR (since 2023)
- **Language**: Croatian for domestic, English acceptable for international

### Fiscalization (if applicable)
```typescript
// SKYGORILLA Invoice Pattern
export interface CroatianInvoice {
  invoiceNumber: string; // Format: YYYY-SG-NNNNNN
  issueDate: Date;
  dueDate: Date;
  sellerOIB: string; // Croatian tax number
  buyerOIB?: string;
  currency: 'EUR';
  items: InvoiceItem[];
  vatSummary: VATSummary[];
  totalNet: number;
  totalVAT: number;
  totalGross: number;
  paymentMethod: 'card' | 'transfer' | 'cash';
  fiscalData?: {
    jir?: string; // Unique identifier
    zki?: string; // Security code
  };
}

export const generateInvoiceNumber = (year: number, sequence: number): string => {
  return `${year}-SG-${sequence.toString().padStart(6, '0')}`;
};
```

## Data Localization & Security

### EU Data Residency
- **Primary Region**: eu-central-1 (Frankfurt) or eu-west-1 (Ireland)
- **Backup Region**: Within EU boundaries only
- **CDN**: European edge locations prioritized
- **Third-party Services**: EU-based or adequacy decision countries

### Security Headers - Production Ready
```typescript
// SKYGORILLA Security Headers
export const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.google.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; '),
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};
```

## Backup & Recovery Standards

### Data Protection Strategy
- **RPO (Recovery Point Objective)**: ≤4 hours
- **RTO (Recovery Time Objective)**: ≤2 hours
- **Backup Frequency**: Continuous (DynamoDB PITR), Daily (Firestore)
- **Geographic Distribution**: Multi-region within EU

### Implementation
```typescript
// SKYGORILLA Backup Strategy
export const backupConfig = {
  dynamodb: {
    pointInTimeRecovery: true,
    backupRetention: 35, // days
    continuousBackups: true
  },
  firestore: {
    dailyBackup: true,
    retentionPeriod: 90, // days
    location: 'europe-west1'
  },
  s3: {
    versioning: true,
    lifecyclePolicy: {
      transitions: [
        { days: 30, storageClass: 'STANDARD_IA' },
        { days: 90, storageClass: 'GLACIER' }
      ]
    }
  }
};
```

## Autonomous Compliance Monitoring

### GDPR Automation
- **Consent Tracking**: Real-time consent status monitoring
- **Data Audit**: Automated personal data discovery
- **Retention Enforcement**: Automatic data deletion
- **Breach Detection**: Anomaly detection for data access

### VAT Compliance Checks
- **Rate Validation**: Automatic VAT rate updates
- **Invoice Sequence**: Gap detection in numbering
- **Cross-border Rules**: Automatic reverse charge application
- **Reporting**: Automated VAT return preparation

### Security Compliance
- **TLS Monitoring**: Certificate expiry alerts
- **Header Validation**: Security header compliance checks
- **Vulnerability Scanning**: Automated dependency audits
- **Access Logging**: Comprehensive audit trails

### Legal Updates Integration
```typescript
// SKYGORILLA Legal Update Monitor
export const complianceMonitor = {
  async checkGDPRUpdates(): Promise<void> {
    // Monitor EU legal databases for GDPR changes
    // Alert on new requirements or interpretations
  },
  
  async validateVATRates(): Promise<void> {
    // Check Croatian tax authority for rate changes
    // Update system configuration automatically
  },
  
  async auditDataProcessing(): Promise<ComplianceReport> {
    // Generate compliance report for legal review
    // Identify potential compliance gaps
    return {
      gdprCompliance: 'compliant',
      vatCompliance: 'compliant',
      dataRetention: 'compliant',
      securityHeaders: 'compliant'
    };
  }
};
```