'use client';

import { useState, useEffect } from 'react';

// GOOD: Read localStorage only in useEffect
export default function LocalStorageFixed() {
  const [theme, setTheme] = useState('light');
  const [visitCount, setVisitCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Read from localStorage after mount
    const savedTheme = localStorage.getItem('demo-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Track visits
    const visits = parseInt(localStorage.getItem('demo-visits') || '0', 10) + 1;
    localStorage.setItem('demo-visits', visits.toString());
    setVisitCount(visits);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('demo-theme', newTheme);
  };

  const resetVisits = () => {
    localStorage.setItem('demo-visits', '0');
    setVisitCount(0);
  };

  return (
    <div className="result">
      <div className="result-label">Theme from localStorage (Fixed)</div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '0.5rem'
      }}>
        <span style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
          Theme: {theme}
        </span>
        {mounted && (
          <button
            onClick={toggleTheme}
            style={{
              padding: '0.25rem 0.75rem',
              background: theme === 'light' ? '#333' : '#fff',
              color: theme === 'light' ? '#fff' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Toggle Theme
          </button>
        )}
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <span style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#888' }}>
          Visit count: {mounted ? visitCount : '...'}
        </span>
        {mounted && (
          <button
            onClick={resetVisits}
            style={{
              padding: '0.125rem 0.5rem',
              background: 'transparent',
              color: '#888',
              border: '1px solid #555',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.75rem'
            }}
          >
            Reset
          </button>
        )}
      </div>
      {mounted && (
        <div style={{ color: 'var(--success)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
          Theme persists across page reloads!
        </div>
      )}
    </div>
  );
}
