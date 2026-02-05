import Link from "next/link";
import Accordion from "@/components/Accordion";

export default function HydrationPage() {
  return (
    <div className="page">
      <h1 className="page-title">What is Hydration?</h1>
      <p className="page-subtitle">
        The process of making server-rendered HTML interactive
      </p>

      <Accordion title="Definition" defaultOpen={true}>
        <p style={{ marginBottom: '1rem' }}>
          <strong>Hydration</strong> is the process where React "attaches" to existing HTML that was
          rendered by the server. The term comes from the idea of adding "water" (interactivity) to
          "dry" (static) HTML.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          When you use SSR, the server sends complete HTML to the browser. But this HTML is just
          static markup - clicking buttons does nothing. Hydration is React's process of:
        </p>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
          <li>Walking through the existing DOM</li>
          <li>Matching it with the React component tree</li>
          <li>Attaching event handlers (onClick, onChange, etc.)</li>
          <li>Initializing component state</li>
        </ul>
      </Accordion>

      <Accordion title="The Hydration Process">
        <div className="diagram" style={{ flexDirection: 'column', gap: '0.75rem' }}>
          <div className="diagram-step" style={{ width: '100%', maxWidth: '500px' }}>
            <div className="diagram-step-number">1</div>
            <div>
              <strong>Server Renders HTML</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                React's renderToString() converts your component tree to HTML.
              </div>
            </div>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-step" style={{ width: '100%', maxWidth: '500px' }}>
            <div className="diagram-step-number">2</div>
            <div>
              <strong>Browser Displays HTML</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Browser parses and renders HTML immediately. User sees content.
              </div>
            </div>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-step" style={{ width: '100%', maxWidth: '500px' }}>
            <div className="diagram-step-number">3</div>
            <div>
              <strong>JavaScript Bundle Downloads</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Your React code loads in the browser.
              </div>
            </div>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-step" style={{ width: '100%', maxWidth: '500px' }}>
            <div className="diagram-step-number">4</div>
            <div>
              <strong>React Hydrates</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                hydrateRoot() attaches event handlers. Components become interactive!
              </div>
            </div>
          </div>
        </div>
      </Accordion>

      <Accordion title="Why Hydration Matters">
        <p style={{ marginBottom: '1rem' }}>
          During hydration, React compares its virtual DOM with the actual DOM sent by the server.
          If they match, React simply attaches event handlers. If they don't match, you get a
          <strong> hydration error</strong>.
        </p>
        <div className="info-box">
          <strong>Key Insight:</strong> The HTML rendered on the server MUST exactly match what
          React would render on the client. Any mismatch causes errors!
        </div>
      </Accordion>

      <div style={{ marginTop: "2rem", marginBottom: "2rem", textAlign: "center" }}>
        <Link href="/hydration/demo" className="btn">
          View Live Demo →
        </Link>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.75rem" }}>
          Open in a clean page for DevTools observation
        </p>
      </div>

      <Accordion title="Before & After Hydration">
        <div className="demo-container">
          <div className="demo-box">
            <h4 style={{ marginBottom: '1rem', color: 'var(--warning)' }}>Before Hydration</h4>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
              <li>Content is visible</li>
              <li>Native links work</li>
              <li style={{ color: 'var(--error)' }}>✗ onClick handlers don't fire</li>
              <li style={{ color: 'var(--error)' }}>✗ State doesn't exist</li>
            </ul>
          </div>
          <div className="demo-box">
            <h4 style={{ marginBottom: '1rem', color: 'var(--success)' }}>After Hydration</h4>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
              <li>Content is visible</li>
              <li>React handles navigation</li>
              <li style={{ color: 'var(--success)' }}>✓ onClick handlers work</li>
              <li style={{ color: 'var(--success)' }}>✓ Full React interactivity</li>
            </ul>
          </div>
        </div>
      </Accordion>

      <Accordion title="The Technical Process">
        <div className="code-block">
          <code>
{`// What React does during hydration:

// 1. Server sends this HTML:
<button>Clicked 0 times</button>

// 2. React renders virtually:
const virtualDOM = <button>Clicked 0 times</button>

// 3. React compares: Do they match?
if (serverHTML === virtualDOM) {
  // ✅ Yes! Attach event listeners only
  button.addEventListener('click', handleClick);
} else {
  // ❌ No! Hydration mismatch error
  console.error('Hydration failed');
}`}
          </code>
        </div>
      </Accordion>

      <Accordion title="The Cost of Hydration">
        <h4 style={{ color: 'var(--warning)', marginBottom: '0.5rem' }}>Time to Interactive Gap</h4>
        <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
          Users can see content immediately, but can't interact until hydration completes.
        </p>

        <table className="comparison-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>CSR</th>
              <th>SSR + Hydration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>First Contentful Paint</td>
              <td style={{ color: 'var(--error)' }}>Slow</td>
              <td style={{ color: 'var(--success)' }}>Fast</td>
            </tr>
            <tr>
              <td>Time to Interactive</td>
              <td>After JS loads</td>
              <td>After JS + hydration</td>
            </tr>
          </tbody>
        </table>
      </Accordion>

      <Accordion title="DevTools: Observing Hydration">
        <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Performance Tab</h4>
        <ol style={{ paddingLeft: '1.5rem', lineHeight: '2', marginBottom: '1rem' }}>
          <li>Record a page load in Performance tab</li>
          <li>Look at the Main thread flame chart</li>
          <li>Find the large JavaScript task after HTML parsing - that's hydration!</li>
          <li>The gap between FCP and end of this task = "hydration time"</li>
        </ol>

        <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Console Errors</h4>
        <div className="code-block">
          <code>
{`Warning: Text content did not match.
Server: "Hello" Client: "Hello World"

Warning: Expected server HTML to contain a matching <div>`}
          </code>
        </div>
      </Accordion>

      <Accordion title="Common Hydration Mistakes">
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
          <li><strong>Date/Time:</strong> new Date() returns different values on server vs client</li>
          <li><strong>Random values:</strong> Math.random() differs between renders</li>
          <li><strong>Browser APIs:</strong> window, localStorage don't exist on server</li>
          <li><strong>User-specific data:</strong> User agent, screen size differences</li>
        </ul>
        <div className="info-box" style={{ marginTop: '1rem' }}>
          See the <strong>Hydration Issues</strong> page for solutions!
        </div>
      </Accordion>
    </div>
  );
}
