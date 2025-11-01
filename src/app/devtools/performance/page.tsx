'use client';

import Link from 'next/link';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { ErrorBoundary } from '@/components/ui/error-boundary';

export default function PerformancePage() {
  const metrics = usePerformanceMonitor();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 p-6">
        <header className="mb-8">
          <Link href="/devtools" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">← Back to DevTools</Link>
          <h1 className="text-3xl font-bold text-gray-900">Performance Monitor</h1>
          <p className="text-gray-600 mt-2">Real-time application performance metrics</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">Load Time</h3>
            <div className="text-3xl font-bold text-blue-600">
              {metrics.loadTime > 0 ? (metrics.loadTime / 1000).toFixed(2) : '0.00'}s
            </div>
            <p className="text-gray-500 text-sm">Time to fully load page</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">DOM Content Loaded</h3>
            <div className="text-3xl font-bold text-green-600">
              {metrics.domContentLoaded > 0 ? (metrics.domContentLoaded / 1000).toFixed(2) : '0.00'}s
            </div>
            <p className="text-gray-500 text-sm">DOM parsing complete</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">First Paint</h3>
            <div className="text-3xl font-bold text-purple-600">
              {metrics.firstPaint > 0 ? (metrics.firstPaint / 1000).toFixed(2) : '0.00'}s
            </div>
            <p className="text-gray-500 text-sm">First visual render</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">First Contentful Paint</h3>
            <div className="text-3xl font-bold text-orange-600">
              {metrics.firstContentfulPaint > 0 ? (metrics.firstContentfulPaint / 1000).toFixed(2) : '0.00'}s
            </div>
            <p className="text-gray-500 text-sm">First content render</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">Memory Usage</h3>
            <div className="text-3xl font-bold text-red-600">
              {metrics.memoryUsage > 0 ? (metrics.memoryUsage / 1024 / 1024).toFixed(1) : '0.0'}MB
            </div>
            <p className="text-gray-500 text-sm">Current memory usage</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">JS Heap Size</h3>
            <div className="text-3xl font-bold text-yellow-600">
              {metrics.jsHeapSize > 0 ? (metrics.jsHeapSize / 1024 / 1024).toFixed(1) : '0.0'}MB
            </div>
            <p className="text-gray-500 text-sm">JavaScript heap size</p>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}