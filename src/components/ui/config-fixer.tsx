'use client';

import { useState, useEffect } from 'react';
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
        <h3>Configuration Issues</h3>
        <button 
          onClick={() => {
            testConfigDetection();
            setIssues(runConfigValidation());
          }}
          className="config-fixer__test"
        >
          Test
        </button>
      </div>
      {issues.map(issue => (
        <div key={issue.id} className="config-issue">
          <div className="config-issue__text">
            <div>{issue.message}</div>
            <div className="config-issue__rec">💡 {issue.recommendation}</div>
          </div>
          {issue.autoFix && (
            <button 
              onClick={() => handleFix(issue.id)}
              disabled={fixing === issue.id}
              className="config-issue__fix"
            >
              {fixing === issue.id ? 'Fixing...' : 'Fix'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}