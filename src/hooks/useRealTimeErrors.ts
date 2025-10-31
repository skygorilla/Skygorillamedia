import { useState, useEffect } from 'react';
import { ConsoleError } from '@/types/console';

const MAX_ERRORS = 50; // Prevent memory overflow

export const useRealTimeErrors = () => {
  const [errors, setErrors] = useState<ConsoleError[]>([]);

  useEffect(() => {
    let capturedErrors: ConsoleError[] = [];

    // Capture console errors
    const originalError = console.error;
    const originalWarn = console.warn;

    const addError = (error: ConsoleError) => {
      capturedErrors = [...capturedErrors.slice(-MAX_ERRORS + 1), error];
      setErrors([...capturedErrors]);
    };

    console.error = (...args: any[]) => {
      try {
        const error: ConsoleError = {
          id: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: 'javascript',
          severity: 'error',
          message: args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
          ).join(' '),
          timestamp: Date.now(),
        };
        addError(error);
      } catch (e) {
        // Prevent infinite loops
      }
      originalError(...args);
    };

    console.warn = (...args: any[]) => {
      try {
        const warning: ConsoleError = {
          id: `warn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: 'javascript',
          severity: 'warning',
          message: args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
          ).join(' '),
          timestamp: Date.now(),
        };
        addError(warning);
      } catch (e) {
        // Prevent infinite loops
      }
      originalWarn(...args);
    };

    // Capture unhandled errors
    const handleError = (event: ErrorEvent) => {
      try {
        const error: ConsoleError = {
          id: `unhandled-${Date.now()}`,
          type: 'javascript',
          severity: 'error',
          message: event.message || 'Unknown error',
          file: event.filename,
          line: event.lineno,
          timestamp: Date.now(),
        };
        addError(error);
      } catch (e) {
        // Prevent cascading errors
      }
    };

    // Capture network errors
    const handleResourceError = (event: Event) => {
      try {
        const target = event.target as HTMLElement;
        if (target?.tagName && ['IMG', 'SCRIPT', 'LINK'].includes(target.tagName)) {
          const error: ConsoleError = {
            id: `network-${Date.now()}`,
            type: 'network',
            severity: 'error',
            message: `Failed to load: ${target.getAttribute('src') || target.getAttribute('href') || 'unknown resource'}`,
            timestamp: Date.now(),
          };
          addError(error);
        }
      } catch (e) {
        // Prevent cascading errors
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('error', handleResourceError, true);

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      window.removeEventListener('error', handleError);
      window.removeEventListener('error', handleResourceError, true);
    };
  }, []);

  const clearErrors = () => {
    setErrors([]);
  };

  // Auto-cleanup old errors
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setErrors(prev => prev.filter(error => now - error.timestamp < 300000)); // Keep 5 minutes
    }, 60000); // Check every minute
    
    return () => clearInterval(cleanup);
  }, []);

  return { errors, clearErrors };
};