import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isAdmin: false,
    accessToken: null,
    // refreshToken: null,
    //
    lastActivityTime: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.accessToken = action.payload.accessToken;
      // state.refreshToken = action.payload.refreshToken;
      state.isAdmin = action.payload.isAdmin;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      // state.refreshToken = null;
      state.isAdmin = false;
    },
    setLastActivityTime(state) {
      state.lastActivityTime = Date.now(); // Update last activity time
    },
  },
});

export const { loginSuccess, logoutSuccess, setLastActivityTime } = authSlice.actions;
export default authSlice.reducer;
