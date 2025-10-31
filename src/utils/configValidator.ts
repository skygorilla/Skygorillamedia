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
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
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
  
  return configChecks.map(check => ({
    ...check,
    passed: check.check()
  })).filter(result => !result.passed);
};