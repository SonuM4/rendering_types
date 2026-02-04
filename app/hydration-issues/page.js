import DateTimeBroken from '@/components/hydration-issues/DateTimeBroken';
import DateTimeFixed from '@/components/hydration-issues/DateTimeFixed';
import WindowBroken from '@/components/hydration-issues/WindowBroken';
import WindowFixed from '@/components/hydration-issues/WindowFixed';
import RandomBroken from '@/components/hydration-issues/RandomBroken';
import RandomFixed from '@/components/hydration-issues/RandomFixed';
import LocalStorageBroken from '@/components/hydration-issues/LocalStorageBroken';
import LocalStorageFixed from '@/components/hydration-issues/LocalStorageFixed';

export default function HydrationIssuesPage() {
  return (
    <div className="page">
      <h1 className="page-title">Common Hydration Issues</h1>
      <p className="page-subtitle">
        Learn to identify and fix hydration mismatches with side-by-side examples
      </p>

      <div className="card">
        <h2 className="card-title">What Causes Hydration Errors?</h2>
        <p>
          Hydration errors occur when the HTML rendered on the server doesn't match
          what React renders on the client. This happens when your component produces
          different output depending on whether it's running on server or client.
        </p>
        <div className="info-box" style={{ marginTop: '1rem' }}>
          <strong>Open DevTools Console</strong> to see hydration warnings from the
          "broken" examples below!
        </div>
      </div>

      {/* Issue 1: Date/Time Mismatch */}
      <section style={{ marginTop: '3rem' }}>
        <h2 className="card-title">1. Date/Time Mismatch</h2>
        <p style={{ marginBottom: '1rem', color: '#aaa' }}>
          Server and client may render at different times, causing timestamp mismatches.
        </p>

        <div className="demo-container">
          <div className="demo-box broken">
            <div className="demo-box-title">
              ❌ Broken Example
            </div>
            <DateTimeBroken />
            <div className="code-block" style={{ marginTop: '1rem' }}>
              <code>
{`// BAD: Date created during render
function Component() {
  const time = new Date().toLocaleTimeString();
  return <p>Time: {time}</p>;
}`}
              </code>
            </div>
            <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Server renders at one time, client hydrates at another = mismatch!
            </p>
          </div>

          <div className="demo-box fixed">
            <div className="demo-box-title">
              ✅ Fixed Example
            </div>
            <DateTimeFixed />
            <div className="code-block" style={{ marginTop: '1rem' }}>
              <code>
{`// GOOD: Use useEffect for client-only values
function Component() {
  const [time, setTime] = useState('');

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);

  return <p>Time: {time || 'Loading...'}</p>;
}`}
              </code>
            </div>
            <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Initial render matches (empty), then updates on client only.
            </p>
          </div>
        </div>
      </section>

      {/* Issue 2: Window/Document Access */}
      <section style={{ marginTop: '3rem' }}>
        <h2 className="card-title">2. Window/Document Access</h2>
        <p style={{ marginBottom: '1rem', color: '#aaa' }}>
          Browser APIs like <code>window</code> and <code>document</code> don't exist on the server.
        </p>

        <div className="demo-container">
          <div className="demo-box broken">
            <div className="demo-box-title">
              ❌ Broken Example
            </div>
            <WindowBroken />
            <div className="code-block" style={{ marginTop: '1rem' }}>
              <code>
{`// BAD: Accessing window during render
function Component() {
  const width = window.innerWidth;
  return <p>Window width: {width}px</p>;
}
// ERROR: window is not defined (on server)`}
              </code>
            </div>
            <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              This crashes on the server because <code>window</code> doesn't exist!
            </p>
          </div>

          <div className="demo-box fixed">
            <div className="demo-box-title">
              ✅ Fixed Example
            </div>
            <WindowFixed />
            <div className="code-block" style={{ marginTop: '1rem' }}>
              <code>
{`// GOOD: Check for window or use useEffect
function Component() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <p>Window width: {width}px</p>;
}`}
              </code>
            </div>
            <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Safe: <code>useEffect</code> only runs on client. Try resizing the window!
            </p>
          </div>
        </div>
      </section>

      {/* Issue 3: Random Values */}
      <section style={{ marginTop: '3rem' }}>
        <h2 className="card-title">3. Random Values</h2>
        <p style={{ marginBottom: '1rem', color: '#aaa' }}>
          <code>Math.random()</code> produces different values on server and client.
        </p>

        <div className="demo-container">
          <div className="demo-box broken">
            <div className="demo-box-title">
              ❌ Broken Example
            </div>
            <RandomBroken />
            <div className="code-block" style={{ marginTop: '1rem' }}>
              <code>
{`// BAD: Random value during render
function Component() {
  const id = Math.random().toString(36).slice(2);
  return <p>Random ID: {id}</p>;
}
// Server: "abc123" → Client: "xyz789" = MISMATCH!`}
              </code>
            </div>
            <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Check console - you'll see hydration warnings about content mismatch.
            </p>
          </div>

          <div className="demo-box fixed">
            <div className="demo-box-title">
              ✅ Fixed Example
            </div>
            <RandomFixed />
            <div className="code-block" style={{ marginTop: '1rem' }}>
              <code>
{`// GOOD: Generate random values on client only
function Component() {
  const [id, setId] = useState('');

  useEffect(() => {
    setId(Math.random().toString(36).slice(2));
  }, []);

  return <p>Random ID: {id || 'Generating...'}</p>;
}
// Or use useId() hook for stable IDs`}
              </code>
            </div>
            <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Initial render matches (empty), random generated on client.
            </p>
          </div>
        </div>
      </section>

      {/* Issue 4: localStorage Access */}
      <section style={{ marginTop: '3rem' }}>
        <h2 className="card-title">4. localStorage Access</h2>
        <p style={{ marginBottom: '1rem', color: '#aaa' }}>
          <code>localStorage</code> isn't available on the server and may have different values.
        </p>

        <div className="demo-container">
          <div className="demo-box broken">
            <div className="demo-box-title">
              ❌ Broken Example
            </div>
            <LocalStorageBroken />
            <div className="code-block" style={{ marginTop: '1rem' }}>
              <code>
{`// BAD: Reading localStorage during render
function Component() {
  const theme = localStorage.getItem('theme') || 'light';
  return <p>Theme: {theme}</p>;
}
// ERROR: localStorage is not defined (on server)`}
              </code>
            </div>
            <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Server doesn't have localStorage, causing errors or mismatches.
            </p>
          </div>

          <div className="demo-box fixed">
            <div className="demo-box-title">
              ✅ Fixed Example
            </div>
            <LocalStorageFixed />
            <div className="code-block" style={{ marginTop: '1rem' }}>
              <code>
{`// GOOD: Read localStorage in useEffect
function Component() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return <button onClick={toggleTheme}>Theme: {theme}</button>;
}`}
              </code>
            </div>
            <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Click the button to toggle and persist theme to localStorage.
            </p>
          </div>
        </div>
      </section>

      {/* Summary */}
      <div className="card" style={{ marginTop: '3rem' }}>
        <h2 className="card-title">Summary: How to Avoid Hydration Issues</h2>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Problem</th>
              <th>Solution</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Date/Time values</td>
              <td>Use <code>useEffect</code> to set time on client only</td>
            </tr>
            <tr>
              <td>Browser APIs (window, document)</td>
              <td>Check <code>typeof window !== 'undefined'</code> or use <code>useEffect</code></td>
            </tr>
            <tr>
              <td>Random values</td>
              <td>Generate in <code>useEffect</code> or use <code>useId()</code> hook</td>
            </tr>
            <tr>
              <td>localStorage/sessionStorage</td>
              <td>Read/write only in <code>useEffect</code></td>
            </tr>
            <tr>
              <td>User-agent detection</td>
              <td>Detect on client in <code>useEffect</code></td>
            </tr>
            <tr>
              <td>Known safe mismatches</td>
              <td>Use <code>suppressHydrationWarning</code> prop</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2 className="card-title">The Golden Rule</h2>
        <div className="info-box">
          <strong>If it can differ between server and client, don't render it directly.</strong>
          <p style={{ marginTop: '0.5rem' }}>
            Use <code>useEffect</code> to update state after the initial render, ensuring
            the server and client initial renders match perfectly.
          </p>
        </div>
      </div>
    </div>
  );
}
