import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Spinner from "../../components/spinner/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductInput from "../../components/productInput/ProductInput";
import { createProduct } from "../../redux/product/actions/productActions";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    oldPrice: "",
    newPrice: "",
    productImage: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "productImage") {
      setFormData({ ...formData, productImage: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("category", formData.category);
      productData.append("oldPrice", formData.oldPrice);
      productData.append("newPrice", formData.newPrice);
      productData.append("productImage", formData.productImage);

      await dispatch(createProduct(productData));
      toast.success("Product added successfully");
      setTimeout(() => {
        navigate("/admin");
      }, 3000);
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
      console.error("Add product error:", error);
    }
  };

  return (
    <Layout>
      <div className="bg-white">
        <div className="flex justify-center min-h-screen py-8">
          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-center mx-auto">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Add Product
                  </h2>
                </div>
                <p className="mt-3 text-gray-900">
                  Fill in the details to add a new product
                </p>
              </div>

              <div className="mt-8">
                {error && <div className="text-red-600">{error}</div>}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div className="rounded-md shadow-sm space-y-4">
                    <ProductInput
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Product Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      error={error && "Name is required"}
                    />
                    <ProductInput
                      id="description"
                      name="description"
                      type="text"
                      placeholder="Product Description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      error={error && "Description is required"}
                    />
                    <ProductInput
                      id="category"
                      name="category"
                      type="text"
                      placeholder="Product Category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      error={error && "Category is required"}
                    />
                    <ProductInput
                      id="oldPrice"
                      name="oldPrice"
                      type="number"
                      placeholder="Old Price"
                      value={formData.oldPrice}
                      onChange={handleChange}
                      required
                      error={error && "Old Price is required"}
                    />
                    <ProductInput
                      id="newPrice"
                      name="newPrice"
                      type="number"
                      placeholder="New Price"
                      value={formData.newPrice}
                      onChange={handleChange}
                      required
                      error={error && "New Price is required"}
                    />
                    <ProductInput
                      id="productImage"
                      name="productImage"
                      type="file"
                      onChange={handleChange}
                      required
                      error={error && "Product Image is required"}
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-10 px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 flex justify-center items-center"
                    >
                      {loading ? <Spinner className="h-full" /> : "Add Product"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
