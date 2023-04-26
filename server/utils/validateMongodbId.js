const mongoose = require("mongoose");
const validateMongdbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  console.log(isValid);
  if (!isValid) {
    const error = new Error("This is id not valid or not found");
    error.statusCode = 422;
    throw error;
  }
};

module.exports = validateMongdbId;
