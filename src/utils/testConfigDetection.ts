/**
 * Test configuration detection utility
 */

export const testConfigDetection = (): void => {
  try {
    console.log('Testing configuration detection...');
    
    // Test Firebase detection
    const hasFirebase = !!(window as any).firebase?.apps?.length;
    console.log('Firebase detected:', hasFirebase);
    
    // Test reCAPTCHA detection
    const hasRecaptcha = !!document.querySelector('script[src*="recaptcha"]');
    console.log('reCAPTCHA detected:', hasRecaptcha);
    
    // Test admin role detection
    const hasAdminRole = !!document.querySelector('[data-admin-role]');
    console.log('Admin role management detected:', hasAdminRole);
    
    // Test auth error handling
    const hasAuthErrors = !!document.querySelector('.auth-error, [data-auth-error]');
    console.log('Auth error handling detected:', hasAuthErrors);
    
    console.log('Configuration test completed');
  } catch (error) {
    console.error('Configuration test failed:', { error: error instanceof Error ? error.message : 'Unknown error' });
  }
};