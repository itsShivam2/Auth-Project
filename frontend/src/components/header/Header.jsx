// import React, { useState, useEffect } from "react";

// const Header = () => {
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Example: Replace with actual login state
//   const [isAdmin, setIsAdmin] = useState(false); // Example: Replace with actual admin state

//   useEffect(() => {
//     const checkLoginStatus = () => {
//       // Check if access token is present in localStorage
//       const accessToken = localStorage.getItem("accessToken");
//       if (accessToken) {
//         setIsLoggedIn(true);
//         // You might need to decode the token to get user details and isAdmin status
//         // Example:
//         // const decodedToken = jwt_decode(accessToken);
//         // setIsAdmin(decodedToken.isAdmin);
//       } else {
//         setIsLoggedIn(false);
//         setIsAdmin(false);
//       }
//     };

//     checkLoginStatus();
//   }, []);

//   const handleToggleUserMenu = () => {
//     setIsUserMenuOpen(!isUserMenuOpen);
//   };

//   const handleLogout = () => {
//     // Clear tokens from localStorage
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     setIsLoggedIn(false);
//     setIsAdmin(false);
//   };

//   const handleGoToProfile = () => {
//     // Redirect to user profile
//   };

//   const handleGoToAdminPanel = () => {
//     // Redirect to admin panel if user is admin
//     if (isAdmin) {
//       // Redirect logic
//     } else {
//       alert("Unauthorized Access");
//     }
//   };

//   return (
//     <header className="bg-gray-800 text-white">
//       <div className="container mx-auto py-4 flex items-center justify-between">
//         <div>
//           <a href="/" className="text-xl font-bold">
//             YourLogo
//           </a>
//         </div>
//         <nav className="space-x-4">
//           <a href="/about" className="hover:text-gray-300">
//             About
//           </a>
//           <a href="/contact" className="hover:text-gray-300">
//             Contact
//           </a>
//           <div className="relative inline-block text-left">
//             <div>
//               <button
//                 type="button"
//                 className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
//                 onClick={handleToggleUserMenu}
//               >
//                 <svg
//                   className="h-6 w-6 text-white"
//                   fill="none"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   {isLoggedIn ? (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M4 6h16M4 12h16M4 18h16"
//                     />
//                   ) : (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   )}
//                 </svg>
//               </button>
//             </div>
//             {isUserMenuOpen && (
//               <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//                 <div
//                   className="py-1"
//                   role="menu"
//                   aria-orientation="vertical"
//                   aria-labelledby="user-menu"
//                 >
//                   {isLoggedIn ? (
//                     <>
//                       <button
//                         className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         role="menuitem"
//                         onClick={handleGoToProfile}
//                       >
//                         Profile
//                       </button>
//                       {isAdmin && (
//                         <button
//                           className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           role="menuitem"
//                           onClick={handleGoToAdminPanel}
//                         >
//                           Admin Panel
//                         </button>
//                       )}
//                       <button
//                         className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         role="menuitem"
//                         onClick={handleLogout}
//                       >
//                         Logout
//                       </button>
//                     </>
//                   ) : (
//                     <button
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       role="menuitem"
//                       // onClick={handleLogin}
//                     >
//                       Login
//                     </button>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

//
//
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
  // Function to check authentication status based on access token
  const isAuthenticated = () => {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    return cookies.some((cookie) => cookie.startsWith("accessToken="));
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <div className="mr-4 flex items-center">
          <FaShoppingCart className="h-6 mr-2" />
          <span className="text-lg font-semibold">Trend Bazaar</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-gray-300">
            Products
          </a>
          <a href="#" className="hover:text-gray-300">
            About
          </a>
          <a href="#" className="hover:text-gray-300">
            Contact
          </a>
        </nav>
      </div>
      <div className="flex items-center">
        <div className="mr-4">
          <FaShoppingCart className="h-6" />
        </div>
        <div>
          {/* If authenticated, show user profile and logout */}
          {isAuthenticated() ? (
            <div className="relative">
              <button className="focus:outline-none">
                <FaUser className="h-6" />
              </button>
              {/* User profile submenu */}
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Profile
                </Link>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Wishlist
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </a>
              </div>
            </div>
          ) : (
            // If not authenticated, show login
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

//
//
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Header = () => {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);

//   //
//   // useEffect(() => {
//   //   const checkAuthStatus = async () => {
//   //     try {
//   //       const response = await axios.get('http://localhost:7400/api/v1/auth/current-user');
//   //       if (response.status === 200) {
//   //         setLoggedIn(true);
//   //       }
//   //     } catch (error) {
//   //       console.error('Authentication check failed:', error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   checkAuthStatus();
//   // }, []);

//   //

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         const accessToken = document.cookie
//           .split("; ")
//           .find((row) => row.startsWith("accessToken="))
//           ?.split("=")[1];

//         const config = accessToken
//           ? { headers: { Authorization: `Bearer ${accessToken}` } }
//           : {};

//         const response = await axios.get(
//           "http://localhost:7400/api/v1/auth/current-user",
//           config
//         );

//         if (response.status === 200) {
//           setLoggedIn(true);
//         }
//       } catch (error) {
//         console.error("Authentication check failed:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuthStatus();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.post("http://localhost:7400/api/v1/auth/logout");
//       setLoggedIn(false);
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <header className="bg-gray-800 text-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center">
//           <Link to="/" className="text-xl font-bold mr-4">
//             Trend Bazaar
//           </Link>
//           <nav>
//             <ul className="flex space-x-4">
//               <li>
//                 <Link to="/products">Products</Link>
//               </li>
//               <li>
//                 <Link to="/about">About</Link>
//               </li>
//               <li>
//                 <Link to="/contact">Contact</Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//         <div className="flex items-center">
//           <Link to="/cart" className="mr-4">
//             {" "}
//             {/* Cart Icon */}{" "}
//           </Link>
//           {loading ? (
//             <p>Loading...</p>
//           ) : loggedIn ? (
//             <div className="relative">
//               <button className="mr-4"> {/* User Profile Icon */} </button>
//               <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
//                 <li>
//                   <Link
//                     to="/profile"
//                     className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
//                   >
//                     Profile
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/wishlist"
//                     className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
//                   >
//                     Wishlist
//                   </Link>
//                 </li>
//                 <li>
//                   <button
//                     onClick={handleLogout}
//                     className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           ) : (
//             <Link to="/login" className="mr-4">
//               Login
//             </Link>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
