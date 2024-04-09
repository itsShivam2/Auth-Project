import { Order } from "../models/order.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";

// Create new order
const createOrder = asyncHandler(async (req, res) => {
  try {
    const newOrder = new Order(req.body);

    const savedOrder = await newOrder.save();

    if (!savedOrder) {
      throw new ApiError(404, "Order not found");
    }
    res
      .status(201)
      .json(new ApiResponse(201, savedOrder, "Order placed successfully"));
  } catch (error) {
    console.error("Error placing the order:", error);
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

// Get orders of a specific user
const getUserOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });

    res
      .status(200)
      .json(new ApiResponse(200, orders, "User orders retrieved successfully"));
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all orders
const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find();

    res
      .status(200)
      .json(new ApiResponse(200, orders, "All orders retrieved successfully"));
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Calculate monthly income
const getMonthlyIncome = asyncHandler(async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res
      .status(200)
      .json(
        new ApiResponse(200, income, "Monthly income calculated successfully")
      );
  } catch (error) {
    console.error("Error calculating monthly income:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add item to cart
const addToCart = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    const { product, quantity } = req.body;
    console.log("request product", product);
    console.log("requesting user", user);

    let cart = await Cart.findOne({ orderBy: user._id });

    if (!cart) {
      cart = await Cart.create({ orderBy: user._id, items: [] });
    }

    const selectedProduct = await Product.findById({ _id: product });
    console.log("selectedProduct", selectedProduct);
    if (!selectedProduct) {
      throw new ApiError(404, "Product not found");
    }

    const price = selectedProduct.newPrice; // Assuming newPrice is the price to be used

    // Check if the item already exists in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === product
    );
    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product, quantity, price });
    }

    // Calculate total cost and shipping cost
    cart.totalCost = calculateTotalCost(cart.items);
    cart.shippingCost = 50; // Fixed shipping cost per order

    await cart.save();
    res
      .status(201)
      .json(new ApiResponse(201, cart, "Item added to cart successfully"));
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export {
  createOrder,
  updateOrderById,
  deleteOrderById,
  getUserOrders,
  getAllOrders,
  getMonthlyIncome,
};
