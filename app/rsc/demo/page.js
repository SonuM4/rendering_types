import ServerOnlyDemo from '@/components/rsc/ServerComponent';
import ClientOnlyDemo from '@/components/rsc/ClientComponent';

export default function RSCDemoPage() {
  return (
    <div className="page">
      <h1 className="page-title">React Server Components Demo</h1>

      <div className="demo-container" style={{ marginTop: '1rem' }}>
        <ServerOnlyDemo />
        <ClientOnlyDemo />
      </div>
    </div>
  );
}
