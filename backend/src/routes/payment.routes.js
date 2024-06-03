import express from "express";
// import {
//   checkout,
//   paymentVerification,
// } from "../controllers/payment.controller.js";
import { authenticate } from "../middlewares/authentication.middleware.js";

const router = express.Router();

// router.post("/checkout", authenticate, checkout);

// router.post("/payment-verification", authenticate, paymentVerification);

export default router;
