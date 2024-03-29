import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import User from "./pages/user/User";
import Admin from "./pages/admin/Admin";
import Products from "./pages/products/Products";
import ProductDetails from "./pages/productDetails/ProductDetails";
import AddProduct from "./pages/addProduct/AddProduct";
import UpdateProfile from "./pages/updateProfile/UpdateProfile";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import NotFound from "./pages/notFound/NotFound";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7400/api/v1/auth/current-user",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setIsAuthenticated(true);
        await checkAdminStatus();
      }
    } catch (error) {
      setIsAuthenticated(false);
      setIsAdmin(false);
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  };

  const checkAdminStatus = async () => {
    try {
      const username = localStorage.getItem("username");

      const response = await axios.post(
        "http://localhost:7400/api/v1/auth/is-admin",
        { username },
        { withCredentials: true }
      );

      setIsAdmin(response.data.isAdmin);
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // If authentication checks are not complete, return null to prevent rendering
  if (!authChecked) {
    return null;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />

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
