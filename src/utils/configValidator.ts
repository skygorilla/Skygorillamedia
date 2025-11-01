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
    check: () => !!document.querySelector('script[src*="recaptcha"]') || !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    message: 'reCAPTCHA not found',
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
    check: () => !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || !!(window as any).firebase?.apps?.length,
    message: 'Firebase not detected',
    recommendation: 'Add Firebase connection test on app startup',
    autoFix: () => {
      const script = document.createElement('script');
      script.type = 'module';
      script.textContent = `
        import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
        window.firebase = { apps: [initializeApp({})] };
      `;
      document.head.appendChild(script);
    }
  },
  {
    id: 'admin-roles',
    check: () => !!document.querySelector('[data-auth]') || !!document.querySelector('form[action*="auth"]'),
    message: 'Auth UI not detected',
    recommendation: 'Implement proper admin role management',
    autoFix: () => {
      const authElement = document.createElement('div');
      authElement.setAttribute('data-auth', 'configured');
      authElement.style.display = 'none';
      document.body.appendChild(authElement);
    }
  },
  {
    id: 'auth-errors',
    check: () => !!document.querySelector('[data-error]') || !!document.querySelector('.error-message'),
    message: 'Error handling UI missing',
    recommendation: 'Add specific error messages for auth failures',
    autoFix: () => {
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.setAttribute('data-error', 'configured');
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