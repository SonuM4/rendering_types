'use client';

import { useState, useEffect } from 'react';

// GOOD: Use useEffect to set time only on client
export default function DateTimeFixed() {
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(new Date().toLocaleTimeString());

    // Update every second
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="result">
      <div className="result-label">Current Time (Fixed)</div>
      <div style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
        {mounted ? time : 'Loading...'}
      </div>
    </div>
  );
}
