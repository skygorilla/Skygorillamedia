'use client';

import { useState, useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  scanDuration: number;
  cacheHitRate: number;
  requestCount: number;
  errorRate: number;
  availability: number;
  lastScanTime: number;
}

export const useSitemapPerformance = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    scanDuration: 0,
    cacheHitRate: 0,
    requestCount: 0,
    errorRate: 0,
    availability: 100,
    lastScanTime: 0,
  });

  const [isMonitoring, setIsMonitoring] = useState(false);

  const measurePerformance = useCallback(async () => {
    const startTime = performance.now();
    let requests = 0;
    let errors = 0;
    let cacheHits = 0;

    const routes = ['/', '/pitch', '/pretplate', '/politika', '/kultura', '/sport', '/kontakt'];
    
    for (const route of routes) {
      try {
        const cacheKey = `perf_${route}`;
        const cached = sessionStorage.getItem(cacheKey);
        
        if (cached && Date.now() - JSON.parse(cached).timestamp < 60000) {
          cacheHits++;
        } else {
          requests++;
          const response = await fetch(route, { 
            method: 'HEAD',
            signal: AbortSignal.timeout(3000)
          });
          
          if (!response.ok) errors++;
          
          sessionStorage.setItem(cacheKey, JSON.stringify({
            status: response.status,
            timestamp: Date.now()
          }));
        }
      } catch {
        errors++;
        requests++;
      }
    }

    const duration = performance.now() - startTime;
    const totalChecks = requests + cacheHits;
    
    setMetrics({
      scanDuration: Math.round(duration),
      cacheHitRate: totalChecks > 0 ? Math.round((cacheHits / totalChecks) * 100) : 0,
      requestCount: requests,
      errorRate: requests > 0 ? Math.round((errors / requests) * 100) : 0,
      availability: requests > 0 ? Math.round(((requests - errors) / requests) * 100) : 100,
      lastScanTime: Date.now(),
    });
  }, []);

  useEffect(() => {
    if (!isMonitoring) return;
    
    measurePerformance();
    const interval = setInterval(measurePerformance, 120000); // Every 2 minutes
    
    return () => clearInterval(interval);
  }, [isMonitoring, measurePerformance]);

  const startMonitoring = () => setIsMonitoring(true);
  const stopMonitoring = () => setIsMonitoring(false);

  return { metrics, isMonitoring, startMonitoring, stopMonitoring };
};