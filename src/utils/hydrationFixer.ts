export const hydrationFixes = {
  'typeof window': 'Use useEffect or dynamic imports for client-only code',
  'Date.now()': 'Use static values or useEffect for dynamic data',
  'Math.random()': 'Generate values in useEffect or use static seeds',
  'suppressHydrationWarning': 'Remove suppressHydrationWarning and fix root cause'
};

export const detectHydrationIssue = (error: string): string | null => {
  for (const [pattern, fix] of Object.entries(hydrationFixes)) {
    if (error.includes(pattern)) {
      return fix;
    }
  }
  return 'Check for SSR/client differences in component rendering';
};