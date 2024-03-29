import express from "express";
import {
  signup,
  login,
  refreshAccessToken,
  logout,
  updatePassword,
  getProfileDetails,
  isAdmin,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/authentication.middleware.js";
// import { authorizeAdmin } from "../middlewares/authorization.middleware.js";
const router = express.Router();

// Authentication routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);

// Profile details route protected by middleware
router.get("/profile/:profileId", authenticate, getProfileDetails);

router.post("/logout", authenticate, logout);
router.post("/update-password", authenticate, updatePassword);

// router.post("/is-admin", authorizeAdmin);

export default router;
