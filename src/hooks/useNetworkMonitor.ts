import { useState, useEffect } from 'react';

interface NetworkRequest {
  id: string;
  url: string;
  method: string;
  status: number;
  type: string;
  size: number;
  time: number;
  timestamp: number;
}

export const useNetworkMonitor = () => {
  const [requests, setRequests] = useState<NetworkRequest[]>([]);

  useEffect(() => {
    const capturedRequests: NetworkRequest[] = [];

    // Override fetch
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const url = typeof args[0] === 'string' ? args[0] : (args[0] as Request).url;
      
      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();
        
        const request: NetworkRequest = {
          id: `fetch-${Date.now()}`,
          url,
          method: args[1]?.method || 'GET',
          status: response.status,
          type: 'fetch',
          size: parseInt(response.headers.get('content-length') || '0'),
          time: endTime - startTime,
          timestamp: Date.now(),
        };
        
        capturedRequests.push(request);
        setRequests([...capturedRequests]);
        return response;
      } catch (error) {
        const endTime = performance.now();
        const request: NetworkRequest = {
          id: `fetch-error-${Date.now()}`,
          url,
          method: args[1]?.method || 'GET',
          status: 0,
          type: 'fetch',
          size: 0,
          time: endTime - startTime,
          timestamp: Date.now(),
        };
        
        capturedRequests.push(request);
        setRequests([...capturedRequests]);
        throw error;
      }
    };

    // Monitor resource loading
    const handleResourceLoad = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'IMG' || target.tagName === 'SCRIPT' || target.tagName === 'LINK') {
        const request: NetworkRequest = {
          id: `resource-${Date.now()}`,
          url: target.getAttribute('src') || target.getAttribute('href') || '',
          method: 'GET',
          status: 200,
          type: target.tagName.toLowerCase(),
          size: 0,
          time: 0,
          timestamp: Date.now(),
        };
        
        capturedRequests.push(request);
        setRequests([...capturedRequests]);
      }
    };

    window.addEventListener('load', handleResourceLoad, true);

    return () => {
      window.fetch = originalFetch;
      window.removeEventListener('load', handleResourceLoad, true);
    };
  }, []);

  const clearRequests = () => {
    setRequests([]);
  };

  return { requests, clearRequests };
};