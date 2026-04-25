// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — Navbar Component
// ═══════════════════════════════════════════════════════════════════════════

import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toggleTheme } from '../../store/themeSlice';
import { NAV_ITEMS } from '../../constants';
import { SunIcon, MoonIcon, BookmarkIcon, SearchIcon } from '../ui/Icons';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.mode);
  const watchlistCount = useSelector((state) => state.watchlist.items.length);

  return (
    <nav>
      <div className="nav-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        ◈ <span>Streamora</span>
      </div>
      <div className="nav-links">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="nav-actions">
        <button
          className="theme-btn"
          onClick={() => navigate('/search')}
          aria-label="Search"
          id="nav-search-btn"
          title="Search"
        >
          <SearchIcon />
        </button>
        <button
          className="theme-btn"
          onClick={() => dispatch(toggleTheme())}
          aria-label="Toggle theme"
          id="theme-toggle"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        <button
          className="watchlist-btn-nav"
          onClick={() => navigate('/watchlist')}
          id="nav-watchlist-btn"
        >
          <BookmarkIcon />
          Watchlist
          {watchlistCount > 0 && <span className="wl-count">{watchlistCount}</span>}
        </button>
      </div>
    </nav>
  );
}
