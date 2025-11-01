'use client';

import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from '@/components/ui/error-boundary';
import DevNav from './dev-nav';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <FirebaseClientProvider>
        {children}
        <Toaster />
        <DevNav />
      </FirebaseClientProvider>
    </ErrorBoundary>
  );
}
