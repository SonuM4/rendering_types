import { Suspense } from "react";
import { SlowProducts, SlowReviews, SlowRecommendations } from "@/components/streaming/SlowComponent";
import { ProductsSkeleton, ReviewsSkeleton, RecommendationsSkeleton } from "@/components/streaming/LoadingSkeleton";
import Accordion from "@/components/Accordion";

export default function StreamingPage() {
  return (
    <div className="page">
      <h1 className="page-title">Streaming SSR with Suspense</h1>
      <p className="page-subtitle">
        React 18's streaming lets the server send HTML progressively as it becomes ready
      </p>

      <Accordion title="Definition" defaultOpen={true}>
        <p style={{ marginBottom: '1rem' }}>
          <strong>Streaming SSR</strong> is a rendering technique where the server sends HTML to the
          browser in chunks, rather than waiting for the entire page to be ready.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          Traditional SSR has a problem: if ANY data is slow, the ENTIRE page is slow. With streaming,
          the server sends what it has immediately and fills in the rest as it becomes available.
        </p>
        <div className="info-box">
          <strong>Technical Foundation:</strong> Uses HTTP chunked transfer encoding
          and React 18's <code>renderToPipeableStream()</code> API.
        </div>
      </Accordion>

      <Accordion title="The Problem Streaming Solves">
        <p style={{ marginBottom: '1rem' }}>
          Imagine an e-commerce page that needs:
        </p>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', marginBottom: '1rem' }}>
          <li>Product details (from Product API) - <strong>50ms</strong></li>
          <li>User reviews (from Reviews API) - <strong>2000ms</strong></li>
          <li>Recommendations (from ML service) - <strong>5000ms</strong></li>
        </ul>
        <div className="demo-container">
          <div className="demo-box broken">
            <h4 style={{ marginBottom: '0.5rem' }}>Traditional SSR</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Server waits for ALL data (5000ms) before sending ANY HTML.
            </p>
          </div>
          <div className="demo-box fixed">
            <h4 style={{ marginBottom: '0.5rem' }}>Streaming SSR</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Server sends shell immediately (50ms). Content streams in progressively.
            </p>
          </div>
        </div>
      </Accordion>

      <Accordion title="How Streaming Works - Step by Step">
        <div className="diagram" style={{ flexDirection: 'column', gap: '0.75rem' }}>
          <div className="diagram-step" style={{ width: '100%', maxWidth: '500px' }}>
            <div className="diagram-step-number">1</div>
            <div>
              <strong>Request Arrives</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Browser requests the page. Server begins processing.
              </div>
            </div>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-step" style={{ width: '100%', maxWidth: '500px' }}>
            <div className="diagram-step-number">2</div>
            <div>
              <strong>Shell Sent Immediately</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Server sends head, navigation, layout - everything that doesn't need data.
              </div>
            </div>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-step" style={{ width: '100%', maxWidth: '500px' }}>
            <div className="diagram-step-number">3</div>
            <div>
              <strong>Fallbacks Rendered</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Loading skeletons appear where Suspense boundaries exist.
              </div>
            </div>
          </div>
          <div className="diagram-arrow">↓</div>
          <div className="diagram-step" style={{ width: '100%', maxWidth: '500px' }}>
            <div className="diagram-step-number">4</div>
            <div>
              <strong>Content Streams In</strong>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                As each async component resolves, server sends content to replace fallbacks.
              </div>
            </div>
          </div>
        </div>
      </Accordion>

      <div className="info-box">
        <strong>Watch the demo below!</strong> Each section has a different delay (2s, 3s, 10s).
        Content appears progressively as each section loads.
      </div>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Live Streaming Demo</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Each section is wrapped in a Suspense boundary. Watch them load one by one:
      </p>

      <div className="demo-box" style={{ marginBottom: '1.5rem' }}>
        <h3 className="demo-box-title">Products (2 second delay)</h3>
        <Suspense fallback={<ProductsSkeleton />}>
          <SlowProducts delayMs={2000} />
        </Suspense>
      </div>

      <div className="demo-box" style={{ marginBottom: '1.5rem' }}>
        <h3 className="demo-box-title">Reviews (3 second delay)</h3>
        <Suspense fallback={<ReviewsSkeleton />}>
          <SlowReviews delayMs={3000} />
        </Suspense>
      </div>

      <div className="demo-box" style={{ marginBottom: '1.5rem' }}>
        <h3 className="demo-box-title">Recommendations (10 second delay)</h3>
        <Suspense fallback={<RecommendationsSkeleton />}>
          <SlowRecommendations delayMs={10000} />
        </Suspense>
      </div>

      <Accordion title="The Code Pattern">
        <div className="code-block">
          <code>
{`import { Suspense } from 'react';

async function SlowProducts() {
  const products = await fetchProducts(); // 2 second API call
  return <ProductList products={products} />;
}

export default function Page() {
  return (
    <div>
      <Header />  {/* Renders immediately */}

      <Suspense fallback={<ProductsSkeleton />}>
        <SlowProducts />  {/* Streams in when ready */}
      </Suspense>

      <Suspense fallback={<ReviewsSkeleton />}>
        <SlowReviews />  {/* Independent stream */}
      </Suspense>
    </div>
  );
}`}
          </code>
        </div>
      </Accordion>

      <Accordion title="DevTools: Observing Streaming in Network Panel">
        <h4 style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>Step-by-Step Guide</h4>
        <ol style={{ paddingLeft: '1.5rem', lineHeight: '2.2', marginBottom: '1.5rem' }}>
          <li>Open DevTools (F12) → <strong>Network</strong> tab</li>
          <li>Check <strong>"Disable cache"</strong></li>
          <li>Optional: Select <strong>"Slow 3G"</strong> throttling</li>
          <li>Navigate to this page or hard refresh</li>
        </ol>

        <h4 style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>What to Look For</h4>
        <div style={{ background: 'var(--code-bg)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <ol style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
            <li><strong>Status stays "pending" longer</strong> - streaming response stays open</li>
            <li><strong>Waterfall bar keeps growing</strong> - receives data over time</li>
            <li><strong>Size increases incrementally</strong> - watch it grow: 5KB → 8KB → 12KB</li>
            <li><strong>Response Headers:</strong> Look for <code>Transfer-Encoding: chunked</code></li>
          </ol>
        </div>

        <h4 style={{ color: 'var(--accent)', marginBottom: '0.75rem', marginTop: '1.5rem' }}>Visual Timeline</h4>
        <div style={{ background: 'var(--code-bg)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--success)' }}>0ms    </span>
              <span style={{ color: 'var(--text-muted)' }}>──────</span>
              <span> Request sent</span>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--success)' }}>50ms   </span>
              <span style={{ color: 'var(--text-muted)' }}>──────</span>
              <span> Shell arrives (skeletons visible)</span>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--warning)' }}>2000ms </span>
              <span style={{ color: 'var(--text-muted)' }}>──────</span>
              <span> Products chunk arrives</span>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--warning)' }}>3000ms </span>
              <span style={{ color: 'var(--text-muted)' }}>──────</span>
              <span> Reviews chunk arrives</span>
            </div>
            <div>
              <span style={{ color: 'var(--accent)' }}>10000ms</span>
              <span style={{ color: 'var(--text-muted)' }}>──────</span>
              <span> Recommendations arrive, response complete</span>
            </div>
          </div>
        </div>
      </Accordion>

      <Accordion title="Traditional SSR vs Streaming SSR">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Aspect</th>
              <th>Traditional SSR</th>
              <th>Streaming SSR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Initial Response</td>
              <td style={{ color: 'var(--error)' }}>Waits for ALL data</td>
              <td style={{ color: 'var(--success)' }}>Shell sent immediately</td>
            </tr>
            <tr>
              <td>TTFB</td>
              <td style={{ color: 'var(--error)' }}>Slow</td>
              <td style={{ color: 'var(--success)' }}>Fast</td>
            </tr>
            <tr>
              <td>Slow Components</td>
              <td style={{ color: 'var(--error)' }}>Block entire page</td>
              <td style={{ color: 'var(--success)' }}>Load independently</td>
            </tr>
            <tr>
              <td>User Experience</td>
              <td>All or nothing</td>
              <td>Progressive loading</td>
            </tr>
          </tbody>
        </table>
      </Accordion>

      <Accordion title="The Cost of Streaming">
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
          <li><strong>Connection stays open longer</strong> - HTTP response isn't complete until all Suspense boundaries resolve</li>
          <li><strong>Cumulative Layout Shift</strong> - Content appearing can shift the page</li>
          <li><strong>SEO considerations</strong> - Search engines may not wait for all content</li>
          <li><strong>Error handling</strong> - Need Error Boundaries for failed streams</li>
        </ul>
      </Accordion>

      <Accordion title="When to Use Streaming">
        <div className="demo-container">
          <div>
            <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>Good Use Cases</h4>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>Dashboards with multiple data sources</li>
              <li>E-commerce (products, reviews, recommendations)</li>
              <li>Pages with slow API dependencies</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--warning)', marginBottom: '0.5rem' }}>Consider Carefully</h4>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>Simple pages with fast data</li>
              <li>Critical SEO content</li>
              <li>Pages where layout shift is unacceptable</li>
            </ul>
          </div>
        </div>
      </Accordion>
    </div>
  );
}
