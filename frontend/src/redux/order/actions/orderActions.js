import { setOrders, setOrder, setLoading, setError } from "../orderSlice";
import axios from "axios";

// Fetch orders action creator
export const fetchOrders = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(
      "https://auth-project-tw37.onrender.com/api/v1/order/all-orders"
    );
    dispatch(setOrders(response.data.orders));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const fetchOrder = (orderId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(
      `https://auth-project-tw37.onrender.com/api/v1/order/${orderId}`,
      { withCredentials: true }
    );
    dispatch(setOrder(response.data.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(
      "https://auth-project-tw37.onrender.com/api/v1/order/create-order",
      orderData,
      {
        withCredentials: true,
      }
    );
    dispatch(fetchOrders());
    console.log("response", response);
    return { success: true, order: response.data.data };
  } catch (error) {
    dispatch(setError(error.message));
    return { success: false, error: error.message };
  }
};

// Update order action creator
export const updateOrder = (orderId, updatedData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.put(
      `https://auth-project-tw37.onrender.com/api/v1/order/${orderId}`,
      updatedData
    );
    dispatch(fetchOrders());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Delete order action creator
export const deleteOrder = (orderId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.delete(
      `https://auth-project-tw37.onrender.com/api/v1/order/${orderId}`
    );
    dispatch(fetchOrders());
  } catch (error) {
    dispatch(setError(error.message));
  }
};
