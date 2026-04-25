// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — FilterChips Component
// ═══════════════════════════════════════════════════════════════════════════

export default function FilterChips({ items, activeValue, onChange, allLabel = 'All' }) {
  return (
    <div className="filters-row">
      <button
        className={`filter-chip ${!activeValue ? 'active' : ''}`}
        onClick={() => onChange('')}
      >
        {allLabel}
      </button>
      {items.map((item) => {
        const value = typeof item === 'object' ? item.id || item.value : item;
        const label = typeof item === 'object' ? item.name || item.label : item;
        return (
          <button
            key={value}
            className={`filter-chip ${String(activeValue) === String(value) ? 'active' : ''}`}
            onClick={() => onChange(String(activeValue) === String(value) ? '' : value)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
