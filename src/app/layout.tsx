import './globals.css';
import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: 'Hero Section – Glas Otoka',
  description: 'Otok Scroll App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" className="dark" suppressHydrationWarning>
      <head />
      <body
        suppressHydrationWarning
        className={cn(
          'font-body antialiased',
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
