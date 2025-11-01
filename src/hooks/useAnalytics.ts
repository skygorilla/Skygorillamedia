'use client';

import { useCallback } from 'react';

interface AnalyticsEvent {
  event: string;
  page: string;
  data?: Record<string, any>;
}

export const useAnalytics = () => {
  const track = useCallback(async ({ event, page, data }: AnalyticsEvent) => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, page, data })
      });
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }
  }, []);

  const trackPageView = useCallback((page: string) => {
    track({ event: 'page_view', page });
  }, [track]);

  const trackCalculatorUse = useCallback((data: { events: number; plan: string }) => {
    track({ event: 'calculator_use', page: '/', data });
  }, [track]);

  const trackContactSubmit = useCallback(() => {
    track({ event: 'contact_submit', page: '/kontakt' });
  }, [track]);

  return { track, trackPageView, trackCalculatorUse, trackContactSubmit };
};