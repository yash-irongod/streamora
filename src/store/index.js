// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — Redux Store Configuration
// ═══════════════════════════════════════════════════════════════════════════

import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import watchlistReducer from './watchlistSlice';
import toastReducer from './toastSlice';
import recentlyViewedReducer from './recentlyViewedSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    watchlist: watchlistReducer,
    toast: toastReducer,
    recentlyViewed: recentlyViewedReducer,
  },
  devTools: import.meta.env.MODE !== 'production',
});

export default store;
