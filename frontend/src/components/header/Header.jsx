import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/user/actions/userActions";
import { FaBars, FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
  const [open, setOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="w-full bg-gray-800 text-white py-4 shadow-2xl">
      <div className="min-w-full container flex justify-between items-center px-4">
        <div className="flex items-baseline">
          <Link to="/" className="text-3xl font-bold mr-4 font-[Fahkwang]">
            Trend Bazaar
          </Link>
          <nav>
            <ul className="flex space-x-4 text-lg">
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
        <div className="flex items-center justify-between gap-4">
          <Link to="/cart" className="mr-4 text-lg">
            <FaShoppingCart />
          </Link>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="relative">
                <button onClick={() => setOpen(!open)} className="mr-4">
                  <FaUser />
                </button>
                {open && (
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
                )}
              </div>
            ) : (
              <Link to="/login" className="mr-4">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
