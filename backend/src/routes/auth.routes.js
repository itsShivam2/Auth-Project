import express from "express";
import {
  signup,
  login,
  refreshAccessToken,
  logout,
  updatePassword,
  getProfileDetails,
  userCart,
  addToWishlist,
  getAllUsers,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/authentication.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
const router = express.Router();

// Authentication routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);

// Profile details route protected by middleware
router.get("/profile", authenticate, getProfileDetails);

router.post("/logout", authenticate, logout);
router.post("/update-password", authenticate, updatePassword);

router.get("/cart", userCart);
//router.post("/cart", userCart);

// Add product to wishlist route
router.post("/wishlist/add", authenticate, addToWishlist);

router.get("/all-users", authenticate, adminAuth, getAllUsers);

export default router;
