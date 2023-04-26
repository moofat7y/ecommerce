const { validationResult } = require("express-validator");
const Enquiry = require("../models/enqModel");

// Create new enquiry
exports.createEnquiry = async (req, res, next) => {
  const { name, mobile, comment } = req.body;
  try {
    const enquiry = await Enquiry.create({
      name,
      email: req.user.email,
      mobile,
      comment,
    });
    res.status(201).json(enquiry);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Update enquiry
exports.updateEnquiry = async (req, res, next) => {
  const { status } = req.body;
  const { enquiryId } = req.params;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const enquiry = await Enquiry.findByIdAndUpdate(
      enquiryId,
      { status },
      { new: true }
    );
    res.status(201).json(enquiry);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get enquiry
exports.getEnquiry = async (req, res, next) => {
  const { enquiryId } = req.params;
  try {
    const enquiry = await Enquiry.findById(enquiryId);
    res.status(200).json(enquiry);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get all enquirys
exports.getAllEnquiry = async (req, res, next) => {
  try {
    const enquirys = await Enquiry.find();
    res.status(200).json(enquirys);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Delete enquiry
exports.deleteEnquiry = async (req, res, next) => {
  const { enquiryId } = req.params;
  try {
    await Enquiry.findByIdAndDelete(enquiryId);
    res.status(200).json({ message: "Enquiry deleted" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
