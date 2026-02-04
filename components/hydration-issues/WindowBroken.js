'use client';

// BAD: This causes errors on the server!
// We're wrapping in try-catch just to show the error message
export default function WindowBroken() {
  let width = 'Error';
  let errorMsg = '';

  try {
    // This would crash on server: "window is not defined"
    // In client components, this might work but can still cause issues
    if (typeof window !== 'undefined') {
      width = window.innerWidth;
    } else {
      width = 'N/A (server)';
      errorMsg = 'window not available on server!';
    }
  } catch (e) {
    errorMsg = e.message;
  }

  return (
    <div className="result">
      <div className="result-label">Window Width (Broken Pattern)</div>
      <div style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
        {width}px
      </div>
      {errorMsg && (
        <div style={{ color: 'var(--error)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
          {errorMsg}
        </div>
      )}
    </div>
  );
}
