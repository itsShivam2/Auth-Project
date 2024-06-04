import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/user/userSlice";
import { refreshToken } from "./redux/user/actions/userActions";
import { loadAuthState } from "./utility/authUtils";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import User from "./pages/user/User";
import Admin from "./pages/admin/Admin";
import Products from "./pages/products/Products";
import ProductItemPage from "./pages/productDetails/ProductItemPage";
import AddProduct from "./pages/addProduct/AddProduct";
import UpdateProduct from "./pages/updateProduct/UpdateProduct";
import UpdateProfile from "./pages/updateProfile/UpdateProfile";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import NotFound from "./pages/notFound/NotFound";
import PaymentSuccess from "./pages/paymentSuccess/PaymentSuccess";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import WishList from "./pages/wishlist/Wishlist";

const App = () => {
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const authState = loadAuthState();
    if (authState) {
      dispatch(setUser(authState));
      dispatch(refreshToken());
    }

    const interval = setInterval(() => {
      dispatch(refreshToken());
    }, 59 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductItemPage />} />

        {isAuthenticated && (
          <>
            <Route path="/profile" element={<User />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/checkout" element={<Checkout />} />
          </>
        )}

        {isAuthenticated && isAdmin && (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route
              path="/products/:id/update-product"
              element={<UpdateProduct />}
            />
          </>
        )}

        {!isAuthenticated && (
          <>
            <Route path="/profile" element={<Navigate to="/login" replace />} />
            <Route path="/cart" element={<Navigate to="/login" replace />} />
          </>
        )}

        {isAuthenticated && !isAdmin && (
          <Route path="/admin" element={<Navigate to="/" replace />} />
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
