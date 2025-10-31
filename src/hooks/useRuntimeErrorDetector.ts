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
      const error: RuntimeError = {
        id: `runtime-${Date.now()}`,
        message: event.message,
        stack: event.error?.stack,
        component: extractComponent(event.error?.stack),
        autoFixable: isAutoFixable(event.message),
        fix: getAutoFix(event.message)
      };
      
      setErrors(prev => [...prev.slice(-9), error]);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error: RuntimeError = {
        id: `promise-${Date.now()}`,
        message: `Promise rejected: ${event.reason}`,
        autoFixable: false
      };
      
      setErrors(prev => [...prev.slice(-9), error]);
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
  if (message.includes('Cannot read properties')) {
    return () => window.location.reload();
  }
  return undefined;
}