import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://auth-project-tw37.onrender.com/api/v1/product/${productId}`,
          {
            withCredentials: true,
          }
        );
        setProduct(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching product details"
        );
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">Product Details</h2>
      <p>
        <strong>Name:</strong> {product.name}
      </p>
      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Old Price:</strong> ${product.oldPrice}
      </p>
      <p>
        <strong>New Price:</strong> ${product.newPrice}
      </p>
      <p>
        <strong>Image:</strong>{" "}
        <img
          src={product.productImage}
          alt={product.name}
          className="w-[200px]"
        />
      </p>
      <div className="w-full flex justify-center">
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold mt-4 py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
