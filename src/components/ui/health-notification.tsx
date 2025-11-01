'use client';

import { useState, useMemo, useCallback } from 'react';
import { useSitemapHealth } from '@/hooks/useSitemapHealth';

export function HealthNotification() {
  const { issues, isScanning, autoFix } = useSitemapHealth();
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  
  const handleAutoFix = useCallback(async (issueId: string) => {
    try {
      const success = await autoFix(issueId);
      if (success) {
        setDismissed(prev => new Set([...prev, issueId]));
        // Announce success to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.textContent = 'Issue fixed successfully';
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
      }
    } catch (error) {
      console.error('Auto-fix failed:', error);
    }
  }, [autoFix]);

  const handleDismiss = useCallback((issueId: string) => {
    setDismissed(prev => new Set([...prev, issueId]));
  }, []);
  
  const visibleIssues = useMemo(() => 
    issues.filter(issue => !dismissed.has(issue.id)), 
    [issues, dismissed]
  );
  
  if (visibleIssues.length === 0 || process.env.NODE_ENV === 'production') return null;

  return (
    <div className="sg-health-notification" role="region" aria-label="Site health notifications">
      {visibleIssues.map(issue => (
        <div 
          key={issue.id} 
          className={`sg-health-notification__item sg-health-notification__item--${issue.severity}`}
          role="alert"
          aria-describedby={`issue-${issue.id}`}
        >
          <div className="sg-health-notification__content">
            <span 
              className="sg-health-notification__icon"
              aria-label={`${issue.severity} severity issue`}
            >
              {issue.severity === 'high' ? '🚨' : issue.severity === 'medium' ? '⚠️' : 'ℹ️'}
            </span>
            <div className="sg-health-notification__content-text">
              <span id={`issue-${issue.id}`} className="sg-health-notification__message">{issue.message}</span>
              {(issue as any).recommendation && (
                <div className="sg-health-notification__recommendation">
                  💡 {(issue as any).recommendation}
                </div>
              )}
            </div>
          </div>
          <div className="sg-health-notification__actions">
            {issue.autoFixable && (
              <button 
                className="sg-health-notification__fix"
                onClick={() => handleAutoFix(issue.id)}
                disabled={isScanning}
                aria-label={`Auto fix issue: ${issue.message}`}
              >
                {isScanning ? 'Fixing...' : 'Auto Fix'}
              </button>
            )}
            <button 
              className="sg-health-notification__dismiss"
              onClick={() => handleDismiss(issue.id)}
              aria-label={`Dismiss notification: ${issue.message}`}
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}