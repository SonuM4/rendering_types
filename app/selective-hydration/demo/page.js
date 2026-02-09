// Selective Hydration Demo Page
// Demonstrates React 18's selective hydration with multiple Suspense boundaries
// This is a Server Component that sets up the demo

import { Suspense } from "react";
import SelectiveHydrationDemo from "@/components/SelectiveHydrationDemo";

// Demo page showing selective hydration in action
// Each section wraps different components in Suspense boundaries
// to demonstrate independent hydration
export default function SelectiveHydrationDemoPage() {
  return (
    <div className="page">
      <h1 className="page-title">Selective Hydration Demo</h1>
      <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
        Try interacting with different sections. Notice how some become interactive
        immediately while others may still be hydrating.
      </p>

      {/* Main demo component showing selective hydration */}
      <SelectiveHydrationDemo />

      <div className="info-box" style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>What to observe:</h3>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
          <li><strong>Fast sections become interactive first</strong> - The lightweight sections respond immediately</li>
          <li><strong>Heavy sections load progressively</strong> - Watch the skeletons get replaced</li>
          <li><strong>Click during loading</strong> - React prioritizes the section you interact with</li>
          <li><strong>Independent hydration</strong> - Each section becomes interactive on its own timeline</li>
        </ul>
      </div>
    </div>
  );
}
