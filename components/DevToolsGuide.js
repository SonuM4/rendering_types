/**
 * DevToolsGuide - Reusable component for DevTools observation instructions
 *
 * Provides consistent guidance for what to look for in Chrome DevTools
 * across different demo pages (CSR, SSR, Streaming, RSC)
 */
export default function DevToolsGuide({ type = 'general' }) {
  const guides = {
    csr: {
      title: '🔍 CSR DevTools Checklist',
      network: [
        'Large JavaScript bundle (~200KB+)',
        'Minimal HTML document (~5KB)',
        'Data fetched AFTER page load (separate API calls)',
        'Total transfer: HTML + JS + Data'
      ],
      performance: [
        'FCP (First Contentful Paint): Delayed until JS executes',
        'TTI (Time to Interactive): Same as FCP (no hydration gap)',
        'Look for JavaScript parsing time in Main thread',
        'Long yellow bars = script evaluation'
      ],
      console: [
        'Check for "Fetching data on client..." logs',
        'API calls happen after page load',
        'Hydration logger shows timing'
      ]
    },
    ssr: {
      title: '🔍 SSR DevTools Checklist',
      network: [
        'Larger HTML document (~40-50KB) - contains data',
        'Smaller JavaScript bundle (~15KB)',
        'Single request contains all initial data',
        'No separate API calls on load'
      ],
      performance: [
        'FCP (First Contentful Paint): Fast - content visible immediately',
        'TTI (Time to Interactive): Delayed - hydration gap!',
        'Look for the gap between FCP and TTI',
        'This gap = "visible but not interactive" period'
      ],
      console: [
        'Check "HYDRATION COMPLETE" timing',
        'Compare server timestamp vs client timestamp',
        'Notice data is already present on first render'
      ]
    },
    streaming: {
      title: '🔍 Streaming SSR DevTools Checklist',
      network: [
        'ONE long-running request (status "pending" for 10s)',
        'Transfer-Encoding: chunked in Response Headers',
        'Size grows incrementally: 5KB → 8KB → 12KB → 15KB',
        'Waterfall bar keeps extending as chunks arrive'
      ],
      performance: [
        'Early FCP - shell arrives in ~50ms',
        'Multiple "Paint" events as content streams in',
        'Watch for progressive rendering (skeleton → content)',
        'TTI happens after last chunk arrives'
      ],
      console: [
        'Server-side logs showing async component resolution',
        'Check timing: Products (2s), Reviews (3s), Recs (10s)',
        'Look for hydration logs for each streamed section'
      ]
    },
    rsc: {
      title: '🔍 RSC DevTools Checklist',
      network: [
        'Filter by "JS" - notice minimal bundles',
        'Server components = ZERO JavaScript shipped',
        'Compare bundle size: CSR vs RSC (huge difference)',
        'Look for .js files - only client components included'
      ],
      performance: [
        'Reduced JavaScript parsing time',
        'Faster TTI due to less hydration work',
        'Main thread less busy',
        'Smaller bundle = faster download on slow connections'
      ],
      console: [
        'Server component logs (if any) run server-side only',
        'Client component logs appear in browser console',
        'Hydration only happens for client components'
      ]
    },
    general: {
      title: '🔍 DevTools Observation Guide',
      network: [
        'Document size and transfer time',
        'JavaScript bundle sizes',
        'Number of requests',
        'Waterfall timing'
      ],
      performance: [
        'FCP - First Contentful Paint',
        'LCP - Largest Contentful Paint',
        'TTI - Time to Interactive',
        'Long Tasks (red bars)'
      ],
      console: [
        'Timing logs',
        'Performance markers',
        'Hydration status'
      ]
    }
  };

  const guide = guides[type] || guides.general;

  return (
    <div className="devtools-guide">
      <h3 className="devtools-guide-title">{guide.title}</h3>

      <div className="devtools-sections">
        <div className="devtools-section">
          <h4 className="section-title">📊 Network Tab</h4>
          <ul className="checklist">
            {guide.network.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <div className="section-tip">
            <strong>Tip:</strong> Enable "Disable cache" and use hard refresh (Ctrl+Shift+R)
          </div>
        </div>

        <div className="devtools-section">
          <h4 className="section-title">⚡ Performance Tab</h4>
          <ul className="checklist">
            {guide.performance.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <div className="section-tip">
            <strong>Tip:</strong> Record a fresh page load to see the full lifecycle
          </div>
        </div>

        <div className="devtools-section">
          <h4 className="section-title">🖥️ Console</h4>
          <ul className="checklist">
            {guide.console.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <div className="section-tip">
            <strong>Tip:</strong> Keep console open during page load to catch all logs
          </div>
        </div>
      </div>

      <div className="devtools-setup">
        <strong>⚙️ Setup Steps:</strong>
        <ol>
          <li>Open DevTools (F12 or Right-click → Inspect)</li>
          <li>Open Network, Performance, and Console tabs in separate windows</li>
          <li>In Network: Check "Disable cache"</li>
          <li>Perform a hard refresh (Ctrl+Shift+R)</li>
          <li>Observe the differences!</li>
        </ol>
      </div>
    </div>
  );
}
