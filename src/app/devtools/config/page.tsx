'use client';

import { HealthNotification } from '@/components/ui/health-notification';
import { ErrorNotification } from '@/components/ui/error-notification';
import { ErrorBadge } from '@/components/ui/error-badge';
import { ConfigFixer } from '@/components/ui/config-fixer';

export default function ConfigDiagnosticsPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Configuration Diagnostics</h1>
          
          <div className="space-y-6">
            <HealthNotification />
            <ErrorNotification />
            <ErrorBadge />
            <ConfigFixer />
          </div>
        </div>
      </div>
    </div>
  );
}