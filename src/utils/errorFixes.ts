export const autoFixErrors = {
  'document is not defined': () => {
    console.log('Auto-fix: Adding SSR check to component');
    return 'Add typeof document !== "undefined" check';
  },
  
  'Clipboard API': () => {
    console.log('Auto-fix: Clipboard permission issue');
    return 'Use fallback copy method or request permissions';
  },
  
  'Failed to execute': (error: string) => {
    if (error.includes('writeText')) {
      return 'Use document.execCommand as fallback';
    }
    return 'Check browser compatibility';
  }
};

export const getErrorFix = (errorMessage: string): string | null => {
  for (const [pattern, fix] of Object.entries(autoFixErrors)) {
    if (errorMessage.includes(pattern)) {
      return typeof fix === 'function' ? fix(errorMessage) : fix;
    }
  }
  return null;
};