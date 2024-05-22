import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import ProductDetails from "./components/ProductDetails";
import { addProductToCart } from "../../redux/cart/actions/cartActions";
import { useDispatch } from "react-redux";
import { FaArrowRight } from "react-icons/fa";

function ProductItemPage({ match }) {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [wishlistMessage, setWishlistMessage] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7400/api/v1/product/${id}`,
          { withCredentials: true }
        );
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    dispatch(addProductToCart({ product, quantity }));
  };

  return (
    <div>
      <Layout>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 px-4 py-4 max-w-screen-xl">
          {product && (
            <div className="w-full lg:w-2/5 flex items-center justify-center px-5 py-2 mx-auto">
              <img
                className="w-full h-full object-cover object-center rounded"
                src={product.productImage}
                alt="Product"
              />
            </div>
          )}
          <div className="w-full flex flex-col justify-start items-start px-5 pt-0 pb-10 lg:py-10 mx-auto gap-2">
            {product && <ProductDetails product={product} />}
            <div className="min-w-full flex flex-col sm:flex-row justify-between gap-2 my-4">
              <div className="w-full lg:w-3/5 flex items-center justify-between gap-3 border p-3">
                <p className="text-base font-semibold font-[Montserrat]">
                  Quantity
                </p>
                <div className="flex items-center justify-center gap-4 text-sm font-semibold">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                    className="border h-6 text-lg font-semibold font-[Montserrat] flex items-center justify-center px-3 py-1 hover:bg-gray-600 transform-transition duration-1000 hover:text-white"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold font-[Montserrat]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="border h-6 text-lg font-semibold font-[Montserrat] flex items-center justify-center px-2 py-1 hover:bg-gray-600 transform-transition duration-1000 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>
              {product && (
                <div className="w-full lg:w-2/5 flex justify-center">
                  <button
                    onClick={addToCart}
                    className="w-full h-full flex items-center justify-center text-lg font-[Fahkwang] gap-1 px-4 py-4 rounded-sm text-white bg-gray-700 hover:bg-sky-950 transform-transition duration-1000 hover:drop-shadow-lg"
                  >
                    Add to cart <FaArrowRight />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default ProductItemPage;
