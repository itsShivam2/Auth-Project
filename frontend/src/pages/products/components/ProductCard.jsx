import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as IconsAndImages from "../../../Assets/IconsAndImages";
import { addProduct } from "../../../redux/cart/cartSlice";

const ProductCard = ({ product, scrollToTop }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addProduct({ ...product, quantity: 1 })).then(() => {
      setIsAddingToCart(false);
    });
  };

  return (
    <div key={product._id} className="group shadow-2xl rounded-md">
      <Link to={`/products/${product._id}`} onClick={scrollToTop}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden lg:aspect-none hover:opacity-75 lg:h-80 sm:h-80 px-4 pt-4">
          <img
            src={product.productImage}
            alt={product.name}
            className="h-full w-full object-cover object-center rounded-md lg:h-full lg:w-full  hover:scale-110 duration-500"
          />
        </div>
        <div className="mt-4 flex flex-col sm:flex-row justify-between px-4">
          <h3 className="font-[Montserrat] text-sm text-gray-900">
            {product.name}
          </h3>
          <div className="flex flex-row gap-2 justify-between">
            <p className="font-[Montserrat] text-sm font-medium text-gray-900 line-through">
              ₹{product.oldPrice}
            </p>
            <p className="font-[Montserrat] text-sm font-medium text-gray-900">
              ₹{product.newPrice}
            </p>
          </div>
        </div>
        ~
      </Link>
      <div className="mt-4 flex justify-center w-full px-4 pb-4">
        <button
          type="button"
          onClick={addToCart}
          className="flex items-center justify-center w-5/6 py-3 font-[Fahkwang] text-white font-medium text-sm rounded-lg cursor-pointer bg-gray-700 hover:bg-sky-950 transform-transition duration-900 hover:w-full transform-transition duration-1000 focus:outline-none hover:drop-shadow-lg "
        >
          Add To Cart"
          <IconsAndImages.BsArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
