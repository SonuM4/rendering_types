/**
 * BundleSizeComparison - Visual comparison of JavaScript bundle sizes
 *
 * Shows the dramatic difference in bundle sizes between:
 * - CSR (Client-Side Rendering) - Large JS bundle
 * - SSR (Server-Side Rendering) - Medium JS bundle
 * - RSC (React Server Components) - Minimal JS bundle
 *
 * Perfect for demonstrating the "zero JavaScript" benefit of RSC
 */
export default function BundleSizeComparison() {
  const approaches = [
    {
      name: 'CSR',
      label: 'Client-Side Rendering',
      jsSize: 250, // KB
      htmlSize: 5,
      color: '#F59E0B',
      description: 'All rendering logic + data handling in browser'
    },
    {
      name: 'SSR',
      label: 'Server-Side Rendering',
      jsSize: 180, // KB
      htmlSize: 45,
      color: '#14B8A6',
      description: 'Hydration + client-side logic shipped to browser'
    },
    {
      name: 'RSC',
      label: 'React Server Components',
      jsSize: 15, // KB
      htmlSize: 50,
      color: '#8B5CF6',
      description: 'Only interactive components ship JavaScript'
    }
  ];

  const maxSize = Math.max(...approaches.map(a => a.jsSize + a.htmlSize));

  return (
    <div className="bundle-comparison">
      <h3 className="comparison-title">📦 Bundle Size Comparison</h3>
      <p className="comparison-subtitle">
        What actually gets downloaded to the user's browser?
      </p>

      <div className="comparison-chart">
        {approaches.map((approach) => {
          const totalSize = approach.jsSize + approach.htmlSize;
          const jsPercent = (approach.jsSize / maxSize) * 100;
          const htmlPercent = (approach.htmlSize / maxSize) * 100;

          return (
            <div key={approach.name} className="comparison-row">
              <div className="row-label">
                <div className="label-name">{approach.label}</div>
                <div className="label-badge" style={{ background: approach.color }}>
                  {approach.name}
                </div>
              </div>

              <div className="row-bar">
                <div className="bar-container">
                  {/* HTML portion */}
                  <div
                    className="bar-segment bar-html"
                    style={{ width: `${htmlPercent}%` }}
                    title={`HTML: ${approach.htmlSize}KB`}
                  >
                    {approach.htmlSize > 10 && (
                      <span className="bar-label">{approach.htmlSize}KB HTML</span>
                    )}
                  </div>

                  {/* JavaScript portion */}
                  <div
                    className="bar-segment bar-js"
                    style={{
                      width: `${jsPercent}%`,
                      background: approach.color
                    }}
                    title={`JavaScript: ${approach.jsSize}KB`}
                  >
                    <span className="bar-label">{approach.jsSize}KB JS</span>
                  </div>
                </div>

                <div className="bar-total">{totalSize}KB</div>
              </div>

              <div className="row-description">{approach.description}</div>
            </div>
          );
        })}
      </div>

      <div className="comparison-insights">
        <div className="insight-box">
          <div className="insight-icon">🚀</div>
          <div className="insight-content">
            <strong>94% JavaScript Reduction</strong>
            <p>RSC ships 235KB less JavaScript than CSR (250KB → 15KB)</p>
          </div>
        </div>

        <div className="insight-box">
          <div className="insight-icon">⚡</div>
          <div className="insight-content">
            <strong>Faster Time to Interactive</strong>
            <p>Less JavaScript = Less parsing = Faster interactivity</p>
          </div>
        </div>

        <div className="insight-box">
          <div className="insight-icon">📱</div>
          <div className="insight-content">
            <strong>Better Mobile Experience</strong>
            <p>Crucial for users on slow networks or low-end devices</p>
          </div>
        </div>
      </div>

      <div className="comparison-devtools">
        <strong>🔍 Verify in DevTools:</strong>
        <ol>
          <li>Open Network tab and filter by "JS"</li>
          <li>Hard refresh each demo page (Ctrl+Shift+R)</li>
          <li>Compare the total JavaScript transfer size</li>
          <li>Notice: Server components don't appear in the JS filter!</li>
        </ol>
      </div>
    </div>
  );
}
