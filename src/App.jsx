// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — Root App Component
// ═══════════════════════════════════════════════════════════════════════════

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { STORAGE_KEYS } from './constants';
import AppRoutes from './routes';

export default function App() {
  const theme = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();

  // Sync theme to DOM and persist to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch {
      // localStorage not available
    }
  }, [theme]);

  // Global keyboard shortcut: press "/" to open search (when not in input)
  useEffect(() => {
    function handleKeyDown(e) {
      if (
        e.key === '/' &&
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA' &&
        !document.activeElement.isContentEditable
      ) {
        e.preventDefault();
        navigate('/search');
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return <AppRoutes />;
}
