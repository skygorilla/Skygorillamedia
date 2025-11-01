/**
 * SKYGORILLA Security Types - World-class type safety
 */

export interface SecurityEvent {
  readonly id: string;
  readonly type: 'xss_attempt' | 'csrf_attempt' | 'injection_attempt' | 'rate_limit_exceeded' | 'suspicious_activity';
  readonly severity: 'low' | 'medium' | 'high' | 'critical';
  readonly timestamp: string;
  readonly source: string;
  readonly details: Record<string, unknown>;
  readonly blocked: boolean;
}

export interface RateLimitConfig {
  readonly maxRequests: number;
  readonly windowMs: number;
  readonly skipSuccessfulRequests?: boolean;
  readonly skipFailedRequests?: boolean;
}

export interface CSPViolation {
  readonly documentUri: string;
  readonly referrer: string;
  readonly violatedDirective: string;
  readonly effectiveDirective: string;
  readonly originalPolicy: string;
  readonly disposition: 'enforce' | 'report';
  readonly blockedUri: string;
  readonly lineNumber?: number;
  readonly columnNumber?: number;
  readonly sourceFile?: string;
}

export interface SecurityHeaders {
  readonly 'Content-Security-Policy': string;
  readonly 'X-Frame-Options': 'DENY' | 'SAMEORIGIN' | 'ALLOWALL';
  readonly 'X-Content-Type-Options': 'nosniff';
  readonly 'Referrer-Policy': string;
  readonly 'Strict-Transport-Security'?: string;
  readonly 'Permissions-Policy': string;
}

export interface SanitizedInput<T = string> {
  readonly original: T;
  readonly sanitized: T;
  readonly wasModified: boolean;
  readonly removedPatterns: string[];
}

export interface ValidationResult<T> {
  readonly isValid: boolean;
  readonly data?: T;
  readonly errors: string[];
  readonly warnings: string[];
}

export interface ThreatDetection {
  readonly patterns: RegExp[];
  readonly severity: SecurityEvent['severity'];
  readonly action: 'block' | 'warn' | 'log';
}