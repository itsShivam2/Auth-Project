import { setUser, clearUser, setLoading, setError } from "../userSlice";
import axios from "axios";

// Signup action creator
export const signup = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(
      "http://localhost:7400/api/v1/auth/signup",
      userData,
      { withCredentials: true }
    );
    console.log(response.data);
    // Handle success scenario, such as displaying a success message to the user
  } catch (error) {
    dispatch(setError(error.response.data.message));
  }
};

// Login action creator
export const login = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(
      "http://localhost:7400/api/v1/auth/login",
      formData,
      { withCredentials: true }
    );
    if (response.status === 200) {
      const { accessToken, username, role } = response.data;

      // Extract user data from cookies
      // const accessToken = response.headers["set-cookie"]
      //   .find((cookie) => cookie.startsWith("accessToken"))
      //   .split(";")[0]
      //   .split("=")[1];

      localStorage.setItem("username", username);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("isAdmin", role === "admin" ? true : false);

      // Store user data in Redux state
      dispatch(
        setUser({
          accessToken,
          isAdmin: role === "admin",
          isAuthenticated: true,
        })
      );

      dispatch(setLoading(false));
      return { success: true };
    }
  } catch (error) {
    dispatch(setError(error.response.data.message));
    return { success: false };
  }
};

// Logout action creator
export const logout = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(
      "http://localhost:7400/api/v1/auth/logout",
      null,
      { withCredentials: true }
    );
    if (response.status === 200) {
      dispatch(clearUser());
      localStorage.removeItem("username");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isAdmin");
    }
    console.log(response.data);
    localStorage.clear();
    // Handle success scenario, such as clearing user data from local storage and redirecting
  } catch (error) {
    dispatch(setError(error.response.data.message));
  }
};

// Update password action creator
export const updatePassword = (passwordData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(
      "http://localhost:7400/api/v1/auth/update-password",
      passwordData
    );
    console.log(response.data);
    // Handle success scenario, such as displaying a success message to the user
  } catch (error) {
    dispatch(setError(error.response.data.message));
  }
};

// Fetch profile details action creator
export const fetchProfileDetails = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(
      `http://localhost:7400/api/v1/auth/profile/${userId}`
    );
    console.log(response.data);
    // Dispatch setUser action with the fetched profile data
    dispatch(setUser(response.data.profile));
  } catch (error) {
    dispatch(setError(error.response.data.message));
  }
};
