import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
    const { _id } = req.user;
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
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add product to wishlist controller
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    const { user } = req;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Check if product already exists in wishlist
    if (user.wishlist.includes(productId)) {
      return res
        .status(400)
        .json({ message: "Product already exists in wishlist" });
    }

    // Add product to wishlist array
    user.wishlist.push(productId);
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

// Fetch User Wishlist
export const getUserWishlist = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    const userWithWishlist = await User.findById(user._id).populate("wishlist");

    if (!userWithWishlist) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data: userWithWishlist.wishlist });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

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

// Function to access admin panel
export const getAdminPanel = (req, res) => {
  try {
    // Check if user is an admin (you can implement your own logic)
    const isAdmin = req.user.role === "admin";

    // If user is not an admin, return 403 Forbidden
    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Access denied. User is not an admin." });
    }

    // Return admin panel
    res.status(200).json({ message: "Admin panel accessed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
