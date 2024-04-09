// orderActions.js
import { setOrders, setLoading, setError } from "../orderSlice";
import axios from "axios";

// Fetch orders action creator
export const fetchOrders = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(
      "http://localhost:7400/api/order/all-orders"
    );
    dispatch(setOrders(response.data.orders));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Create order action creator
export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(
      "http://localhost:7400/api/orders/create-order",
      orderData
    );
    dispatch(fetchOrders()); // Fetch orders again after creating a new one
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Update order action creator
export const updateOrder = (orderId, updatedData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.put(
      `http://localhost:7400/api/order/${orderId}`,
      updatedData
    );
    dispatch(fetchOrders()); // Fetch orders again after updating
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Delete order action creator
export const deleteOrder = (orderId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.delete(
      `http://localhost:7400/api/order/${orderId}`
    );
    dispatch(fetchOrders()); // Fetch orders again after deleting
  } catch (error) {
    dispatch(setError(error.message));
  }
};
