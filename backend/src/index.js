import express from "express";
import connectDB from "./connectDB/connectDB.js"; // Import the database connection function
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import Razorpay from "razorpay";
// Load environment variables from .env file
dotenv.config();

// Import routes
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import orderRoutes from "./routes/order.routes.js";
import userRoutes from "./routes/user.routes.js";
// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//This is used when we want to store some files on our server. We make a public folder which can be accessed by anyone
app.use(express.static("public"));
app.use(cookieParser());

//There are 2 ways to use cors
//1. Allow all origins
// app.use(cors());
//2. All sepcific origins
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/user", userRoutes);

app.get("/api/v1/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);
// Handle OPTIONS requests
app.options("*", cors());

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
