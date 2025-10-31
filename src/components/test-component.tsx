import React, { useState, useEffect } from 'react';

interface TestComponentProps {
  title: string;
  onAction?: () => void;
}

const TestComponent: React.FC<TestComponentProps> = ({ title, onAction }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (!onAction) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await onAction();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="go-test-component" role="region" aria-labelledby="test-title">
      <h2 id="test-title" className="go-test-component__title">
        {title}
      </h2>
      
      {error && (
        <div className="go-test-component__error" role="alert" aria-live="polite">
          {error}
        </div>
      )}
      
      <button
        className="go-test-component__button"
        onClick={handleClick}
        disabled={loading}
        aria-describedby={error ? "error-message" : undefined}
      >
        {loading ? 'Loading...' : 'Test Action'}
      </button>
    </div>
  );
};

export default TestComponent;