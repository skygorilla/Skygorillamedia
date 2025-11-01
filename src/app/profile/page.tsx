'use client';

import { AuthGuard } from '@/components/ui/auth-guard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

function ProfilePageContent() {
  const { user, isUserLoading, userError } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await auth.signOut();
    router.push('/');
  };

  if (isUserLoading) {
    return <LoadingSpinner />;
  }

  if (userError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Greška</AlertTitle>
        <AlertDescription>{userError.message}</AlertDescription>
      </Alert>
    );
  }

  if (!user) {
    // This should ideally not be reached if AuthGuard is working correctly
    return <p>Niste prijavljeni.</p>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 pt-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Korisnički profil</CardTitle>
          <CardDescription>Vaši korisnički podaci.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">User ID</p>
            <p className="text-sm text-muted-foreground font-mono">{user.uid}</p>
          </div>
          <Button onClick={handleSignOut} className="w-full" variant="outline">
            Odjava
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}


export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfilePageContent />
    </AuthGuard>
  )
}