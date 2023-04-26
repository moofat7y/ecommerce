const { validationResult } = require("express-validator");
const Copon = require("../models/coponModel");

// Create new copon
exports.createCopon = async (req, res, next) => {
  // const { name, expire, discount } = req.body;

  try {
    const copon = await Copon.create(req.body);
    res.status(201).json(copon);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get all copons
exports.getAllCopons = async (req, res, next) => {
  try {
    const copons = await Copon.find();
    res.status(200).json(copons);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Update copon
exports.updateCopon = async (req, res, next) => {
  const { coponId } = req.params;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const copon = await Copon.findByIdAndUpdate(coponId, req.body, {
      new: true,
    });
    if (!copon) {
      const error = new Error("This copon not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(copon);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Delete copon
exports.deleteCopon = async (req, res, next) => {
  const { coponId } = req.params;
  try {
    await Copon.findByIdAndDelete(coponId);
    res.status(200).json({ message: "Copon deleted" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
