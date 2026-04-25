import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CompareChart from '../components/analytics/CompareChart';
import GenreChart from '../components/analytics/GenreChart';
import RatingChart from '../components/analytics/RatingChart';
import { StatGrid } from '../components/analytics/StatCard';
import TrendChart from '../components/analytics/TrendChart';
import WatchlistGenreChart from '../components/analytics/WatchlistGenreChart';
import WatchlistProgressChart from '../components/analytics/WatchlistProgressChart';
import EmptyState from '../components/ui/EmptyState';
import { StarIcon } from '../components/ui/Icons';
import PageHeader from '../components/ui/PageHeader';
import { GENRE_IDS_MAP } from '../constants';
import useApi from '../hooks/useApi';

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const watchlist = useSelector((state) => state.watchlist.items);

  const { data: topMovies, loading: loadingMovies } = useApi('/movie/top_rated', {}, []);
  const { data: topTV, loading: loadingTV } = useApi('/tv/top_rated', {}, []);
  const { data: trending, loading: loadingTrending } = useApi('/trending/all/week', {}, []);

  const movieResults = useMemo(() => topMovies?.results || [], [topMovies]);
  const tvResults = useMemo(() => topTV?.results || [], [topTV]);
  const trendingResults = useMemo(() => trending?.results || [], [trending]);
  const isLoading = loadingMovies || loadingTV || loadingTrending;

  const watchlistStats = useMemo(() => {
    const movies = watchlist.filter((item) => item.type === 'movie').length;
    const tv = watchlist.filter((item) => item.type === 'tv').length;
    const watched = watchlist.filter((item) => item.status === 'watched').length;
    const toWatch = watchlist.filter((item) => (item.status || 'to_watch') === 'to_watch').length;
    const avgRating = watchlist.length
      ? (watchlist.reduce((total, item) => total + (+item.vote_average || 0), 0) / watchlist.length).toFixed(1)
      : '—';

    return { movies, tv, avgRating, watched, toWatch };
  }, [watchlist]);

  const watchlistGenreData = useMemo(() => {
    const genreCounts = {};

    watchlist.forEach((item) => {
      (item.genre_ids || []).forEach((id) => {
        const genreName = GENRE_IDS_MAP[id];
        if (genreName) {
          genreCounts[genreName] = (genreCounts[genreName] || 0) + 1;
        }
      });
    });

    return Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count]) => ({ name, count }));
  }, [watchlist]);

  const topRated = useMemo(() => {
    return [
      ...movieResults.map((item) => ({ ...item, media_type: 'movie' })),
      ...tvResults.map((item) => ({ ...item, media_type: 'tv' })),
    ]
      .sort((left, right) => right.vote_average - left.vote_average)
      .slice(0, 5);
  }, [movieResults, tvResults]);

  return (
    <div className="page page-enter">
      <div className="container">
        <PageHeader
          icon="📊"
          title="Analytics"
          subtitle="Insights into content trends, ratings, and your collection"
        />

        <StatGrid
          stats={[
            { label: 'My Watchlist', value: watchlist.length, sub: 'titles saved' },
            { label: 'Movies Saved', value: watchlistStats.movies, sub: 'in collection' },
            { label: 'Series Saved', value: watchlistStats.tv, sub: 'in collection' },
            { label: 'Avg Rating', value: watchlistStats.avgRating, sub: 'in watchlist' },
          ]}
        />

        <div className="section-divider">
          <span className="section-divider-text">Your Collection</span>
        </div>

        <div className="analytics-grid">
          {watchlist.length === 0 ? (
            <div className="analytics-card" style={{ gridColumn: 'span 3' }}>
              <EmptyState
                icon="📌"
                title="Your collection is empty"
                subtitle="Add movies and series to your watchlist to see personal genre insights and progress tracking."
                actionLabel="Explore Trending"
                onAction={() => navigate('/trending')}
              />
            </div>
          ) : (
            <>
              <WatchlistGenreChart data={watchlistGenreData} />
              <WatchlistProgressChart
                toWatch={watchlistStats.toWatch}
                watched={watchlistStats.watched}
              />
            </>
          )}
        </div>

        <div className="section-divider">
          <span className="section-divider-text">Platform Insights</span>
        </div>

        <div className="analytics-grid">
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="analytics-card"
                  style={index <= 2 ? { gridColumn: 'span 2' } : {}}
                >
                  <div className="skeleton-inner" style={{ height: 240, borderRadius: 8 }} />
                </div>
              ))}
            </>
          ) : (
            <>
              <GenreChart movies={movieResults} tvShows={tvResults} />
              <RatingChart movies={movieResults} tvShows={tvResults} />
              <TrendChart trending={trendingResults} />
              <CompareChart movies={movieResults} tvShows={tvResults} />
            </>
          )}

          <div className="analytics-card">
            <h3>Highest Rated Titles</h3>
            {isLoading ? (
              <div className="skeleton-inner" style={{ height: 200, borderRadius: 8 }} />
            ) : (
              <div className="leaderboard-list">
                {topRated.map((item, index) => (
                  <div
                    key={item.id}
                    className="leaderboard-item"
                    onClick={() => navigate(`/${item.media_type}/${item.id}`)}
                  >
                    <span className="leaderboard-rank">{index + 1}</span>
                    <div className="leaderboard-info">
                      <div className="leaderboard-title">{item.title || item.name}</div>
                      <div className="leaderboard-type">
                        {item.media_type === 'movie' ? 'Film' : 'TV'}
                      </div>
                    </div>
                    <span className="leaderboard-rating">
                      <StarIcon />
                      {(+item.vote_average).toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ paddingBottom: '3rem' }} />
      </div>
    </div>
  );
}
