// Server Component Demo
// ======================
// This is a Server Component (NO 'use client' directive)
// In Next.js App Router, components are Server Components by default
// This means the component code ONLY runs on the server, never in the browser
//
// Server Component Capabilities:
// - Access server-only resources (databases, file system, environment variables)
// - Keep sensitive data on the server (API keys, secrets, tokens)
// - Reduce client bundle size (component code is NOT sent to browser)
// - Use async/await directly without useEffect
// - Directly import and use server-side libraries
//
// Key Advantage: Zero JavaScript sent to the client for this component
// Only the rendered HTML output is sent to the browser

// Simulated server-only data access function
// This represents what you might do with a real database or API call
async function getSecretData() {
  // IMPORTANT: This API key is completely safe here!
  // Since this is a Server Component, this code never reaches the browser
  // Users cannot see this key in DevTools or view source
  const SECRET_API_KEY = 'sk_live_abc123...'; // Safe! Never sent to browser

  // Simulate an async database query or API call
  await new Promise(r => setTimeout(r, 100));

  // Return data that will be used to render the component
  return {
    data: 'Sensitive server data',
    timestamp: new Date().toISOString(),
    // In a real app: const result = await db.query('SELECT * FROM users WHERE api_key = ?', [SECRET_API_KEY])
  };
}

// Async Server Component - can await promises directly in the component body
// This is NOT possible in Client Components (they can't be async)
export default async function ServerOnlyDemo() {
  // Fetch data directly without useEffect - one of the key benefits of Server Components
  const data = await getSecretData();

  return (
    <div className="demo-box fixed">
      <h3 className="demo-box-title">Server Component</h3>
      <p style={{ marginBottom: '1rem' }}>
        This component ran on the <strong>server only</strong>. Its code is not in the client bundle.
      </p>
      <div className="result">
        <div className="result-label">Server Data</div>
        <div>{data.data}</div>
        <div style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.5rem' }}>
          Generated at: {data.timestamp}
        </div>
      </div>
      <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(74, 222, 128, 0.1)', borderRadius: '4px' }}>
        <strong style={{ color: 'var(--success)' }}>Benefits:</strong>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
          <li>Zero JavaScript sent to browser for this component</li>
          <li>Can safely use secrets/API keys</li>
          <li>Direct database access</li>
        </ul>
      </div>
    </div>
  );
}
