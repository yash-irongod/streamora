// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — useDebounce Hook
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react';

/**
 * Returns a debounced version of the provided value.
 * @param {*} value - The value to debounce
 * @param {number} delay - Debounce delay in milliseconds (default: 400)
 * @returns {*} The debounced value
 */
export default function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
