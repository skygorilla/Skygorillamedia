import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  memoryUsage: number;
  jsHeapSize: number;
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    domContentLoaded: 0,
    firstPaint: 0,
    firstContentfulPaint: 0,
    memoryUsage: 0,
    jsHeapSize: 0,
  });

  useEffect(() => {
    const updateMetrics = () => {
      try {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');
        
        const newMetrics: PerformanceMetrics = {
          loadTime: navigation ? Math.max(0, navigation.loadEventEnd - navigation.fetchStart) : 0,
          domContentLoaded: navigation ? Math.max(0, navigation.domContentLoadedEventEnd - navigation.fetchStart) : 0,
          firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
          firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
          memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
          jsHeapSize: (performance as any).memory?.totalJSHeapSize || 0,
        };

        setMetrics(newMetrics);
      } catch (error) {
        console.error('Performance metrics update failed:', error);
      }
    };

    // Update immediately with error handling
    try {
      updateMetrics();
    } catch (error) {
      console.error('Initial performance metrics failed:', error);
    }

    // Update periodically with debouncing
    const interval = setInterval(() => {
      try {
        updateMetrics();
      } catch (error) {
        console.error('Periodic performance metrics failed:', error);
      }
    }, 5000); // Reduced frequency for better performance

    return () => {
      try {
        clearInterval(interval);
      } catch (error) {
        console.error('Cleanup failed:', error);
      }
    };
  }, []);

  return metrics;
};