// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — Skeleton Loading Components
// ═══════════════════════════════════════════════════════════════════════════

export function SkeletonCard() {
  return (
    <div className="skeleton">
      <div className="skeleton-inner skeleton-poster" />
      <div style={{ padding: '0.75rem' }}>
        <div className="skeleton-inner skeleton-line" style={{ width: '80%' }} />
        <div className="skeleton-inner skeleton-line" style={{ width: '50%', marginBottom: 0 }} />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 12 }) {
  return (
    <div className="card-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
