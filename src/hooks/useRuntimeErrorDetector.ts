'use client';

import { useState, useEffect } from 'react';

interface RuntimeError {
  id: string;
  message: string;
  stack?: string;
  component?: string;
  autoFixable: boolean;
  fix?: () => void;
}

export const useRuntimeErrorDetector = () => {
  const [errors, setErrors] = useState<RuntimeError[]>([]);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      try {
        const sanitizedMessage = event.message?.replace(/[<>"'&]/g, '') || 'Unknown error';
        const error: RuntimeError = {
          id: `runtime-${Date.now()}`,
          message: sanitizedMessage,
          stack: event.error?.stack,
          component: extractComponent(event.error?.stack),
          autoFixable: isAutoFixable(sanitizedMessage),
          fix: getAutoFix(sanitizedMessage)
        };
        
        setErrors(prev => [...prev.slice(-9), error]);
      } catch (err) {
        console.error('Error handler failed:', { error: err instanceof Error ? err.message : 'Unknown error' });
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      try {
        const sanitizedReason = String(event.reason).replace(/[<>"'&]/g, '');
        const error: RuntimeError = {
          id: `promise-${Date.now()}`,
          message: `Promise rejected: ${sanitizedReason}`,
          autoFixable: false
        };
        
        setErrors(prev => [...prev.slice(-9), error]);
      } catch (err) {
        console.error('Promise rejection handler failed:', { error: err instanceof Error ? err.message : 'Unknown error' });
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  const clearErrors = () => setErrors([]);
  
  return { errors, clearErrors };
};

function extractComponent(stack?: string): string | undefined {
  if (!stack) return undefined;
  const match = stack.match(/at (\w+)/);
  return match?.[1];
}

function isAutoFixable(message: string): boolean {
  return message.includes('Cannot read properties') || 
         message.includes('is not a function') ||
         message.includes('undefined');
}

function getAutoFix(message: string): (() => void) | undefined {
  try {
    if (message.includes('Cannot read properties')) {
      return () => {
        try {
          window.location.reload();
        } catch (err) {
          console.error('Auto-fix failed:', err);
        }
      };
    }
    return undefined;
  } catch (err) {
    console.error('Get auto-fix failed:', { error: err instanceof Error ? err.message : 'Unknown error' });
    return undefined;
  }
}