import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../redux/user/userSlice";
import cartReducer from "../redux/cart/cartSlice";
import productReducer from "../redux/product/productSlice";
const rootReducer = combineReducers({
  auth: userReducer,
  cart: cartReducer,
  products: productReducer,
});

export default rootReducer;
