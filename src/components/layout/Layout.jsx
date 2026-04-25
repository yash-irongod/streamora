// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — Layout Shell Component
// ═══════════════════════════════════════════════════════════════════════════

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import MobileNav from './MobileNav';
import Toast from '../ui/Toast';
import ErrorBoundary from '../ui/ErrorBoundary';
import ScrollToTop from '../ui/ScrollToTop';

export default function Layout() {
  return (
    <>
      <Navbar />
      <ErrorBoundary>
        <ScrollToTop />
        <Outlet />
      </ErrorBoundary>
      <MobileNav />
      <Toast />
    </>
  );
}
