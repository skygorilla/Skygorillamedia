'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { LoadingSpinner } from './loading-spinner';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <LoadingSpinner />;
  if (error) return <div data-error className="error-message">Auth error: {error.message}</div>;
  if (!user && fallback) return <>{fallback}</>;
  
  return <>{children}</>;
}