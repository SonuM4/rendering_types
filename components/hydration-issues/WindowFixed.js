'use client';

import { useState, useEffect } from 'react';

// GOOD: Access window only in useEffect
export default function WindowFixed() {
  const [width, setWidth] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWidth(window.innerWidth);

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="result">
      <div className="result-label">Window Width (Fixed)</div>
      <div style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
        {mounted ? `${width}px` : 'Measuring...'}
      </div>
      {mounted && (
        <div style={{ color: 'var(--success)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
          Try resizing your browser window!
        </div>
      )}
    </div>
  );
}
