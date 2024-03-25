import express from "express";
import connectDB from "./connectDB/connectDB.js"; // Import the database connection function
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
// Load environment variables from .env file
dotenv.config();

// Import routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use("/api/v1/auth", authRoutes); // Use /api/v1/auth instead of /api/auth
app.use("/api/v1/user", userRoutes); // Use /api/v1/user instead of /api/user

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
