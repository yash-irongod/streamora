// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — Trending Page
// ═══════════════════════════════════════════════════════════════════════════

import { useState } from 'react';
import useApi from '../hooks/useApi';
import PageHeader from '../components/ui/PageHeader';
import MediaCard from '../components/ui/MediaCard';
import { SkeletonGrid } from '../components/ui/SkeletonCard';

export default function TrendingPage() {
  const [timeWindow, setTimeWindow] = useState('day');
  const [tab, setTab] = useState('all');

  const path = tab === 'all' ? `/trending/all/${timeWindow}` : `/trending/${tab}/${timeWindow}`;
  const { data, loading } = useApi(path, {}, [tab, timeWindow]);

  return (
    <div className="page page-enter">
      <div className="container">
        <PageHeader
          icon="🔥"
          title="Trending"
          subtitle="What everyone is watching right now"
        />

        {/* Type + Time filters */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          {['all', 'movie', 'tv'].map((t) => (
            <button
              key={t}
              className={`filter-chip ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t === 'all' ? 'All' : t === 'movie' ? 'Movies' : 'Series'}
            </button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
            <button
              className={`filter-chip ${timeWindow === 'day' ? 'active' : ''}`}
              onClick={() => setTimeWindow('day')}
            >
              Today
            </button>
            <button
              className={`filter-chip ${timeWindow === 'week' ? 'active' : ''}`}
              onClick={() => setTimeWindow('week')}
            >
              This Week
            </button>
          </div>
        </div>

        {/* Content Grid */}
        {loading ? (
          <SkeletonGrid count={20} />
        ) : (
          <div className="card-grid card-grid-lg">
            {(data?.results || []).map((item) => (
              <MediaCard key={item.id} item={item} showPopularity />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
