'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './button';
import { Input } from './input';
import { Textarea } from './textarea';
import { Label } from './label';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Ime mora imati najmanje 2 znaka'),
  email: z.string().email('Neispravna email adresa'),
  subject: z.string().min(5, 'Naslov mora imati najmanje 5 znakova'),
  message: z.string().min(10, 'Poruka mora imati najmanje 10 znakova')
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactForm) => {
    setStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setStatus('success');
        reset();
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <div>
        <Label htmlFor="name">Ime i prezime</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Vaše ime"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="vasa@email.com"
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="subject">Naslov</Label>
        <Input
          id="subject"
          {...register('subject')}
          placeholder="Naslov poruke"
          className={errors.subject ? 'border-red-500' : ''}
        />
        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
      </div>

      <div>
        <Label htmlFor="message">Poruka</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Vaša poruka..."
          rows={4}
          className={errors.message ? 'border-red-500' : ''}
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
      </div>

      <Button 
        type="submit" 
        disabled={status === 'loading'}
        className="w-full flex items-center gap-2"
      >
        {status === 'loading' ? (
          <>Šalje se...</>
        ) : status === 'success' ? (
          <>
            <CheckCircle className="h-4 w-4" />
            Poslano!
          </>
        ) : status === 'error' ? (
          <>
            <AlertCircle className="h-4 w-4" />
            Pokušaj ponovo
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Pošalji poruku
          </>
        )}
      </Button>
    </form>
  );
}