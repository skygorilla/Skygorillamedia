import './globals.css';
import { Inter, Montserrat } from 'next/font/google';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from '@/components/ui/error-boundary';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata = {
  title: 'Glas Otoka',
  description: 'A1 Themed App',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const originalWarn = console.warn;
              console.warn = function(...args) {
                const message = args.join(' ');
                if (message.includes('[previewserver]') || message.includes('syntax highlighting') || message.includes('bundle.js')) return;
                originalWarn.apply(console, args);
              };
            })();
          `
        }} />
        <script dangerouslySetInnerHTML={{
          __html: `
            if (location.search.includes('forceReload=1') && 'serviceWorker' in navigator) {
              navigator.serviceWorker.getRegistrations().then(rs => Promise.all(rs.map(r=>r.unregister())))
                .then(()=>caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k)))))
                .then(()=>location.replace(location.pathname));
            }
          `
        }} />
      </head>
      <body suppressHydrationWarning>
        <a href="#main" className="skip-link">Skip to main content</a>
        <ErrorBoundary>
          <FirebaseClientProvider>
            {children}
            <Toaster />
          </FirebaseClientProvider>
        </ErrorBoundary>

        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
