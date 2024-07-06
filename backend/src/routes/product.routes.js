import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authenticate } from "../middlewares/authentication.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";

const router = Router();

// Create a new product (only accessible by admin)
router.post(
  "/create-product",
  authenticate,
  adminAuth,
  upload.single("productImage"),
  createProduct
);

// Search products (new route)
router.get("/search", searchProducts);

// Get all products
router.get("/all-products", getAllProducts);

// Get a product by ID
router.get("/:id", getProduct);

// Update a product by ID (only accessible by admin)
router.put(
  "/:id",
  authenticate,
  adminAuth,
  upload.single("productImage"),
  updateProduct
);

// Delete a product by ID (only accessible by admin)
router.delete("/:id", authenticate, adminAuth, deleteProduct);

export default router;
