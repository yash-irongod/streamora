// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — Pagination Component
// ═══════════════════════════════════════════════════════════════════════════

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxPage = Math.min(totalPages, 500);
  if (maxPage <= 1) return null;

  // Show a window of pages around the current page
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(maxPage, currentPage + 2);
  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={`page-btn ${p === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}
      <button
        className="page-btn"
        disabled={currentPage >= maxPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        ›
      </button>
    </div>
  );
}
