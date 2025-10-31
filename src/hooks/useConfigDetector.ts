'use client';

import { useState, useEffect } from 'react';

interface ConfigIssue {
  id: string;
  type: 'firebase' | 'auth' | 'security' | 'config';
  severity: 'high' | 'medium' | 'low';
  message: string;
  recommendation: string;
}

export const useConfigDetector = () => {
  const [issues, setIssues] = useState<ConfigIssue[]>([]);

  useEffect(() => {
    const detectIssues = () => {
      const foundIssues: ConfigIssue[] = [];

      // Check Firebase config
      if (typeof window !== 'undefined') {
        const hasFirebase = !!(window as any).firebase || document.querySelector('script[src*="firebase"]');
        if (!hasFirebase) {
          foundIssues.push({
            id: 'no-firebase',
            type: 'firebase',
            severity: 'high',
            message: 'Firebase not detected',
            recommendation: 'Add Firebase connection test on app startup'
          });
        }
      }

      // Check reCAPTCHA
      const hasRecaptcha = document.querySelector('script[src*="recaptcha"]') || 
                          document.querySelector('[data-sitekey]');
      if (!hasRecaptcha) {
        foundIssues.push({
          id: 'no-recaptcha',
          type: 'security',
          severity: 'medium',
          message: 'reCAPTCHA not found',
          recommendation: 'Enable reCAPTCHA for production security'
        });
      }

      // Check auth configuration
      const hasAuthElements = document.querySelector('[data-auth]') || 
                             document.querySelector('form[action*="auth"]');
      if (!hasAuthElements) {
        foundIssues.push({
          id: 'no-auth-ui',
          type: 'auth',
          severity: 'medium',
          message: 'Auth UI not detected',
          recommendation: 'Implement proper admin role management'
        });
      }

      // Check error handling
      const hasErrorMessages = document.querySelector('[data-error]') ||
                              document.querySelector('.error-message');
      if (!hasErrorMessages) {
        foundIssues.push({
          id: 'no-error-handling',
          type: 'config',
          severity: 'low',
          message: 'Error handling UI missing',
          recommendation: 'Add specific error messages for auth failures'
        });
      }

      setIssues(foundIssues);
    };

    detectIssues();
    const interval = setInterval(detectIssues, 30000);
    return () => clearInterval(interval);
  }, []);

  return { issues, count: issues.length };
};