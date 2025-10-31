import { useState, useEffect } from 'react';
import { PageHealth, ConsoleError, CodeSuggestion } from '@/types/console';

export const usePageHealth = (pagePath: string): PageHealth => {
  const [health, setHealth] = useState<PageHealth>({
    path: pagePath,
    errors: [],
    suggestions: [],
    score: 100,
    lastChecked: Date.now(),
    metrics: {
      loadTime: 0,
      bundleSize: 0,
      accessibilityScore: 100,
      seoScore: 100,
    },
  });

  useEffect(() => {
    let isMounted = true;
    
    const checkPageHealth = async () => {
      try {
        const suggestions: CodeSuggestion[] = [];

        // Check accessibility
        try {
          const missingAltImages = document.querySelectorAll('img:not([alt])');
          if (missingAltImages.length > 0) {
            suggestions.push({
              id: 'missing-alt',
              type: 'accessibility',
              title: 'Missing Alt Text',
              description: `${missingAltImages.length} images missing alt attributes`,
              code: 'Add alt="" or descriptive alt text to images',
              autoApply: false,
              impact: 'high',
            });
          }
        } catch (e) {
          console.warn('Accessibility check failed:', e);
        }

        // Check SEO
        try {
          const title = document.querySelector('title');
          if (!title || (title.textContent?.length || 0) < 10) {
            suggestions.push({
              id: 'seo-title',
              type: 'seo',
              title: 'Improve Page Title',
              description: 'Page title is missing or too short',
              code: '<title>Descriptive Page Title (50-60 chars)</title>',
              autoApply: false,
              impact: 'high',
            });
          }
        } catch (e) {
          console.warn('SEO check failed:', e);
        }

        // Check performance
        try {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigation) {
            const loadTime = navigation.loadEventEnd - navigation.fetchStart;
            if (loadTime > 3000) {
              suggestions.push({
                id: 'performance-slow',
                type: 'performance',
                title: 'Slow Page Load',
                description: `Page loads in ${(loadTime / 1000).toFixed(1)}s`,
                code: 'Optimize images, enable compression, use CDN',
                autoApply: false,
                impact: 'medium',
              });
            }
          }
        } catch (e) {
          console.warn('Performance check failed:', e);
        }

        const score = Math.max(0, 100 - (suggestions.length * 5));
        
        if (isMounted) {
          setHealth({
            path: pagePath,
            errors: [],
            suggestions,
            score,
            lastChecked: Date.now(),
            metrics: {
              loadTime: (() => {
                try {
                  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
                  return navigation ? navigation.loadEventEnd - navigation.fetchStart : 0;
                } catch {
                  return 0;
                }
              })(),
              bundleSize: 0,
              accessibilityScore: Math.max(0, 100 - (suggestions.filter(s => s.type === 'accessibility').length * 20)),
              seoScore: Math.max(0, 100 - (suggestions.filter(s => s.type === 'seo').length * 15)),
            },
          });
        }
      } catch (error) {
        console.error('Page health check failed:', error);
      }
    };

    checkPageHealth();
    
    return () => {
      isMounted = false;
    };
  }, [pagePath]);

  return health;
};