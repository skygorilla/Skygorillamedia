'use client';

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
        <span className="sg-error-notification__count">{errors.length}</span>
        <span>Runtime Issues</span>
        <button onClick={clearErrors} className="sg-error-notification__clear">×</button>
      </div>
      
      {errors.slice(-3).map(error => (
        <div key={error.id} className="sg-error-notification__item">
          <div className="sg-error-notification__message">
            {error.message.slice(0, 60)}...
          </div>
          {error.autoFixable && (
            <button 
              onClick={() => handleAutoFix(error)}
              className="sg-error-notification__fix"
            >
              Fix
            </button>
          )}
        </div>
      ))}
    </div>
  );
}