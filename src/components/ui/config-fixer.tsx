'use client';

import { useState, useEffect } from 'react';
import { Settings, TestTube, Wrench, AlertCircle } from 'lucide-react';
import { runConfigValidation } from '@/utils/configValidator';
import { testConfigDetection } from '@/utils/testConfigDetection';

export function ConfigFixer() {
  const [issues, setIssues] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [fixing, setFixing] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setIssues(runConfigValidation());
  }, []);

  if (!mounted) return null;

  const handleFix = async (issueId: string) => {
    setFixing(issueId);
    
    const { configChecks } = await import('@/utils/configValidator');
    const check = configChecks.find(c => c.id === issueId);
    
    if (check?.autoFix) {
      check.autoFix();
      setTimeout(() => {
        setIssues(runConfigValidation());
        setFixing(null);
      }, 1000);
    }
  };

  if (!mounted || issues.length === 0) return null;

  return (
    <div className="config-fixer">
      <div className="config-fixer__header">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <h3>Configuration Issues</h3>
        </div>
        <button 
          onClick={() => {
            testConfigDetection();
            setIssues(runConfigValidation());
          }}
          className="config-fixer__test flex items-center gap-1"
        >
          <TestTube className="h-3 w-3" />
          Test
        </button>
      </div>
      {issues.map(issue => (
        <div key={issue.id} className="config-issue">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="config-issue__text">
              <div>{issue.message}</div>
              <div className="config-issue__rec flex items-center gap-1">
                <span className="text-xs">💡</span> {issue.recommendation}
              </div>
            </div>
          </div>
          {issue.autoFix && (
            <button 
              onClick={() => handleFix(issue.id)}
              disabled={fixing === issue.id}
              className="config-issue__fix flex items-center gap-1"
            >
              <Wrench className="h-3 w-3" />
              {fixing === issue.id ? 'Fixing...' : 'Fix'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}