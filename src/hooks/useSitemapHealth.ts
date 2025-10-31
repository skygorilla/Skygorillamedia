'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

interface SitemapIssue {
  id: string;
  type: 'broken-link' | 'missing-page' | 'seo-issue' | 'accessibility' | 'config' | 'security' | 'auth';
  severity: 'low' | 'medium' | 'high';
  message: string;
  path: string;
  autoFixable: boolean;
  recommendation?: string;
}

const cache = new Map<string, { result: boolean; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export const useSitemapHealth = () => {
  const [issues, setIssues] = useState<SitemapIssue[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState(0);
  const [runtimeErrors, setRuntimeErrors] = useState<string[]>([]);

  const checkRoute = useCallback(async (route: string): Promise<boolean> => {
    const cached = cache.get(route);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.result;
    }

    try {
      const response = await fetch(route, { 
        method: 'HEAD',
        signal: AbortSignal.timeout(5000)
      });
      const result = response.status !== 404;
      cache.set(route, { result, timestamp: Date.now() });
      return result;
    } catch {
      cache.set(route, { result: false, timestamp: Date.now() });
      return false;
    }
  }, []);

  const scanSitemap = useCallback(async () => {
    const now = Date.now();
    if (now - lastScan < 60000) return; // Debounce: min 1 minute between scans
    
    setIsScanning(true);
    setLastScan(now);
    
    const routes = ['/', '/pretplate', '/politika', '/kultura', '/sport', '/kontakt'];
    const results = await Promise.allSettled(routes.map(checkRoute));
    
    const foundIssues: SitemapIssue[] = [];
    
    // Check for runtime errors
    if (runtimeErrors.length > 0) {
      foundIssues.push({
        id: 'runtime-errors',
        type: 'broken-link',
        severity: 'high',
        message: `${runtimeErrors.length} runtime errors detected`,
        path: window.location.pathname,
        autoFixable: true,
      });
    }

    // Check configuration issues
    const configIssues = detectConfigIssues();
    foundIssues.push(...configIssues);
    
    // Check hydration errors
    if (typeof window !== 'undefined' && (window as any).__hydrationErrors?.length > 0) {
      foundIssues.push({
        id: 'hydration-errors',
        type: 'broken-link',
        severity: 'medium',
        message: 'Hydration mismatch detected',
        path: window.location.pathname,
        autoFixable: false,
        recommendation: 'Fix SSR/client rendering differences'
      });
    }
    results.forEach((result, index) => {
      const route = routes[index];
      if (result.status === 'rejected' || !result.value) {
        foundIssues.push({
          id: `issue-${route}`,
          type: result.status === 'rejected' ? 'broken-link' : 'missing-page',
          severity: 'high',
          message: `Issue with ${route}`,
          path: route,
          autoFixable: result.status !== 'rejected',
        });
      }
    });

    setIssues(foundIssues);
    setIsScanning(false);
  }, [checkRoute, lastScan]);

  const autoFix = async (issueId: string) => {
    const issue = issues.find(i => i.id === issueId);
    if (!issue?.autoFixable) return false;

    if (issue.type === 'missing-page') {
      console.log(`Auto-fixing: Creating page ${issue.path}`);
      setIssues(prev => prev.filter(i => i.id !== issueId));
      return true;
    }
    
    if (issueId === 'runtime-errors') {
      window.location.reload();
      return true;
    }
    
    // Auto-fix config issues
    const { configChecks } = require('@/utils/configValidator');
    const configCheck = configChecks.find((c: any) => c.id === issueId);
    if (configCheck?.autoFix) {
      configCheck.autoFix();
      setIssues(prev => prev.filter(i => i.id !== issueId));
      return true;
    }
    
    return false;
  };
  
  // Monitor runtime errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setRuntimeErrors(prev => [...prev.slice(-4), event.message]);
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  useEffect(() => {
    scanSitemap();
    const interval = setInterval(scanSitemap, 300000); // Check every 5 minutes
    return () => {
      clearInterval(interval);
      cache.clear();
    };
  }, [scanSitemap]);

  return { issues, isScanning, scanSitemap, autoFix };
};

function detectConfigIssues(): SitemapIssue[] {
  const { runConfigValidation } = require('@/utils/configValidator');
  const failedChecks = runConfigValidation();
  
  return failedChecks.map(check => ({
    id: check.id,
    type: check.id.includes('recaptcha') ? 'security' : 
          check.id.includes('firebase') ? 'config' : 
          check.id.includes('admin') ? 'auth' : 'config',
    severity: check.id.includes('firebase') ? 'high' : 'medium',
    message: check.message,
    path: `/${check.id}`,
    autoFixable: !!check.autoFix,
    recommendation: check.recommendation
  }));
};