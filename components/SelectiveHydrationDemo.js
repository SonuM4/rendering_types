// Selective Hydration Demo Component
// ======================================
// This component demonstrates React 18's selective hydration feature
// Uses Suspense boundaries to create sections that hydrate independently
// Shows how React prioritizes user interactions during hydration

'use client';

import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import heavy components to demonstrate code splitting
// These will load as separate JavaScript chunks
const HeavyComponent = dynamic(() => import('./selective-hydration/HeavyComponent'), {
  loading: () => <LoadingSkeleton title="Heavy Component Loading..." />,
});

const ChartComponent = dynamic(() => import('./selective-hydration/ChartComponent'), {
  loading: () => <LoadingSkeleton title="Chart Loading..." />,
});

// Simple loading skeleton for fallback UI
function LoadingSkeleton({ title }) {
  return (
    <div className="demo-box" style={{ opacity: 0.6 }}>
      <h3 className="demo-box-title">{title}</h3>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div className="loading-spinner"></div>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
          This section is loading its JavaScript...
        </p>
      </div>
    </div>
  );
}

// Lightweight component that hydrates quickly
// This demonstrates how simple components become interactive first
function FastSection() {
  const [count, setCount] = useState(0);

  return (
    <div className="demo-box fixed">
      <h3 className="demo-box-title" style={{ color: 'var(--success)' }}>
        Fast Section (Hydrates Immediately)
      </h3>
      <p style={{ marginBottom: '1rem' }}>
        This is a lightweight component with minimal code. It hydrates almost instantly.
      </p>
      <button
        className="btn"
        onClick={() => setCount(c => c + 1)}
        style={{ marginBottom: '1rem' }}
      >
        Fast Counter: {count}
      </button>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        Try clicking this button immediately on page load. It becomes interactive very quickly!
      </div>
    </div>
  );
}

// Another lightweight component
function QuickSection() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="demo-box" style={{ borderColor: 'var(--accent)' }}>
      <h3 className="demo-box-title" style={{ color: 'var(--accent)' }}>
        Quick Section
      </h3>
      <p style={{ marginBottom: '1rem' }}>
        Another fast-loading component that doesn't block other sections.
      </p>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        <span>Toggle this immediately</span>
      </label>
      {enabled && (
        <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--accent-secondary)', borderRadius: '4px' }}>
          This appeared because selective hydration made this section interactive quickly!
        </div>
      )}
    </div>
  );
}

// Main demo component that orchestrates all sections
// Demonstrates how multiple Suspense boundaries create independently hydrating sections
export default function SelectiveHydrationDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Fast sections load immediately without Suspense */}
      <FastSection />
      <QuickSection />

      {/* Heavy component wrapped in Suspense - hydrates independently */}
      <Suspense fallback={<LoadingSkeleton title="Heavy Component Loading..." />}>
        <HeavyComponent />
      </Suspense>

      {/* Chart component wrapped in Suspense - also hydrates independently */}
      <Suspense fallback={<LoadingSkeleton title="Chart Loading..." />}>
        <ChartComponent />
      </Suspense>

      <div className="info-box">
        <h4 style={{ marginBottom: '0.5rem' }}>How This Works</h4>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
          <li>
            <strong>Fast Section & Quick Section</strong> - Lightweight components that hydrate
            immediately. No Suspense needed as they're already part of the main bundle.
          </li>
          <li>
            <strong>Heavy Component</strong> - Wrapped in Suspense and loaded with dynamic import.
            Has its own JavaScript chunk that loads separately. Won't block other sections.
          </li>
          <li>
            <strong>Chart Component</strong> - Also dynamically imported with its own chunk.
            Can take time to load but doesn't prevent the page from being interactive.
          </li>
          <li>
            <strong>Priority Hydration</strong> - If you click a section before it's hydrated,
            React will prioritize hydrating that specific section first!
          </li>
        </ul>
      </div>
    </div>
  );
}
