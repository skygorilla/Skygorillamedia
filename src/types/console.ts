export interface ConsoleError {
  id: string;
  type: 'javascript' | 'network' | 'security' | 'accessibility';
  severity: 'error' | 'warning' | 'info';
  message: string;
  file?: string;
  line?: number;
  timestamp: number;
}

export interface CodeSuggestion {
  id: string;
  type: 'performance' | 'accessibility' | 'seo' | 'security';
  title: string;
  description: string;
  code: string;
  autoApply: boolean;
  impact: 'high' | 'medium' | 'low';
}

export interface PageHealth {
  path: string;
  errors: ConsoleError[];
  suggestions: CodeSuggestion[];
  score: number;
  lastChecked: number;
  metrics: {
    loadTime: number;
    bundleSize: number;
    accessibilityScore: number;
    seoScore: number;
  };
}