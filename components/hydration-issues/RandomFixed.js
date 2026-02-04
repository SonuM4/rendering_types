'use client';

import { useState, useEffect, useId } from 'react';

// GOOD: Generate random values only on client
export default function RandomFixed() {
  // useId() gives stable IDs that work with SSR
  const stableId = useId();

  const [randomId, setRandomId] = useState('');
  const [randomColor, setRandomColor] = useState('hsl(0, 0%, 50%)');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRandomId(Math.random().toString(36).substring(2, 10));
    setRandomColor(`hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`);
  }, []);

  const regenerate = () => {
    setRandomId(Math.random().toString(36).substring(2, 10));
    setRandomColor(`hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`);
  };

  return (
    <div className="result">
      <div className="result-label">Random ID (Fixed)</div>
      <div style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
        Random ID: {mounted ? randomId : 'Generating...'}
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#888' }}>
        Stable ID: {stableId}
      </div>
      <div
        style={{
          marginTop: '0.5rem',
          padding: '0.5rem',
          background: randomColor,
          borderRadius: '4px',
          color: '#000',
          fontWeight: 'bold'
        }}
      >
        {mounted ? randomColor : 'Loading...'}
      </div>
      {mounted && (
        <button
          onClick={regenerate}
          style={{
            marginTop: '0.5rem',
            padding: '0.25rem 0.75rem',
            background: 'var(--accent)',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Regenerate
        </button>
      )}
    </div>
  );
}
