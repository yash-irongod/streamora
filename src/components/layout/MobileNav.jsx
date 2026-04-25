// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — MobileNav Component
// ═══════════════════════════════════════════════════════════════════════════

import { NavLink } from 'react-router-dom';
import { HomeIcon, SearchIcon, FilmIcon, TvIcon, TrendingIcon, BookmarkIcon } from '../ui/Icons';

const mobileItems = [
  { id: 'home', label: 'Home', path: '/', icon: <HomeIcon /> },
  { id: 'search', label: 'Search', path: '/search', icon: <SearchIcon /> },
  { id: 'movies', label: 'Movies', path: '/movies', icon: <FilmIcon /> },
  { id: 'series', label: 'Series', path: '/series', icon: <TvIcon /> },
  { id: 'trending', label: 'Trending', path: '/trending', icon: <TrendingIcon /> },
  { id: 'watchlist', label: 'Saved', path: '/watchlist', icon: <BookmarkIcon /> },
];

export default function MobileNav() {
  return (
    <div className="mobile-nav">
      <div className="mobile-nav-inner">
        {mobileItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="mobile-nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
