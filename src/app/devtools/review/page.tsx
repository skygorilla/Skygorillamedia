'use client';

import { useState } from 'react';
import Link from 'next/link';
import { codeReviewer } from '@/utils/codeReviewer';
import { ErrorBoundary } from '@/components/ui/error-boundary';

interface CodeIssue {
  rule: string;
  line: number;
  message: string;
  severity: 'low' | 'medium' | 'high';
}

interface CodeMetrics {
  lines: number;
  complexity: number;
  functions: number;
}

export default function CodeReviewPage() {
  const [issues, setIssues] = useState<CodeIssue[]>([]);
  const [metrics, setMetrics] = useState<CodeMetrics>({ lines: 0, complexity: 0, functions: 0 });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeCode = async () => {
    try {
      setIsAnalyzing(true);
      const sampleCode = `
function example() {
  console.log('debug message');
  const data: any = getData();
  if (data && data.length > 0 && data.some(item => item.isValid) && data.filter(item => item.status === 'active').length > 10) {
    return data;
  }
}`;
      
      const foundIssues = codeReviewer.analyzeFile(sampleCode, 'example.ts');
      const codeMetrics = codeReviewer.getMetrics(sampleCode);
      
      setIssues(foundIssues || []);
      setMetrics(codeMetrics || { lines: 0, complexity: 0, functions: 0 });
    } catch (error) {
      console.error('Code analysis failed:', error);
      setIssues([]);
      setMetrics({ lines: 0, complexity: 0, functions: 0 });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 p-6">
        <header className="mb-8">
          <Link href="/devtools" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">← Back to DevTools</Link>
          <h1 className="text-3xl font-bold text-gray-900">Code Review</h1>
          <p className="text-gray-600 mt-2">Analyze code quality and find issues</p>
        </header>
        
        <div className="mb-6">
          <button 
            onClick={analyzeCode}
            disabled={isAnalyzing}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Code'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Code Metrics</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Lines:</span>
                <span className="font-mono">{metrics.lines}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Complexity:</span>
                <span className="font-mono">{metrics.complexity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Functions:</span>
                <span className="font-mono">{metrics.functions}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Issues ({issues.length})</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {issues.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <div className="text-4xl mb-2">✅</div>
                  <div>No issues found</div>
                </div>
              ) : (
                issues.map((issue, i) => (
                  <div key={i} className={`border-l-4 p-3 rounded ${
                    issue.severity === 'high' ? 'border-red-500 bg-red-50' :
                    issue.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                    'border-blue-500 bg-blue-50'
                  }`}>
                    <div className="font-semibold text-sm">
                      {issue.rule} - Line {issue.line}
                    </div>
                    <div className="text-sm text-gray-700 mt-1">{issue.message}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}