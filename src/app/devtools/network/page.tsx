'use client';

import Link from 'next/link';
import { useNetworkMonitor } from '@/hooks/useNetworkMonitor';
import { ErrorBoundary } from '@/components/ui/error-boundary';

export default function NetworkPage() {
  const { requests, clearRequests } = useNetworkMonitor();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 p-6">
        <header className="mb-8">
          <Link href="/devtools" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">← Back to DevTools</Link>
          <h1 className="text-3xl font-bold text-gray-900">Network Monitor</h1>
          <p className="text-gray-600 mt-2">Track network requests and performance</p>
        </header>
        
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold">Network Requests</h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Total: {requests.length}</span>
            </div>
            <button 
              onClick={clearRequests}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Clear Requests
            </button>
          </div>
          
          <div className="overflow-x-auto">
            {requests.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-2">🌐</div>
                <div>No network requests captured</div>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">URL</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Size</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {requests.map(req => (
                    <tr key={req.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 font-mono truncate max-w-xs">{req.url}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          req.status >= 400 ? 'bg-red-100 text-red-800' : 
                          req.status >= 300 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {req.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{req.type || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{req.size > 0 ? `${(req.size/1024).toFixed(1)}KB` : '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{req.time > 0 ? `${req.time.toFixed(0)}ms` : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}