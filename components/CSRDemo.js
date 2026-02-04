'use client';

import { useState, useEffect } from 'react';

export default function CSRDemo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call with delay
    const fetchData = async () => {
      // Artificial delay to demonstrate loading state
      await new Promise(resolve => setTimeout(resolve, 2000));

      setData({
        users: [
          { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
          { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
          { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
        ],
        fetchedAt: new Date().toLocaleTimeString()
      });
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="demo-box">
        <div className="loading">
          <div className="loading-spinner"></div>
          <span>Fetching data on the client...</span>
        </div>
        <p style={{ marginTop: '1rem', color: '#888', fontSize: '0.9rem' }}>
          This loading state is visible because data is being fetched AFTER
          the page loads in your browser. View the page source (Ctrl+U) -
          you won't see any user data there!
        </p>
      </div>
    );
  }

  return (
    <div className="demo-box">
      <h3 className="demo-box-title">User Data (Fetched on Client)</h3>
      <p style={{ color: '#888', marginBottom: '1rem', fontSize: '0.9rem' }}>
        Data fetched at: {data.fetchedAt}
      </p>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
