// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — Theme Slice (Redux Toolkit)
// ═══════════════════════════════════════════════════════════════════════════

import { createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../constants';

const getInitialTheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  } catch {
    return 'dark';
  }
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: getInitialTheme(),
  },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    },
    setTheme(state, action) {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
