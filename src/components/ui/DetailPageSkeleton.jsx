export default function DetailPageSkeleton() {
  return (
    <div className="detail-content">
      <div>
        <div className="detail-skeleton-poster skeleton-inner" />
      </div>

      <div className="detail-skeleton-info">
        <div className="skeleton-inner detail-skel-line" style={{ width: '30%', height: 14 }} />
        <div className="skeleton-inner detail-skel-line" style={{ width: '70%', height: 36 }} />
        <div className="skeleton-inner detail-skel-line" style={{ width: '50%', height: 14 }} />
        <div className="skeleton-inner detail-skel-line" style={{ width: '100%', height: 80 }} />
        <div className="skeleton-inner detail-skel-line" style={{ width: 180, height: 42 }} />
      </div>
    </div>
  );
}
