import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logoutSuccess } from "../../features/auth/authSlice";
import {FaBars} from "react-icons/fa"

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:7400/api/v1/auth/logout",
        null,
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(logoutSuccess());
        localStorage.removeItem("username");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isAdmin");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold mr-4">
            Trend Bazaar
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center">
          {isAuthenticated ? (
            <div className="relative">
              <button className="mr-4"> {/* User Profile Icon */} </button>
              <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Profile
                  </Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Admin
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/wishlist"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="mr-4">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;




// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Header = () => {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:7400/api/v1/auth/current-user",
//           { withCredentials: true }
//         );

//         if (response.status === 200) {
//           setLoggedIn(true);
//           await checkAdminStatus(); // Check admin status after authentication
//         }
//       } catch (error) {
//         console.error("Authentication check failed:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuthStatus();
//   }, []);

  // const checkAdminStatus = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:7400/api/v1/auth/is-admin",
  //       { withCredentials: true }
  //     );
  //     setIsAdmin(response.data.isAdmin);
  //   } catch (error) {
  //     console.error("Error checking admin status:", error);
  //   }
  // };

//   const checkAdminStatus = async () => {
//     try {
//       // Get username from localStorage
//       const username = localStorage.getItem("username");
  
//       // Send username to backend to check admin status
//       const response = await axios.post(
//         "http://localhost:7400/api/v1/auth/is-admin",
//         { username },
//         { withCredentials: true }
//       );
  
//       setIsAdmin(response.data.isAdmin);
//     } catch (error) {
//       console.error("Error checking admin status:", error);
//     }
//   };
  

//   const handleLogout = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:7400/api/v1/auth/logout",
//         null,
//         { withCredentials: true }
//       );
//       if (response.status === 200) {
//         setLoggedIn(false);
//         localStorage.removeItem("username");
//       }
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
//                 {isAdmin && (
//                   <li>
//                     <Link
//                       to="/admin"
//                       className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
//                     >
//                       Admin
//                     </Link>
//                   </li>
//                 )}
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