'use client';

import { useState, useEffect } from 'react';
import { checkRuntimeErrors } from '@/utils/errorChecker';
import { useConfigDetector } from './useConfigDetector';
import { useHydrationDetector } from './useHydrationDetector';
import { useReactErrorDetector } from './useReactErrorDetector';

export const useErrorDetector = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [ssrErrors, setSsrErrors] = useState<string[]>([]);
  const { issues: configIssues } = useConfigDetector();
  const { hydrationErrors } = useHydrationDetector();
  const { reactErrors } = useReactErrorDetector();

  useEffect(() => {
    // Check for existing runtime errors
    if (typeof window !== 'undefined') {
      const existingErrors = checkRuntimeErrors();
      if (existingErrors.length > 0) {
        setErrors(existingErrors);
      }
    }

    const handleError = (e: ErrorEvent) => {
      const errorMsg = e.message;
      
      // Categorize error types
      if (errorMsg.includes('document is not defined')) {
        setSsrErrors(prev => [...prev.slice(-2), 'SSR: ' + errorMsg]);
      } else if (errorMsg.includes('Clipboard')) {
        setErrors(prev => [...prev.slice(-3), 'API: ' + errorMsg]);
      } else {
        setErrors(prev => [...prev.slice(-3), errorMsg]);
      }
    };

    const handleRejection = (e: PromiseRejectionEvent) => {
      setErrors(prev => [...prev.slice(-3), `Promise: ${e.reason}`]);
    };

    // Capture console errors
    const originalError = console.error;
    console.error = (...args) => {
      setErrors(prev => [...prev.slice(-3), args.join(' ')]);
      originalError(...args);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      console.error = originalError;
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  const configErrors = configIssues.map(issue => `CONFIG: ${issue.message}`);
  const hydrationErrs = hydrationErrors.map(err => `HYDRATION: ${err.slice(0, 50)}`);
  const allErrors = [...errors, ...ssrErrors, ...configErrors, ...hydrationErrs, ...reactErrors];
  
  return { 
    errors: allErrors, 
    count: allErrors.length,
    ssrErrors: ssrErrors.length,
    apiErrors: errors.filter(e => e.includes('API:')).length,
    configIssues: configIssues.length,
    hydrationErrors: hydrationErrors.length,
    reactErrors: reactErrors.length,
    recommendations: configIssues.map(i => i.recommendation)
  };
};