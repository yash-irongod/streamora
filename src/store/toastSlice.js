// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — Toast Slice (Redux Toolkit)
// ═══════════════════════════════════════════════════════════════════════════

import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    message: null,
    type: null, // 'add' | 'remove' | null
  },
  reducers: {
    showToast(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type || 'add';
    },
    clearToast(state) {
      state.message = null;
      state.type = null;
    },
  },
});

export const { showToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
