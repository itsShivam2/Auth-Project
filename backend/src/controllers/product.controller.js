import { Product } from "../models/product.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

// @desc    Create a new product
// @route   POST /api/v1/products
// @access  Private (Admin)
const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, category, oldPrice, newPrice } = req.body;
    const productImageLocalPath = req.file?.path;

    if (
      !name ||
      !description ||
      !category ||
      !oldPrice ||
      !newPrice ||
      !productImageLocalPath
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const productImage = await uploadOnCloudinary(productImageLocalPath);

    if (!productImage.url) {
      throw new ApiError(400, "Error while uploading product image");
    }

    const product = await Product.create({
      name,
      description,
      category,
      oldPrice,
      newPrice,
      productImage: productImage.url,
    });

    const createdProduct = await Product.findById(product._id);

    if (!createdProduct) {
      throw new ApiError(
        500,
        "Something went wrong while creating the product"
      );
    }

    res
      .status(201)
      .json(
        new ApiResponse(201, createdProduct, "Product created successfully")
      );
  } catch (error) {
    throw new ApiError(500, "Error while creating product");
  }
});

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
  const qCategory = req.query.category;
  try {
    let products;
    if (qCategory) {
      products = await Product.find({
        category: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.json(new ApiResponse(200, products, "Products fetched successfully"));
  } catch (error) {}
});

// @desc    Get product by ID
// @route   GET /api/v1/products/:id
// @access  Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.json(new ApiResponse(200, product, "Product fetched successfully"));
});

// @desc    Update a product
// @route   PUT /api/v1/products/:id
// @access  Private (Admin)
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, category, oldPrice, newPrice } = req.body;
    const productImageLocalPath = req.file?.path;

    if (!name || !description || !category || !oldPrice || !newPrice) {
      throw new ApiError(400, "All fields are required");
    }

    let product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    let updatedFields = {
      name,
      description,
      category,
      oldPrice,
      newPrice,
    };

    // Check if there's a new image uploaded
    if (productImageLocalPath) {
      const productImage = await uploadOnCloudinary(productImageLocalPath);
      if (!productImage.url) {
        throw new ApiError(400, "Error while uploading product image");
      }
      updatedFields.productImage = productImage.url;
    }

    product = await Product.findByIdAndUpdate(productId, updatedFields, {
      new: true,
    });

    res
      .status(200)
      .json(new ApiResponse(200, product, "Product updated successfully"));
  } catch (error) {
    throw new ApiError(500, "Error while updating product");
  }
});

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Private (Admin)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  await Product.deleteOne({ _id: req.params.id });

  res.json(new ApiResponse(200, {}, "Product deleted successfully"));
});

// @desc    Search products
// @route   GET /api/v1/products/search
// @access  Public
const searchProducts = asyncHandler(async (req, res) => {
  const { name, category, minPrice, maxPrice, minRating, sortBy, order } =
    req.query;
  const query = {};

  if (name) {
    query.name = { $regex: name, $options: "i" }; // Case-insensitive search
  }

  if (category) {
    query.category = category;
  }

  if (minPrice) {
    query.newPrice = { ...query.newPrice, $gte: minPrice };
  }

  if (maxPrice) {
    query.newPrice = { ...query.newPrice, $lte: maxPrice };
  }

  if (minRating) {
    query.rating = { $gte: minRating };
  }

  let sort = {};
  if (sortBy) {
    sort[sortBy] = order === "desc" ? -1 : 1;
  }

  const products = await Product.find(query).sort(sort);

  res.json(new ApiResponse(200, products, "Products fetched successfully"));
});

export {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
