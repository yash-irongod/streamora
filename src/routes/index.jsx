import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { SkeletonGrid } from '../components/ui/SkeletonCard';

const HomePage = lazy(() => import('../pages/HomePage'));
const BrowsePage = lazy(() => import('../pages/BrowsePage'));
const TrendingPage = lazy(() => import('../pages/TrendingPage'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const DetailPage = lazy(() => import('../pages/DetailPage'));
const WatchlistPage = lazy(() => import('../pages/WatchlistPage'));
const AnalyticsPage = lazy(() => import('../pages/AnalyticsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const PersonPage = lazy(() => import('../pages/PersonPage'));

function PageLoader() {
  return (
    <div className="page page-loader">
      <div className="container">
        <SkeletonGrid count={12} />
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<BrowsePage type="movie" />} />
          <Route path="/series" element={<BrowsePage type="tv" />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:id" element={<DetailPage />} />
          <Route path="/tv/:id" element={<DetailPage />} />
          <Route path="/person/:id" element={<PersonPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
