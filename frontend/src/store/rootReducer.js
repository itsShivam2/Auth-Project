import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../redux/user/userSlice";
import cartReducer from "../redux/cart/cartSlice";
const rootReducer = combineReducers({
  auth: userReducer,
  cart: cartReducer,
});

export default rootReducer;
