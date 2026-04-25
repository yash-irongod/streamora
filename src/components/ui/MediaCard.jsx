// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — MediaCard Component
// ═══════════════════════════════════════════════════════════════════════════

import { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToWatchlist, removeFromWatchlist } from '../../store/watchlistSlice';
import { showToast } from '../../store/toastSlice';
import { IMG_SIZES, GENRE_IDS_MAP } from '../../constants';
import { StarIcon, PlusIcon, CheckIcon, InfoIcon } from './Icons';

// Format vote count: 1200 → "1.2K", 50000 → "50K"
function formatVotes(count) {
  if (!count) return '';
  if (count >= 1000) return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K`;
  return String(count);
}

const MediaCard = memo(function MediaCard({ item, showPopularity = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inWl = useSelector((state) => state.watchlist.items.some((w) => w.id === item.id));
  const [imgError, setImgError] = useState(false);

  const title = item.title || item.name || 'Untitled';
  const type = item.media_type || (item.title ? 'movie' : 'tv');
  const year = (item.release_date || item.first_air_date || '').slice(0, 4);
  const poster = item.poster_path ? `${IMG_SIZES.poster.medium}${item.poster_path}` : null;

  // Genre names from genre_ids (first 2)
  const genreNames = (item.genre_ids || [])
    .slice(0, 2)
    .map((id) => GENRE_IDS_MAP[id])
    .filter(Boolean);

  // Vote count formatted
  const votes = formatVotes(item.vote_count);

  function handleNavigate() {
    navigate(`/${type}/${item.id}`);
  }

  function toggleWl(e) {
    e.stopPropagation();
    const payload = {
      id: item.id,
      title,
      type,
      year,
      poster_path: item.poster_path,
      genre_ids: item.genre_ids || [],
      vote_average: item.vote_average,
      vote_count: item.vote_count,
      overview: item.overview,
    };
    if (inWl) {
      dispatch(removeFromWatchlist(item.id));
      dispatch(showToast({ message: `Removed "${title}"`, type: 'remove' }));
    } else {
      dispatch(addToWatchlist(payload));
      dispatch(showToast({ message: `Added "${title}" to watchlist` }));
    }
  }

  return (
    <div className="card" onClick={handleNavigate}>
      <div className="card-poster">
        {poster && !imgError ? (
          <img
            src={poster}
            alt={title}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="card-poster-fallback">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" />
              <line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
            <span>{title.slice(0, 2).toUpperCase()}</span>
          </div>
        )}
        {item.vote_average > 0 && (
          <div className="card-rating">
            <StarIcon />
            {(+item.vote_average).toFixed(1)}
            {votes && <span className="card-votes">· {votes}</span>}
          </div>
        )}
        <div className="card-type-badge">{type === 'movie' ? 'Film' : 'TV'}</div>
      </div>
      <div className="card-body">
        <div className="card-title" title={title}>{title}</div>
        <div className="card-sub">{year || '—'}</div>
        {genreNames.length > 0 && (
          <div className="card-genres">{genreNames.join(' · ')}</div>
        )}
        {showPopularity && item.popularity > 0 && (
          <div className="card-popularity">
            <div className="card-pop-bar">
              <div className="card-pop-fill" style={{ width: `${Math.min(100, (item.popularity / 500) * 100)}%` }} />
            </div>
            <span className="card-pop-label">🔥 {Math.round(item.popularity)}</span>
          </div>
        )}
      </div>
      <div className="card-actions">
        <button className={`wl-btn ${inWl ? 'in-wl' : ''}`} onClick={toggleWl} aria-label={inWl ? 'Remove from watchlist' : 'Add to watchlist'}>
          {inWl ? <><CheckIcon /> Saved</> : <><PlusIcon /> Watchlist</>}
        </button>
        <button className="detail-btn" onClick={(e) => { e.stopPropagation(); handleNavigate(); }} aria-label="View details">
          <InfoIcon />
        </button>
      </div>
    </div>
  );
});

export default MediaCard;