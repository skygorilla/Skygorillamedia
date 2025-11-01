'use client';

import { useErrorDetector } from '@/hooks/useErrorDetector';

export function ErrorBadge() {
  const { errors, count, ssrErrors, apiErrors, configIssues, hydrationErrors, reactErrors, recommendations } = useErrorDetector();

  if (count === 0 || process.env.NODE_ENV === 'production') return null;

  return (
    <div className="error-badge">
      <span className="error-badge__count">{count}</span>
      <span>errors</span>
      {ssrErrors > 0 && <span className="error-badge__type">SSR</span>}
      {apiErrors > 0 && <span className="error-badge__type">API</span>}
      {configIssues > 0 && <span className="error-badge__type">CONFIG</span>}
      {hydrationErrors > 0 && <span className="error-badge__type">HYDRATION</span>}
      {reactErrors > 0 && <span className="error-badge__type">HOOKS</span>}
      <div className="error-badge__list">
        {errors.map((error, i) => (
          <div key={i} className="error-badge__item">
            {error.slice(0, 50)}...
          </div>
        ))}
        {recommendations.length > 0 && (
          <div className="error-badge__recommendations">
            <strong>Recommendations:</strong>
            {recommendations.map((rec, i) => (
              <div key={i} className="error-badge__rec">
                • {rec}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}