// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — ScrollToTop Component
// ═══════════════════════════════════════════════════════════════════════════

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the window to the top whenever the route pathname changes.
 * Place this inside the Router but outside route definitions.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
