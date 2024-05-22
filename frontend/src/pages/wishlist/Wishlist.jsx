import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7400/api/v1/user/wishlist",
          { withCredentials: true }
        );
        if (response.status === 200) {
          setWishlist(response.data.data);
        }
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching wishlist");
      }
    };

    fetchWishlist();
  }, []);

  return (
    <Layout>
      <div className="w-full p-6">
        {error && <p className="text-red-500">{error}</p>}
        <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-[#111827] p-4 rounded-lg shadow-md text-gray-100"
            >
              <Link to={`/products/${item._id}`}>
                <img
                  src={item.productImage}
                  alt={item.name}
                  className="h-40 w-full object-cover mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-400">${item.newPrice}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Wishlist;
