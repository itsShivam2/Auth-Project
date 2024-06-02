import {
  startLoading,
  actionSuccess,
  actionFailure,
  fetchCart,
  addProductToCart as addProductToCartAction,
  updateItemQuantity as updateItemQuantityAction,
  removeItem as removeItemAction,
  clearCart as clearCartAction,
} from "../cartSlice";
import axios from "axios";

export const fetchCartFromDB = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await axios.get(
      "https://auth-project-tw37.onrender.com/api/v1/cart",
      {
        withCredentials: true,
      }
    );
    dispatch(fetchCart(response.data.data));
    dispatch(actionSuccess());
  } catch (error) {
    dispatch(actionFailure(error.message));
    console.error("Error fetching cart:", error);
  }
};

export const addProductToCart = (productData) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const response = await axios.post(
      `https://auth-project-tw37.onrender.com/api/v1/cart/add`,
      { product: productData.product._id, quantity: productData.quantity },
      { withCredentials: true }
    );

    dispatch(addProductToCartAction(productData));
    dispatch(actionSuccess());
  } catch (error) {
    dispatch(actionFailure(error.message));
    console.error("Error adding product to cart:", error);
  }
};

export const clearCart = () => async (dispatch) => {
  try {
    dispatch(startLoading());

    const response = await axios.delete(
      `https://auth-project-tw37.onrender.com/api/v1/cart/clear-cart`,
      { withCredentials: true }
    );

    dispatch(clearCartAction());
    dispatch(actionSuccess());
  } catch (error) {
    dispatch(actionFailure(error.message));
    console.error("Error clearing cart:", error);
  }
};

export const updateItemQuantity = (productId, quantity) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const response = await axios.put(
      `https://auth-project-tw37.onrender.com/api/v1/cart/${productId}`,
      { quantity },
      { withCredentials: true }
    );
    dispatch(updateItemQuantityAction({ productId, quantity }));
    dispatch(actionSuccess());
  } catch (error) {
    dispatch(actionFailure(error.message));
    console.error("Error updating item quantity:", error);
  }
};

export const removeItem = (productId) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const response = await axios.delete(
      `https://auth-project-tw37.onrender.com/api/v1/cart/${productId}`,
      { withCredentials: true }
    );

    dispatch(removeItemAction({ productId }));
    dispatch(actionSuccess());
  } catch (error) {
    dispatch(actionFailure(error.message));
    console.error("Error removing item from cart:", error);
  }
};
