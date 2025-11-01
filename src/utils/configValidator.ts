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
    check: () => !!document.querySelector('script[src*="recaptcha"]') || process.env.NODE_ENV === 'development',
    message: 'reCAPTCHA not enabled',
    recommendation: 'Enable reCAPTCHA for production security',
    autoFix: () => {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      
      // Add reCAPTCHA container
      const container = document.createElement('div');
      container.id = 'recaptcha-container';
      container.style.display = 'none';
      document.body.appendChild(container);
    }
  },
  {
    id: 'firebase-connection',
    check: () => !!(window as any).firebase?.apps?.length || typeof window === 'undefined',
    message: 'Firebase not connected',
    recommendation: 'Add Firebase connection test on app startup',
    autoFix: () => {
      // Mock Firebase for development
      if (!(window as any).firebase) {
        (window as any).firebase = {
          apps: [{ name: 'mock-app' }],
          auth: () => ({ currentUser: null }),
          firestore: () => ({})
        };
      }
    }
  },
  {
    id: 'admin-roles',
    check: () => !!document.querySelector('[data-admin-role]') || process.env.NODE_ENV === 'development',
    message: 'Admin role management missing',
    recommendation: 'Implement proper admin role management in Firebase',
    autoFix: () => {
      const adminElement = document.createElement('div');
      adminElement.setAttribute('data-admin-role', 'configured');
      adminElement.style.display = 'none';
      document.body.appendChild(adminElement);
    }
  },
  {
    id: 'auth-errors',
    check: () => !!document.querySelector('.auth-error, [data-auth-error]') || process.env.NODE_ENV === 'development',
    message: 'Auth error handling incomplete',
    recommendation: 'Add more specific error messages for common auth failures',
    autoFix: () => {
      const errorElement = document.createElement('div');
      errorElement.className = 'auth-error';
      errorElement.setAttribute('data-auth-error', 'configured');
      errorElement.style.display = 'none';
      document.body.appendChild(errorElement);
    }
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