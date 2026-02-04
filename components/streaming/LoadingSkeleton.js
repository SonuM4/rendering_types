// Loading skeletons shown while streaming content loads

export function ProductsSkeleton() {
  return (
    <div className="skeleton-container">
      <div className="skeleton-pulse" style={{ height: '20px', width: '150px', marginBottom: '1rem' }} />
      <div className="skeleton-pulse" style={{ height: '40px', marginBottom: '0.5rem' }} />
      <div className="skeleton-pulse" style={{ height: '40px', marginBottom: '0.5rem' }} />
      <div className="skeleton-pulse" style={{ height: '40px' }} />
    </div>
  );
}

export function ReviewsSkeleton() {
  return (
    <div className="skeleton-container">
      <div className="skeleton-pulse" style={{ height: '20px', width: '150px', marginBottom: '1rem' }} />
      <div className="skeleton-pulse" style={{ height: '80px', marginBottom: '0.5rem', borderRadius: '6px' }} />
      <div className="skeleton-pulse" style={{ height: '80px', marginBottom: '0.5rem', borderRadius: '6px' }} />
      <div className="skeleton-pulse" style={{ height: '80px', borderRadius: '6px' }} />
    </div>
  );
}

export function RecommendationsSkeleton() {
  return (
    <div className="skeleton-container">
      <div className="skeleton-pulse" style={{ height: '20px', width: '150px', marginBottom: '1rem' }} />
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div className="skeleton-pulse" style={{ height: '70px', flex: 1, borderRadius: '6px' }} />
        <div className="skeleton-pulse" style={{ height: '70px', flex: 1, borderRadius: '6px' }} />
        <div className="skeleton-pulse" style={{ height: '70px', flex: 1, borderRadius: '6px' }} />
      </div>
    </div>
  );
}
