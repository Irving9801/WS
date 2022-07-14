import asyncHandler from "express-async-handler";
import Company from "../models/companyTrans.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getCompany = asyncHandler(async (req, res) => {
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

  const count = await Company.countDocuments({ ...keyword });
  const products = await Company.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createCompany = asyncHandler(async (req, res) => {
  const product = new Company({
    name: req.body.name,
    price: req.body.price,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

export { getCompany, createCompany };
