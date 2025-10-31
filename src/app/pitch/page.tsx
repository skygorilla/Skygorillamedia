
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
      <button 
        onClick={() => setShowPopup(true)}
        className="settings-gear"
        title="Settings"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
        </svg>
      </button>
      
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="devtools">
            <div className="devtools-header">
              <div className="devtools-search">
                <input
                  id="devtools-search"
                  type="text"
                  placeholder="Search (Ctrl+F)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="devtools-tabs">
                <button className={`devtools-tab ${activeTab === 'pages' ? 'active' : ''}`} onClick={() => setActiveTab('pages')}>
                  <span className="tab-icon">📄</span>
                  Elements
                </button>
                <button className={`devtools-tab ${activeTab === 'console' ? 'active' : ''}`} onClick={() => setActiveTab('console')}>
                  <span className="tab-icon">⚠️</span>
                  Console
                  <span className="tab-badge">{allErrors.length + allSuggestions.length}</span>
                </button>
                <button className={`devtools-tab ${activeTab === 'network' ? 'active' : ''}`} onClick={() => setActiveTab('network')}>
                  <span className="tab-icon">🌐</span>
                  Network
                  <span className="tab-badge">{requests.length}</span>
                </button>
                <button className={`devtools-tab ${activeTab === 'performance' ? 'active' : ''}`} onClick={() => setActiveTab('performance')}>
                  <span className="tab-icon">⚡</span>
                  Performance
                </button>
                <button className={`devtools-tab ${activeTab === 'sources' ? 'active' : ''}`} onClick={() => setActiveTab('sources')}>
                  <span className="tab-icon">📁</span>
                  Sources
                  {breakpoints.length > 0 && <span className="tab-badge">{breakpoints.length}</span>}
                </button>
              </div>
              <button onClick={() => setShowPopup(false)} className="devtools-close">×</button>
            </div>
            
            {activeTab === 'pages' && (
              <div className="devtools-content">
                <div className="devtools-sidebar">
                  <div className="sidebar-section">
                    <div className="sidebar-header">Pages</div>
                    <div className="page-tree">
                      <div className="tree-item active">
                        <span className="tree-icon">📄</span>
                        <span className="tree-label">/pitch</span>
                        <span className={`health-dot ${allErrors.length === 0 ? 'green' : allErrors.length < 3 ? 'yellow' : 'red'}`}></span>
                      </div>
                    </div>
                    <div className="inspector-controls">
                      <button 
                        className={`inspect-btn ${inspecting ? 'active' : ''}`}
                        onClick={inspecting ? stopInspecting : startInspecting}
                      >
                        🔍 {inspecting ? 'Stop' : 'Inspect'}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="devtools-main">
                  <div className="inspector-panel">
                    <div className="inspector-header">Page Inspector</div>
                    <div className="inspector-content">
                      <div className="property-group">
                        <div className="property-label">Path</div>
                        <div className="property-value">/pitch</div>
                      </div>
                      <div className="property-group">
                        <div className="property-label">Errors</div>
                        <div className="property-value">{allErrors.length}</div>
                      </div>
                      <div className="property-group">
                        <div className="property-label">Suggestions</div>
                        <div className="property-value">{allSuggestions.length}</div>
                      </div>
                      <div className="property-group">
                        <div className="property-label">Load Time</div>
                        <div className="property-value">{pageHealth.metrics.loadTime}ms</div>
                      </div>
                      <div className="property-group">
                        <div className="property-label">Accessibility</div>
                        <div className="property-value">{pageHealth.metrics.accessibilityScore}/100</div>
                      </div>
                      <div className="property-group">
                        <div className="property-label">SEO Score</div>
                        <div className="property-value">{pageHealth.metrics.seoScore}/100</div>
                      </div>
                      {selectedElement && (
                        <>
                          <div className="inspector-section">Selected Element</div>
                          <div className="property-group">
                            <div className="property-label">Tag</div>
                            <div className="property-value">&lt;{selectedElement.tagName}&gt;</div>
                          </div>
                          <div className="property-group">
                            <div className="property-label">Class</div>
                            <div className="property-value">{selectedElement.className || 'none'}</div>
                          </div>
                          <div className="property-group">
                            <div className="property-label">ID</div>
                            <div className="property-value">{selectedElement.id || 'none'}</div>
                          </div>
                          <div className="property-group">
                            <div className="property-label">Dimensions</div>
                            <div className="property-value">{Math.round(selectedElement.rect.width)} x {Math.round(selectedElement.rect.height)}</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'network' && (
              <div className="devtools-content">
                <div className="network-toolbar">
                  <button className="console-clear" onClick={clearRequests}>Clear</button>
                  <div className="network-filter">
                    <button className="filter-btn active">All</button>
                    <button className="filter-btn">XHR</button>
                    <button className="filter-btn">JS</button>
                    <button className="filter-btn">CSS</button>
                    <button className="filter-btn">Img</button>
                  </div>
                </div>
                <div className="network-table">
                  <div className="network-header">
                    <div className="network-col">Name</div>
                    <div className="network-col">Status</div>
                    <div className="network-col">Type</div>
                    <div className="network-col">Size</div>
                    <div className="network-col">Time</div>
                  </div>
                  {requests.map(request => {
                    try {
                      return (
                        <div key={request.id} className="network-row">
                          <div className="network-col network-name">{request.url?.split('/').pop() || 'Unknown'}</div>
                          <div className={`network-col network-status ${request.status >= 400 ? 'error' : request.status >= 300 ? 'warning' : 'success'}`}>
                            {request.status || 'pending'}
                          </div>
                          <div className="network-col">{request.type || '-'}</div>
                          <div className="network-col">{request.size > 0 ? `${(request.size / 1024).toFixed(1)}KB` : '-'}</div>
                          <div className="network-col">{request.time > 0 ? `${request.time.toFixed(0)}ms` : '-'}</div>
                        </div>
                      );
                    } catch (error) {
                      console.error('Network row render error:', error);
                      return null;
                    }
                  })}
                </div>
              </div>
            )}
            
            {activeTab === 'performance' && (
              <div className="devtools-content">
                <div className="performance-panel">
                  <PerformanceMonitor />
                  <div className="performance-metrics">
                    <div className="metric-card">
                      <div className="metric-label">Load Time</div>
                      <div className="metric-value">{(performanceMetrics.loadTime / 1000).toFixed(2)}s</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-label">DOM Content Loaded</div>
                      <div className="metric-value">{(performanceMetrics.domContentLoaded / 1000).toFixed(2)}s</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-label">First Paint</div>
                      <div className="metric-value">{(performanceMetrics.firstPaint / 1000).toFixed(2)}s</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-label">First Contentful Paint</div>
                      <div className="metric-value">{(performanceMetrics.firstContentfulPaint / 1000).toFixed(2)}s</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-label">Memory Usage</div>
                      <div className="metric-value">{(performanceMetrics.memoryUsage / 1024 / 1024).toFixed(1)}MB</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-label">JS Heap Size</div>
                      <div className="metric-value">{(performanceMetrics.jsHeapSize / 1024 / 1024).toFixed(1)}MB</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'sources' && (
              <div className="devtools-content">
                <div className="sources-toolbar">
                  <div className="debugger-controls">
                    <button className="debug-btn" onClick={resume} disabled={!paused}>▶️ Resume</button>
                    <button className="debug-btn" onClick={stepOver}>⏭️ Step Over</button>
                    <button className="debug-btn" onClick={() => addBreakpoint('pitch/page.tsx', 42)}>🔴 Add Breakpoint</button>
                  </div>
                  {paused && <div className="paused-indicator">⏸️ Paused in debugger</div>}
                </div>
                <div className="sources-content">
                  <div className="breakpoints-panel">
                    <div className="panel-header">Breakpoints ({breakpoints.length})</div>
                    {breakpoints.map(bp => {
                      try {
                        return (
                          <div key={bp.id} className="breakpoint-item">
                            <input 
                              type="checkbox" 
                              checked={bp.enabled} 
                              onChange={() => toggleBreakpoint?.(bp.id)}
                            />
                            <span className="bp-location">{bp.file}:{bp.line}</span>
                            <button className="bp-remove" onClick={() => removeBreakpoint(bp.id)}>×</button>
                          </div>
                        );
                      } catch (error) {
                        console.error('Breakpoint render error:', error);
                        return null;
                      }
                    })}
                  </div>
                  <div className="source-viewer">
                    <div className="source-header">pitch/page.tsx</div>
                    <div className="source-code">
                      <div className="line-numbers">
                        {Array.from({length: 20}, (_, i) => (
                          <div key={i} className="line-number">{i + 1}</div>
                        ))}
                      </div>
                      <div className="code-content">
                        <div className="code-line">export default function Home() &#123;</div>
                        <div className="code-line">  const [showPopup, setShowPopup] = useState(false);</div>
                        <div className="code-line">  const [activeTab, setActiveTab] = useState('pages');</div>
                        <div className="code-line">  // ... more code</div>
                        <div className="code-line">&#125;</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'console' && (
              <div className="devtools-content">
                <div className="console-toolbar">
                  <button className="console-clear" onClick={clearErrors}>Clear console</button>
                  <div className="console-filter">
                    <button className="filter-btn active">All</button>
                    <button className="filter-btn">Errors</button>
                    <button className="filter-btn">Warnings</button>
                    <button className="filter-btn">Info</button>
                  </div>
                </div>
                <div className="console-output">
                  {allErrors.length === 0 && allSuggestions.length === 0 ? (
                    <EmptyState
                      icon="✅"
                      title="No Issues Found"
                      description="Your page is running smoothly with no errors or warnings."
                    />
                  ) : (
                    <>
                      {allErrors.map(error => {
                        try {
                          return (
                            <div key={error.id} className={`console-line console-${error.severity}`}>
                              <span className="console-icon">{error.severity === 'error' ? '❌' : '⚠️'}</span>
                              <span className="console-text">{error.message || 'Unknown error'}</span>
                              {error.file && <span className="console-source">{error.file}:{error.line}</span>}
                            </div>
                          );
                        } catch (renderError) {
                          console.error('Error render error:', renderError);
                          return null;
                        }
                      })}
                      {allSuggestions.map(suggestion => {
                        try {
                          return (
                            <div key={suggestion.id} className="console-line console-suggestion">
                              <span className="console-icon">💡</span>
                              <span className="console-text">{suggestion.title}: {suggestion.description}</span>
                              <button 
                                className="console-fix" 
                                onClick={() => console.log('Fix suggestion:', suggestion.id)}
                              >
                                Fix
                              </button>
                            </div>
                          );
                        } catch (error) {
                          console.error('Suggestion render error:', error);
                          return null;
                        }
                      })}
                    </>
                  )}
                </div>
              </div>
            )}
            
            <div className="devtools-footer">
              <span className="footer-info">Health: {pageHealth.score}/100</span>
              <span className="footer-separator">•</span>
              <span className="footer-info">{allErrors.length} errors, {allSuggestions.length} warnings, {requests.length} requests</span>
              <span className="footer-separator">•</span>
              <span className="footer-info">Last check: {new Date(pageHealth.lastChecked).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      )}
      
      <>
        <HeroSection heroRef={heroRef} navRef={navRef} />
        <Calculator />
        <div className="content"></div>
      </>
    </ErrorBoundary>
  );
}

    