// This is a Server Component (no 'use client' directive)
// It can:
// - Access server-only resources (databases, file system)
// - Keep sensitive data on the server
// - Reduce client bundle size

// Simulated server-only data access
async function getSecretData() {
  // This could be a database query, file read, or secret API call
  // The code and data NEVER go to the client
  const SECRET_API_KEY = 'sk_live_abc123...'; // Safe! Never sent to browser

  await new Promise(r => setTimeout(r, 100));

  return {
    data: 'Sensitive server data',
    timestamp: new Date().toISOString(),
    // In real app: result of DB query using SECRET_API_KEY
  };
}

export default async function ServerOnlyDemo() {
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
