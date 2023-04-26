const { validationResult } = require("express-validator");
const Color = require("../models/colorModel");

// Create new color
exports.createColor = async (req, res, next) => {
  const { title } = req.body;
  try {
    const newColor = await Color.create({ title });
    res.status(201).json(newColor);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get color by id
exports.getColor = async (req, res, next) => {
  const { colorId } = req.params;
  try {
    const color = await Color.findById(colorId);
    res.status(200).json(color);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get all colors
exports.getAllColors = async (req, res, next) => {
  try {
    const colors = await Color.find();
    res.status(200).json(colors);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Update color
exports.updateColor = async (req, res, next) => {
  const { colorId } = req.params;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const color = await Color.findByIdAndUpdate(
      colorId,
      { title: req.body.title },
      {
        new: true,
      }
    );
    if (!color) {
      const error = new Error("This color not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(color);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Delete color
exports.deleteColor = async (req, res, next) => {
  const { colorId } = req.params;
  try {
    await Color.findByIdAndDelete(colorId);
    res.status(200).json({ message: "Color deleted" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
