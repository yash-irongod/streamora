// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — SearchInput Component
// ═══════════════════════════════════════════════════════════════════════════

import { SearchIcon } from './Icons';

export default function SearchInput({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="search-input-wrap">
      <SearchIcon />
      <input
        className="search-input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id="search-input"
      />
    </div>
  );
}
