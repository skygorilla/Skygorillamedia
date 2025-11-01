'use client';

import Link from 'next/link';
import { ErrorBoundary } from '@/components/ui/error-boundary';

export default function DevToolsPage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 p-6">
        <header className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">← Back to Site</Link>
          <h1 className="text-3xl font-bold text-gray-900">Development Tools</h1>
          <p className="text-gray-600 mt-2">Comprehensive development and debugging utilities</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-2xl mb-3">📄</div>
            <h2 className="text-xl font-semibold mb-2">Sitemap Health</h2>
            <p className="text-gray-600 mb-4">Monitor site structure and page health</p>
            <Link href="/devtools/sitemap" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Open Tool
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-2xl mb-3">⚠️</div>
            <h2 className="text-xl font-semibold mb-2">Error Console</h2>
            <p className="text-gray-600 mb-4">View and fix runtime errors</p>
            <Link href="/devtools/console" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
              Open Tool
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-2xl mb-3">🌐</div>
            <h2 className="text-xl font-semibold mb-2">Network Monitor</h2>
            <p className="text-gray-600 mb-4">Track network requests and performance</p>
            <Link href="/devtools/network" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
              Open Tool
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-2xl mb-3">🔍</div>
            <h2 className="text-xl font-semibold mb-2">Element Inspector</h2>
            <p className="text-gray-600 mb-4">Detect unassigned buttons and links</p>
            <Link href="/devtools/elements" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
              Open Tool
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-2xl mb-3">📋</div>
            <h2 className="text-xl font-semibold mb-2">Code Review</h2>
            <p className="text-gray-600 mb-4">Analyze code quality and find issues</p>
            <Link href="/devtools/review" className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors">
              Open Tool
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-2xl mb-3">⚡</div>
            <h2 className="text-xl font-semibold mb-2">Performance</h2>
            <p className="text-gray-600 mb-4">Monitor app performance metrics</p>
            <Link href="/devtools/performance" className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors">
              Open Tool
            </Link>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}