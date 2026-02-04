'use client';

// BAD: This pattern causes issues!
// localStorage doesn't exist on server, and the value might differ
export default function LocalStorageBroken() {
  let theme = 'unknown';
  let visitCount = 0;
  let errorMsg = '';

  try {
    // This check prevents the crash, but still causes hydration mismatch
    // because server renders 'unknown' but client might render 'dark'
    if (typeof window !== 'undefined') {
      theme = localStorage.getItem('demo-theme') || 'light';
      visitCount = parseInt(localStorage.getItem('demo-visits') || '0', 10);
    }
  } catch (e) {
    errorMsg = 'localStorage not available';
  }

  return (
    <div className="result">
      <div className="result-label">Theme from localStorage (Broken)</div>
      <div style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
        Theme: {theme}
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#888' }}>
        Visit count: {visitCount}
      </div>
      {errorMsg && (
        <div style={{ color: 'var(--error)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
          {errorMsg}
        </div>
      )}
      <div style={{ color: 'var(--warning)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
        Server renders "unknown", client renders stored value = mismatch!
      </div>
    </div>
  );
}
