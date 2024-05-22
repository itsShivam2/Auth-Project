import express from "express";
import {
  getCurrentUserProfile,
  updatePassword,
  addToWishlist,
  getUserWishlist,
  getAllUsers,
  getUser,
  deleteUserById,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authentication.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
const router = express.Router();


// Profile details route protected by middleware
router.get("/profile", authenticate, getCurrentUserProfile);

router.post("/update-password", authenticate, updatePassword);

router.post("/wishlist/:productId", authenticate, addToWishlist);

router.get("/wishlist", authenticate, getUserWishlist);

//Admin routes
router.get("/all-users", authenticate, adminAuth, getAllUsers);

router.get("/:id", authenticate, adminAuth, getUser);

router.delete("/:id", authenticate, adminAuth, deleteUserById);


export default router;
