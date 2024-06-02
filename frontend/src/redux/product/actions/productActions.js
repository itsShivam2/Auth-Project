import {
  setProducts,
  setProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  setLoading,
  setError,
} from "../productSlice";
import axios from "axios";

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(
      "https://auth-project-tw37.onrender.com/api/v1/product/all-products"
    );
    dispatch(setProducts(response.data.data));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Failed to fetch products")
    );
  }
};

export const fetchProduct = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(
      `https://auth-project-tw37.onrender.com/api/v1/product/${id}`
    );
    dispatch(setProduct(response.data.data));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Failed to fetch product")
    );
  }
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(
      "https://auth-project-tw37.onrender.com/api/v1/product/create-product",
      productData
    );
    dispatch(addProduct(response.data));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Failed to create product")
    );
  }
};

export const updateProductDetails = (id, updatedData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.put(
      `https://auth-project-tw37.onrender.com/api/v1/product/${id}`,
      updatedData
    );
    dispatch(updateProduct(response.data));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Failed to update product")
    );
  }
};

export const removeProduct = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios.delete(`https://auth-project-tw37.onrender.com/api/v1/product/${id}`);
    dispatch(deleteProduct(id));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Failed to delete product")
    );
  }
};
