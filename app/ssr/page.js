import Accordion from '@/components/Accordion';

async function getServerData() {
  await new Promise(resolve => setTimeout(resolve, 100));

  return {
    products: [
      { id: 1, name: 'Laptop Pro', price: 1299, inStock: true },
      { id: 2, name: 'Wireless Mouse', price: 49, inStock: true },
      { id: 3, name: 'Mechanical Keyboard', price: 159, inStock: false },
      { id: 4, name: 'USB-C Hub', price: 79, inStock: true },
    ],
    generatedAt: new Date().toISOString(),
    serverInfo: `Node.js ${process.version}`
  };
}

export default async function SSRPage() {
  const data = await getServerData();

  return (
    <div className="page">
      <h1 className="page-title">Server-Side Rendering (SSR)</h1>
      <p className="page-subtitle">
        Data is fetched on the server and included in the initial HTML
      </p>

      <Accordion title="Definition" defaultOpen={true}>
        <p style={{ marginBottom: '1rem' }}>
          <strong>Server-Side Rendering (SSR)</strong> is a rendering pattern where the server
          generates the complete HTML for a page on each request. The server fetches any required
          data, renders the React components to HTML, and sends that fully-formed HTML to the browser.
        </p>
        <p>
          Unlike CSR where the browser builds the page, with SSR the "work" of rendering happens
          on the server. The browser receives ready-to-display HTML, then "hydrates" it to make
          it interactive.
        </p>
      </Accordion>

      <Accordion title="How SSR Works - Step by Step">
        <p style={{ marginBottom: '1rem' }}>
          The key difference from CSR: content is ready before it reaches the browser.
        </p>

        <div className="diagram" style={{ flexDirection: 'column', gap: '0.75rem' }}>
          <div className="diagram-step" style={{ width: '100%', maxWidth: '500px' }}>
            <div className="diagram-step-number">1</div>
            <div>
              <strong>Browser Requests Page</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                User navigates to your site. Browser sends HTTP request to server.
              </div>
            </div>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-step" style={{ width: '100%', maxWidth: '500px' }}>
            <div className="diagram-step-number">2</div>
            <div>
              <strong>Server Fetches Data</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Server queries databases, calls APIs, reads files - whatever data the page needs.
              </div>
            </div>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-step" style={{ width: '100%', maxWidth: '500px' }}>
            <div className="diagram-step-number">3</div>
            <div>
              <strong>Server Renders React to HTML</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                React runs on the server, generating complete HTML with all the data.
              </div>
            </div>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-step" style={{ width: '100%', maxWidth: '500px' }}>
            <div className="diagram-step-number">4</div>
            <div>
              <strong>Complete HTML Sent to Browser</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Browser receives fully-rendered HTML. Content is <strong>immediately visible</strong>.
              </div>
            </div>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-step" style={{ width: '100%', maxWidth: '500px' }}>
            <div className="diagram-step-number">5</div>
            <div>
              <strong>JavaScript Downloads & Hydrates</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                React JS loads in background, then "hydrates" the existing HTML.
              </div>
            </div>
          </div>
        </div>
      </Accordion>

      <div className="info-box">
        <strong>Try this:</strong> View the page source (Ctrl+U or Cmd+U). You'll see
        all the product data right there in the HTML!
      </div>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Live Demo</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        This data was fetched on the server. No loading state - it's already here:
      </p>

      <div className="demo-box">
        <h3 className="demo-box-title">Product Data (Rendered on Server)</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
          Generated at: {data.generatedAt}
        </p>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.85rem' }}>
          Server: {data.serverInfo}
        </p>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td style={{ color: product.inStock ? 'var(--success)' : 'var(--error)' }}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Accordion title="The Code Pattern">
        <p style={{ marginBottom: '1rem' }}>
          In Next.js App Router, async components automatically use SSR:
        </p>
        <div className="code-block">
          <code>
{`// Server Component (default in App Router)
// No 'use client' = runs on server only

async function getServerData() {
  const products = await db.query('SELECT * FROM products');
  return products;
}

export default async function SSRPage() {
  const data = await getServerData();

  return (
    <div>
      <h1>Products</h1>
      {data.products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}`}
          </code>
        </div>
      </Accordion>

      <Accordion title="DevTools Deep Dive">
        <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Network Tab Analysis</h4>
        <ol style={{ paddingLeft: '1.5rem', lineHeight: '2', marginBottom: '1.5rem' }}>
          <li>Open DevTools (F12) → Network tab</li>
          <li>Check "Disable cache" checkbox</li>
          <li>Hard refresh the page</li>
          <li><strong>Observe the differences from CSR:</strong>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              <li>First <code>document</code> request is <strong>larger</strong> (contains content)</li>
              <li>Response time may be longer (server is rendering)</li>
              <li>No API calls needed after page load!</li>
            </ul>
          </li>
        </ol>

        <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Key Observations</h4>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
          <li><strong>TTFB:</strong> May be slower than CSR (server processing)</li>
          <li><strong>FCP:</strong> Faster than CSR (content in HTML)</li>
          <li><strong>Document size:</strong> Larger than CSR (includes rendered content)</li>
        </ul>
      </Accordion>

      <Accordion title="When to Use SSR">
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
          <li><strong>Public pages needing SEO:</strong> Landing pages, blogs, product pages</li>
          <li><strong>Social media sharing:</strong> Open Graph tags need content in HTML</li>
          <li><strong>Content sites:</strong> News, documentation, marketing pages</li>
          <li><strong>E-commerce:</strong> Product listings that search engines should index</li>
        </ul>
      </Accordion>

      <Accordion title="Pros & Cons">
        <div className="demo-container">
          <div>
            <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>Pros</h4>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>Fast initial content display</li>
              <li>Excellent SEO</li>
              <li>Works without JavaScript</li>
              <li>Better social media previews</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--error)', marginBottom: '0.5rem' }}>Cons</h4>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>Higher server load</li>
              <li>Slower TTFB</li>
              <li>More complex caching</li>
              <li>Server costs scale with traffic</li>
            </ul>
          </div>
        </div>
      </Accordion>

      <Accordion title="SSR vs Static Site Generation (SSG)">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>SSR</th>
              <th>SSG</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>When rendered</td>
              <td>Every request</td>
              <td>Build time only</td>
            </tr>
            <tr>
              <td>Data freshness</td>
              <td>Always fresh</td>
              <td>Stale until rebuild</td>
            </tr>
            <tr>
              <td>Performance</td>
              <td>Good</td>
              <td>Excellent (CDN cached)</td>
            </tr>
          </tbody>
        </table>
      </Accordion>
    </div>
  );
}
