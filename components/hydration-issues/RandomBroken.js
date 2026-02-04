'use client';

// BAD: This causes hydration mismatch!
// Math.random() produces different values on server vs client
export default function RandomBroken() {
  // This runs during render - different on server vs client!
  const randomId = Math.random().toString(36).substring(2, 10);
  const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;

  return (
    <div className="result">
      <div className="result-label">Random ID (Broken)</div>
      <div style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
        ID: {randomId}
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
        Random Color: {randomColor}
      </div>
      <div style={{ color: 'var(--warning)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
        Check console for hydration warnings!
      </div>
    </div>
  );
}
