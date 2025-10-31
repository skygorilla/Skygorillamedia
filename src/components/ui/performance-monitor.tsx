'use client';

import { useSitemapPerformance } from '@/hooks/useSitemapPerformance';

export function PerformanceMonitor() {
  const { metrics, isMonitoring, startMonitoring, stopMonitoring } = useSitemapPerformance();

  const getStatusColor = (value: number, type: 'availability' | 'cache' | 'error') => {
    try {
      if (type === 'availability' || type === 'cache') {
        return value >= 90 ? 'green' : value >= 70 ? 'yellow' : 'red';
      }
      return value <= 5 ? 'green' : value <= 15 ? 'yellow' : 'red';
    } catch {
      return 'gray';
    }
  };

  const handleToggleMonitoring = () => {
    try {
      isMonitoring ? stopMonitoring() : startMonitoring();
    } catch (error) {
      console.error('Monitor toggle failed:', error);
    }
  };

  return (
    <div className="sg-perf-monitor">
      <div className="sg-perf-monitor__header">
        <h3>Sitemap Performance</h3>
        <button 
          className={`sg-perf-monitor__toggle ${isMonitoring ? 'active' : ''}`}
          onClick={handleToggleMonitoring}
          aria-pressed={isMonitoring}
          aria-label={`${isMonitoring ? 'Stop' : 'Start'} performance monitoring`}
        >
          {isMonitoring ? 'Stop' : 'Start'} Monitor
        </button>
      </div>
      
      {isMonitoring && (
        <div className="sg-perf-monitor__metrics" role="group" aria-label="Performance metrics">
          <div className="sg-perf-metric">
            <span className="sg-perf-metric__label">Availability</span>
            <span 
              className={`sg-perf-metric__value sg-perf-metric__value--${getStatusColor(metrics.availability, 'availability')}`}
              aria-label={`Site availability: ${metrics.availability} percent`}
            >
              {metrics.availability}%
            </span>
          </div>
          
          <div className="sg-perf-metric">
            <span className="sg-perf-metric__label">Cache Hit Rate</span>
            <span className={`sg-perf-metric__value sg-perf-metric__value--${getStatusColor(metrics.cacheHitRate, 'cache')}`}>
              {metrics.cacheHitRate}%
            </span>
          </div>
          
          <div className="sg-perf-metric">
            <span className="sg-perf-metric__label">Scan Time</span>
            <span className="sg-perf-metric__value">
              {metrics.scanDuration}ms
            </span>
          </div>
          
          <div className="sg-perf-metric">
            <span className="sg-perf-metric__label">Error Rate</span>
            <span className={`sg-perf-metric__value sg-perf-metric__value--${getStatusColor(metrics.errorRate, 'error')}`}>
              {metrics.errorRate}%
            </span>
          </div>
          
          <div className="sg-perf-metric">
            <span className="sg-perf-metric__label">Requests</span>
            <span className="sg-perf-metric__value">
              {metrics.requestCount}
            </span>
          </div>
        </div>
      )}
      
      {metrics.lastScanTime > 0 && (
        <div className="sg-perf-monitor__footer">
          Last scan: {new Date(metrics.lastScanTime).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}