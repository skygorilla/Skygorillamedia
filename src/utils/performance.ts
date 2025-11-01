/**
 * SKYGORILLA Performance Utilities - World-class optimization
 */

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    try {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        try {
          func(...args);
        } catch (error) {
          console.error('Debounced function error:', error);
        }
      }, wait);
    } catch (error) {
      console.error('Debounce error:', error);
    }
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    try {
      if (!inThrottle) {
        try {
          func(...args);
        } catch (error) {
          console.error('Throttled function error:', error);
        }
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    } catch (error) {
      console.error('Throttle error:', error);
    }
  };
};

export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  const maxCacheSize = 1000;
  return ((...args: Parameters<T>) => {
    try {
      const key = JSON.stringify(args);
      if (cache.has(key)) return cache.get(key);
      
      if (cache.size >= maxCacheSize) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      
      const result = fn(...args);
      cache.set(key, result);
      return result;
    } catch (error) {
      console.error('Memoization error:', error);
      return fn(...args);
    }
  }) as T;
};

export const measurePerformance = async <T>(
  name: string,
  fn: () => Promise<T> | T
): Promise<T> => {
  const start = performance.now();
  try {
    const result = await fn();
    const end = performance.now();
    console.log(JSON.stringify({
    metric: 'performance',
    operation: name.replace(/[<>"'&]/g, ''),
    duration: end - start,
    timestamp: Date.now()
  }));
    return result;
  } catch (error) {
    const end = performance.now();
    console.error(JSON.stringify({
      metric: 'performance_error',
      operation: name.replace(/[<>"'&]/g, ''),
      duration: end - start,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: Date.now()
    }));
    throw error;
  }
};