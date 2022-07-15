import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Buy from "../models/buyModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getBuy = asyncHandler(async (req, res) => {
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

  const count = await Buy.countDocuments({ ...keyword });
  const products = await Buy.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getBuyById = asyncHandler(async (req, res) => {
  const product = await Buy.findById( req.params.id );

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
const createBuy = asyncHandler(async (req, res) => {
  const product = new Buy({
    namePlane: req.body.namePlane,
    planId: req.body.planId,
    user: req.body.user,
    Saldo: req.body.Saldo,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/buy/:id
const updateBuy = asyncHandler(async (req, res) => {
  const { planId, namePlane, Saldo, user } = req.body;

  const buy = await Buy.findById(req.params.id);
  if (buy) {
    buy.planId = planId;
    buy.namePlane = namePlane;
    buy.Saldo = Saldo;
    buy.user = user;

    const updatedProduct = await buy.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Usuario no encotrado");
  }
});
export { getBuy, getBuyById, deleteBuy, createBuy, updateBuy };
