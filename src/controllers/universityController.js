import asyncHandler from "express-async-handler";
import Buy from "../models/buyModel.js";
import Uni from "../models/universityModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getUni = asyncHandler(async (req, res) => {
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

  const count = await Uni.countDocuments({ ...keyword });
  const products = await Uni.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createUni = asyncHandler(async (req, res) => {
  const product = new Uni({
    name: req.body.name,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const deleteUni = asyncHandler(async (req, res) => {
  const product = await Uni.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getUni, createUni, deleteUni };
