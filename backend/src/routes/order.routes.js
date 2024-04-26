import { Router } from "express";
import {
  createOrder,
  updateOrderById,
  deleteOrderById,
  getUserOrders,
  getAllOrders,
} from "../controllers/order.controller.js";
import { authenticate } from "../middlewares/authentication.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";

const router = Router();

// Create user order
router.post("/create-order", authenticate, createOrder);

// Update user order
router.put("/:id", authenticate, adminAuth, updateOrderById);

// Delete user order
router.delete("/:id", authenticate, adminAuth, deleteOrderById);

// Get all orders of a user
router.get("/user/:id", authenticate, getUserOrders);

// Get all orders from all users
router.get("/all-orders", authenticate, adminAuth, getAllOrders);

export default router;
