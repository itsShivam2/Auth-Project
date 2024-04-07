import { Router } from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js";
import { authenticate } from "../middlewares/authentication.middleware.js";

const router = Router();

// Get user's cart
router.get("/", authenticate, getCart);

// Add item to cart
router.post("/add", authenticate, addToCart);

// Update cart item quantity
router.put("/:itemId", authenticate, updateCartItem);

// Remove item from cart
router.delete("/:itemId", authenticate, removeFromCart);

// Clear user's cart
router.delete("/", authenticate, clearCart);

export default router;
