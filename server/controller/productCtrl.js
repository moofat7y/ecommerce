const Product = require("../models/productModel");
const slugify = require("slugify");
const { validationResult } = require("express-validator");
const { uploadImg, deleteImgFromCloud } = require("../utils/cloudinary");
const Cart = require("../models/cartModel");
const fs = require("fs");

// Create new product
exports.createProduct = async (req, res, next) => {
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// update product
exports.updateProduct = async (req, res, next) => {
  const { prodId } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findByIdAndUpdate(prodId, req.body, {
      new: true,
    });
    res.status(201).json(updatedProduct);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next();
  }
};

// Delete product
exports.deleteProduct = async (req, res, next) => {
  const { prodId } = req.params;
  try {
    const product = await Product.findById(prodId);
    let imageUrls = [];
    imageUrls = product.images.map((img) => img.public_id);
    await Promise.all(imageUrls.map((img) => deleteImgFromCloud(img)));
    await Cart.updateMany(
      {},
      { $set: { products: [], totalAfterDiscount: 0, cartTotal: 0 } }
    );
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Delete product image
exports.deleteProductImage = async (req, res, next) => {
  const { imgId } = req.body;
  try {
    await deleteImgFromCloud(imgId);
    res.status(200).json({ message: "Image deleted" });
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get product
exports.getProduct = async (req, res, next) => {
  const { prodId } = req.params;
  try {
    const product = await Product.findById(prodId).populate(
      "ratings.postedBy",
      "firstname lastname email mobile"
    );
    if (!product) {
      const error = new Error("This product may be deleted");
      error.statusCode = 204;
      throw error;
    }
    res.status(200).json(product);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get all products
exports.getAllProducts = async (req, res, next) => {
  let queryObj = { ...req.query };
  // Filter
  const execludeFields = ["page", "sort", "limit", "fields", "search"];
  execludeFields.forEach((it) => delete queryObj[it]);
  const strQuery = JSON.stringify(queryObj);
  queryObj = JSON.parse(
    strQuery.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)
  );

  try {
    let products = Product.find(queryObj);
    if (req.query.search) {
      let regex = new RegExp(req.query.search, "i");
      products = products.find({
        $and: [
          {
            $or: [
              { title: regex },
              { description: regex },
              { brand: regex },
              { category: regex },
            ],
          },
        ],
      });
    }

    // Sort
    if (req.query.sort) {
      const sortedBy = req.query.sort.split(",").join(" ");
      products = products.sort(sortedBy);
    } else {
      products = products.sort("-createdAt");
    }

    // Select specific data
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      products = products.select(fields);
    } else {
      products = products.select("-__v");
    }

    // Pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    const productsCount = await Product.countDocuments();

    if (req.query.page) {
      if (skip >= productsCount) {
        const error = new Error(
          "You are reached the maxmium number of products"
        );
        error.statusCode = 422;
        throw error;
      }
    }
    products = products
      .skip(skip)
      .limit(limit)
      .populate("ratings.postedBy", "firstname lastname _id email");

    const query = await products;
    res.status(200).json({ products: query, count: productsCount });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Rate product
exports.rateProduct = async (req, res, next) => {
  const { prodId, stars, comment } = req.body;
  const loggedUserId = req.user._id;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    let product = await Product.findById(prodId);
    if (!product) {
      const error = new Error("This product not found");
      error.statusCode = 404;
      throw error;
    }
    const alreadyRated = product.ratings.find(
      (rate) => rate.postedBy.toString() === loggedUserId.toString()
    );
    if (alreadyRated) {
      product = await Product.updateOne(
        { ratings: { $elemMatch: alreadyRated } },
        { $set: { "ratings.$.stars": stars, "ratings.$.comment": comment } },
        { new: true }
      );
    } else {
      product = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: { stars, comment: comment, postedBy: loggedUserId },
          },
        },
        { new: true }
      );
    }
    const ratedProduct = await Product.findById(prodId);

    let allRatings = ratedProduct.ratings.length;
    let ratingSum = ratedProduct.ratings
      .map((rate) => rate.stars)
      .reduce((prev, curr) => prev + curr);

    let actualRate = Math.fround(ratingSum / allRatings);
    const finalProduct = await Product.findByIdAndUpdate(
      prodId,
      { totalrating: actualRate },
      { new: true }
    ).populate("ratings.postedBy", "firstname lastname email mobile");
    res.status(201).json(finalProduct);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Search for product
exports.productSearch = async (req, res, next) => {
  const { search } = req.query;
  try {
    let regex = new RegExp(search, "i");
    const products = await Product.find({
      $and: [
        {
          $or: [
            { title: regex },
            { description: regex },
            { brand: regex },
            { category: regex },
          ],
        },
      ],
    })
      .select("_id title images")
      .limit(15);

    res.status(200).json(products);
  } catch (error) {}
};

// Upload images
exports.uploadImages = async (req, res, next) => {
  try {
    const uploader = (path) => uploadImg(path, "products");
    const urls = [];
    const files = req.files;

    // Upload images to cloud
    for (const file of files) {
      const newPath = await uploader(file.path);
      urls.push(newPath);
      fs.unlinkSync(file.path);
    }

    res.status(201).json(urls);
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
