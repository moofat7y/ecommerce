const jwt = require("jsonwebtoken");

// Function to generate token by id
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_TOKEN, { expiresIn: "10s" });
};
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_TOKEN, { expiresIn: "7d" });
};
const generateConfirmEmail = (id, email) => {
  return jwt.sign({ id, email }, process.env.CONFIRM_TOKEN, {
    expiresIn: "15m",
  });
};
module.exports = { generateToken, generateRefreshToken, generateConfirmEmail };
