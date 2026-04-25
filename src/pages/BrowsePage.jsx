// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — Browse Page (Movies / Series)
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import useDebounce from '../hooks/useDebounce';
import { GENRES_MOVIE, GENRES_TV, SORT_OPTIONS } from '../constants';
import PageHeader from '../components/ui/PageHeader';
import SearchInput from '../components/ui/SearchInput';
import FilterChips from '../components/ui/FilterChips';
import MediaCard from '../components/ui/MediaCard';
import { SkeletonGrid } from '../components/ui/SkeletonCard';
import Pagination from '../components/ui/Pagination';
import EmptyState from '../components/ui/EmptyState';

// Generate year options from current year down to 1900
const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

export default function BrowsePage({ type = 'movie' }) {
  const [urlParams, setUrlParams] = useSearchParams();
  const collectionId = urlParams.get('collection_id');

  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [sort, setSort] = useState('popularity.desc');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [page, setPage] = useState(1);

  const debouncedQ = useDebounce(query, 400);
  const genres = type === 'movie' ? GENRES_MOVIE : GENRES_TV;

  // Reset page on filter change
  const handleGenreChange = useCallback((val) => { setGenre(val); setPage(1); }, []);
  const handleSortChange = useCallback((e) => { setSort(e.target.value); setPage(1); }, []);
  const handleYearFromChange = useCallback((e) => { setYearFrom(e.target.value); setPage(1); }, []);
  const handleYearToChange = useCallback((e) => { setYearTo(e.target.value); setPage(1); }, []);

  // Clear collection filter
  const clearCollection = useCallback(() => {
    setUrlParams({}, { replace: true });
    setPage(1);
  }, [setUrlParams]);

  // Build discover params with year range and vote count minimum
  const dateField = type === 'movie' ? 'primary_release_date' : 'first_air_date';

  const searchParams = useMemo(() => {
    if (debouncedQ) return { query: debouncedQ, page };
    const params = {
      sort_by: sort,
      page,
      'vote_count.gte': collectionId ? 0 : 100,
    };
    // Collection filter takes priority
    if (collectionId) {
      params.with_collection = collectionId;
    } else {
      if (genre) params.with_genres = genre;
      if (yearFrom) params[`${dateField}.gte`] = `${yearFrom}-01-01`;
      if (yearTo) params[`${dateField}.lte`] = `${yearTo}-12-31`;
    }
    return params;
  }, [debouncedQ, genre, sort, page, yearFrom, yearTo, dateField, collectionId]);

  // API path switches between search and discover
  const searchPath = debouncedQ ? '/search/multi' : `/discover/${type}`;

  const { data, loading, error } = useApi(searchPath, searchParams, [debouncedQ, genre, sort, yearFrom, yearTo, page, collectionId]);

  // Filter search results to match the current media type
  const results = (data?.results || []).filter((i) => {
    if (!debouncedQ) return true;
    return i.media_type === type || (!i.media_type && (type === 'movie' ? i.title : i.name));
  });

  const isMovie = type === 'movie';

  return (
    <div className="page page-enter">
      <div className="container">
        <PageHeader
          icon={isMovie ? '🎬' : '📺'}
          title={collectionId ? 'Collection' : (isMovie ? 'Movies' : 'Series')}
          subtitle={collectionId
            ? 'Films in this collection'
            : `Discover ${isMovie ? 'the finest films' : 'the best TV series'} from around the world`}
        />

        {/* Collection active indicator */}
        {collectionId && (
          <div style={{ marginBottom: '1.25rem' }}>
            <button className="filter-chip active" onClick={clearCollection}>
              Collection Filter ✕
            </button>
          </div>
        )}

        {/* Search + Sort */}
        {!collectionId && (
          <div className="search-bar">
            <SearchInput
              value={query}
              onChange={(val) => { setQuery(val); setPage(1); }}
              placeholder={`Search ${isMovie ? 'movies' : 'series'}...`}
            />
            <select className="filter-select" value={sort} onChange={handleSortChange}>
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        )}

        {/* Filters row (hidden during search or collection view) */}
        {!debouncedQ && !collectionId && (
          <>
            <FilterChips items={genres} activeValue={genre} onChange={handleGenreChange} allLabel="All Genres" />

            {/* Year Range Filter */}
            <div className="year-filter-row">
              <span className="year-filter-label">Year</span>
              <select className="filter-select year-select" value={yearFrom} onChange={handleYearFromChange}>
                <option value="">From</option>
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <span className="year-filter-dash">–</span>
              <select className="filter-select year-select" value={yearTo} onChange={handleYearToChange}>
                <option value="">To</option>
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              {(yearFrom || yearTo) && (
                <button
                  className="filter-chip"
                  onClick={() => { setYearFrom(''); setYearTo(''); setPage(1); }}
                  style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}
                >
                  Clear ✕
                </button>
              )}
              <button
                className={`filter-chip ${yearFrom === String(currentYear) && yearTo === String(currentYear) ? 'active' : ''}`}
                onClick={() => {
                  const yr = String(currentYear);
                  setYearFrom(yr);
                  setYearTo(yr);
                  setPage(1);
                }}
              >
                🗓 This Year
              </button>
            </div>
          </>
        )}

        {/* Error */}
        {error && (
          <div className="error-panel">
            ⚠️ {error.includes('401')
              ? 'Invalid API key. Please check your .env file and ensure VITE_TMDB_API_KEY is set correctly.'
              : `Failed to load content: ${error}`}
          </div>
        )}

        {/* Results */}
        {!error && (
          <>
            {debouncedQ && (
              <div className="results-header">
                <span className="results-count">
                  {data?.total_results?.toLocaleString() || 0} results for &quot;{debouncedQ}&quot;
                </span>
              </div>
            )}

            {loading ? (
              <SkeletonGrid count={18} />
            ) : results.length === 0 ? (
              <EmptyState
                icon="🔍"
                title="Nothing found"
                subtitle={collectionId ? 'No films found in this collection' : 'Try a different search term or adjust your filters'}
              />
            ) : (
              <div className="card-grid card-grid-lg">
                {results.map((item) => (
                  <MediaCard key={item.id} item={{ ...item, media_type: item.media_type || type }} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && data?.total_pages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={data.total_pages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
