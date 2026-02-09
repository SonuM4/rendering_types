// Slow Server Components for Streaming SSR Demo
// ================================================
// These components simulate slow data fetching to demonstrate React 18's Streaming SSR feature
// In a real application, these delays would represent actual slow operations like:
// - Database queries that take time
// - External API calls to slow services
// - Complex computations or ML inference
//
// Key Concept: With Streaming SSR + Suspense, these slow components don't block
// the initial page load. The page shell loads immediately, and these components
// stream in progressively as they become ready.

// Utility function to simulate async operations with configurable delays
// In a real app, replace this with actual async operations
async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// SlowProducts Component - Demonstrates streaming of product data
// This async Server Component simulates a 2-second database query
// Wrapped in a Suspense boundary, this streams in after the page shell loads
export async function SlowProducts({ delayMs = 2000 }) {
  // Simulate fetching from a slow database or API
  await delay(delayMs);

  // Mock product data (in real app: const products = await db.query('SELECT * FROM products'))
  const products = [
    { id: 1, name: 'Premium Headphones', price: 299, rating: 4.8 },
    { id: 2, name: 'Smart Watch', price: 399, rating: 4.6 },
    { id: 3, name: 'Wireless Earbuds', price: 149, rating: 4.7 },
  ];

  return (
    <div className="streaming-content">
      <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1rem' }}>
        Loaded after {delayMs}ms delay
      </p>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{'★'.repeat(Math.floor(p.rating))} {p.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// SlowReviews Component - Demonstrates independent streaming
// Takes 3 seconds (longer than products) to show that each Suspense boundary
// resolves independently. One slow component doesn't block others.
export async function SlowReviews({ delayMs = 3000 }) {
  // Simulate fetching from a slower external reviews API
  await delay(delayMs);

  // Mock review data (in real app: const reviews = await fetch('https://reviews-api.com/...'))
  const reviews = [
    { id: 1, user: 'Alice', text: 'Excellent product! Highly recommend.', date: '2024-01-15' },
    { id: 2, user: 'Bob', text: 'Great value for money.', date: '2024-01-14' },
    { id: 3, user: 'Charlie', text: 'Fast shipping, good quality.', date: '2024-01-13' },
  ];

  return (
    <div className="streaming-content">
      <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1rem' }}>
        Loaded after {delayMs}ms delay
      </p>
      {reviews.map(r => (
        <div key={r.id} style={{
          background: 'var(--card-bg)',
          padding: '1rem',
          borderRadius: '6px',
          marginBottom: '0.5rem'
        }}>
          <div style={{ fontWeight: 'bold', color: 'var(--accent)' }}>{r.user}</div>
          <div style={{ color: '#ccc' }}>{r.text}</div>
          <div style={{ color: '#666', fontSize: '0.8rem', marginTop: '0.5rem' }}>{r.date}</div>
        </div>
      ))}
    </div>
  );
}

// SlowRecommendations Component - Demonstrates very slow operations
// Takes 10 seconds by default (often passed from parent) to simulate
// extremely slow operations like ML inference or complex algorithms
// Without streaming, this would block the ENTIRE page for 10 seconds!
export async function SlowRecommendations({ delayMs = 4000 }) {
  // Simulate a very slow operation (ML model, complex query, etc.)
  await delay(delayMs);

  // Mock recommendation data (in real app: const recs = await mlModel.predict(...))
  const recommendations = [
    { id: 1, name: 'Phone Case', reason: 'Based on your browsing' },
    { id: 2, name: 'Screen Protector', reason: 'Frequently bought together' },
    { id: 3, name: 'Charging Cable', reason: 'Popular in your area' },
  ];

  return (
    <div className="streaming-content">
      <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1rem' }}>
        Loaded after {delayMs}ms delay
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {recommendations.map(r => (
          <div key={r.id} style={{
            background: 'var(--accent-secondary)',
            padding: '1rem',
            borderRadius: '6px',
            flex: '1',
            minWidth: '150px'
          }}>
            <div style={{ fontWeight: 'bold' }}>{r.name}</div>
            <div style={{ color: '#888', fontSize: '0.8rem' }}>{r.reason}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
