import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import {
  AddToCartButton,
  ProductDetails,
  ProductImage,
  QuantitySelector,
} from "./components/Index";
import { addProductToCart } from "../../redux/cart/actions/cartActions";
import { useDispatch } from "react-redux";

function ProductItemPage({ match }) {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
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
    console.log("Adding product to cart:", product);
  };

  return (
    <div>
      <Layout>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 px-4 py-4 max-w-screen-xl">
          {product && <ProductImage imageUrl={product.productImage} />}
          <div className="w-full flex flex-col justify-start items-start px-5 pt-0 pb-10 lg:py-10 mx-auto gap-2">
            {product && <ProductDetails product={product} />}
            <div className="min-w-full flex flex-col sm:flex-row justify-between gap-2 my-4">
              <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
                onDecrease={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                onIncrease={() => setQuantity((prev) => prev + 1)}
              />
              {product && <AddToCartButton onClick={addToCart} />}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default ProductItemPage;
