'use client';

// This is a Client Component (marked with 'use client')
// It can:
// - Use React hooks (useState, useEffect, etc.)
// - Handle user interactions (onClick, onChange, etc.)
// - Access browser APIs (window, localStorage, etc.)

import { useState } from 'react';

export default function ClientOnlyDemo() {
  const [count, setCount] = useState(0);
  const [clicks, setClicks] = useState([]);

  const handleClick = () => {
    setCount(c => c + 1);
    setClicks(prev => [...prev, new Date().toLocaleTimeString()]);
  };

  return (
    <div className="demo-box" style={{ borderColor: 'var(--warning)' }}>
      <h3 className="demo-box-title" style={{ color: 'var(--warning)' }}>Client Component</h3>
      <p style={{ marginBottom: '1rem' }}>
        This component runs in the <strong>browser</strong>. It's interactive and uses React hooks.
      </p>

      <button
        onClick={handleClick}
        className="btn"
        style={{ marginBottom: '1rem' }}
      >
        Count: {count}
      </button>

      {clicks.length > 0 && (
        <div className="result">
          <div className="result-label">Click History</div>
          {clicks.slice(-3).map((time, i) => (
            <div key={i} style={{ fontSize: '0.85rem' }}>Clicked at {time}</div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(251, 191, 36, 0.1)', borderRadius: '4px' }}>
        <strong style={{ color: 'var(--warning)' }}>Required for:</strong>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
          <li>useState, useEffect, useContext</li>
          <li>Event handlers (onClick, onChange)</li>
          <li>Browser APIs (window, document)</li>
        </ul>
      </div>
    </div>
  );
}
