// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — Recently Viewed Slice (Redux Toolkit)
// Persisted via sessionStorage — survives page refreshes, cleared on tab close
// ═══════════════════════════════════════════════════════════════════════════

import { createSlice } from '@reduxjs/toolkit';

const MAX_ITEMS = 10;
const STORAGE_KEY = 'streamora_recently_viewed';

// Hydrate from sessionStorage on load
function loadInitialState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // sessionStorage unavailable or corrupt
  }
  return [];
}

const recentlyViewedSlice = createSlice({
  name: 'recentlyViewed',
  initialState: {
    items: loadInitialState(),
  },
  reducers: {
    addRecentlyViewed(state, action) {
      // Remove duplicate if exists
      state.items = state.items.filter((i) => i.id !== action.payload.id);
      // Add to front
      state.items.unshift(action.payload);
      // Cap at MAX_ITEMS
      if (state.items.length > MAX_ITEMS) {
        state.items = state.items.slice(0, MAX_ITEMS);
      }
      // Persist to sessionStorage
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
      } catch {
        // quota exceeded or unavailable
      }
    },
  },
});

export const { addRecentlyViewed } = recentlyViewedSlice.actions;
export default recentlyViewedSlice.reducer;
