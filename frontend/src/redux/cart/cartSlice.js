import { createSlice } from "@reduxjs/toolkit";
import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../../utility/localStorageUtil";

const persistedCart = loadCartFromLocalStorage();

const initialState = persistedCart || {
  products: [],
  quantity: 0,
  total: 0,
  loading: false,
  error: null,
};

const saveCartState = (state) => {
  saveCartToLocalStorage(state);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    actionSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    actionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCart: (state, action) => {
      state.products = action.payload.items;
      state.quantity = action.payload.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      state.total = action.payload.totalAmount;
      saveCartState(state);
    },
    addProductToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.products.findIndex(
        (item) => item.product._id === product._id
      );

      if (existingItemIndex !== -1) {
        state.products[existingItemIndex].quantity += quantity;
      } else {
        state.products.push({ product, quantity });
      }

      state.quantity += quantity;
      state.total += product.newPrice * quantity;
      saveCartState(state);
    },
    updateItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.products.find(
        (item) => item.product._id === productId
      );
      if (item) {
        const difference = quantity - item.quantity;
        state.total += difference * item.product.newPrice;
        item.quantity = quantity;
        state.quantity += difference;
        saveCartState(state);
      }
    },
    removeItem: (state, action) => {
      const { productId } = action.payload;
      const index = state.products.findIndex(
        (item) => item.product._id === productId
      );
      if (index !== -1) {
        state.total -=
          state.products[index].price * state.products[index].quantity;
        state.quantity -= state.products[index].quantity;
        state.products.splice(index, 1);
        saveCartState(state);
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      saveCartToLocalStorage(state);
      saveCartState(state);
    },
  },
});

export const {
  startLoading,
  actionSuccess,
  actionFailure,
  fetchCart,
  addProductToCart,
  updateItemQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
