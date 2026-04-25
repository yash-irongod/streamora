// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — Watchlist Page
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromWatchlist, setWatchStatus } from '../store/watchlistSlice';
import { showToast } from '../store/toastSlice';
import { IMG_SIZES, WATCHLIST_SORT_OPTIONS } from '../constants';
import { TrashIcon, EyeIcon, EyeOffIcon } from '../components/ui/Icons';
import PageHeader from '../components/ui/PageHeader';
import EmptyState from '../components/ui/EmptyState';

export default function WatchlistPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const watchlist = useSelector((state) => state.watchlist.items);
  const [filter, setFilter] = useState('all');
  const [statusTab, setStatusTab] = useState('all');
  const [sort, setSort] = useState('added');

  const filtered = useMemo(() => {
    let list = watchlist.filter((i) => filter === 'all' || i.type === filter);
    // Status filter
    if (statusTab === 'to_watch') list = list.filter((i) => (i.status || 'to_watch') === 'to_watch');
    if (statusTab === 'watched') list = list.filter((i) => i.status === 'watched');
    // Sort
    if (sort === 'added') list = [...list].sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));
    if (sort === 'rating') list = [...list].sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
    if (sort === 'title') list = [...list].sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    if (sort === 'year') list = [...list].sort((a, b) => (b.year || 0) - (a.year || 0));
    return list;
  }, [watchlist, filter, statusTab, sort]);

  // Counts for status tabs
  const toWatchCount = watchlist.filter((i) => (i.status || 'to_watch') === 'to_watch').length;
  const watchedCount = watchlist.filter((i) => i.status === 'watched').length;

  function remove(id, title) {
    dispatch(removeFromWatchlist(id));
    dispatch(showToast({ message: `Removed "${title}"`, type: 'remove' }));
  }

  function toggleStatus(e, item) {
    e.stopPropagation();
    const newStatus = (item.status || 'to_watch') === 'to_watch' ? 'watched' : 'to_watch';
    dispatch(setWatchStatus({ id: item.id, status: newStatus }));
    dispatch(showToast({
      message: newStatus === 'watched'
        ? `Marked "${item.title}" as watched`
        : `Moved "${item.title}" back to watchlist`,
    }));
  }

  function exportWatchlist() {
    const payload = watchlist.map((i) => ({
      title: i.title, type: i.type, year: i.year,
      rating: i.vote_average, status: i.status || 'to_watch',
    }));
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `streamora-watchlist-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    dispatch(showToast({ message: `Exported ${watchlist.length} titles` }));
  }

  return (
    <div className="page page-enter">
      <div className="container">
        <div className="wl-page-header">
          <PageHeader
            icon="📌"
            title="My Watchlist"
            subtitle={`${watchlist.length} title${watchlist.length !== 1 ? 's' : ''} saved`}
          />
          {watchlist.length > 0 && (
            <button className="btn-secondary btn-no-wrap" onClick={exportWatchlist}>
              📥 Export
            </button>
          )}
        </div>

        {/* Status Tabs + Filters */}
        {watchlist.length > 0 && (
          <>
            {/* Status tabs */}
            <div className="wl-status-tabs">
              {[
                { key: 'all', label: 'All', count: watchlist.length },
                { key: 'to_watch', label: 'To Watch', count: toWatchCount },
                { key: 'watched', label: 'Watched', count: watchedCount },
              ].map((tab) => (
                <button
                  key={tab.key}
                  className={`wl-status-tab ${statusTab === tab.key ? 'active' : ''}`}
                  onClick={() => setStatusTab(tab.key)}
                >
                  {tab.label}
                  <span className="wl-tab-count">{tab.count}</span>
                </button>
              ))}
            </div>

            {/* Type filter + Sort */}
            <div className="wl-toolbar">
              <div className="wl-filter-group">
                {['all', 'movie', 'tv'].map((f) => (
                  <button
                    key={f}
                    className={`filter-chip ${filter === f ? 'active' : ''}`}
                    onClick={() => setFilter(f)}
                  >
                    {f === 'all' ? 'All' : f === 'movie' ? 'Movies' : 'Series'}
                  </button>
                ))}
              </div>
              <select className="filter-select wl-sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                {WATCHLIST_SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Content */}
        {watchlist.length === 0 ? (
          <EmptyState
            icon="🔖"
            title="Your watchlist is empty"
            subtitle="Browse trending movies and series and add them here to keep track of what you want to watch"
            actionLabel="Explore Trending"
            onAction={() => navigate('/trending')}
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="🎞️"
            title={statusTab === 'watched' ? 'Nothing watched yet' : `No ${filter === 'movie' ? 'movies' : filter === 'tv' ? 'series' : 'titles'} found`}
            subtitle={statusTab === 'watched' ? 'Mark items as watched to see them here' : 'Switch filter or add more titles'}
          />
        ) : (
          <div className="wl-list">
            {filtered.map((item) => {
              const isWatched = item.status === 'watched';
              return (
                <div
                  key={item.id}
                  className={`watchlist-item ${isWatched ? 'watched' : ''}`}
                  onClick={() => navigate(`/${item.type}/${item.id}`)}
                >
                  {/* Color accent border based on type */}
                  <div className={`wl-type-accent ${item.type === 'tv' ? 'tv' : 'movie'}`} />
                  {item.poster_path ? (
                    <img className="wl-thumb" src={`${IMG_SIZES.poster.small}${item.poster_path}`} alt={item.title} loading="lazy" />
                  ) : (
                    <div className="wl-thumb wl-thumb-fallback">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="2" y="2" width="20" height="20" rx="2.18" />
                        <line x1="7" y1="2" x2="7" y2="22" />
                        <line x1="17" y1="2" x2="17" y2="22" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                      </svg>
                    </div>
                  )}
                  <div className="wl-info">
                    <div className="wl-title">{item.title}</div>
                    <div className="wl-meta">
                      <span>{item.year || '—'}</span>
                      <span className="wl-meta-type">{item.type === 'movie' ? 'Film' : 'Series'}</span>
                      {item.vote_average > 0 && <span>★ {(+item.vote_average).toFixed(1)}</span>}
                    </div>
                    {item.overview && (
                      <p className="wl-overview">
                        {item.overview}
                      </p>
                    )}
                  </div>
                  <div className="wl-actions">
                    <button
                      className={`status-btn ${isWatched ? 'watched' : ''}`}
                      onClick={(e) => toggleStatus(e, item)}
                      aria-label={isWatched ? 'Mark as unwatched' : 'Mark as watched'}
                      title={isWatched ? 'Mark as unwatched' : 'Mark as watched'}
                    >
                      {isWatched ? <EyeIcon /> : <EyeOffIcon />}
                    </button>
                    <button
                      className="remove-btn"
                      onClick={(e) => { e.stopPropagation(); remove(item.id, item.title); }}
                      aria-label="Remove from watchlist"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
