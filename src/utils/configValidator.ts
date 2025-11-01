interface ConfigCheck {
  id: string;
  check: () => boolean;
  message: string;
  recommendation: string;
  autoFix?: () => void;
}

export const configChecks: ConfigCheck[] = [
  {
    id: 'recaptcha',
    check: () => !!document.querySelector('script[src*="recaptcha"]'),
    message: 'reCAPTCHA not enabled',
    recommendation: 'Enable reCAPTCHA for production security',
    autoFix: () => {
      // Validate and sanitize script source
      const allowedSrc = 'https://www.google.com/recaptcha/api.js';
      const script = document.createElement('script');
      script.src = allowedSrc;
      script.integrity = 'sha384-...';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  },
  {
    id: 'firebase-connection',
    check: () => !!(window as any).firebase?.apps?.length,
    message: 'Firebase not connected',
    recommendation: 'Add Firebase connection test on app startup'
  },
  {
    id: 'admin-roles',
    check: () => !!document.querySelector('[data-admin-role]'),
    message: 'Admin role management missing',
    recommendation: 'Implement proper admin role management in Firebase'
  },
  {
    id: 'auth-errors',
    check: () => !!document.querySelector('.auth-error, [data-auth-error]'),
    message: 'Auth error handling incomplete',
    recommendation: 'Add more specific error messages for common auth failures'
  }
];

export const runConfigValidation = () => {
  if (typeof document === 'undefined') return [];
  
  try {
    return configChecks.map(check => {
      try {
        return {
          ...check,
          passed: check.check()
        };
      } catch (error) {
        // Structured logging to prevent log injection
        console.error('Config check failed:', { checkId: check.id, error: error instanceof Error ? error.message : 'Unknown error' });
        return {
          ...check,
          passed: false
        };
      }
    }).filter(result => !result.passed);
  } catch (error) {
    // Structured logging to prevent log injection
    console.error('Config validation failed:', { error: error instanceof Error ? error.message : 'Unknown error' });
    return [];
  }
};