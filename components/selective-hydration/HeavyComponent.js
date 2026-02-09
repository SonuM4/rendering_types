// Heavy Component for Selective Hydration Demo
// ==============================================
// This component simulates a heavy, code-intensive component that takes time to load and hydrate
// In a real app, this might be a rich text editor, data grid, or component with heavy dependencies

'use client';

import { useState } from 'react';

// Simulate a heavy component with lots of functionality
// In reality, this might import large libraries or have complex logic
export default function HeavyComponent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  // Simulate complex operations that a heavy component might do
  const handleAddItem = () => {
    setItems([...items, `Item ${items.length + 1} - ${new Date().toLocaleTimeString()}`]);
  };

  const handleIncrement = () => {
    setCount(c => c + 1);
  };

  return (
    <div className="demo-box" style={{ borderColor: 'var(--warning)' }}>
      <h3 className="demo-box-title" style={{ color: 'var(--warning)' }}>
        Heavy Component (Loads Separately)
      </h3>
      <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
        This component is dynamically imported as a separate JavaScript chunk.
        It won't block other sections from becoming interactive.
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button className="btn" onClick={handleIncrement}>
          Heavy Counter: {count}
        </button>
        <button className="btn" onClick={handleAddItem}>
          Add Item ({items.length})
        </button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Type something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            background: 'var(--card-bg)',
            color: 'var(--text)',
          }}
        />
        {text && (
          <div style={{ marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            You typed: {text}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="result">
          <div className="result-label">Generated Items</div>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                padding: '0.5rem',
                marginBottom: '0.5rem',
                background: 'var(--accent-secondary)',
                borderRadius: '4px',
                fontSize: '0.85rem',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: 'rgba(251, 191, 36, 0.1)',
          borderRadius: '4px',
        }}
      >
        <strong>Hydration Status:</strong> This section is now interactive!
        <div style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
          • Loaded as separate JS chunk
          <br />
          • Didn't block fast sections
          <br />• If you clicked here during loading, React prioritized this hydration
        </div>
      </div>
    </div>
  );
}
