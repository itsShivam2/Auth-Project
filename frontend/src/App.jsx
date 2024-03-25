// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/home/Home";
// import About from "./pages/about/About";
// import Contact from "./pages/contact/Contact";
// import Signup from "./pages/signup/Signup";
// import Login from "./pages/login/Login";
// import User from "./pages/user/User";
// import Admin from "./pages/admin/Admin";
// import Products from "./pages/products/Products";
// import ProductDetails from "./pages/productDetails/ProductDetails";
// import AddProduct from "./pages/addProduct/AddProduct";
// import UpdateProfile from "./pages/updateProfile/UpdateProfile";
// import Cart from "./pages/cart/Cart";
// import Checkout from "./pages/checkout/Checkout";
// import NotFound from "./pages/notFound/NotFound";
// import ProtectedRoute from "./components/ProtectedRoute";

// const App = () => {
//   const isAuthenticated = true; // Example: Replace with actual authentication state
//   const isAdmin = true; // Example: Replace with actual admin state

//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/contact" element={<Contact />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/login" element={<Login />} />
//       <ProtectedRoute
//         path="/profile"
//         element={User}
//         isAuthenticated={isAuthenticated}
//       />
//       <ProtectedRoute
//         path="/admin"
//         element={Admin}
//         isAuthenticated={isAuthenticated}
//       />
//       <ProtectedRoute
//         path="/update-profile"
//         element={UpdateProfile}
//         isAuthenticated={isAuthenticated}
//       />
//       <Route path="/products" element={<Products />} />
//       <Route path="/products/:id" element={<ProductDetails />} />
//       <Route path="/cart" element={<Cart />} />
//       <Route path="/checkout" element={<Checkout />} />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default App;
 

// 
// 
import React from "react";
import { Routes, Route } from "react-router-dom";
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
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<User />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/update-profile" element={<UpdateProfile />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
