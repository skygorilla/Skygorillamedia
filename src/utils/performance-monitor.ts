/**
 * SKYGORILLA Performance Monitor - World-class performance tracking
 */

import { logger } from './logger';

export interface PerformanceMetrics {
  readonly lcp: number; // Largest Contentful Paint
  readonly fid: number; // First Input Delay
  readonly cls: number; // Cumulative Layout Shift
  readonly fcp: number; // First Contentful Paint
  readonly ttfb: number; // Time to First Byte
}

export interface ResourceTiming {
  readonly name: string;
  readonly duration: number;
  readonly size: number;
  readonly type: 'script' | 'stylesheet' | 'image' | 'font' | 'other';
}

class PerformanceMonitor {
  private observer: PerformanceObserver | null = null;
  private metrics: Partial<PerformanceMetrics> = {};
  private thresholds: PerformanceMetrics = {
    lcp: 2500, // 2.5s
    fid: 100,  // 100ms
    cls: 0.1,  // 0.1
    fcp: 1800, // 1.8s
    ttfb: 600  // 600ms
  };

  constructor() {
    this.initializeObserver();
    this.measureCoreWebVitals();
  }

  private initializeObserver(): void {
    try {
      if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
        return;
      }

      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.processEntry(entry);
        }
      });

      this.observer.observe({ 
        entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] 
      });
    } catch (error) {
      logger.error('Performance observer initialization failed', error as Error);
    }
  }

  private processEntry(entry: PerformanceEntry): void {
    try {
      switch (entry.entryType) {
        case 'navigation':
          this.handleNavigationEntry(entry as PerformanceNavigationTiming);
          break;
        case 'paint':
          this.handlePaintEntry(entry as PerformancePaintTiming);
          break;
        case 'largest-contentful-paint':
          this.handleLCPEntry(entry as any);
          break;
        case 'first-input':
          this.handleFIDEntry(entry as any);
          break;
        case 'layout-shift':
          this.handleCLSEntry(entry as any);
          break;
      }
    } catch (error) {
      logger.error('Performance entry processing failed', error as Error, { entryType: entry.entryType });
    }
  }

  private handleNavigationEntry(entry: PerformanceNavigationTiming): void {
    const ttfb = entry.responseStart - entry.requestStart;
    this.metrics.ttfb = ttfb;
    
    if (ttfb > this.thresholds.ttfb) {
      logger.warn('TTFB threshold exceeded', { ttfb, threshold: this.thresholds.ttfb });
    }
  }

  private handlePaintEntry(entry: PerformancePaintTiming): void {
    if (entry.name === 'first-contentful-paint') {
      this.metrics.fcp = entry.startTime;
      
      if (entry.startTime > this.thresholds.fcp) {
        logger.warn('FCP threshold exceeded', { fcp: entry.startTime, threshold: this.thresholds.fcp });
      }
    }
  }

  private handleLCPEntry(entry: any): void {
    this.metrics.lcp = entry.startTime;
    
    if (entry.startTime > this.thresholds.lcp) {
      logger.warn('LCP threshold exceeded', { lcp: entry.startTime, threshold: this.thresholds.lcp });
    }
  }

  private handleFIDEntry(entry: any): void {
    this.metrics.fid = entry.processingStart - entry.startTime;
    
    if (this.metrics.fid > this.thresholds.fid) {
      logger.warn('FID threshold exceeded', { fid: this.metrics.fid, threshold: this.thresholds.fid });
    }
  }

  private handleCLSEntry(entry: any): void {
    if (!entry.hadRecentInput) {
      this.metrics.cls = (this.metrics.cls || 0) + entry.value;
      
      if (this.metrics.cls > this.thresholds.cls) {
        logger.warn('CLS threshold exceeded', { cls: this.metrics.cls, threshold: this.thresholds.cls });
      }
    }
  }

  private measureCoreWebVitals(): void {
    if (typeof window === 'undefined') return;

    // Measure using web-vitals library patterns
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS((metric) => {
        this.metrics.cls = metric.value;
        logger.performance('CLS', metric.value, { rating: metric.rating });
      });

      getFID((metric) => {
        this.metrics.fid = metric.value;
        logger.performance('FID', metric.value, { rating: metric.rating });
      });

      getFCP((metric) => {
        this.metrics.fcp = metric.value;
        logger.performance('FCP', metric.value, { rating: metric.rating });
      });

      getLCP((metric) => {
        this.metrics.lcp = metric.value;
        logger.performance('LCP', metric.value, { rating: metric.rating });
      });

      getTTFB((metric) => {
        this.metrics.ttfb = metric.value;
        logger.performance('TTFB', metric.value, { rating: metric.rating });
      });
    }).catch((error) => {
      logger.error('Web vitals measurement failed', error);
    });
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public getResourceTimings(): ResourceTiming[] {
    if (typeof window === 'undefined') return [];

    try {
      const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      
      return entries.map(entry => ({
        name: entry.name.substring(0, 100), // Limit length
        duration: Math.round(entry.duration),
        size: entry.transferSize || 0,
        type: this.getResourceType(entry.name)
      }));
    } catch (error) {
      logger.error('Resource timing collection failed', error as Error);
      return [];
    }
  }

  private getResourceType(url: string): ResourceTiming['type'] {
    const extension = url.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'js':
      case 'mjs':
        return 'script';
      case 'css':
        return 'stylesheet';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
      case 'svg':
        return 'image';
      case 'woff':
      case 'woff2':
      case 'ttf':
      case 'otf':
        return 'font';
      default:
        return 'other';
    }
  }

  public measureOperation<T>(name: string, operation: () => T): T {
    const start = performance.now();
    
    try {
      const result = operation();
      const duration = performance.now() - start;
      
      logger.performance(name, duration);
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      logger.error(`Operation ${name} failed`, error as Error, { duration });
      throw error;
    }
  }

  public async measureAsyncOperation<T>(name: string, operation: () => Promise<T>): Promise<T> {
    const start = performance.now();
    
    try {
      const result = await operation();
      const duration = performance.now() - start;
      
      logger.performance(name, duration);
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      logger.error(`Async operation ${name} failed`, error as Error, { duration });
      throw error;
    }
  }

  public destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Utility functions
export const measurePerformance = <T>(name: string, operation: () => T): T => {
  return performanceMonitor.measureOperation(name, operation);
};

export const measureAsyncPerformance = <T>(name: string, operation: () => Promise<T>): Promise<T> => {
  return performanceMonitor.measureAsyncOperation(name, operation);
};