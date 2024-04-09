import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // user: null,
  isAuthenticated: false,
  isAdmin: false,
  accessToken: null,
  // refreshToken: null,
  //lastActivityTime: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // state.user = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.isAdmin;
      state.accessToken = action.payload.accessToken;
      // state.refreshToken = action.payload.refreshToken;
      state.loading = false;
      state.error = null;
    },
    clearUser: (state) => {
      // state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.accessToken = null;
      // state.refreshToken = null;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // setLastActivityTime(state) {
    //   state.lastActivityTime = Date.now(); // Update last activity time
    // },
  },
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
