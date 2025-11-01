'use client';

import React from 'react';
import Link from 'next/link';
import { useErrorDetector } from '@/hooks/useErrorDetector';
import { useRealTimeErrors } from '@/hooks/useRealTimeErrors';
import { ErrorBoundary } from '@/components/ui/error-boundary';

export default function ConsolePage() {
  const { errors, count, ssrErrors, apiErrors, configIssues, hydrationErrors, reactErrors } = useErrorDetector();
  const { errors: realTimeErrors, clearErrors } = useRealTimeErrors();

  const allErrors = React.useMemo(() => {
    try {
      return [...errors, ...realTimeErrors.map(e => e.message || 'Unknown error')];
    } catch (error) {
      console.error('Error processing console data:', error);
      return [];
    }
  }, [errors, realTimeErrors]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 p-6">
        <header className="mb-8">
          <Link href="/devtools" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">← Back to DevTools</Link>
          <h1 className="text-3xl font-bold text-gray-900">Error Console</h1>
          <p className="text-gray-600 mt-2">Runtime errors and debugging information</p>
        </header>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{count}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{ssrErrors}</div>
            <div className="text-sm text-gray-600">SSR</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{apiErrors}</div>
            <div className="text-sm text-gray-600">API</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{configIssues}</div>
            <div className="text-sm text-gray-600">Config</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{hydrationErrors}</div>
            <div className="text-sm text-gray-600">Hydration</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{reactErrors}</div>
            <div className="text-sm text-gray-600">React</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Console Output</h2>
            <button 
              onClick={clearErrors}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Clear All
            </button>
          </div>
          
          <div className="p-4 max-h-96 overflow-y-auto">
            {allErrors.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-2">✅</div>
                <div>No errors found</div>
              </div>
            ) : (
              <div className="space-y-2">
                {allErrors.map((error, i) => (
                  <div key={i} className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                    <div className="flex items-start">
                      <span className="text-red-500 mr-2">❌</span>
                      <span className="text-sm font-mono text-gray-800">{error}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}