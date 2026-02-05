import Link from "next/link";
import Accordion from '@/components/Accordion';

export default function RSCPage() {
  return (
    <div className="page">
      <h1 className="page-title">React Server Components (RSC)</h1>
      <p className="page-subtitle">
        A new paradigm: components that render only on the server, never on the client
      </p>

      <Accordion title="Definition" defaultOpen={true}>
        <p style={{ marginBottom: '1rem' }}>
          <strong>React Server Components (RSC)</strong> are components that execute
          <strong> exclusively on the server</strong>. Unlike SSR where components render on the
          server AND hydrate on the client, Server Components <strong>never run in the browser</strong>.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          This is fundamentally different from SSR. With RSC, you split components into two categories:
          those that only run on the server (Server Components) and those that run on both
          (Client Components).
        </p>
        <div className="info-box">
          <strong>Key Insight:</strong> In Next.js App Router, components are Server Components by default.
          Use <code>'use client'</code> to opt into Client Components.
        </div>
      </Accordion>

      <Accordion title="Why Server Components?">
        <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>1. Bundle Size</h4>
        <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
          Server Component code is never sent to the browser. Heavy libraries stay on the server.
        </p>

        <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>2. Data Fetching</h4>
        <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
          Direct access to databases, file systems, and internal APIs without exposing endpoints.
        </p>

        <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>3. Security</h4>
        <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
          API keys and secrets can be used directly - the code never reaches the client.
        </p>

        <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>4. No Waterfalls</h4>
        <p style={{ color: 'var(--text-muted)' }}>
          Fetch all data in parallel on the server, then send the complete result.
        </p>
      </Accordion>

      <Accordion title="Server vs Client Components">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Capability</th>
              <th>Server Component</th>
              <th>Client Component</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Directive</td>
              <td>None (default)</td>
              <td><code>'use client'</code></td>
            </tr>
            <tr>
              <td>In JS bundle?</td>
              <td style={{ color: 'var(--success)' }}>No</td>
              <td style={{ color: 'var(--warning)' }}>Yes</td>
            </tr>
            <tr>
              <td>useState/useEffect</td>
              <td style={{ color: 'var(--error)' }}>Cannot use</td>
              <td style={{ color: 'var(--success)' }}>Can use</td>
            </tr>
            <tr>
              <td>Event handlers</td>
              <td style={{ color: 'var(--error)' }}>Cannot use</td>
              <td style={{ color: 'var(--success)' }}>Can use</td>
            </tr>
            <tr>
              <td>async/await</td>
              <td style={{ color: 'var(--success)' }}>Can use directly</td>
              <td style={{ color: 'var(--error)' }}>Use useEffect</td>
            </tr>
            <tr>
              <td>Database access</td>
              <td style={{ color: 'var(--success)' }}>Direct</td>
              <td style={{ color: 'var(--error)' }}>Via API</td>
            </tr>
            <tr>
              <td>Secrets safe?</td>
              <td style={{ color: 'var(--success)' }}>Yes</td>
              <td style={{ color: 'var(--error)' }}>Exposed!</td>
            </tr>
          </tbody>
        </table>
      </Accordion>

      <div style={{ marginTop: "2rem", marginBottom: "2rem", textAlign: "center" }}>
        <Link href="/rsc/demo" className="btn">
          View Live Demo →
        </Link>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.75rem" }}>
          Open in a clean page for DevTools observation
        </p>
      </div>

      <Accordion title="The Mental Model">
        <p style={{ marginBottom: '1rem' }}>
          Think of <code>'use client'</code> as a boundary:
        </p>
        <div className="diagram">
          <div className="diagram-step" style={{ background: 'rgba(20, 184, 166, 0.2)', border: '2px solid var(--success)' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Server Components</div>
            <div style={{ fontSize: '0.85rem' }}>Data, Secrets, Heavy logic</div>
          </div>
          <div className="diagram-arrow">→</div>
          <div className="diagram-step" style={{ background: 'rgba(139, 92, 246, 0.2)', border: '2px dashed var(--accent)' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>'use client'</div>
            <div style={{ fontSize: '0.85rem' }}>Boundary</div>
          </div>
          <div className="diagram-arrow">→</div>
          <div className="diagram-step" style={{ background: 'rgba(245, 158, 11, 0.2)', border: '2px solid var(--warning)' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Client Components</div>
            <div style={{ fontSize: '0.85rem' }}>Interactivity, Hooks</div>
          </div>
        </div>
      </Accordion>

      <Accordion title="Composition Patterns">
        <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>✓ Server can import Client</h4>
        <div className="code-block">
          <code>
{`// page.js (Server Component)
import ClientButton from './ClientButton';

export default async function Page() {
  const data = await db.query(...);
  return (
    <div>
      <h1>{data.title}</h1>
      <ClientButton />  {/* Works! */}
    </div>
  );
}`}
          </code>
        </div>

        <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem', marginTop: '1.5rem' }}>✓ Pass Server as children to Client</h4>
        <div className="code-block">
          <code>
{`// page.js
<ClientWrapper>
  <ServerComponent />  {/* Works! */}
</ClientWrapper>`}
          </code>
        </div>

        <h4 style={{ color: 'var(--error)', marginBottom: '0.5rem', marginTop: '1.5rem' }}>✗ Client cannot import Server</h4>
        <div className="code-block">
          <code style={{ color: 'var(--error)' }}>
{`'use client';
import ServerComponent from './ServerComponent';  // Error!`}
          </code>
        </div>
      </Accordion>

      <Accordion title="Common Pitfalls">
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ color: 'var(--error)', marginBottom: '0.5rem' }}>
            1. Using hooks in Server Components
          </h4>
          <div className="code-block">
            <code>
{`// ❌ Error!
export default function ServerComponent() {
  const [count, setCount] = useState(0);
}

// ✅ Solution: Add 'use client'`}
            </code>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ color: 'var(--error)', marginBottom: '0.5rem' }}>
            2. Passing functions to Client Components
          </h4>
          <div className="code-block">
            <code>
{`// ❌ Error! Functions aren't serializable
<ClientButton onClick={handleClick} />

// ✅ Solution: Define handlers inside Client Component`}
            </code>
          </div>
        </div>
      </Accordion>

      <Accordion title="When to Use What">
        <div className="demo-container">
          <div>
            <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>Server Components:</h4>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>Data fetching</li>
              <li>Backend resources</li>
              <li>Sensitive operations</li>
              <li>Heavy dependencies</li>
              <li>Static content</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--warning)', marginBottom: '0.5rem' }}>Client Components:</h4>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>onClick, onChange</li>
              <li>useState, useEffect</li>
              <li>Browser APIs</li>
              <li>Stateful hooks</li>
              <li>Third-party UI libs</li>
            </ul>
          </div>
        </div>
      </Accordion>

      <Accordion title="DevTools: Observing RSC">
        <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Network Tab: RSC Payload</h4>
        <ol style={{ paddingLeft: '1.5rem', lineHeight: '2', marginBottom: '1rem' }}>
          <li>Look for requests with <code>?_rsc=</code> query parameter</li>
          <li>Response is a special format (not JSON, not HTML)</li>
          <li>It's a serialized React tree</li>
        </ol>

        <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Sources Tab</h4>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
          <li>Search for Server Component functions - they won't be there!</li>
          <li>Only Client Component code appears in the bundle</li>
        </ul>
      </Accordion>
    </div>
  );
}
