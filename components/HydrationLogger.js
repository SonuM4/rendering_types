'use client';

import { useState, useEffect } from 'react';

/**
 * HydrationLogger - Demonstrates the hydration gap
 *
 * Shows the time difference between:
 * - When content is visible (server-rendered HTML arrives)
 * - When content becomes interactive (React hydrates)
 *
 * This component logs to console and displays metrics for DevTools demonstration
 */
export default function HydrationLogger() {
  const [hydrationTime, setHydrationTime] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // This runs AFTER React hydration completes
    const hydrationCompleteTime = performance.now();
    setHydrationTime(hydrationCompleteTime);
    setIsHydrated(true);

    // Log to console for DevTools demonstration
    console.log(`✅ HYDRATION COMPLETE at ${hydrationCompleteTime.toFixed(2)}ms`);
    console.log(`📊 Performance Metrics:`, {
      hydrationTime: `${hydrationCompleteTime.toFixed(2)}ms`,
      navigationStart: performance.timing.navigationStart,
      domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
    });

    // Mark the hydration event in Performance timeline
    if (performance.mark) {
      performance.mark('react-hydration-complete');
    }
  }, []);

  return (
    <div className="hydration-logger">
      <div className="hydration-status">
        <div className="status-indicator">
          <span className={`status-dot ${isHydrated ? 'hydrated' : 'pending'}`}></span>
          <span className="status-text">
            {isHydrated ? '✅ Interactive' : '⏳ Hydrating...'}
          </span>
        </div>
        {hydrationTime && (
          <div className="hydration-metrics">
            <div className="metric">
              <span className="metric-label">Hydration Time:</span>
              <span className="metric-value">{hydrationTime.toFixed(2)}ms</span>
            </div>
          </div>
        )}
      </div>
      {isHydrated && (
        <div className="hydration-info">
          <strong>💡 What just happened:</strong>
          <ol>
            <li>Server sent HTML → You saw content immediately</li>
            <li>Browser downloaded React JavaScript</li>
            <li>React "hydrated" the page → Buttons now work!</li>
            <li>Check Console for detailed timing</li>
          </ol>
        </div>
      )}
    </div>
  );
}
