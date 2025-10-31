'use client';

import { useState, useEffect } from 'react';

export const useReactErrorDetector = () => {
  const [reactErrors, setReactErrors] = useState<string[]>([]);

  useEffect(() => {
    const originalError = console.error;
    
    console.error = (...args) => {
      const message = args.join(' ');
      
      if (message.includes('Rendered more hooks') ||
          message.includes('hooks order') ||
          message.includes('useEffect') ||
          message.includes('useState')) {
        const fix = message.includes('Rendered more hooks') ? 
          'Move hooks before conditional returns' : 
          'Check hooks order and dependencies';
        setReactErrors(prev => [...prev.slice(-2), `HOOKS: ${message.slice(0, 40)} | Fix: ${fix}`]);
      }
      
      originalError(...args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return { reactErrors, count: reactErrors.length };
};