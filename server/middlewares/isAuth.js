const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuth = async (req, res, next) => {
  const header = req.headers?.authorization;
  try {
    if (!header || !header?.startsWith("Bearer")) {
      const error = new Error("You are not authonticated");
      error.statusCode = 422;
      throw error;
    }
    const headerToken = header.split(" ")[1];
    const decodedToken = jwt.verify(
      headerToken,
      process.env.SECRET_TOKEN,
      {},
      (err, decodedToken) => {
        if (err) {
          const error = new Error(err.message);
          error.stack = err.stack;
          error.statusCode = 401;
          throw error;
        }
        return decodedToken;
      }
    );
    const user = await User.findById(decodedToken.id);
    if (!user) {
      const error = new Error("Your account may be deleted");
      error.statusCode = 417;
      throw error;
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// Check user is admin or not
const isAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "admin") {
      const error = new Error("Your are not admin");
      error.statusCode = 417;
      throw error;
    }
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const hypred = async (req, res, next) => {
  const header = req.headers?.authorization;
  try {
    if (!header || !header?.startsWith("Bearer")) {
      const error = new Error("You are not authonticated");
      error.statusCode = 422;
      throw error;
    }
    const headerToken = header.split(" ")[1];
    const decodedToken = jwt.verify(
      headerToken,
      process.env.SECRET_TOKEN,
      {},
      (err, decodedToken) => {
        if (err) {
          const error = new Error(err.message);
          error.stack = err.stack;
          error.statusCode = 401;
          throw error;
        }
        return decodedToken;
      }
    );
    const user = await User.findById(decodedToken.id);
    if (!user) {
      const error = new Error("Your account may be deleted");
      error.statusCode = 417;
      throw error;
    }
    req.user = user;
    next();
  } catch (error) {
    next();
  }
};

module.exports = { isAuth, isAdmin, hypred };
