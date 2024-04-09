import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import axios from "axios";
import { setUser } from "./redux/user/userSlice";
const App = () => {
  const state = useSelector((state) => state.auth);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(setUser({ accessToken, isAuthenticated: true }));
    }
    const adminStatus = localStorage.getItem("isAdmin");
    if (adminStatus) {
      dispatch(setUser({ accessToken, isAuthenticated: true, isAdmin: true }));
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post(
          "http://localhost:7400/api/v1/auth/refresh-token",
          {},
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          const userData = response.data;
          dispatch(
            setUser({
              ...state,
              accessToken: userData.accessToken,
            })
          );
        } else {
          localStorage.clear();
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        localStorage.clear();
      }
    };

    checkAuth();

    // Refresh access token periodically before it expires
    const accessTokenRefreshInterval = setInterval(checkAuth, 15 * 60 * 1000); // Refresh every 15 minutes
    return () => clearInterval(accessTokenRefreshInterval); // Clean up interval on component unmount
  }, [dispatch, state.accessToken, state.isAdmin]);

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
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />

        {/*  */}
        {/* <Route element={<PersistLogin />}> */}
        {/* <Route path="/profile" element={<User />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route
          path="/products/:id/update-product"
          element={<UpdateProduct />}
        /> */}
        {/* </Route> */}
        {/*  */}

        {isAuthenticated && (
          <>
            <Route path="/profile" element={<User />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/checkout" element={<Checkout />} />
          </>
        )}

        {isAdmin && (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route
              path="/products/:id/update-product"
              element={<UpdateProduct />}
            />
            <Route path="/signup" element={<Home />} />
            <Route path="/login" element={<Home />} />
          </>
        )}

        {!isAuthenticated && (
          <Route path="/profile" element={<Navigate to="/login" replace />} />
        )}

        {isAuthenticated && !isAdmin && (
          <Route path="/admin/*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
