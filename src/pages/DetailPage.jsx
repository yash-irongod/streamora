// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — Detail Page (Movie / TV Series)
// ═══════════════════════════════════════════════════════════════════════════

import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../store/watchlistSlice';
import { addRecentlyViewed } from '../store/recentlyViewedSlice';
import { showToast } from '../store/toastSlice';
import { IMG_SIZES } from '../constants';
import { BackIcon, PlusIcon, CheckIcon } from '../components/ui/Icons';
import DetailPageSkeleton from '../components/ui/DetailPageSkeleton';
import MediaCard from '../components/ui/MediaCard';
import { SkeletonGrid } from '../components/ui/SkeletonCard';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMediaDetails from '../hooks/useMediaDetails';

export default function DetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const type = location.pathname.startsWith('/tv') ? 'tv' : 'movie';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inWl = useSelector((state) => state.watchlist.items.some((w) => w.id === Number(id)));

  const { data, providers, loading, error } = useMediaDetails(type, id);

  const title = data?.title || data?.name || '';
  useDocumentTitle(title ? `${title} — Streamora` : 'Streamora');

  // Track recently viewed
  useEffect(() => {
    if (data && title) {
      dispatch(addRecentlyViewed({
        id: Number(id),
        title,
        media_type: type,
        poster_path: data.poster_path,
        vote_average: data.vote_average,
        release_date: data.release_date,
        first_air_date: data.first_air_date,
        genre_ids: data.genres?.map((g) => g.id) || [],
      }));
    }
  }, [data, id, type, title, dispatch]);

  const cast = data?.credits?.cast?.slice(0, 10) || [];
  const similar = (data?.recommendations?.results || data?.similar?.results || []).slice(0, 8);
  const backdrop = data?.backdrop_path ? `${IMG_SIZES.backdrop.original}${data.backdrop_path}` : null;
  const poster = data?.poster_path ? `${IMG_SIZES.poster.large}${data.poster_path}` : null;

  function toggleWl() {
    const payload = {
      id: Number(id), title, type,
      year: (data?.release_date || data?.first_air_date || '').slice(0, 4),
      poster_path: data?.poster_path,
      vote_average: data?.vote_average,
      overview: data?.overview,
      genre_ids: data?.genres?.map((g) => g.id) || [],
    };
    if (inWl) {
      dispatch(removeFromWatchlist(Number(id)));
      dispatch(showToast({ message: `Removed "${title}"`, type: 'remove' }));
    } else {
      dispatch(addToWatchlist(payload));
      dispatch(showToast({ message: `Added "${title}" to watchlist` }));
    }
  }

  if (error) {
    return (
      <div className="page page-enter">
        <div className="container">
          <div className="empty-state" style={{ minHeight: '60vh' }}>
            <div className="empty-icon">⚠️</div>
            <div className="empty-title">Could not load title</div>
            <div className="empty-sub">{error}</div>
            <button className="btn-primary" style={{ marginTop: '0.5rem' }} onClick={() => navigate(-1)}>Go Back</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-enter">
      <div className="detail-hero" style={{ minHeight: 420 }}>
        {backdrop && <img className="detail-backdrop" src={backdrop} alt="" />}
        <div className="detail-overlay" />

        {loading ? (
          <div className="detail-hero-inner">
            <button className="back-btn" onClick={() => navigate(-1)}><BackIcon /> Back</button>
            <DetailPageSkeleton />
          </div>
        ) : (
          <div className="detail-content">
            <div>
              <button className="back-btn" onClick={() => navigate(-1)}><BackIcon /> Back</button>
              {poster && <div className="detail-poster"><img src={poster} alt={title} loading="lazy" /></div>}
            </div>

            <div className="detail-info">
              {data?.genres?.length > 0 && (
                <div className="detail-genres">
                  {data.genres.map((g) => <span key={g.id} className="genre-pill">{g.name}</span>)}
                </div>
              )}

              <h1 className="detail-title">{title}</h1>

              <div className="detail-meta-row">
                {data?.vote_average > 0 && <span className="rating-badge">★ {(+data.vote_average).toFixed(1)}</span>}
                {data?.vote_count > 0 && (
                  <span className="detail-meta-item" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {data.vote_count >= 1000 ? `${(data.vote_count / 1000).toFixed(data.vote_count >= 10000 ? 0 : 1)}K` : data.vote_count} votes
                  </span>
                )}
                <span className="detail-meta-item">{(data?.release_date || data?.first_air_date || '').slice(0, 4)}</span>
                {data?.runtime > 0 && <span className="detail-meta-item">{Math.floor(data.runtime / 60)}h {data.runtime % 60}m</span>}
                {data?.number_of_seasons > 0 && <span className="detail-meta-item">{data.number_of_seasons} Season{data.number_of_seasons > 1 ? 's' : ''}</span>}
                {data?.number_of_episodes > 0 && <span className="detail-meta-item">{data.number_of_episodes} Episodes</span>}
              </div>

              {data?.overview && <p className="detail-overview">{data.overview}</p>}

              <div className="detail-actions-row">
                <button className={inWl ? 'btn-primary btn-saved' : 'btn-primary'} onClick={toggleWl}>
                  {inWl ? <><CheckIcon /> In Watchlist</> : <><PlusIcon /> Add to Watchlist</>}
                </button>
              </div>

              {/* Collection banner */}
              {data?.belongs_to_collection && (
                <div
                  className="collection-banner"
                  onClick={() => navigate(`/movies?collection_id=${data.belongs_to_collection.id}`)}
                >
                  {data.belongs_to_collection.poster_path && (
                    <img
                      className="collection-poster"
                      src={`${IMG_SIZES.poster.small}${data.belongs_to_collection.poster_path}`}
                      alt={data.belongs_to_collection.name}
                      loading="lazy"
                    />
                  )}
                  <div className="collection-info">
                    <div className="collection-label">Part of</div>
                    <div className="collection-name">{data.belongs_to_collection.name}</div>
                    <span className="collection-cta">View Collection →</span>
                  </div>
                </div>
              )}

              {providers.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div className="section-sub">Stream On</div>
                  <div className="providers-row">
                    {providers.map((p) => (
                      <img key={p.provider_id} className="provider-logo"
                        src={`${IMG_SIZES.logo.small}${p.logo_path}`} alt={p.provider_name} title={p.provider_name} loading="lazy" />
                    ))}
                  </div>
                </div>
              )}

              {data?.created_by?.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div className="section-sub">Created By</div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {data.created_by.map((c) => <span key={c.id} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{c.name}</span>)}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="container">
        {loading ? (
          <>
            <div className="section">
              <h2 className="section-title" style={{ marginBottom: '1rem' }}>Cast</h2>
              <SkeletonGrid count={8} />
            </div>

            <div className="section" style={{ paddingBottom: '3rem' }}>
              <h2 className="section-title" style={{ marginBottom: '1rem' }}>You Might Also Like</h2>
              <SkeletonGrid count={8} />
            </div>
          </>
        ) : cast.length > 0 && (
          <div className="section">
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>Cast</h2>
            <div className="cast-grid">
              {cast.map((c) => (
                <div key={c.id} className="cast-card" onClick={() => navigate(`/person/${c.id}`)}>
                  <img className="cast-avatar"
                    src={c.profile_path
                      ? `${IMG_SIZES.profile.small}${c.profile_path}`
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=1c1c28&color=8888aa&size=72`}
                    alt={c.name}
                    loading="lazy" />
                  <div className="cast-name">{c.name}</div>
                  <div className="cast-role">{c.character}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && similar.length > 0 && (
          <div className="section" style={{ paddingBottom: '3rem' }}>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>You Might Also Like</h2>
            <div className="scroll-row">
              {similar.map((item) => (
                <div key={item.id} className="scroll-card scroll-card-lg">
                  <MediaCard item={{ ...item, media_type: type }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
