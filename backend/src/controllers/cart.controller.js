import { Cart } from "../models/cart.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";

// Get user's cart
const getCart = asyncHandler(async (req, res) => {
  const { user } = req;
  const cart = await Cart.findOne({ user: user._id }).populate("items.product");
  res.json(new ApiResponse(200, cart, "Cart fetched successfully"));
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

// Calculate total cost based on the items in the cart
const calculateTotalCost = (items) => {
  let totalCost = 0;
  items.forEach((item) => {
    totalCost += item.price * item.quantity;
  });
  return totalCost;
};

// Update cart item quantity
const updateCartItem = asyncHandler(async (req, res) => {
  const { user } = req; // Assuming user details are available in request
  const { itemId } = req.params;
  const { quantity } = req.body;
  let cart = await Cart.findOne({ user: user._id });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const itemToUpdate = cart.items.find(
    (item) => item._id.toString() === itemId
  );

  if (!itemToUpdate) {
    throw new ApiError(404, "Item not found in cart");
  }

  itemToUpdate.quantity = quantity;
  await cart.save();
  res.json(new ApiResponse(200, cart, "Cart item updated successfully"));
});

// Remove item from cart
const removeFromCart = asyncHandler(async (req, res) => {
  const { user } = req; // Assuming user details are available in request
  const { itemId } = req.params;
  let cart = await Cart.findOne({ user: user._id });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
  await cart.save();
  res.json(new ApiResponse(200, cart, "Item removed from cart successfully"));
});

// Clear user's cart
const clearCart = asyncHandler(async (req, res) => {
  const { user } = req; // Assuming user details are available in request
  let cart = await Cart.findOne({ user: user._id });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  cart.items = [];
  await cart.save();
  res.json(new ApiResponse(200, cart, "Cart cleared successfully"));
});

export { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
