export const reactErrorFixes = {
  'Rendered more hooks': 'Move all useState/useEffect calls before any conditional returns',
  'hooks order': 'Ensure hooks are called in the same order every render',
  'useEffect': 'Check useEffect dependencies and cleanup functions',
  'useState': 'Verify useState is not called conditionally'
};

export const getReactErrorFix = (error: string): string => {
  for (const [pattern, fix] of Object.entries(reactErrorFixes)) {
    if (error.includes(pattern)) {
      return fix;
    }
  }
  return 'Follow React hooks rules: call hooks at top level only';
};