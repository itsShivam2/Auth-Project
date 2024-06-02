import { createSlice } from "@reduxjs/toolkit";
import {
  saveAuthState,
  loadAuthState,
  clearAuthState,
} from "../../utility/authUtils";

const initialState = loadAuthState() || {
  isAuthenticated: false,
  isAdmin: false,
  accessToken: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.isAdmin = action.payload.isAdmin;
      state.accessToken = action.payload.accessToken;
      state.loading = false;
      state.error = null;
      saveAuthState(state);
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.accessToken = null;
      state.loading = false;
      state.error = null;
      clearAuthState();
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
