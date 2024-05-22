import { setOrders, setLoading, setError } from "../orderSlice";
import axios from "axios";

// Fetch orders action creator
export const fetchOrders = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(
      "http://localhost:7400/api/v1/order/all-orders"
    );
    dispatch(setOrders(response.data.orders));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Create order action creator
// export const createOrder = (orderData, token) => async (dispatch) => {
//   try {
//     dispatch(setLoading(true));
//     const response = await axios.post(
//       "http://localhost:7400/api/v1/order/create-order",
//       { ...orderData, token },
//       {
//         withCredentials: true,
//       }
//     );
//     dispatch(fetchOrders());
//   } catch (error) {
//     dispatch(setError(error.message));
//   }
// };

export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(
      "http://localhost:7400/api/v1/order/create-order",
      orderData,
      {
        withCredentials: true,
      }
    );
    dispatch(fetchOrders());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Update order action creator
export const updateOrder = (orderId, updatedData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.put(
      `http://localhost:7400/api/v1/order/${orderId}`,
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
      `http://localhost:7400/api/v1/order/${orderId}`
    );
    dispatch(fetchOrders());
  } catch (error) {
    dispatch(setError(error.message));
  }
};
