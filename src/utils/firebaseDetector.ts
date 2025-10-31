export const detectFirebaseIssues = () => {
  const issues: string[] = [];

  // Check Firebase initialization
  try {
    if (typeof window !== 'undefined') {
      const firebase = (window as any).firebase;
      if (!firebase) {
        issues.push('Firebase SDK not loaded');
      } else if (!firebase.apps?.length) {
        issues.push('Firebase not initialized');
      }
    }
  } catch (e) {
    issues.push('Firebase check failed');
  }

  // Check environment variables
  const requiredEnvVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID'
  ];

  requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
      issues.push(`Missing env var: ${envVar}`);
    }
  });

  return issues;
};