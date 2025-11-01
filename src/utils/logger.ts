/**
 * Structured logging utility following Skygorilla observability standards
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

interface LogEntry {
  timestamp: string;
  level: keyof typeof LogLevel;
  message: string;
  correlationId?: string;
  userId?: string;
  component?: string;
  metadata?: Record<string, unknown>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

class Logger {
  private correlationId: string;
  private component?: string;
  private userId?: string;

  constructor(component?: string) {
    this.correlationId = this.generateCorrelationId();
    this.component = component;
  }

  private generateCorrelationId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private sanitizeMessage(message: string): string {
    return message
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');
  }

  private createLogEntry(
    level: keyof typeof LogLevel,
    message: string,
    metadata?: Record<string, unknown>,
    error?: Error
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message: this.sanitizeMessage(message),
      correlationId: this.correlationId,
      userId: this.userId,
      component: this.component,
      metadata: metadata ? this.sanitizeMetadata(metadata) : undefined,
      error: error ? {
        name: error.name,
        message: this.sanitizeMessage(error.message),
        stack: error.stack,
      } : undefined,
    };
  }

  private sanitizeMetadata(metadata: Record<string, unknown>): Record<string, unknown> {
    const sanitized: Record<string, unknown> = {};
    
    try {
      for (const [key, value] of Object.entries(metadata)) {
        const sanitizedKey = this.sanitizeMessage(key);
        if (typeof value === 'string') {
          sanitized[sanitizedKey] = this.sanitizeMessage(value);
        } else if (typeof value === 'object' && value !== null) {
          try {
            sanitized[sanitizedKey] = JSON.stringify(value).substring(0, 1000);
          } catch {
            sanitized[sanitizedKey] = '[Object]';
          }
        } else {
          sanitized[sanitizedKey] = String(value).substring(0, 100);
        }
      }
    } catch (error) {
      console.error('Metadata sanitization error:', error);
      return { error: 'Failed to sanitize metadata' };
    }
    
    return sanitized;
  }

  private log(entry: LogEntry): void {
    const logString = JSON.stringify(entry);
    
    switch (entry.level) {
      case 'DEBUG':
        console.debug(logString);
        break;
      case 'INFO':
        console.info(logString);
        break;
      case 'WARN':
        console.warn(logString);
        break;
      case 'ERROR':
        console.error(logString);
        break;
    }
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  setCorrelationId(correlationId: string): void {
    this.correlationId = correlationId;
  }

  debug(message: string, metadata?: Record<string, unknown>): void {
    this.log(this.createLogEntry('DEBUG', message, metadata));
  }

  info(message: string, metadata?: Record<string, unknown>): void {
    this.log(this.createLogEntry('INFO', message, metadata));
  }

  warn(message: string, metadata?: Record<string, unknown>): void {
    this.log(this.createLogEntry('WARN', message, metadata));
  }

  error(message: string, error?: Error, metadata?: Record<string, unknown>): void {
    this.log(this.createLogEntry('ERROR', message, metadata, error));
  }

  // Performance logging
  performance(operation: string, duration: number, metadata?: Record<string, unknown>): void {
    this.info(`Performance: ${operation}`, {
      ...metadata,
      duration_ms: duration,
      operation,
    });
  }

  // Security event logging
  security(event: string, metadata?: Record<string, unknown>): void {
    this.warn(`Security: ${event}`, {
      ...metadata,
      event_type: 'security',
      event,
    });
  }

  // Business event logging
  business(event: string, metadata?: Record<string, unknown>): void {
    this.info(`Business: ${event}`, {
      ...metadata,
      event_type: 'business',
      event,
    });
  }
}

// Global logger instance
export const logger = new Logger();

// Component-specific logger factory
export const createLogger = (component: string): Logger => {
  return new Logger(component);
};

// Performance measurement utility
export const measurePerformance = async <T>(
  operation: string,
  fn: () => Promise<T> | T,
  componentLogger?: Logger
): Promise<T> => {
  const start = performance.now();
  const log = componentLogger || logger;
  
  try {
    const result = await fn();
    const duration = performance.now() - start;
    log.performance(operation, duration);
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    log.error(`${operation} failed`, error as Error, { duration_ms: duration });
    throw error;
  }
};