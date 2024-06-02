import React, { useState, useEffect } from "react";
import { MdOutlineStar, MdFavoriteBorder, MdFavorite } from "react-icons/md";
import axios from "axios";
function ProductDetails({ product }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistMessage, setWishlistMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const response = await axios.get(
          `https://auth-project-tw37.onrender.com/api/v1/user/wishlist`,
          { withCredentials: true }
        );
        const wishlist = response.data.data;
        setIsInWishlist(wishlist.some((item) => item._id === product._id));
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };

    checkWishlist();
  }, [product._id]);

  const addToWishlist = async () => {
    try {
      const response = await axios.post(
        `https://auth-project-tw37.onrender.com/api/v1/user/wishlist/${product._id}`,
        {},
        { withCredentials: true }
      );
      setWishlistMessage(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || "Error adding to wishlist");
    }
  };

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  const handleWishlistClick = () => {
    addToWishlist();
    setIsInWishlist((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col justify-start items-start px-5 pt-0 pb-10 lg:py-10 mx-auto gap-2">
      <div className="min-w-full flex flex-wrap justify-between items-center sm:flex-col sm:justify-start sm:items-start sm:gap-0">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-4xl font-semibold font-[Fahkwang]">
            {product.name}
          </h2>

          <div onClick={handleWishlistClick}>
            {/* Wishlist icon */}
            {isInWishlist ? (
              <MdFavorite className="text-red-500 text-4xl cursor-pointer" />
            ) : (
              <MdFavoriteBorder className="text-[firebrick] text-4xl cursor-pointer" />
            )}
          </div>
        </div>
        <div className="flex items-center justify-start my-4">
          <MdOutlineStar />
          <MdOutlineStar />
          <MdOutlineStar />
          <MdOutlineStar />
          <MdOutlineStar />
        </div>
      </div>
      <p className="text-l sm:text-xl font-semibold text-gray-600 font-[Montserrat]">
        {product.category}
      </p>
      <p className="text-black text-justify leading-relaxed border-b-2 mb-3 pb-5 text-[1rem] font-[Montserrat]">
        {product.description}
      </p>
      <div className="flex items-center gap-6 mt-3">
        <p className="line-through text-2xl font-bold text-gray-600 font-[Montserrat]">
          ₹{product.oldPrice}
        </p>
        <p className="text-2xl font-bold font-[Montserrat]">
          ₹{product.newPrice}
        </p>
      </div>
    </div>
  );
}

export default ProductDetails;
