'use client';

import { useState } from 'react';

export default function HydrationDemo() {
  const [count, setCount] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  // This effect only runs after hydration
  useState(() => {
    setIsHydrated(true);
  });

  return (
    <div className="card">
      <h2 className="card-title">Interactive Demo</h2>
      <p style={{ marginBottom: '1rem' }}>
        This button demonstrates hydration. The HTML is sent from the server,
        but the click handler only works after React hydrates:
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <button
          className="btn"
          onClick={() => setCount(c => c + 1)}
        >
          Clicked {count} times
        </button>

        <span style={{ color: '#888', fontSize: '0.9rem' }}>
          {count === 0
            ? '← Click me! (If this works, hydration completed)'
            : '✅ Hydration successful - button is interactive!'
          }
        </span>
      </div>

      <div className="info-box">
        <strong>What happened:</strong>
        <ol style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li>Server rendered this button as static HTML</li>
          <li>Your browser displayed it immediately</li>
          <li>React JavaScript loaded</li>
          <li>React "hydrated" the button, attaching the onClick handler</li>
          <li>Now you can click it!</li>
        </ol>
      </div>
    </div>
  );
}
