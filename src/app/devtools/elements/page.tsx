'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { detectUnassignedElements, UnassignedElement } from '@/utils/unassignedDetector';
import { ErrorBoundary } from '@/components/ui/error-boundary';

export default function ElementsPage() {
  const [elements, setElements] = useState<UnassignedElement[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runScan = useCallback(async () => {
    try {
      setIsScanning(true);
      setError(null);
      
      // Add delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const detected = detectUnassignedElements();
      setElements(detected || []);
    } catch (err) {
      console.error('Element scan failed:', err);
      setError('Failed to scan elements. Please try again.');
      setElements([]);
    } finally {
      setIsScanning(false);
    }
  }, []);

  useEffect(() => {
    runScan();
  }, [runScan]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 p-6">
        <header className="mb-8">
          <Link href="/devtools" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">← Back to DevTools</Link>
          <h1 className="text-3xl font-bold text-gray-900">🔍 Element Inspector</h1>
          <p className="text-gray-600 mt-2">Detect unassigned buttons and interactive elements</p>
        </header>
        
        <div className="mb-6">
          <button 
            onClick={runScan}
            disabled={isScanning}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:opacity-50 transition-colors"
          >
            {isScanning ? 'Scanning...' : 'Scan Elements'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="text-red-700">{error}</div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Unassigned Elements: {elements.length}</h2>
          </div>
          
          <div className="p-4">
            {elements.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-2">✅</div>
                <div>No unassigned elements found</div>
              </div>
            ) : (
              <div className="space-y-4">
                {elements.map(el => (
                  <div key={el.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="font-semibold text-gray-900">
                      &lt;{el.tagName}&gt; {el.text}
                    </div>
                    <div className="text-sm text-red-600 mt-2">
                      Issues: {el.issues.join(', ')}
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