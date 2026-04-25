import { RightIcon } from './Icons';
import MediaCard from './MediaCard';
import { SkeletonCard } from './SkeletonCard';

export default function ContentRow({
  title,
  items = [],
  loading = false,
  onSeeAll,
  large = false,
  skeletonCount = 8,
  showPopularity = false,
}) {
  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        {onSeeAll && (
          <button className="section-link" onClick={onSeeAll}>
            See all <RightIcon />
          </button>
        )}
      </div>
      <div className="scroll-row-wrap">
        {loading ? (
          <div className="scroll-row">
            {Array(skeletonCount)
              .fill(0)
              .map((_, index) => (
                <div key={index} className={`scroll-card ${large ? 'scroll-card-lg' : ''}`}>
                  <SkeletonCard />
                </div>
              ))}
          </div>
        ) : (
          <div className="scroll-row content-row-enter is-visible">
            {items.map((item) => (
              <div key={item.id} className={`scroll-card ${large ? 'scroll-card-lg' : ''}`}>
                <MediaCard item={item} showPopularity={showPopularity} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
