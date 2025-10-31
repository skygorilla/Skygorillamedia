'use client';

import { useState, useEffect } from 'react';

export const useHydrationDetector = () => {
  const [hydrationErrors, setHydrationErrors] = useState<string[]>([]);

  useEffect(() => {
    const originalError = console.error;
    
    console.error = (...args) => {
      const message = args.join(' ');
      
      if (message.includes('Hydration failed') || 
          message.includes('server rendered HTML') ||
          message.includes('suppressHydrationWarning')) {
        setHydrationErrors(prev => [...prev.slice(-2), message]);
      }
      
      originalError(...args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return { hydrationErrors, count: hydrationErrors.length };
};