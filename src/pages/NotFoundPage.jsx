// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — 404 Not Found Page
// ═══════════════════════════════════════════════════════════════════════════

import { useNavigate } from 'react-router-dom';
import EmptyState from '../components/ui/EmptyState';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="page page-enter">
      <div className="container" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <EmptyState
          icon="🚀"
          title="Page not found"
          subtitle="The page you're looking for doesn't exist or has been moved."
          actionLabel="Go Home"
          onAction={() => navigate('/')}
        />
      </div>
    </div>
  );
}
