import asyncHandler from "express-async-handler";
import Planes from "../models/planesModel.js";
import Products from "../models/planesModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getPlanes = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Planes.countDocuments({ ...keyword });
  const products = await Planes.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getPlanesById = asyncHandler(async (req, res) => {
  const product = await Planes.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deletePlanes = asyncHandler(async (req, res) => {
  const product = await Planes.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Producto eliminado correctamente" });
  } else {
    res.status(404);
    throw new Error("Product no encontrado");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createPlanes = asyncHandler(async (req, res) => {
  const product = new Planes({
    user: req.user._id,
    nameProdut: req.body.nameProdut,
    price: req.body.price,
    imagesList: req.body.imagesList,
    category: req.body.category,
    descriptionProduct: req.body.descriptionProduct,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updatePlanes = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getPlanes, getPlanesById, deletePlanes, createPlanes, updatePlanes };
