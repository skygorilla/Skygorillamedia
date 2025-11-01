
'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/header';
import { usePageHealth } from '@/hooks/usePageHealth';
import { useRealTimeErrors } from '@/hooks/useRealTimeErrors';
import { useNetworkMonitor } from '@/hooks/useNetworkMonitor';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { useElementInspector } from '@/hooks/useElementInspector';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

import { PageScanner } from '@/utils/pageScanner';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { EmptyState } from '@/components/ui/empty-state';
import { PerformanceMonitor } from '@/components/ui/performance-monitor';
import { ErrorBoundary } from 'react-error-boundary';

const Calculator = dynamic(() => import('@/components/calculator'), { ssr: false });
const HeroSection = dynamic(() => import('@/components/hero-section'), { ssr: false });

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState<'pages' | 'console' | 'network' | 'performance' | 'sources'>('pages');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const pageHealth = usePageHealth('/pitch');
  const { errors: realTimeErrors, clearErrors } = useRealTimeErrors();
  const { requests, clearRequests } = useNetworkMonitor();
  const performanceMetrics = usePerformanceMonitor();
  const { inspecting, selectedElement, startInspecting, stopInspecting } = useElementInspector();
  const { breakpoints, paused, addBreakpoint, removeBreakpoint, resume, stepOver, toggleBreakpoint } = useBreakpoints();
  
  useKeyboardShortcuts([
    {
      key: 'F12',
      action: () => setShowPopup(!showPopup)
    },
    {
      key: 'Escape', 
      action: () => setShowPopup(false)
    }
  ]);
  
  // Combine real errors with health check suggestions
  const allErrors = useMemo(() => [...realTimeErrors, ...pageHealth.errors], [realTimeErrors, pageHealth.errors]);
  const allSuggestions = useMemo(() => [...PageScanner.scanAll(), ...pageHealth.suggestions], [pageHealth.suggestions]);

  useEffect(() => {
    const handleScroll = () => {
      try {
        const scrollY = window.scrollY;
        const nav = navRef.current;
        const hero = heroRef.current;
        const header = headerRef.current;
        
        if (!nav || !hero || !header) return;

        const triggerY = hero.offsetTop + hero.offsetHeight - nav.offsetHeight - header.offsetHeight;
        const isMorphed = nav.classList.contains('morph');

        if (!isMorphed && scrollY >= triggerY) {
          nav.classList.add('morph');
        } else if (isMorphed && scrollY < triggerY) {
          nav.classList.remove('morph');
        }
      } catch (error) {
        console.error('Scroll handler error:', error);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const headerElementRef = useCallback((node: HTMLElement | null) => {
    try {
      if (node && headerRef.current !== node) {
        (headerRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    } catch (error) {
      console.error('Header ref error:', error);
    }
  }, []);


  const ErrorFallback = useCallback(({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
    <div className="error-boundary">
      <h2>Something went wrong:</h2>
      <pre>{error?.message || 'Unknown error'}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  ), []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      <Header ref={headerElementRef} />
      <a 
        href="/devtools"
        className="settings-gear"
        title="DevTools"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
        </svg>
      </a>
      

      
      <>
        <HeroSection heroRef={heroRef} navRef={navRef} />
        <Calculator />
        <div className="content"></div>
      </>
    </ErrorBoundary>
  );
}

    