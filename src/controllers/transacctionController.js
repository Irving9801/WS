import asyncHandler from "express-async-handler";
import Buy from "../models/buyModel.js";
import Trans from "../models/transacctionModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getTransToUSer = asyncHandler(async (req, res) => {
  const product = await Trans.find({toUser: req.params.id} );

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getTrans = asyncHandler(async (req, res) => {
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

  const count = await Trans.countDocuments({ ...keyword });
  const products = await Trans.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getTransById = asyncHandler(async (req, res) => {
  const product = await Trans.find({ user: req.params.id });

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
const deleteBuy = asyncHandler(async (req, res) => {
  const product = await Buy.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createTrans = asyncHandler(async (req, res) => {

  const product = new Trans({
    pago: req.body.pago,
    user: req.body.user,
    toUser: req.body.toUser,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin

export { getTrans, getTransById, deleteBuy, createTrans,getTransToUSer };
