import { Router } from "express";
import {
  createOrder,
  getOrderById,
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

// Get all orders from all users
router.get("/all-orders", authenticate, adminAuth, getAllOrders);

// Get user order by ID
router.get("/:id", authenticate, getOrderById);

// Get all orders of a user
router.get("/user/orders", authenticate, getUserOrders);

//ADMIN ROUTES

// Update user order
router.put("/:id", authenticate, adminAuth, updateOrderById);

// Delete user order
router.delete("/:id", authenticate, adminAuth, deleteOrderById);

export default router;
