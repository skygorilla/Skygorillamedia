'use client';

import Link from 'next/link';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { useEffect, useState } from 'react';

interface DevTool {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  status: 'active' | 'warning' | 'error';
}

export default function DevToolsPage() {
  const [tools] = useState<DevTool[]>([
    {
      id: 'sitemap',
      title: 'Sitemap Health',
      description: 'Monitor site structure and page health',
      icon: '📄',
      href: '/devtools/sitemap',
      color: 'blue',
      status: 'active'
    },
    {
      id: 'console',
      title: 'Error Console',
      description: 'View and fix runtime errors',
      icon: '⚠️',
      href: '/devtools/console',
      color: 'red',
      status: 'warning'
    },
    {
      id: 'network',
      title: 'Network Monitor',
      description: 'Track network requests and performance',
      icon: '🌐',
      href: '/devtools/network',
      color: 'green',
      status: 'active'
    },
    {
      id: 'elements',
      title: 'Element Inspector',
      description: 'Detect unassigned buttons and links',
      icon: '🔍',
      href: '/devtools/elements',
      color: 'purple',
      status: 'active'
    },
    {
      id: 'review',
      title: 'Code Review',
      description: 'Analyze code quality and find issues',
      icon: '📋',
      href: '/devtools/review',
      color: 'orange',
      status: 'error'
    },
    {
      id: 'performance',
      title: 'Performance',
      description: 'Monitor app performance metrics',
      icon: '⚡',
      href: '/devtools/performance',
      color: 'yellow',
      status: 'active'
    }
  ]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 p-6">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800">← Back to Site</Link>
            <Link href="/pitch" className="text-green-600 hover:text-green-800">Glas Otoka →</Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">SKYGORILLA Development Tools</h1>
          <p className="text-gray-600 mt-2">World-class development and debugging utilities</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div key={tool.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative">
              <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${
                tool.status === 'active' ? 'bg-green-500' :
                tool.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <div className="text-2xl mb-3">{tool.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{tool.title}</h2>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <Link 
                href={tool.href} 
                className={`bg-${tool.color}-600 text-white px-4 py-2 rounded hover:bg-${tool.color}-700 transition-colors inline-block`}
              >
                Open Tool
              </Link>
            </div>
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
}