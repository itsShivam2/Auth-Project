import { Router } from "express";
import {
  createOrder,
  updateOrderById,
  deleteOrderById,
  getUserOrders,
  getAllOrders,
  getMonthlyIncome,
} from "../controllers/order.controller.js";
import { authenticate } from "../middlewares/authentication.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";

const router = Router();

// Create user order
router.post("/create-order", authenticate, createOrder);

// Update user order
router.put("/:id", authenticate, adminAuth, updateOrderById);

// Delete cart item quantity
router.delete("/:id", authenticate, adminAuth, deleteOrderById);

// Get user orders
router.get("/user/:id", authenticate, adminAuth, getUserOrders);

// Get all orders
router.get("/all-orders", authenticate, adminAuth, getAllOrders);

export default router;
