// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — Search Page
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useMemo, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import useDebounce from '../hooks/useDebounce';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { SearchIcon } from '../components/ui/Icons';
import { IMG_SIZES } from '../constants';
import MediaCard from '../components/ui/MediaCard';
import { SkeletonGrid } from '../components/ui/SkeletonCard';
import Pagination from '../components/ui/Pagination';
import EmptyState from '../components/ui/EmptyState';

const POPULAR_SEARCHES = ['Action', 'Sci-Fi', 'Christopher Nolan', 'Thriller', '2024', 'Marvel', 'Comedy', 'Breaking Bad'];

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'movie', label: 'Movies' },
  { key: 'tv', label: 'TV Series' },
  { key: 'person', label: 'People' },
];

// Determine the correct API endpoint per tab
function getSearchPath(tab) {
  switch (tab) {
    case 'movie': return '/search/movie';
    case 'tv': return '/search/tv';
    case 'person': return '/search/person';
    default: return '/search/multi';
  }
}

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('all');
  const [page, setPage] = useState(1);
  useDocumentTitle('Search — Streamora');

  const debouncedQ = useDebounce(query, 400);

  // Update URL params when query changes
  const handleQueryChange = useCallback((val) => {
    setQuery(val);
    setPage(1);
    if (val) {
      setSearchParams({ q: val }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [setSearchParams]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setPage(1);
  }, []);

  // ─── Primary API call — uses typed endpoint per tab ───────────────────
  const searchPath = debouncedQ ? getSearchPath(activeTab) : null;
  const { data, loading, error } = useApi(
    searchPath,
    debouncedQ ? { query: debouncedQ, page } : {},
    [debouncedQ, activeTab, page]
  );

  // ─── Secondary "multi" call for tab counts (only when on a typed tab) ─
  const needsMultiForCounts = debouncedQ && activeTab !== 'all';
  const { data: multiData } = useApi(
    needsMultiForCounts ? '/search/multi' : null,
    needsMultiForCounts ? { query: debouncedQ, page: 1 } : {},
    [debouncedQ, needsMultiForCounts]
  );

  // Tab badge counts — from multi response (when available) or current data
  const counts = useMemo(() => {
    const source = activeTab === 'all' ? data : multiData;
    if (!source?.results) return { all: 0, movie: 0, tv: 0, person: 0 };
    return {
      all: source.total_results || source.results.length,
      movie: source.results.filter((i) => i.media_type === 'movie').length,
      tv: source.results.filter((i) => i.media_type === 'tv').length,
      person: source.results.filter((i) => i.media_type === 'person').length,
    };
  }, [data, multiData, activeTab]);

  // Results — for 'all' tab, filter nothing; for typed tabs, data is already typed
  const results = useMemo(() => {
    if (!data?.results) return [];
    // For 'all' tab, filter out person results (they render separately below)
    if (activeTab === 'all') return data.results.filter((i) => i.media_type !== 'person');
    return data.results;
  }, [data, activeTab]);

  // Person results — only from 'all' tab or 'person' tab
  const personResults = useMemo(() => {
    if (!data?.results) return [];
    if (activeTab === 'person') return data.results;
    if (activeTab === 'all') return data.results.filter((i) => i.media_type === 'person');
    return [];
  }, [data, activeTab]);

  return (
    <div className="page page-enter">
      <div className="container">
        {/* Search Header */}
        <div className="search-page-header">
          <h1 className="search-page-title">Search</h1>
          <p className="search-page-sub">Find movies, TV series, and people</p>
        </div>

        {/* Search Input */}
        <div className="search-page-input-wrap">
          <SearchIcon />
          <input
            type="text"
            className="search-page-input"
            placeholder="Search for movies, TV shows, people..."
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            autoFocus
          />
          {query && (
            <button
              className="search-clear-btn"
              onClick={() => handleQueryChange('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Results */}
        {debouncedQ ? (
          <>
            {/* Result tabs */}
            <div className="search-tabs">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  className={`search-tab ${activeTab === tab.key ? 'active' : ''}`}
                  onClick={() => handleTabChange(tab.key)}
                >
                  {tab.label}
                  {!loading && <span className="search-tab-count">{counts[tab.key]}</span>}
                </button>
              ))}
            </div>

            {/* Result count */}
            {!loading && data && (
              <div className="results-header">
                <span className="results-count">
                  {data.total_results?.toLocaleString() || 0} results for &quot;{debouncedQ}&quot;
                </span>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="error-panel">⚠️ {error}</div>
            )}

            {/* Grid */}
            {loading ? (
              <SkeletonGrid count={18} />
            ) : activeTab === 'person' || (activeTab === 'all' && results.length === 0 && personResults.length > 0) ? (
              // People results — custom display
              personResults.length === 0 ? (
                <EmptyState icon="👤" title="No people found" subtitle="Try a different name" />
              ) : (
                <div className="people-grid">
                  {personResults.map((person) => (
                    <div
                      key={person.id}
                      className="person-card"
                      onClick={() => navigate(`/person/${person.id}`)}
                    >
                      <img
                        className="person-avatar"
                        src={person.profile_path
                          ? `${IMG_SIZES.profile.small}${person.profile_path}`
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=1c1c28&color=8888aa&size=120`}
                        alt={person.name}
                        loading="lazy"
                      />
                      <div className="person-name">{person.name}</div>
                      <div className="person-dept">{person.known_for_department || 'Unknown'}</div>
                      {/* Known for thumbnails */}
                      {person.known_for?.length > 0 && (
                        <div className="person-known-for">
                          {person.known_for.slice(0, 3).map((work) => (
                            work.poster_path ? (
                              <img
                                key={work.id}
                                src={`${IMG_SIZES.poster.small}${work.poster_path}`}
                                alt={work.title || work.name}
                                title={work.title || work.name}
                                className="person-known-thumb"
                                loading="lazy"
                              />
                            ) : null
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )
            ) : results.length === 0 ? (
              <EmptyState
                icon="🔍"
                title="No results found"
                subtitle="Try a different search term or switch to a different tab"
              />
            ) : (
              <div className="card-grid card-grid-lg">
                {results.map((item) => (
                  <MediaCard key={`${item.media_type || activeTab}-${item.id}`} item={{ ...item, media_type: item.media_type || activeTab }} />
                ))}
              </div>
            )}

            {!loading && data?.total_pages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={data.total_pages}
                onPageChange={setPage}
              />
            )}
          </>
        ) : (
          // Empty state when no query
          <div className="search-empty">
            <div className="search-empty-icon">🎬</div>
            <h2 className="search-empty-title">Discover something new</h2>
            <p className="search-empty-sub">
              Start typing to search across movies, TV series, and people
            </p>
            <div className="section-sub">Popular Searches</div>
            <div className="filters-row" style={{ justifyContent: 'center' }}>
              {POPULAR_SEARCHES.map((label) => (
                <button
                  key={label}
                  type="button"
                  className="filter-chip"
                  onClick={() => handleQueryChange(label)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
