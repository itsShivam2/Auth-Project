import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  // Add other reducers here if needed
});

export default rootReducer;
