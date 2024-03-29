import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authenticate } from "../middlewares/authentication.middleware.js";

const router = Router();

// Create a new product
router.post("/create-product",authenticate, upload.single("productImage"), createProduct);

// Get all products
router.get("/all-products", getAllProducts);

// Get a product by ID
router.get("/:id", getProduct);

// Update a product by ID
router.put("/:id", authenticate, upload.single("productImage"), updateProduct);

// Delete a product by ID
router.delete("/:id", authenticate, deleteProduct);

export default router;
