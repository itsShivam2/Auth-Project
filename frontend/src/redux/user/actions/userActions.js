import { setUser, clearUser, setLoading, setError } from "../userSlice";
import axios from "axios";

// Signup action creator
export const signup = (userData, onSuccess, onFailure) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(
      "https://auth-project-tw37.onrender.com/api/v1/auth/signup",
      userData,
      { withCredentials: true }
    );
    if (response.status === 201) {
      onSuccess(response.data.message);
      dispatch(setLoading(false));
      dispatch(setError(null));
      return { success: true };
    }
  } catch (error) {
    dispatch(setError(error.response.data.message));
    onFailure(error.response.data.message);
  } finally {
    dispatch(setLoading(false));
  }
};

// Login action creator
export const login = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(
      "https://auth-project-tw37.onrender.com/api/v1/auth/login",
      formData,
      { withCredentials: true }
    );
    if (response.status === 200) {
      const { accessToken, username, role } = response.data;
      dispatch(setUser({ accessToken, isAdmin: role === "admin", username }));
      dispatch(setLoading(false));
      return { success: true };
    }
  } catch (error) {
    dispatch(setError(error.response.data.message));
    dispatch(setLoading(false));
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};

// Logout action creator
export const logout = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(
      "https://auth-project-tw37.onrender.com/api/v1/auth/logout",
      null,
      { withCredentials: true }
    );
    if (response.status === 200) {
      dispatch(clearUser());
      return { success: true };
    }
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Logout failed"));
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};

export const refreshToken = () => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://auth-project-tw37.onrender.com/api/v1/auth/refresh-token",
      {},
      { withCredentials: true }
    );
    if (response.status === 200) {
      const { accessToken, role } = response.data;
      dispatch(
        setUser({
          accessToken,
          isAdmin: role === "admin",
        })
      );
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(clearUser());
      localStorage.removeItem("authState");
    } else {
      dispatch(clearUser());
    }
  }
};

// Update password action creator
export const updatePassword = (passwordData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(
      "https://auth-project-tw37.onrender.com/api/v1/auth/update-password",
      passwordData,
      { withCredentials: true }
    );
    console.log(response.data);
  } catch (error) {
    dispatch(setError(error.response.data.message));
  }
};

// Fetch profile details action creator
export const fetchProfileDetails = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(
      "https://auth-project-tw37.onrender.com/api/v1/user/profile",
      { withCredentials: true }
    );
    if (response.status === 200) {
      dispatch(setLoading(false));
      return { profile: response.data.profile, success: true };
    }
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setError(error.response.data.message));
  }
};
