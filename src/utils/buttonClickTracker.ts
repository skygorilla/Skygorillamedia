export const trackButtonClicks = () => {
  const clicks: { button: string; action: string; timestamp: number }[] = [];

  // Track sitemap button clicks
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    
    if (target.matches('.inspect-btn')) {
      clicks.push({
        button: 'Element Inspector',
        action: target.textContent?.includes('Stop') ? 'Stop Inspect' : 'Start Inspect',
        timestamp: Date.now()
      });
    }
    
    if (target.matches('.console-clear')) {
      clicks.push({
        button: 'Clear Console',
        action: 'Clear errors/requests',
        timestamp: Date.now()
      });
    }
    
    if (target.matches('.console-fix')) {
      clicks.push({
        button: 'Fix Suggestion',
        action: 'Apply auto-fix',
        timestamp: Date.now()
      });
    }
    
    if (target.matches('.debug-btn')) {
      clicks.push({
        button: 'Debug Control',
        action: target.textContent || 'Debug action',
        timestamp: Date.now()
      });
    }
  });

  return clicks;
};