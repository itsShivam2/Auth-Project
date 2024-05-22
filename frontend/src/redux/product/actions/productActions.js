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
    const response = await axios.get("http://localhost:7400/api/v1/products");
    dispatch(setProducts(response.data));
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
      `http://localhost:7400/api/v1/product/${id}`
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
      "http://localhost:7400/api/v1/products",
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
      `http://localhost:7400/api/v1/products/${id}`,
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
    await axios.delete(`http://localhost:7400/api/v1/products/${id}`);
    dispatch(deleteProduct(id));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Failed to delete product")
    );
  }
};
