// Simulates a slow server component that takes time to load
// This demonstrates streaming - the shell loads immediately while this loads

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function SlowProducts({ delayMs = 2000 }) {
  await delay(delayMs);

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

export async function SlowReviews({ delayMs = 3000 }) {
  await delay(delayMs);

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

export async function SlowRecommendations({ delayMs = 4000 }) {
  await delay(delayMs);

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
