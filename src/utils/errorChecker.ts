export const checkRuntimeErrors = () => {
  const errors: string[] = [];

  // Check for missing DOM elements
  try {
    const requiredElements = ['#main', 'header', 'nav'];
    requiredElements.forEach(selector => {
      if (!document.querySelector(selector)) {
        errors.push(`Missing element: ${selector}`);
      }
    });
  } catch (e) {
    errors.push('DOM check failed');
  }

  // Check for undefined variables
  try {
    if (typeof window === 'undefined') {
      errors.push('Window object undefined');
    }
  } catch (e) {
    errors.push('Window check failed');
  }

  // Check for console errors
  const consoleErrors = (window as any).__consoleErrors || [];
  errors.push(...consoleErrors);

  return errors;
};