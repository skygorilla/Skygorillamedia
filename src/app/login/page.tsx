'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useUser } from '@/firebase';
import { initiateEmailSignIn } from '@/firebase/non-blocking-login';

const loginSchema = z.object({
  email: z.string().email('Neispravna email adresa'),
  password: z.string().min(6, 'Lozinka mora imati najmanje 6 znakova'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();
  const router = useRouter();
  const { user, isUserLoading, userError } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (!isUserLoading && user) {
      toast({
        title: 'Prijava uspješna',
        description: 'Dobrodošli natrag!',
      });
      router.push('/profile');
    } else if (userError) {
      toast({
        variant: 'destructive',
        title: 'Greška pri prijavi',
        description: userError.message,
      });
      setLoading(false);
    }
  }, [user, isUserLoading, userError, router, toast]);

  const onSubmit = (data: LoginForm) => {
    setLoading(true);
    if (auth) {
      initiateEmailSignIn(auth, data.email, data.password);
    } else {
      toast({
        variant: 'destructive',
        title: 'Greška',
        description: 'Autentikacija nije dostupna.',
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 pt-24">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Prijava</CardTitle>
          <CardDescription>Unesite svoje podatke za prijavu.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="vasa@email.com"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Lozinka</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={loading || isUserLoading}>
              {loading || isUserLoading ? 'Prijava u tijeku...' : 'Prijavi se'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Nemate račun?{' '}
            <Link href="/signup" className="underline">
              Registrirajte se
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
