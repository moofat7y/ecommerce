const { validationResult } = require("express-validator");
const Category = require("../models/blogCategoryModel");

// Create new category
exports.createCategory = async (req, res, next) => {
  const { title } = req.body;

  try {
    const category = await Category.create({ title });
    res.status(201).json(category);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Update category
exports.updateCategory = async (req, res, next) => {
  const { title } = req.body;
  const { catId } = req.params;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const category = await Category.findByIdAndUpdate(
      catId,
      { title },
      { new: true }
    );
    res.status(201).json(category);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get category
exports.getCategory = async (req, res, next) => {
  const { catId } = req.params;
  try {
    const category = await Category.findById(catId);
    res.status(200).json(category);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get all categorys
exports.getAllCategory = async (req, res, next) => {
  try {
    const categorys = await Category.find();
    res.status(200).json(categorys);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Delete category
exports.deleteCategory = async (req, res, next) => {
  const { catId } = req.params;
  try {
    await Category.findByIdAndDelete(catId);
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
