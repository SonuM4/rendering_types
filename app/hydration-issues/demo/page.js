import DateTimeBroken from '@/components/hydration-issues/DateTimeBroken';
import DateTimeFixed from '@/components/hydration-issues/DateTimeFixed';
import WindowBroken from '@/components/hydration-issues/WindowBroken';
import WindowFixed from '@/components/hydration-issues/WindowFixed';
import RandomBroken from '@/components/hydration-issues/RandomBroken';
import RandomFixed from '@/components/hydration-issues/RandomFixed';
import LocalStorageBroken from '@/components/hydration-issues/LocalStorageBroken';
import LocalStorageFixed from '@/components/hydration-issues/LocalStorageFixed';

export default function HydrationIssuesDemoPage() {
  return (
    <div className="page">
      <h1 className="page-title">Hydration Issues Demo</h1>

      <section style={{ marginTop: '1rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>1. Date/Time Mismatch</h3>
        <div className="demo-container">
          <div className="demo-box broken">
            <div className="demo-box-title">❌ Broken</div>
            <DateTimeBroken />
          </div>
          <div className="demo-box fixed">
            <div className="demo-box-title">✅ Fixed</div>
            <DateTimeFixed />
          </div>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>2. Window/Document Access</h3>
        <div className="demo-container">
          <div className="demo-box broken">
            <div className="demo-box-title">❌ Broken</div>
            <WindowBroken />
          </div>
          <div className="demo-box fixed">
            <div className="demo-box-title">✅ Fixed</div>
            <WindowFixed />
          </div>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>3. Random Values</h3>
        <div className="demo-container">
          <div className="demo-box broken">
            <div className="demo-box-title">❌ Broken</div>
            <RandomBroken />
          </div>
          <div className="demo-box fixed">
            <div className="demo-box-title">✅ Fixed</div>
            <RandomFixed />
          </div>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>4. localStorage Access</h3>
        <div className="demo-container">
          <div className="demo-box broken">
            <div className="demo-box-title">❌ Broken</div>
            <LocalStorageBroken />
          </div>
          <div className="demo-box fixed">
            <div className="demo-box-title">✅ Fixed</div>
            <LocalStorageFixed />
          </div>
        </div>
      </section>
    </div>
  );
}
