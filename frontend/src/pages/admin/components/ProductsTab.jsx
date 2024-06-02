import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDetails from './ProductDetails';
import Loader from "../../../components/loader/Loader";
const ProductsTab = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://auth-project-tw37.onrender.com/api/v1/product/all-products', {
          withCredentials: true,
        });
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center my-8"><Loader/></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">Products</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">${product.newPrice}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-indigo-600 hover:text-indigo-900" onClick={() => handleViewProduct(product._id)}>View</button>
                <button className="text-red-600 hover:text-red-900 ml-4" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProductId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="w-1/5 bg-white p-6 rounded-lg shadow-lg">
            <ProductDetails productId={selectedProductId} onClose={() => setSelectedProductId(null)} />
          </div>
        </div>
      )}
    </div>
  );

  function handleViewProduct(productId) {
    setSelectedProductId(productId);
  }

  async function handleDeleteProduct(productId) {
    try {
      await axios.delete(`https://auth-project-tw37.onrender.com/api/v1/products/${productId}`, {
        withCredentials: true,
      });
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      setError(error.response?.data?.message || 'Error deleting product');
    }
  }
};

export default ProductsTab;
