import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../redux/user/userSlice";
import cartReducer from "../redux/cart/cartSlice";
import orderReducer from "../redux/order/orderSlice";
import productReducer from "../redux/product/productSlice";
const rootReducer = combineReducers({
  auth: userReducer,
  cart: cartReducer,
  order: orderReducer,
  products: productReducer,
});

export default rootReducer;
