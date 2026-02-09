// Client Component Demo
// ======================
// This is a Client Component (marked with 'use client' directive)
// The 'use client' boundary tells Next.js that this component and its imports
// need to be sent to the browser as JavaScript and run on the client side
//
// Client Component Capabilities:
// - Use React hooks (useState, useEffect, useContext, etc.)
// - Handle user interactions (onClick, onChange, onSubmit, etc.)
// - Access browser APIs (window, document, localStorage, etc.)
// - Maintain interactive state that responds to user input
//
// Trade-off: All code in this file IS included in the JavaScript bundle
// sent to the browser, increasing the client-side bundle size

'use client';

import { useState } from 'react';

// Interactive demo component that showcases Client Component features
// Demonstrates state management and event handling - two key reasons to use Client Components
export default function ClientOnlyDemo() {
  // State for tracking the number of button clicks
  const [count, setCount] = useState(0);

  // State for storing an array of click timestamps
  // Shows how Client Components can maintain complex state
  const [clicks, setClicks] = useState([]);

  // Event handler function - only Client Components can handle events
  // Updates both the count and the click history array
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

      {/* Interactive button with onClick handler - requires Client Component */}
      <button
        onClick={handleClick}
        className="btn"
        style={{ marginBottom: '1rem' }}
      >
        Count: {count}
      </button>

      {/* Conditionally render click history when there are clicks */}
      {/* Shows how Client Components can have dynamic, interactive UI */}
      {clicks.length > 0 && (
        <div className="result">
          <div className="result-label">Click History</div>
          {/* Display the 3 most recent clicks */}
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
