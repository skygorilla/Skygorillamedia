'use client';

import { useState, useEffect } from 'react';

interface Settings {
  autoScan: boolean;
  scanInterval: number;
  showNotifications: boolean;
  theme: 'light' | 'dark';
}

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    autoScan: true,
    scanInterval: 30000,
    showNotifications: true,
    theme: 'light'
  });

  useEffect(() => {
    const saved = localStorage.getItem('devtools-settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('devtools-settings', JSON.stringify(updated));
  };

  return { settings, updateSettings };
};