import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";

// Get user's cart
const getCart = asyncHandler(async (req, res) => {
  try {
    const { user } = req;

    // Find the user by ID and populate the cart items
    const foundUser = await User.findById(user._id).populate(
      "cart.items.product"
    );

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const cart = foundUser.cart;
    res.json(new ApiResponse(200, cart, "Cart fetched successfully"));
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add item to cart
const addToCart = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    const { product, quantity } = req.body;

    const selectedProduct = await Product.findById({ _id: product });
    if (!selectedProduct) {
      throw new ApiError(404, "Product not found");
    }

    const price = selectedProduct.newPrice;

    // Check if the item already exists in the cart
    const existingItemIndex = user.cart.items.findIndex(
      (item) => item.product.toString() === product
    );
    if (existingItemIndex !== -1) {
      user.cart.items[existingItemIndex].quantity += quantity;
    } else {
      user.cart.items.push({
        product: selectedProduct._id,
        quantity,
        price: selectedProduct.newPrice,
      });
    }
    // Calculate total amount for the cart
    let totalAmount = 0;
    user.cart.items.forEach((item) => {
      totalAmount += item.quantity * item.price;
    });
    user.cart.totalAmount = totalAmount;

    await user.save();
    res
      .status(201)
      .json(new ApiResponse(201, user.cart, "Item added to cart successfully"));
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update cart item quantity
const updateCartItem = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    const { itemId } = req.params;
    const { quantity } = req.body;

    // Find the user by ID and populate the cart items
    const foundUser = await User.findById(user._id).populate(
      "cart.items.product"
    );

    if (!foundUser) {
      throw new ApiError(404, "User not found");
    }

    const itemToUpdate = foundUser.cart.items.find(
      (item) => item.product._id.toString() === itemId
    );

    if (!itemToUpdate) {
      throw new ApiError(404, "Item not found in cart");
    }

    itemToUpdate.quantity = quantity;
    foundUser.cart.totalAmount = calculateTotalAmount(foundUser.cart.items);
    await foundUser.save();

    res.json(
      new ApiResponse(200, foundUser.cart, "Cart item updated successfully")
    );
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Remove item from cart
const removeFromCart = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    const { itemId } = req.params;

    // Find the user by ID and populate the cart items
    const foundUser = await User.findById(user._id).populate(
      "cart.items.product"
    );

    if (!foundUser) {
      throw new ApiError(404, "User not found");
    }

    foundUser.cart.items = foundUser.cart.items.filter(
      (item) => item.product._id.toString() !== itemId
    );

    // foundUser.cart.totalAmount = calculateTotalAmount(foundUser.cart.items);
    let totalAmount = 0;
    foundUser.cart.items.forEach((item) => {
      totalAmount += item.quantity * item.price;
    });
    foundUser.cart.totalAmount = totalAmount;
    await foundUser.save();

    res.json(
      new ApiResponse(
        200,
        foundUser.cart,
        "Item removed from cart successfully"
      )
    );
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Clear user's cart
const clearCart = asyncHandler(async (req, res) => {
  try {
    const { user } = req;

    const foundUser = await User.findById(user._id).populate(
      "cart.items.product"
    );

    if (!foundUser) {
      throw new ApiError(404, "User not found");
    }

    foundUser.cart.items = [];
    foundUser.cart.totalAmount = 0;
    await foundUser.save();

    res.json(new ApiResponse(200, foundUser.cart, "Cart cleared successfully"));
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Internal server error" });
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

export { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
