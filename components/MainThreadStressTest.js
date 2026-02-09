'use client';

import { useState } from 'react';

/**
 * MainThreadStressTest - Demonstrates main thread blocking
 *
 * This component intentionally blocks the main thread to show:
 * - How heavy JavaScript impacts user experience
 * - The cost of synchronous operations
 * - Long tasks in the Performance tab (red bars)
 * - The difference between "visible" and "interactive"
 *
 * Use this in the Performance tab demo to show long tasks
 */
export default function MainThreadStressTest() {
  const [isRunning, setIsRunning] = useState(false);
  const [lastRunTime, setLastRunTime] = useState(null);
  const [runCount, setRunCount] = useState(0);

  const runStressTest = () => {
    setIsRunning(true);
    console.log('🔥 STRESS TEST STARTING - Main thread will block for 2 seconds');
    console.time('Main Thread Blocked');

    // Mark the start in Performance timeline
    if (performance.mark) {
      performance.mark('stress-test-start');
    }

    // Block the main thread for 2 seconds
    // This simulates heavy JavaScript execution (parsing, hydration, etc.)
    const startTime = Date.now();
    let iterations = 0;

    while (Date.now() - startTime < 2000) {
      // CPU-intensive work
      Math.random() * Math.random();
      iterations++;
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    // Mark the end in Performance timeline
    if (performance.mark) {
      performance.mark('stress-test-end');
      performance.measure('stress-test-duration', 'stress-test-start', 'stress-test-end');
    }

    console.timeEnd('Main Thread Blocked');
    console.log(`🎯 Iterations completed: ${iterations.toLocaleString()}`);
    console.log(`⏱️  Actual blocking time: ${duration}ms`);
    console.log('📊 Check Performance tab → Look for red "Long Task" bar');

    setIsRunning(false);
    setLastRunTime(duration);
    setRunCount(c => c + 1);
  };

  return (
    <div className="stress-test-container">
      <div className="stress-test-header">
        <h3>🔥 Main Thread Stress Test</h3>
        <p>
          Click the button below to intentionally block the main thread for 2 seconds.
          This demonstrates the cost of heavy JavaScript execution.
        </p>
      </div>

      <button
        onClick={runStressTest}
        disabled={isRunning}
        className="btn stress-test-btn"
      >
        {isRunning ? '⏳ Blocking Main Thread...' : '▶ Run Stress Test (2s)'}
      </button>

      {lastRunTime && (
        <div className="stress-test-results">
          <div className="result-item">
            <span className="result-label">Last Run:</span>
            <span className="result-value">{lastRunTime}ms blocked</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Runs:</span>
            <span className="result-value">{runCount}</span>
          </div>
        </div>
      )}

      <div className="stress-test-guide">
        <strong>📈 What to observe in DevTools:</strong>
        <div className="guide-section">
          <strong>Performance Tab:</strong>
          <ul>
            <li>Long Task (red bar) - shows main thread blocking</li>
            <li>User marks: "stress-test-start" and "stress-test-end"</li>
            <li>Notice how UI freezes during the test</li>
          </ul>
        </div>
        <div className="guide-section">
          <strong>Console:</strong>
          <ul>
            <li>Timing logs showing exact duration</li>
            <li>Iteration count (shows CPU work)</li>
          </ul>
        </div>
        <div className="guide-section">
          <strong>User Experience:</strong>
          <ul>
            <li>Button becomes unresponsive</li>
            <li>Page scrolling freezes</li>
            <li>Animations stop</li>
            <li>This is what heavy hydration feels like!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
