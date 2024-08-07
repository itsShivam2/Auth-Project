import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/product/actions/productActions";
import { scrollToTop } from "../../../utility/scrollToTop";

function FeaturedProducts() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const featuredProducts = products.slice(0, 6);

  return (
    <div className="bg-white mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mb-8">
      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {featuredProducts.map((product) => (
          <div key={product._id} className="group">
            <Link to={`/products/${product._id}`} onClick={scrollToTop}>
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none hover:opacity-75 lg:h-80 sm:h-80">
                <img
                  src={product.productImage}
                  alt={product.name}
                  className="min-h-44 sm:min-h-max h-44 sm:h-full w-full object-cover object-center rounded-md lg:h-full lg:w-full hover:scale-110 duration-500"
                />
              </div>
              <div className="lg:min-h-12 mt-4 flex flex-col sm:flex-row justify-between">
                <h3 className="min-h-8 sm:min-h-min font-[Montserrat] text-sm text-gray-900">
                  {product.name}
                </h3>
                <div className="flex gap-2 justify-between">
                  <p className="font-[Montserrat] text-sm font-medium text-gray-900 line-through">
                    ₹{product.oldPrice}
                  </p>
                  <p className="font-[Montserrat] text-sm font-medium text-gray-900">
                    ₹{product.newPrice}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-center w-full">
                <button
                  type="button"
                  className="flex items-center justify-center w-full py-3 font-[Fahkwang] text-white font-medium text-sm rounded-lg cursor-pointer bg-gray-700 hover:bg-sky-950 transform-transition duration-1000 focus:outline-none hover:drop-shadow-lg"
                >
                  Shop Now
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
