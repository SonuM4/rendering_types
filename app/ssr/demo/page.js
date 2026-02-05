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

export default async function SSRDemoPage() {
  const data = await getServerData();

  return (
    <div className="page">
      <h1 className="page-title">SSR Demo</h1>

      <div className="demo-box">
        <h3 className="demo-box-title">Product Data (Server Rendered)</h3>
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
    </div>
  );
}
