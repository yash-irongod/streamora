// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — Home Page
// ═══════════════════════════════════════════════════════════════════════════

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useApi from '../hooks/useApi';
import useDocumentTitle from '../hooks/useDocumentTitle';
import HeroSection from '../components/ui/HeroSection';
import ContentRow from '../components/ui/ContentRow';

export default function HomePage() {
  const navigate = useNavigate();
  const recentlyViewed = useSelector((state) => state.recentlyViewed.items);
  useDocumentTitle('Streamora — Premium Entertainment');

  const { data: trending, loading: tLoading } = useApi('/trending/all/day', {}, []);
  const { data: topMovies, loading: tmLoading } = useApi('/movie/top_rated', {}, []);
  const { data: popular, loading: pLoading } = useApi('/tv/popular', {}, []);
  const { data: upcoming } = useApi('/movie/upcoming', {}, []);

  return (
    <div className="page page-enter">
      {/* Hero Banner */}
      <HeroSection items={trending?.results || []} />

      <div className="container">
        {/* Continue Browsing (only shown if user has recently viewed items) */}
        {recentlyViewed.length > 0 && (
          <ContentRow
            title={<><span className="home-row-icon home-row-icon-accent2">⏱</span> Continue Browsing</>}
            items={recentlyViewed}
          />
        )}

        {/* Trending Now */}
        <ContentRow
          title={<><span className="home-row-icon home-row-icon-accent">🔥</span> Trending Now</>}
          items={(trending?.results || []).slice(0, 12)}
          loading={tLoading}
          onSeeAll={() => navigate('/trending')}
          showPopularity={true}
        />

        {/* Top Rated Films */}
        <ContentRow
          title="⭐ Top Rated Films"
          items={(topMovies?.results || []).slice(0, 10).map((m) => ({ ...m, media_type: 'movie' }))}
          loading={tmLoading}
          onSeeAll={() => navigate('/movies')}
          large
        />

        {/* Popular Series */}
        <ContentRow
          title="📺 Popular Series"
          items={(popular?.results || []).slice(0, 12).map((s) => ({ ...s, media_type: 'tv' }))}
          loading={pLoading}
          onSeeAll={() => navigate('/series')}
        />

        {/* Coming Soon */}
        <div className="page-section-pad-bottom">
          <ContentRow
            title="🎬 Coming Soon"
            items={(upcoming?.results || []).slice(0, 10).map((m) => ({ ...m, media_type: 'movie' }))}
            large
          />
        </div>
      </div>
    </div>
  );
}
