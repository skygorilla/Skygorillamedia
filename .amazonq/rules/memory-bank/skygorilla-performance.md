# SKYGORILLA Performance Standards

## Core Web Vitals - World-Class Speed

### Performance Thresholds
- **LCP (Largest Contentful Paint)**: ≤2.5s (75th percentile)
- **CLS (Cumulative Layout Shift)**: ≤0.1
- **INP (Interaction to Next Paint)**: ≤200ms
- **FCP (First Contentful Paint)**: ≤1.8s
- **TTFB (Time to First Byte)**: ≤600ms

### Bundle Size Limits
- **Initial JavaScript**: ≤180KB gzipped
- **Route Chunks**: ≤120KB gzipped  
- **CSS**: ≤50KB gzipped
- **Images**: WebP/AVIF with responsive sizing
- **Fonts**: Subset, preload, font-display: swap

### Implementation Pattern
```typescript
// SKYGORILLA Performance Monitoring
export const measurePerformance = async <T>(
  operation: string,
  fn: () => Promise<T> | T
): Promise<T> => {
  const start = performance.now();
  
  try {
    const result = await fn();
    const duration = performance.now() - start;
    
    // Log to CloudWatch
    console.log(JSON.stringify({
      metric: 'performance',
      operation,
      duration,
      timestamp: Date.now()
    }));
    
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    console.error(`${operation} failed after ${duration}ms`, error);
    throw error;
  }
};
```

## Memory Management - Zero Leaks

### Memory Thresholds
- **Growth Rate**: <10% over 2min idle
- **Cleanup**: All intervals/listeners cleared
- **Component Unmount**: Proper cleanup in useEffect
- **Event Listeners**: Passive listeners where possible

### Optimization Patterns
```typescript
// SKYGORILLA Memory-Safe Hook Pattern
export const useOptimizedEffect = (
  effect: () => void | (() => void),
  deps: React.DependencyList
) => {
  useEffect(() => {
    try {
      const cleanup = effect();
      return cleanup;
    } catch (error) {
      console.error('Effect error:', error);
    }
  }, deps);
};

// Debounced performance optimization
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};
```

## Rendering Performance

### React Optimization
- **Memoization**: Strategic use of useMemo, useCallback
- **Component Splitting**: Lazy loading with Suspense
- **Virtual Scrolling**: For large lists (>100 items)
- **Image Optimization**: Next.js Image component with priority

### CSS Performance
```css
/* SKYGORILLA CSS Performance Rules */
.sg-optimized {
  /* Use transform/opacity for animations */
  transform: translateZ(0); /* Force GPU acceleration */
  will-change: transform; /* Hint browser optimization */
  
  /* Avoid expensive properties */
  /* ❌ box-shadow: 0 0 10px rgba(0,0,0,0.5); */
  /* ✅ */ box-shadow: var(--sg-shadow-md);
}

/* Efficient transitions */
.sg-transition {
  transition: transform var(--sg-duration-fast),
              opacity var(--sg-duration-fast);
}
```

## Network Optimization

### Resource Loading
- **Critical CSS**: Inline above-the-fold styles
- **Preload**: Critical resources (fonts, hero images)
- **Prefetch**: Next page resources
- **Service Worker**: Cache strategy for static assets

### API Performance
```typescript
// SKYGORILLA API Optimization Pattern
export const apiClient = {
  // Request deduplication
  cache: new Map<string, Promise<any>>(),
  
  async get<T>(url: string): Promise<T> {
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }
    
    const request = fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
    
    this.cache.set(url, request);
    
    // Clear cache after 5 minutes
    setTimeout(() => this.cache.delete(url), 300000);
    
    return request;
  }
};
```

## Lighthouse CI Integration

### Performance Budget
```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "url": ["http://localhost:3000/"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}],
        "total-blocking-time": ["error", {"maxNumericValue": 300}]
      }
    }
  }
}
```

## Autonomous Performance Monitoring

### Real-time Alerts
- **Performance Regression**: >20% degradation triggers alert
- **Bundle Size**: Exceeding limits blocks deployment
- **Memory Leaks**: Automatic detection and reporting
- **Core Web Vitals**: Continuous monitoring with RUM

### Self-Optimization
- **Image Compression**: Automatic WebP/AVIF conversion
- **Code Splitting**: Dynamic imports for route-based splitting
- **Cache Optimization**: Intelligent cache invalidation
- **Resource Hints**: Automatic preload/prefetch injection

### Performance Analytics
```typescript
// SKYGORILLA Performance Analytics
export const trackPerformance = () => {
  // Core Web Vitals tracking
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  });
  
  // Custom metrics
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      console.log(JSON.stringify({
        metric: 'custom_performance',
        name: entry.name,
        duration: entry.duration,
        startTime: entry.startTime
      }));
    });
  });
  
  observer.observe({ entryTypes: ['measure', 'navigation'] });
};
```