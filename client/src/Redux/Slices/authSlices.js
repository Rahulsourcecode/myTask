// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    user: null,
  },
  reducers: {
    logout: (state, action) => {
      state.token = null
      state.user = null
    },
    setState: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
    }
  },
});

export const { logout, setState } = authSlice.actions;
export default authSlice.reducer;
