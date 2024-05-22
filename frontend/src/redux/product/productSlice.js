import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
      state.loading = false;
      state.error = null;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
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
  },
});

export const {
  setProducts,
  setProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  setLoading,
  setError,
} = productSlice.actions;

export default productSlice.reducer;
