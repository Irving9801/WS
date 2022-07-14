import asyncHandler from "express-async-handler";
import Ruta from "../models/rutaModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getRuta = asyncHandler(async (req, res) => {




  const products = await Ruta.find()

  res.json({ products});
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

export { getRuta, createRuta };
