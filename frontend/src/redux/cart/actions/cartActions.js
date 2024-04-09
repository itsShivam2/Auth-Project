import { setUser, clearUser, setLoading, setError } from "../cartSlice";
import axios from "axios";

export const addToCart = (product) => async (dispatch, getState) => {
    dispatch(addToCartStart());
    try {
      const { auth } = getState();
      const { isAuthenticated } = auth;
      let data;
      if (isAuthenticated) {
        const response = await axios.post(
          "/api/cart/add",
          { product },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        data = response.data;
      } else {
        // If not authenticated, store item in local storage
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.push(product);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        data = { cart: { items: cartItems } };
      }
      dispatch(addToCartSuccess(data));
    } catch (error) {
      dispatch(addToCartFailure({ error: error.message }));
    }
  };
  
  export const clearCart = () => async (dispatch, getState) => {
    dispatch(clearCartStart());
    try {
      const { auth } = getState();
      const { isAuthenticated } = auth;
      if (isAuthenticated) {
        await axios.delete("/api/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
      } else {
        localStorage.removeItem("cartItems");
      }
      dispatch(clearCartSuccess());
    } catch (error) {
      dispatch(clearCartFailure({ error: error.message }));
    }
  };