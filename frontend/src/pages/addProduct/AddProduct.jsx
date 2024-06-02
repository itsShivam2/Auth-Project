import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import ProductInput from "../../components/productInput/ProductInput";

function AddProduct() {
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    oldPrice: "",
    newPrice: "",
    productImage: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, productImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("oldPrice", formData.oldPrice);
      formDataToSend.append("newPrice", formData.newPrice);
      formDataToSend.append("productImage", formData.productImage);

      const response = await axios.post(
        "https://auth-project-tw37.onrender.com/api/v1/product/create-product",
        formDataToSend,
        { withCredentials: true }
      );

      console.log("Product added successfully:", response.data);
      // Optionally, redirect to a different page or show a success message
    } catch (error) {
      console.error("Error adding product:", error.response.data);
      setErrors(error.response.data.message);
    }
  };

  return (
    <div>
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-white py-8 px-3 shadow-2xl rounded-lg">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl text-center font-[Fahkwang] font-bold text-teal-600 px-2 py-2 underline underline-offset-4 mb-4">
                Trend Bazaar
              </h1>
              <h2 className="mt-1 py-2 text-center text-3xl font-extrabold text-gray-900">
                Add Product
              </h2>
            </div>

            {isAdmin ? (
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <ProductInput
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    error={errors.name}
                  />
                  <ProductInput
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Product Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    error={errors.description}
                  />
                  <ProductInput
                    id="category"
                    name="category"
                    type="text"
                    placeholder="Product Category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    error={errors.category}
                  />
                  <ProductInput
                    id="oldPrice"
                    name="oldPrice"
                    type="number"
                    placeholder="Old Price"
                    value={formData.oldPrice}
                    onChange={handleChange}
                    required
                    error={errors.oldPrice}
                  />
                  <ProductInput
                    id="newPrice"
                    name="newPrice"
                    type="number"
                    placeholder="New Price"
                    value={formData.newPrice}
                    onChange={handleChange}
                    required
                    error={errors.newPrice}
                  />
                  {/* Other product input fields */}
                  <ProductInput
                    id="productImage"
                    name="productImage"
                    type="file"
                    onChange={handleImageChange}
                    required
                    error={errors.productImage}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-center text-red-500">
                Only admins can add products.
              </p>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default AddProduct;
