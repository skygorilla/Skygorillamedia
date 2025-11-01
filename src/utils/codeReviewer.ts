interface CodeIssue {
  file: string;
  line: number;
  type: 'error' | 'warning' | 'info';
  rule: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
}

export const codeReviewer = {
  analyzeFile: (content: string, filename: string): CodeIssue[] => {
    const issues: CodeIssue[] = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Check for common issues
      if (line.includes('console.log')) {
        issues.push({
          file: filename,
          line: index + 1,
          type: 'warning',
          rule: 'no-console',
          message: 'Remove console.log in production',
          severity: 'low'
        });
      }

      if (line.includes('any')) {
        issues.push({
          file: filename,
          line: index + 1,
          type: 'warning',
          rule: 'no-any',
          message: 'Avoid using any type',
          severity: 'medium'
        });
      }

      if (line.length > 120) {
        issues.push({
          file: filename,
          line: index + 1,
          type: 'info',
          rule: 'max-line-length',
          message: 'Line too long (>120 chars)',
          severity: 'low'
        });
      }
    });

    return issues;
  },

  getMetrics: (content: string) => ({
    lines: content.split('\n').length,
    complexity: (content.match(/if|for|while|switch/g) || []).length,
    functions: (content.match(/function|=>/g) || []).length
  })
};