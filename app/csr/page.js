import CSRDemo from "@/components/CSRDemo";
import Accordion from "@/components/Accordion";

export default function CSRPage() {
    return (
        <div className="page">
            <h1 className="page-title">Client-Side Rendering (CSR)</h1>
            <p className="page-subtitle">Data is fetched in the browser after the initial page load</p>

            <Accordion title="Definition" defaultOpen={true}>
                <p style={{ marginBottom: "1rem" }}>
                    <strong>Client-Side Rendering (CSR)</strong> is a rendering pattern where the browser (client) is responsible for rendering the UI. The server sends a minimal HTML document with a JavaScript bundle. Once the browser downloads and executes the JavaScript, React takes over and
                    renders the actual content.
                </p>
                <p>This is the traditional Single Page Application (SPA) approach used by Create React App and early React applications. The term "client" refers to the user's browser, as opposed to the server.</p>
            </Accordion>

            <Accordion title="How CSR Works - Step by Step">
                <p style={{ marginBottom: "1rem" }}>Understanding the request lifecycle helps explain why users see a blank page initially:</p>

                <div className="diagram" style={{ flexDirection: "column", gap: "0.75rem" }}>
                    <div className="diagram-step" style={{ width: "100%", maxWidth: "500px" }}>
                        <div className="diagram-step-number">1</div>
                        <div>
                            <strong>Browser Requests Page</strong>
                            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>User navigates to your site. Browser sends HTTP request to server.</div>
                        </div>
                    </div>
                    <div className="diagram-arrow">↓</div>
                    <div className="diagram-step" style={{ width: "100%", maxWidth: "500px" }}>
                        <div className="diagram-step-number">2</div>
                        <div>
                            <strong>Server Responds with Minimal HTML</strong>
                            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Server sends a nearly empty HTML file with &lt;script&gt; tags pointing to your JS bundle. The body typically just has a &lt;div id="root"&gt;&lt;/div&gt;</div>
                        </div>
                    </div>
                    <div className="diagram-arrow">↓</div>
                    <div className="diagram-step" style={{ width: "100%", maxWidth: "500px" }}>
                        <div className="diagram-step-number">3</div>
                        <div>
                            <strong>Browser Downloads JavaScript Bundle</strong>
                            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>This can be several hundred KB to several MB. During this time, user sees blank page or loading spinner.</div>
                        </div>
                    </div>
                    <div className="diagram-arrow">↓</div>
                    <div className="diagram-step" style={{ width: "100%", maxWidth: "500px" }}>
                        <div className="diagram-step-number">4</div>
                        <div>
                            <strong>JavaScript Parses and Executes</strong>
                            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>React initializes, components mount, and the virtual DOM is created.</div>
                        </div>
                    </div>
                    <div className="diagram-arrow">↓</div>
                    <div className="diagram-step" style={{ width: "100%", maxWidth: "500px" }}>
                        <div className="diagram-step-number">5</div>
                        <div>
                            <strong>Data Fetching (useEffect)</strong>
                            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Components call APIs to fetch data. User sees loading spinners during this phase.</div>
                        </div>
                    </div>
                    <div className="diagram-arrow">↓</div>
                    <div className="diagram-step" style={{ width: "100%", maxWidth: "500px" }}>
                        <div className="diagram-step-number">6</div>
                        <div>
                            <strong>Content Finally Renders</strong>
                            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Data arrives, state updates, React re-renders with actual content. Page is now interactive.</div>
                        </div>
                    </div>
                </div>
            </Accordion>

            <Accordion title="What the Browser Receives">
                <p style={{ marginBottom: "1rem" }}>When you view the page source of a CSR app, this is approximately what you'll see:</p>
                <div className="code-block">
                    <code>
                        {`<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
  <script defer src="/static/js/bundle.js"></script>
</head>
<body>
  <div id="root">
    <!-- This is EMPTY! No content here -->
    <!-- React will inject content after JS loads -->
  </div>
</body>
</html>`}
                    </code>
                </div>
                <div className="info-box" style={{ marginTop: "1rem" }}>
                    <strong>SEO Problem:</strong> Search engine crawlers see this empty HTML. While Googlebot can execute JavaScript, many crawlers cannot, and even Google may not wait for all your async data to load.
                </div>
            </Accordion>

            <div className="info-box">
                <strong>Try this:</strong> View the page source (Ctrl+U or Cmd+U). You'll see the loading spinner markup, but <em>not</em> the actual user data - because it's fetched by JavaScript after the page loads!
            </div>

            <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Live Demo</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>Watch the loading state below. The data is being fetched by your browser right now:</p>

            <CSRDemo />

            <Accordion title="The Code Pattern" defaultOpen={false}>
                <p style={{ marginBottom: "1rem" }}>
                    The key pattern for CSR is using <code>useEffect</code> to fetch data after the component mounts:
                </p>
                <div className="code-block">
                    <code>
                        {`'use client';  // Required in Next.js App Router

import { useState, useEffect } from 'react';

export default function CSRDemo() {
  // State for data and loading status
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This runs ONLY in the browser, AFTER initial render
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error('Failed to fetch');
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);  // Empty array = run once on mount

  // Must handle all three states
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  return <DataDisplay data={data} />;
}`}
                    </code>
                </div>
            </Accordion>

            <Accordion title="DevTools Deep Dive">
                <p style={{ marginBottom: "1rem" }}>Use Chrome DevTools to observe CSR behavior:</p>

                <h4 style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>Network Tab Analysis</h4>
                <ol style={{ paddingLeft: "1.5rem", lineHeight: "2", marginBottom: "1.5rem" }}>
                    <li>Open DevTools (F12) → Network tab</li>
                    <li>Check "Disable cache" checkbox</li>
                    <li>Hard refresh the page (Ctrl+Shift+R)</li>
                    <li>
                        <strong>Observe the waterfall:</strong>
                        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                            <li>
                                First: <code>document</code> - the HTML file (small, ~1-2KB)
                            </li>
                            <li>
                                Then: <code>*.js</code> chunks - your React bundle (large, 100KB+)
                            </li>
                            <li>
                                Finally: <code>fetch/XHR</code> - API calls for data
                            </li>
                        </ul>
                    </li>
                    <li>
                        Notice the <strong>gap</strong> between HTML arriving and API calls starting - that's the JS download + parse time
                    </li>
                </ol>

                <h4 style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>Performance Tab Recording</h4>
                <ol style={{ paddingLeft: "1.5rem", lineHeight: "2", marginBottom: "1.5rem" }}>
                    <li>Go to Performance tab → Click Record → Refresh page → Stop recording</li>
                    <li>
                        Look at the <strong>Main</strong> thread flame chart
                    </li>
                    <li>
                        Find these key events:
                        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                            <li>
                                <strong>DCL (DOMContentLoaded)</strong> - blue line, HTML parsed
                            </li>
                            <li>
                                <strong>FCP (First Contentful Paint)</strong> - green line, first visible content
                            </li>
                            <li>
                                <strong>LCP (Largest Contentful Paint)</strong> - when main content appears
                            </li>
                        </ul>
                    </li>
                    <li>In CSR, there's a large gap between DCL and meaningful content</li>
                </ol>

                <h4 style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>What to Look For</h4>
                <ul style={{ paddingLeft: "1.5rem", lineHeight: "2" }}>
                    <li>
                        <strong>Bundle size:</strong> Filter by JS in Network tab. Large bundles = slow CSR
                    </li>
                    <li>
                        <strong>Waterfall shape:</strong> CSR shows sequential loading (HTML → JS → Data)
                    </li>
                    <li>
                        <strong>Time to first API call:</strong> Measure gap between page load and fetch request
                    </li>
                    <li>
                        <strong>View source:</strong> Right-click → View Page Source. You'll see minimal HTML
                    </li>
                </ul>
            </Accordion>

            <Accordion title="When to Use CSR">
                <ul style={{ paddingLeft: "1.5rem", lineHeight: "2" }}>
                    <li>
                        <strong>User dashboards:</strong> Personalized data that can't be cached/shared
                    </li>
                    <li>
                        <strong>Authenticated pages:</strong> Content behind login doesn't need SEO
                    </li>
                    <li>
                        <strong>Highly interactive apps:</strong> Real-time updates, complex state
                    </li>
                    <li>
                        <strong>Admin panels:</strong> Internal tools where SEO is irrelevant
                    </li>
                    <li>
                        <strong>Data that updates frequently:</strong> Stock tickers, live feeds
                    </li>
                </ul>
            </Accordion>

            <Accordion title="Pros & Cons">
                <div className="demo-container">
                    <div>
                        <h4 style={{ color: "var(--success)", marginBottom: "0.5rem" }}>Pros</h4>
                        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8" }}>
                            <li>Lower server load (server just serves static files)</li>
                            <li>Rich interactivity from the start</li>
                            <li>Faster subsequent page transitions (SPA navigation)</li>
                            <li>Works well with authentication flows</li>
                            <li>Simpler deployment (can use CDN)</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ color: "var(--error)", marginBottom: "0.5rem" }}>Cons</h4>
                        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8" }}>
                            <li>Slower initial content display (blank page)</li>
                            <li>Poor SEO (crawlers see empty page)</li>
                            <li>Loading states required everywhere</li>
                            <li>Heavier client bundle to download</li>
                            <li>Worse performance on slow devices</li>
                        </ul>
                    </div>
                </div>
            </Accordion>

            <Accordion title="CSR Timeline Visualization">
                <p style={{ marginBottom: "1rem" }}>This shows what the user experiences during a CSR page load:</p>
                <div style={{ background: "var(--code-bg)", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <span style={{ width: "100px", fontSize: "0.85rem" }}>0ms</span>
                            <div style={{ flex: 1, height: "24px", background: "var(--border-color)", borderRadius: "4px", position: "relative" }}>
                                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "5%", background: "var(--accent)", borderRadius: "4px 0 0 4px" }}></div>
                            </div>
                            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>HTML arrives (empty)</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <span style={{ width: "100px", fontSize: "0.85rem" }}>~200ms</span>
                            <div style={{ flex: 1, height: "24px", background: "var(--border-color)", borderRadius: "4px", position: "relative" }}>
                                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "40%", background: "var(--warning)", borderRadius: "4px 0 0 4px" }}></div>
                            </div>
                            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>JS downloading...</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <span style={{ width: "100px", fontSize: "0.85rem" }}>~800ms</span>
                            <div style={{ flex: 1, height: "24px", background: "var(--border-color)", borderRadius: "4px", position: "relative" }}>
                                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "60%", background: "var(--accent-secondary)", borderRadius: "4px 0 0 4px" }}></div>
                            </div>
                            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>React renders (loading spinner)</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <span style={{ width: "100px", fontSize: "0.85rem" }}>~1500ms</span>
                            <div style={{ flex: 1, height: "24px", background: "var(--border-color)", borderRadius: "4px", position: "relative" }}>
                                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "100%", background: "var(--success)", borderRadius: "4px" }}></div>
                            </div>
                            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Data loaded, content visible!</span>
                        </div>
                    </div>
                </div>
                <p style={{ marginTop: "1rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>* Times are illustrative. Actual times depend on bundle size, network speed, and API latency.</p>
            </Accordion>
        </div>
    );
}
