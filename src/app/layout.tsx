import './globals.css';
import { Inter, Montserrat } from 'next/font/google';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { HealthNotification } from '@/components/ui/health-notification';
import { ErrorNotification } from '@/components/ui/error-notification';
import { ErrorBadge } from '@/components/ui/error-badge';
import { ConfigFixer } from '@/components/ui/config-fixer';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import DevNav from '@/components/dev-nav';

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
      <body suppressHydrationWarning>
        <a href="#main" className="skip-link">Skip to main content</a>
        <ErrorBoundary>
          <DevNav />
          <HealthNotification />
          <ErrorNotification />
          <ErrorBadge />
          <ConfigFixer />
          <Breadcrumbs />
          <main id="main">{children}</main>
        </ErrorBoundary>
      </body>
    </html>
  );
}

    