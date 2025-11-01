'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useSitemapHealth } from '@/hooks/useSitemapHealth';
import { useSitemapPerformance } from '@/hooks/useSitemapPerformance';
import { autoFixEngine } from '@/utils/autoFixEngine';
import { ErrorBoundary } from '@/components/ui/error-boundary';

interface SitemapIssue {
  id: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  autoFixable: boolean;
  recommendation?: string;
}

export default function SitemapPage() {
  const [hideNotifications, setHideNotifications] = useState(false);
  const { issues, isScanning, scanSitemap, autoFix } = useSitemapHealth();
  const { metrics, isMonitoring, startMonitoring } = useSitemapPerformance();

  const handleAutoFixAll = useCallback(async () => {
    try {
      await autoFixEngine.fixAll();
    } catch (error) {
      console.error('Auto-fix operation failed:', error);
    }
  }, []);

  const handleAutoFix = useCallback(async (issueId: string) => {
    try {
      await autoFix(issueId);
    } catch (error) {
      console.error(`Auto-fix failed for issue ${issueId}:`, error);
    }
  }, [autoFix]);

  const handleScanSitemap = useCallback(async () => {
    try {
      await scanSitemap();
    } catch (error) {
      console.error('Sitemap scan failed:', error);
    }
  }, [scanSitemap]);

  const handleToggleMonitoring = useCallback(async () => {
    try {
      await startMonitoring();
    } catch (error) {
      console.error('Monitor toggle failed:', error);
    }
  }, [startMonitoring]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 p-6">
        <header className="mb-8">
          <Link href="/devtools" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">← Back to DevTools</Link>
          <h1 className="text-3xl font-bold text-gray-900">Sitemap Health Monitor</h1>
          <p className="text-gray-600 mt-2">Monitor site structure and page health</p>
        </header>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <button 
              onClick={handleScanSitemap}
              disabled={isScanning}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isScanning ? 'Scanning...' : 'Scan Sitemap'}
            </button>
            
            <button 
              onClick={handleToggleMonitoring}
              className={`px-4 py-2 rounded transition-colors ${
                isMonitoring 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isMonitoring ? 'Stop Monitor' : 'Start Monitor'}
            </button>
            
            <button 
              onClick={handleAutoFixAll}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              🔧 Fix All Issues
            </button>
            
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={hideNotifications}
                onChange={(e) => setHideNotifications(e.target.checked)}
                className="rounded"
                aria-label="Hide warnings and notifications"
              />
              <span className="text-sm text-gray-700">Hide Warnings & Notifications</span>
            </label>
          </div>
        </div>

        {!hideNotifications && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Issues ({issues.length})</h2>
              </div>
              <div className="p-4 max-h-96 overflow-y-auto">
                {issues.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <div className="text-4xl mb-2">✅</div>
                    <div>No issues found</div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {issues.map((issue: SitemapIssue) => (
                      <div key={issue.id} className={`border-l-4 p-3 rounded ${
                        issue.severity === 'high' ? 'border-red-500 bg-red-50' :
                        issue.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                        'border-blue-500 bg-blue-50'
                      }`}>
                        <h3 className="font-semibold text-sm">{issue.message}</h3>
                        {issue.recommendation && (
                          <p className="text-sm text-gray-600 mt-1">{issue.recommendation}</p>
                        )}
                        {issue.autoFixable && (
                          <button 
                            onClick={() => handleAutoFix(issue.id)}
                            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                          >
                            Auto Fix
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Performance Metrics</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Availability:</span>
                    <span className="font-mono text-lg">{metrics.availability || 0}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cache Hit Rate:</span>
                    <span className="font-mono text-lg">{metrics.cacheHitRate || 0}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Scan Duration:</span>
                    <span className="font-mono text-lg">{metrics.scanDuration || 0}ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}