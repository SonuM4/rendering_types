'use client';

// BAD: This causes hydration mismatch!
// The server renders one time, client hydrates at a different time
export default function DateTimeBroken() {
  // This runs during render - different on server vs client!
  const time = new Date().toLocaleTimeString();

  return (
    <div className="result">
      <div className="result-label">Current Time (Broken)</div>
      <div style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
        {time}
      </div>
    </div>
  );
}
