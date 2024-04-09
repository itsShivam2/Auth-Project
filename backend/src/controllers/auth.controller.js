import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

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

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//original login controller
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
        username: username,
      });
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

    if (!isValidPassword) {
      console.log(`Invalid password for user '${username}'`);
      return res.status(401).json({ message: "Invalid username or password" });
    }

    console.log(`User '${username}' logged in successfully`);
    // Check if the user is admin
    const isAdmin =
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD;

    // Generate new access and refresh tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    if (isAdmin) {
      res.cookie("isAdmin", true, { httpOnly: true });
    }

    // Update the user's refresh token
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Set tokens as HttpOnly cookies
    // TODO Later - Set cookies with or without secure flag based on the environment

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV != "development",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV != "development",
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      username,
      role: user.role,
      accessToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to refresh access token
export const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json({ message: "Unauthorized request" });
    }
    // Verify refresh token
    const decoded = jwt.verify(incomingRefreshToken, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Compare the incoming refresh token with the stored refresh token
    if (incomingRefreshToken !== user.refreshToken) {
      return res
        .status(401)
        .json({ message: "Refresh token is either expired or used" });
    }

    // Generate new access and refresh tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Update the user's refresh token
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Send new access token as cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV != "development",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV != "development",
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Access token refreshed successfully",
      accessToken: accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

// Logout controller
export const logout = async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json({ message: "Unauthorized request" });
    }
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Remove refresh token from user
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: { refreshToken: "" }, // Unset the refreshToken field
      },
      {
        new: true,
      }
    );

    // Clear cookies containing tokens
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.clearCookie("isAdmin", {
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get current user's profile details
// export const getProfileDetails = async (req, res) => {
//   try {
//     // Extract user ID from request object (from access token)
//     const userIdFromToken = req.user._id.toString();
//     console.log("User ID from token:", userIdFromToken);

//     // Extract profile ID from request parameters
//     const { profileId } = req.params;
//     console.log("Profile ID from request:", profileId);

//     // Check if the logged-in user matches the profile owner
//     if (userIdFromToken !== profileId) {
//       console.log("User is not authorized to access this profile.");
//       return res.status(403).json({ message: "Forbidden" });
//     }

//     // Fetch profile details from the database
//     const profile = await User.findById(profileId).select(
//       "-password -refreshToken"
//     );

//     // Check if the profile exists
//     if (!profile) {
//       console.log("Profile not found in the database.");
//       return res.status(404).json({ message: "Profile not found" });
//     }

//     // Return profile details
//     res.status(200).json({ profile });
//   } catch (error) {
//     console.error("Error fetching profile details:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// Controller to get current user's profile details
export const getCurrentUserProfile = async (req, res) => {
  try {
    // Extract user ID from the access token cookie
    const accessToken = req.cookies.accessToken;

    // Verify the access token to get user information
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    const userIdFromToken = decodedToken.userId;

    // Fetch profile details from the database using the extracted userId
    const profile = await User.findById(userIdFromToken).select(
      "-password -refreshToken"
    );

    // Check if the profile exists
    if (!profile) {
      console.log("Profile not found in the database.");
      return res.status(404).json({ message: "Profile not found" });
    }

    // Return profile details
    res.status(200).json({ profile });
  } catch (error) {
    console.error("Error fetching profile details:", error);
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
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
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

// Get user cart
export const userCart = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Cart fetched",
    cart,
  });
};

// Add product to wishlist controller
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const { user } = req;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Fetch complete product data using the product ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if product already exists in wishlist
    // if (user.wishlist.includes(productId)) {
    //   return res
    //     .status(400)
    //     .json({ message: "Product already exists in wishlist" });
    // }

    // Check if product already exists in wishlist
    const existingProductIndex = user.wishlist.findIndex(
      (item) => item._id.toString() === productId
    );

    if (existingProductIndex !== -1) {
      return res
        .status(400)
        .json({ message: "Product already exists in wishlist" });
    }

    // Add product to wishlist array
    user.wishlist.push(product);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Product added to wishlist successfully",
    });
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//ADMIN CONTROLLERS

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password -refreshToken");

    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a user by admin
export const deleteUserById = async (req, res) => {
  try {
    const { _id } = req.user;
    const userId = _id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    if (user.role === "admin")
      return res.status(400).json({ message: "Cannot delete admin" });

    const deletedUser = await User.deleteOne({ _id: userId }).select(
      "-password"
    );

    if (!deletedUser) {
      return res.status(400).json({ message: "Error deleting the user" });
    }

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
