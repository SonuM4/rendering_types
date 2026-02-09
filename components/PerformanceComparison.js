/**
 * PerformanceComparison - Side-by-side comparison of rendering approaches
 *
 * Visualizes the key performance differences between CSR, SSR, and Streaming
 * in a way that's easy to understand during live presentations
 */
export default function PerformanceComparison() {
  const metrics = [
    {
      name: 'Time to First Byte (TTFB)',
      csr: { value: 'Fast (~50ms)', score: 'good', bar: 10 },
      ssr: { value: 'Slow (~3000ms)', score: 'bad', bar: 60 },
      streaming: { value: 'Fast (~50ms)', score: 'good', bar: 10 }
    },
    {
      name: 'First Contentful Paint (FCP)',
      csr: { value: 'Slow (~2500ms)', score: 'bad', bar: 50 },
      ssr: { value: 'Fast (~100ms)', score: 'good', bar: 20 },
      streaming: { value: 'Fast (~100ms)', score: 'good', bar: 20 }
    },
    {
      name: 'Time to Interactive (TTI)',
      csr: { value: 'Same as FCP', score: 'good', bar: 50 },
      ssr: { value: 'Delayed (+200ms)', score: 'warning', bar: 40 },
      streaming: { value: 'Progressive', score: 'good', bar: 30 }
    },
    {
      name: 'JavaScript Bundle Size',
      csr: { value: 'Large (~250KB)', score: 'bad', bar: 100 },
      ssr: { value: 'Large (~180KB)', score: 'warning', bar: 72 },
      streaming: { value: 'Large (~180KB)', score: 'warning', bar: 72 }
    },
    {
      name: 'SEO Friendliness',
      csr: { value: 'Poor', score: 'bad', bar: 20 },
      ssr: { value: 'Excellent', score: 'good', bar: 100 },
      streaming: { value: 'Excellent', score: 'good', bar: 100 }
    }
  ];

  const getScoreColor = (score) => {
    switch (score) {
      case 'good': return 'var(--success)';
      case 'warning': return 'var(--warning)';
      case 'bad': return 'var(--error)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div className="performance-comparison">
      <h3 className="comparison-title">⚡ Performance Comparison</h3>
      <p className="comparison-subtitle">
        How do different rendering approaches perform?
      </p>

      <div className="performance-table">
        <div className="table-header">
          <div className="header-cell metric-header">Metric</div>
          <div className="header-cell">
            <span className="badge badge-warning">CSR</span>
          </div>
          <div className="header-cell">
            <span className="badge badge-success">SSR</span>
          </div>
          <div className="header-cell">
            <span style={{
              padding: '0.375rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
              color: 'white'
            }}>
              Streaming
            </span>
          </div>
        </div>

        {metrics.map((metric, idx) => (
          <div key={idx} className="table-row">
            <div className="row-cell metric-name">{metric.name}</div>

            <div className="row-cell">
              <div
                className="metric-value"
                style={{ color: getScoreColor(metric.csr.score) }}
              >
                {metric.csr.value}
              </div>
              <div className="metric-bar">
                <div
                  className="bar-fill"
                  style={{
                    width: `${metric.csr.bar}%`,
                    background: getScoreColor(metric.csr.score)
                  }}
                ></div>
              </div>
            </div>

            <div className="row-cell">
              <div
                className="metric-value"
                style={{ color: getScoreColor(metric.ssr.score) }}
              >
                {metric.ssr.value}
              </div>
              <div className="metric-bar">
                <div
                  className="bar-fill"
                  style={{
                    width: `${metric.ssr.bar}%`,
                    background: getScoreColor(metric.ssr.score)
                  }}
                ></div>
              </div>
            </div>

            <div className="row-cell">
              <div
                className="metric-value"
                style={{ color: getScoreColor(metric.streaming.score) }}
              >
                {metric.streaming.value}
              </div>
              <div className="metric-bar">
                <div
                  className="bar-fill"
                  style={{
                    width: `${metric.streaming.bar}%`,
                    background: getScoreColor(metric.streaming.score)
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="comparison-summary">
        <div className="summary-item">
          <div className="summary-icon">🏆</div>
          <div className="summary-content">
            <strong>Best for Initial Load:</strong>
            <p>Streaming SSR - Fast TTFB + Progressive rendering</p>
          </div>
        </div>

        <div className="summary-item">
          <div className="summary-icon">⚠️</div>
          <div className="summary-content">
            <strong>CSR Trade-off:</strong>
            <p>Slow initial load, but no hydration gap</p>
          </div>
        </div>

        <div className="summary-item">
          <div className="summary-icon">🔄</div>
          <div className="summary-content">
            <strong>SSR Trade-off:</strong>
            <p>Fast FCP, but users must wait during hydration gap</p>
          </div>
        </div>
      </div>
    </div>
  );
}
