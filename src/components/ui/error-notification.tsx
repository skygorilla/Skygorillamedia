'use client';

import { AlertTriangle, X, Zap } from 'lucide-react';
import { useRuntimeErrorDetector } from '@/hooks/useRuntimeErrorDetector';

export function ErrorNotification() {
  const { errors, clearErrors } = useRuntimeErrorDetector();

  if (errors.length === 0) return null;

  const handleAutoFix = (error: any) => {
    if (error.fix) {
      error.fix();
    }
  };

  return (
    <div className="sg-error-notification">
      <div className="sg-error-notification__header">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <span className="sg-error-notification__count">{errors.length}</span>
          <span>Runtime Issues</span>
        </div>
        <button onClick={clearErrors} className="sg-error-notification__clear">
          <X className="h-4 w-4" />
        </button>
      </div>
      
      {errors.slice(-3).map(error => (
        <div key={error.id} className="sg-error-notification__item">
          <div className="sg-error-notification__message">
            {error.message.slice(0, 60)}...
          </div>
          {error.autoFixable && (
            <button 
              onClick={() => handleAutoFix(error)}
              className="sg-error-notification__fix flex items-center gap-1"
            >
              <Zap className="h-3 w-3" />
              Fix
            </button>
          )}
        </div>
      ))}
    </div>
  );
}