import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

// Create a new order
const createOrder = asyncHandler(async (req, res) => {
  try {
    const { user } = req;

    const foundUser = await User.findById(user._id).populate(
      "cart.items.product"
    );

    if (!foundUser) {
      throw new ApiError(404, "User not found");
    }

    if (foundUser.cart.items.length === 0) {
      throw new ApiError(400, "Cannot create order with an empty cart");
    }

    const totalAmount = calculateTotalAmount(foundUser.cart.items) + 50;

    const newOrder = new Order({
      orderBy: user._id,
      items: foundUser.cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount,
      // shippingAddress: req.body.shippingAddress,
      status: "pending",
    });

    await newOrder.save();

    foundUser.cart.items = [];
    foundUser.cart.totalAmount = 0;
    await foundUser.save();

    res.json(new ApiResponse(201, newOrder, "Order created successfully"));
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

// Calculate total amount based on items in the cart
const calculateTotalAmount = (cartItems) => {
  let totalAmount = 0;
  cartItems.forEach((item) => {
    totalAmount += item.price * item.quantity;
  });
  return totalAmount;
};

// Get order by ID
const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, order, "Order fetched successfully"));
  } catch (error) {
    console.error("Error fetching the order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update order by ID
const updateOrderById = asyncHandler(async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedOrder) {
      throw new ApiError(404, "Order not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, updatedOrder, "Order updated successfully"));
  } catch (error) {
    console.error("Error updating the order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete order by ID
const deleteOrderById = asyncHandler(async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      throw new ApiError(404, "Order not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, null, "Order deleted successfully"));
  } catch (error) {
    console.error("Error deleting the order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get orders for a specific user
const getUserOrders = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    const orders = await Order.find({ orderBy: user._id });

    res.json(new ApiResponse(200, orders, "User orders fetched successfully"));
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all orders (admin only)
const getAllOrders = asyncHandler(async (req, res) => {
  try {
    console.log("Fetching all orders");

    const orders = await Order.find();
    res.json(new ApiResponse(200, orders, "All orders fetched successfully"));
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

export {
  createOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  getUserOrders,
  getAllOrders,
};
