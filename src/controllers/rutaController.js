import asyncHandler from "express-async-handler";
import Ruta from "../models/rutaModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getRuta = asyncHandler(async (req, res) => {
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

  const count = await Ruta.countDocuments({ ...keyword });
  const products = await Ruta.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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
