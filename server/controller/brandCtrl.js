const { validationResult } = require("express-validator");
const Brand = require("../models/brandModel");

// Create new brand
exports.createBrand = async (req, res, next) => {
  const title = req.body.title.toLowerCase();

  try {
    const brand = await Brand.create({ title });
    res.status(201).json(brand);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Update brand
exports.updateBrand = async (req, res, next) => {
  const title = req.body.title.toLowerCase();
  const { brandId } = req.params;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const brand = await Brand.findByIdAndUpdate(
      brandId,
      { title },
      { new: true }
    );
    res.status(201).json(brand);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get brand
exports.getBrand = async (req, res, next) => {
  const { brandId } = req.params;
  try {
    const brand = await Brand.findById(brandId);
    res.status(200).json(brand);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get all brands
exports.getAllBrand = async (req, res, next) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Delete brand
exports.deleteBrand = async (req, res, next) => {
  const { brandId } = req.params;
  try {
    await Brand.findByIdAndDelete(brandId);
    res.status(200).json({ message: "Brand deleted" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
