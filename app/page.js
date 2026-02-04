import Link from 'next/link';

export default function Home() {
  return (
    <div className="page">
      <h1 className="page-title">Understanding Next.js Rendering</h1>
      <p className="page-subtitle">
        A hands-on guide to CSR, SSR, Hydration, Streaming, and React Server Components
      </p>

      <div className="card">
        <h2 className="card-title">What is Rendering?</h2>
        <p>
          Rendering is the process of converting your React components into HTML that
          browsers can display. Next.js gives you multiple ways to render your pages,
          each with different trade-offs.
        </p>
      </div>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>CSR vs SSR Flow</h2>

      <div className="demo-container">
        <div className="demo-box">
          <h3 className="demo-box-title">Client-Side Rendering (CSR)</h3>
          <div className="diagram" style={{ flexDirection: 'column', gap: '0.5rem' }}>
            <div className="diagram-step">
              <div className="diagram-step-number">1</div>
              <div>Browser requests page</div>
            </div>
            <div className="diagram-arrow">↓</div>
            <div className="diagram-step">
              <div className="diagram-step-number">2</div>
              <div>Server sends empty HTML + JS bundle</div>
            </div>
            <div className="diagram-arrow">↓</div>
            <div className="diagram-step">
              <div className="diagram-step-number">3</div>
              <div>JS downloads and executes</div>
            </div>
            <div className="diagram-arrow">↓</div>
            <div className="diagram-step">
              <div className="diagram-step-number">4</div>
              <div>Content appears (after delay)</div>
            </div>
          </div>
        </div>

        <div className="demo-box">
          <h3 className="demo-box-title">Server-Side Rendering (SSR)</h3>
          <div className="diagram" style={{ flexDirection: 'column', gap: '0.5rem' }}>
            <div className="diagram-step">
              <div className="diagram-step-number">1</div>
              <div>Browser requests page</div>
            </div>
            <div className="diagram-arrow">↓</div>
            <div className="diagram-step">
              <div className="diagram-step-number">2</div>
              <div>Server renders HTML with content</div>
            </div>
            <div className="diagram-arrow">↓</div>
            <div className="diagram-step">
              <div className="diagram-step-number">3</div>
              <div>Content visible immediately</div>
            </div>
            <div className="diagram-arrow">↓</div>
            <div className="diagram-step">
              <div className="diagram-step-number">4</div>
              <div>JS hydrates for interactivity</div>
            </div>
          </div>
        </div>
      </div>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Quick Comparison</h2>

      <table className="comparison-table">
        <thead>
          <tr>
            <th>Aspect</th>
            <th>CSR</th>
            <th>SSR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Initial Load</td>
            <td>Slower (blank page first)</td>
            <td>Faster (content visible immediately)</td>
          </tr>
          <tr>
            <td>SEO</td>
            <td>Poor (crawlers see empty page)</td>
            <td>Great (full HTML available)</td>
          </tr>
          <tr>
            <td>Server Load</td>
            <td>Lower (client does the work)</td>
            <td>Higher (server renders each request)</td>
          </tr>
          <tr>
            <td>Best For</td>
            <td>Dashboards, authenticated areas</td>
            <td>Public pages, landing pages, blogs</td>
          </tr>
        </tbody>
      </table>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Explore the Demos</h2>

      <div className="feature-grid">
        <Link href="/csr" className="feature-card">
          <h3>CSR Demo →</h3>
          <p>See how client-side rendering works with loading states and delayed content.</p>
        </Link>

        <Link href="/ssr" className="feature-card">
          <h3>SSR Demo →</h3>
          <p>Experience server-rendered content that appears instantly in your browser.</p>
        </Link>

        <Link href="/hydration" className="feature-card">
          <h3>What is Hydration? →</h3>
          <p>Understand how React "hydrates" server-rendered HTML to make it interactive.</p>
        </Link>

        <Link href="/hydration-issues" className="feature-card">
          <h3>Hydration Issues →</h3>
          <p>Common hydration errors and how to fix them with side-by-side examples.</p>
        </Link>

        <Link href="/streaming" className="feature-card">
          <h3>Streaming SSR →</h3>
          <p>Watch React 18's streaming in action with Suspense boundaries and progressive loading.</p>
        </Link>

        <Link href="/rsc" className="feature-card">
          <h3>Server Components →</h3>
          <p>Understand React Server Components: what runs where and why it matters.</p>
        </Link>
      </div>
    </div>
  );
}
