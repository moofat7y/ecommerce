const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Copon = require("../models/coponModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// GET all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select(
      "-password -passwordResetToken  -refreshToken -passowrdResetExpire -passwordChangedAt "
    );
    res.status(200).json(users);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// GET single user
exports.getSingleUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).select("-password -role");
    res.status(200).json(user);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Add to wishlist
exports.addToWishlist = async (req, res, next) => {
  const loggedUserId = req.user._id;
  const { prodId } = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const product = await Product.findById(prodId);
    if (!product) {
      const error = new Error("This product not found");
      error.statusCode = 404;
      throw error;
    }
    let user = await User.findById(loggedUserId);
    const alreadyWishlist = user.wishlist.find(
      (id) => id.toString() === prodId.toString()
    );
    if (alreadyWishlist) {
      user = await User.findByIdAndUpdate(
        loggedUserId,
        { $pull: { wishlist: prodId } },
        { new: true }
      );
    } else {
      user = await User.findByIdAndUpdate(
        loggedUserId,
        { $push: { wishlist: prodId } },
        { new: true }
      );
    }
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Get wishlist
exports.geWishlist = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const userWishlist = await User.findById(_id).populate("wishlist");
    res.status(200).json(userWishlist.wishlist);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Add product to user cart
// UNDER TESTING **********************
exports.addToCart = async (req, res, next) => {
  const { prodId, color, size } = req.body;
  const { _id } = req.user._id;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 403;
      throw error;
    }
    const foundProduct = await Product.findById(prodId);
    const userCart = await Cart.findOne({ user: _id });
    const alreadyAdded = userCart.products.findIndex(
      (prod) =>
        prod.product.toString() === prodId.toString() &&
        prod.color === color &&
        prod.size === size
    );
    if (alreadyAdded >= 0) {
      const newProduct = {
        product: userCart.products[alreadyAdded].product,
        quantity: userCart.products[alreadyAdded].quantity + 1,
        color: color,
        size: size,
        price: userCart.products[alreadyAdded].price,
      };
      userCart.products[alreadyAdded] = newProduct;
    } else {
      const product = {
        product: foundProduct._id,
        quantity: 1,
        color: color,
        size: size,
        price: foundProduct.price,
      };
      userCart.products.push(product);
    }
    let totalPrice = 0;
    for (let i = 0; i < userCart.products.length; i++) {
      totalPrice =
        totalPrice + userCart.products[i].price * userCart.products[i].quantity;
    }
    userCart.cartTotal = totalPrice;
    await userCart.save();
    await userCart.populate("products.product", "-createdAt -updatedAt");
    res.status(201).json(userCart);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Delete product form cart
exports.updateProdQuantityInCart = async (req, res, next) => {
  const { prodId, size, color, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    const deletedProd = cart.products.find(
      (prod) =>
        prod.product.toString() === prodId &&
        prod.color.toLowerCase() === color.toLowerCase() &&
        prod.size === size
    );
    if (!deletedProd) {
      const error = new Error("Product not found in cart");
      error.statusCode = 404;
      throw error;
    }
    if (+quantity === 0) {
      cart.products = cart.products.filter(
        (prod) =>
          prod.product.toString() !== prodId ||
          prod.color.toLowerCase() !== color.toLowerCase() ||
          prod.size !== size
      );
      cart.cartTotal =
        cart.cartTotal - deletedProd.quantity * deletedProd.price;
    } else {
      const deleteProdTotalprice = deletedProd.price * deletedProd.quantity;
      cart.cartTotal = cart.cartTotal - deleteProdTotalprice;
      cart.products = cart.products.map((prod) =>
        prod.product.toString() === prodId &&
        prod.color.toLowerCase() === color.toLowerCase() &&
        prod.size.toLowerCase() === size.toLowerCase()
          ? { ...prod, quantity: quantity }
          : prod
      );
      cart.cartTotal = cart.cartTotal + deletedProd.price * quantity;
    }
    const newCart = await (await cart.save()).populate("products.product");
    res.status(200).json(newCart);
  } catch (error) {
    next(error);
  }
};

// Clear user card
exports.clearUserCart = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: _id },
      {
        products: [],
        totalAfterDiscount: 0,
        cartTotal: 0,
      },
      {
        new: true,
      }
    );
    res.status(201).json(cart);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get user cart
exports.getUserCart = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const cart = await Cart.findOne({ user: _id }).populate("products.product");
    res.status(200).json(cart);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Apply user copon
exports.applyCopon = async (req, res, next) => {
  const { copon } = req.body;
  const { _id } = req.user;
  try {
    const validCopon = await Copon.findOne({ name: copon });
    const isUsedBefore = validCopon.usedBy.findIndex(
      (id) => id.toString() === _id.toString()
    );
    if (isUsedBefore >= 0) {
      const error = new Error("This copon is used before");
      error.statusCode = 400;
      throw error;
    }
    if (!copon) {
      const error = new Error("Invalid copon");
      error.statusCode = 404;
      throw error;
    }
    let { cartTotal } = await Cart.findOne({ user: _id }).populate(
      "products.product"
    );
    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * validCopon.discount) / 100
    ).toFixed(2);
    const cart = await Cart.findOneAndUpdate(
      { user: _id },
      { totalAfterDiscount },
      {
        new: true,
      }
    );
    await Copon.findOneAndUpdate({ name: copon }, { $push: { usedBy: _id } });
    res.status(201).json(cart);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Create order cash on delivery
exports.createOrder = async (req, res, next) => {
  const { shipingaddress, coponApplied } = req.body;
  const { _id } = req.user;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const cart = await Cart.findOne({ user: _id });
    // check if cart is empty
    if (!cart.products.length > 0) {
      const error = new Error("Cart is empty");
      error.statusCode = 400;
      throw error;
    }

    let finalAmount = 0;
    if (coponApplied && cart.totalAfterDiscount) {
      finalAmount = cart.totalAfterDiscount;
    } else {
      finalAmount = cart.cartTotal;
    }
    let order = await Order.create({
      products: cart.products,
      shipingaddress,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        status: "Cash On Delivery",
        created: Date.now(),
        currency: "egp",
      },
      orderby: _id,
      expireAt: Date.now() + 8.64e9,
    });

    // clear cart after order
    await Cart.findOneAndUpdate(
      { user: _id },
      { products: [], totalAfterDiscount: 0, cartTotal: 0 }
    );
    let update = cart.products.map((prod) => {
      return {
        updateOne: {
          filter: { _id: prod.product._id },
          update: { $inc: { quantity: -prod.quantity, sold: +prod.quantity } },
        },
      };
    });
    await Product.bulkWrite(update, {});

    const orderWithPopProducts = await order.populate(
      "products.product",
      "title description images _id price"
    );
    res.status(201).json(orderWithPopProducts);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Create order cash by visa
exports.createCheckoutSession = async (req, res, next) => {
  try {
    const userCart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product"
    );
    if (!userCart.products.length > 0) {
      const error = new Error("عربة التسوق فارغه");
      error.statusCode = 403;
      throw error;
    }

    const line_items = userCart.products.map((prod) => {
      return {
        price_data: {
          currency: "egp",
          product_data: {
            name: prod.product.title,
            images: [prod.product.images[0]?.secure_url],
          },
          unit_amount: +`${prod.price}00`,
        },
        quantity: prod.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ["EG"],
      },
      customer_email: req.user.email,
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (error) {
    throw error;
  }
};

// Get user orders
exports.getOrders = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const orders = await Order.find({ orderby: _id }).populate(
      "products.product",
      "title description images _id price"
    );

    res.status(200).json(orders);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// DELETE user account by owner
exports.deleteUser = async (req, res, next) => {
  const { password } = req.body;
  try {
    const user = await User.findById(req.user._id);
    const isPassCorrect = await user.isPasswordMatch(password);
    if (!isPassCorrect) {
      const error = new Error("كلمة المرور التي ادخلتها غير صحيحه");
      error.statusCode = 422;
      throw error;
    }

    await user.delete();
    await Cart.findOneAndDelete({ user: user._id });
    await Product.updateMany(
      {},
      { $pull: { ratings: { postedBy: user._id } } }
    );
    res.clearCookie("refreshToken", {
      secure: true,
      httpOnly: true,
    });
    res.status(200).json({ message: "Your account has been deleted" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// DELETE user account by admin
exports.deleteUserByAdmin = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("This user not exist");
      error.statusCode = 404;
      throw error;
    }
    await user.delete();
    res.status(200).json({ message: "Account has been deleted" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// UPDATE user account by owner
exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile: req.body.mobile,
        email: req.body.email,
      },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// UPDATE user account by id from admin
exports.updateUserByAdmin = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile: req.body.mobile,
        email: req.body.email,
        role: req.body.role,
      },
      { new: true }
    );

    res.status(201).json({ user: updatedUser });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Update user password
exports.updatePassword = async (req, res, next) => {
  const { _id } = req.user;
  const password = req.body.password;
  const currentPassword = req.body.currentPassword;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const user = await User.findById(_id);
    const isPasswordCorrect = await user.isPasswordMatch(currentPassword);
    if (!isPasswordCorrect) {
      const error = new Error("الباسورد الذي ادخلته غير صحيح");
      error.statusCode = 403;
      throw error;
    }
    user.password = password;
    user.passwordChangedAt = Date.now();
    const updatedUser = await user.save();

    res.status(201).json({ message: "تيم تغيير كلمة المرور بنجاح" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Save address
exports.saveAddress = async (req, res, next) => {
  const { _id } = req.user;
  const { address } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      _id,
      { address },
      { new: true }
    ).select("-password -token -refreshToken");
    res.status(201).json(user);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Block user
exports.blockUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
    res.status(201).json({ message: "User blocked" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Unblock user
exports.unBlockUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
    res.status(201).json({ message: "User is unblocked" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
