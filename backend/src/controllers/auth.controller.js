import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Retrieve JWT secret and token expiration values from environment variables
const jwtSecret = process.env.JWT_SECRET;
const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION;
const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION;

// Signup controller
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, dateOfBirth } =
      req.body;

    // Validate required fields
    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate password length
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
      dateOfBirth,
    });
    await newUser.save();

    // Generate JWT tokens
    const accessToken = jwt.sign({ userId: newUser._id }, jwtSecret, {
      expiresIn: accessTokenExpiration,
    });
    const refreshToken = jwt.sign({ userId: newUser._id }, jwtSecret, {
      expiresIn: refreshTokenExpiration,
    });

    // Set tokens as HttpOnly cookies
    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Login controller
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });
    if (!user) {
      console.log(`User with username/email '${username}' not found`);
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Log the retrieved user object for debugging
    console.log("Retrieved user:", user);

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);

    // Print the result of password comparison
    console.log("Password comparison result:", isValidPassword);

    if (!isValidPassword) {
      console.log(`Invalid password for user '${username}'`);
      return res.status(401).json({ message: "Invalid username or password" });
    }

    console.log(`User '${username}' logged in successfully`);

    // Generate JWT tokens
    const accessToken = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: accessTokenExpiration,
    });
    const refreshToken = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: refreshTokenExpiration,
    });

    // Set tokens as HttpOnly cookies
    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    res.json({ message: "Login successful", accessToken, refreshToken });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Controller function to refresh access token
export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, jwtSecret);
    const userId = decoded.userId;

    // Sign new access token
    const accessToken = jwt.sign({ userId }, jwtSecret, {
      expiresIn: accessTokenExpiration,
    });

    // Send new access token as cookie
    res.cookie("accessToken", accessToken, { httpOnly: true });

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid refresh token" });
  }
};


// Logout controller
export const logout = (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Clear cookies containing tokens
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Update password controller
export const updatePassword = async (req, res) => {
  try {
    const { _id } = req.user; // Assuming you have middleware to extract user information from JWT
    const userId = _id;
    const { currentPassword, newPassword } = req.body;

    // Check if user is authenticated
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    // Verify the current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Update the user's password
    user.password = newPassword; // Assuming the password hashing is handled by the model's pre-save hook
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Get current user controller
export const getCurrentUser = async (req, res) => {
  try {
    const { _id } = req.user;

    const userId = _id;
    // Check if user is authenticated
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentUser = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      role: user.role,
    };

    res.status(200).json(currentUser);
  } catch (error) {
    console.error("Error getting current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


