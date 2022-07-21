import asyncHandler from "express-async-handler";
import Ruta from "../models/rutaModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getRuta = asyncHandler(async (req, res) => {
  const products = await Ruta.find();

  res.json({ products });
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createRuta = asyncHandler(async (req, res) => {
  const product = new Ruta({
    nameRuta: req.body.nameRuta,
    price: req.body.price,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const deleteRuta = asyncHandler(async (req, res) => {
  const product = await Ruta.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getRuta, createRuta,deleteRuta };
