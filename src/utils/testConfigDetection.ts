export const testConfigDetection = () => {
  const results = {
    recaptcha: false,
    firebase: false,
    adminRoles: false,
    authErrors: false
  };

  // Test reCAPTCHA detection
  results.recaptcha = !!document.querySelector('script[src*="recaptcha"]');
  
  // Test Firebase detection
  results.firebase = !!(window as any).firebase?.apps?.length;
  
  // Test admin role detection
  results.adminRoles = !!document.querySelector('[data-admin-role]');
  
  // Test auth error detection
  results.authErrors = !!document.querySelector('.auth-error, [data-auth-error]');

  console.log('Config Detection Results:', results);
  return results;
};