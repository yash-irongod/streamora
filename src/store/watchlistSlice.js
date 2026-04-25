// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — Watchlist Slice (Redux Toolkit)
// ═══════════════════════════════════════════════════════════════════════════

import { createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../constants';

const getInitialWatchlist = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.WATCHLIST) || '[]');
  } catch {
    return [];
  }
};

const persistWatchlist = (items) => {
  try {
    localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(items));
  } catch {
    // localStorage not available
  }
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    items: getInitialWatchlist(),
  },
  reducers: {
    addToWatchlist(state, action) {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (!exists) {
        state.items.unshift({
          ...action.payload,
          addedAt: Date.now(),
          status: 'to_watch',
        });
        persistWatchlist(state.items);
      }
    },
    removeFromWatchlist(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      persistWatchlist(state.items);
    },
    setWatchStatus(state, action) {
      const { id, status } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.status = status;
        persistWatchlist(state.items);
      }
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, setWatchStatus } = watchlistSlice.actions;
export default watchlistSlice.reducer;
