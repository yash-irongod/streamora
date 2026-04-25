// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — useLocalStorage Hook
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useCallback } from 'react';

/**
 * Syncs state with localStorage using JSON serialization.
 * @param {string} key - localStorage key
 * @param {*} initialValue - Default value if key is not found
 * @returns {[value, setValue]}
 */
export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch {
        // localStorage not available
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}
