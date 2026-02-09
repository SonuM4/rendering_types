// Chart Component for Selective Hydration Demo
// ==============================================
// Simulates a data visualization component that might use a heavy charting library
// In a real app, this might import Chart.js, D3, or similar visualization libraries

'use client';

import { useState } from 'react';

// Simulate a chart/visualization component
// Real implementation would import a charting library
export default function ChartComponent() {
  const [dataPoints, setDataPoints] = useState([65, 45, 70, 55, 80, 60]);
  const [selectedBar, setSelectedBar] = useState(null);

  // Simulate adding a new data point
  const addDataPoint = () => {
    const newValue = Math.floor(Math.random() * 100);
    setDataPoints([...dataPoints, newValue]);
  };

  // Find the max value for scaling
  const maxValue = Math.max(...dataPoints);

  return (
    <div className="demo-box" style={{ borderColor: 'var(--accent)' }}>
      <h3 className="demo-box-title" style={{ color: 'var(--accent)' }}>
        Chart Component (Separate Bundle)
      </h3>
      <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
        Represents a component with heavy dependencies (like a charting library).
        Loaded separately to not block the initial page hydration.
      </p>

      {/* Simple bar chart visualization */}
      <div style={{ marginBottom: '1rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '0.5rem',
            height: '150px',
            padding: '1rem',
            background: 'var(--code-bg)',
            borderRadius: '8px',
          }}
        >
          {dataPoints.map((value, index) => (
            <div
              key={index}
              onClick={() => setSelectedBar(index)}
              style={{
                flex: 1,
                height: `${(value / maxValue) * 100}%`,
                background:
                  selectedBar === index
                    ? 'var(--accent)'
                    : 'linear-gradient(to top, var(--success), var(--accent))',
                borderRadius: '4px 4px 0 0',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                minHeight: '20px',
              }}
              title={`Value: ${value}`}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedBar !== null && (
        <div
          style={{
            padding: '0.75rem',
            background: 'var(--accent-secondary)',
            borderRadius: '4px',
            marginBottom: '1rem',
          }}
        >
          <strong>Selected:</strong> Bar {selectedBar + 1} with value {dataPoints[selectedBar]}
        </div>
      )}

      <button className="btn" onClick={addDataPoint}>
        Add Random Data Point
      </button>

      <div
        style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: 'rgba(139, 92, 246, 0.1)',
          borderRadius: '4px',
        }}
      >
        <strong>Why separate bundle?</strong>
        <div style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
          Charting libraries can be 50-200KB. By code-splitting this component, we ensure:
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            <li>Initial page loads faster</li>
            <li>Other sections become interactive sooner</li>
            <li>This chart can hydrate independently</li>
            <li>Users clicking here trigger priority hydration</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
