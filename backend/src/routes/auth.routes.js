import express from "express";
import {
  signup,
  login,
  logout,
  refreshAccessToken,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/authentication.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authenticate, logout);
router.post("/refresh-token", refreshAccessToken);

export default router;
