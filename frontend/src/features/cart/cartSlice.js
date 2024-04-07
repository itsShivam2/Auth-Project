// cartSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartSuccess(state, action) {
      state.items = action.payload.items;
      state.loading = false;
      state.error = null;
    },
    addToCartStart(state) {
      state.loading = true;
      state.error = null;
    },
    addToCartFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    clearCartSuccess(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
    clearCartStart(state) {
      state.loading = true;
      state.error = null;
    },
    clearCartFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  addToCartSuccess,
  addToCartStart,
  addToCartFailure,
  clearCartSuccess,
  clearCartStart,
  clearCartFailure,
} = cartSlice.actions;

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

export default cartSlice.reducer;
