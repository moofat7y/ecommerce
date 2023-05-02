const router = require("express").Router();
const { body } = require("express-validator");
const userCtrl = require("../controller/userCtrl");
const Product = require("../models/productModel");
const { isAdmin, isAuth } = require("../middlewares/isAuth");
const { uploadPhoto, userImgResize } = require("../middlewares/uploadImages");

// GET all users
router.get("/", isAuth, isAdmin, userCtrl.getAllUsers);
// GET user wishlist
router.get("/wishlist", isAuth, userCtrl.geWishlist);
// GET user cart
router.get("/cart", isAuth, userCtrl.getUserCart);
// GET all user orders
router.get("/orders", isAuth, userCtrl.getOrders);
// GET single user by id
router.get("/:userId", isAuth, isAdmin, userCtrl.getSingleUser);

// UPDATE user account by owner
router.patch(
  "/",
  uploadPhoto.single("image"),
  userImgResize,
  isAuth,

  userCtrl.updateUser
);
// UPDATE user account by id by admin
router.patch("/byadmin/:userId", isAuth, isAdmin, userCtrl.updateUserByAdmin);
// Save user address
router.patch("/address", isAuth, userCtrl.saveAddress);
// Update user password
router.patch(
  "/password",
  [
    body("password", "Please enter a valid password").exists().notEmpty(),
    body("currentPassword", "Current password is required").exists().notEmpty(),
  ],
  isAuth,
  userCtrl.updatePassword
);
// Apply copon
router.patch("/apply-copon", isAuth, userCtrl.applyCopon);

// Block user by admin
router.patch("/block-user/:userId", isAuth, isAdmin, userCtrl.blockUser);
// Unblock user by admin
router.patch("/unblock-user/:userId", isAuth, isAdmin, userCtrl.unBlockUser);

// update quantity in cart
router.patch("/cart/prod-quantity", isAuth, userCtrl.updateProdQuantityInCart);

// Add to wishlist
router.put(
  "/add-wishlist",
  body("prodId").exists().notEmpty().trim(),
  isAuth,
  userCtrl.addToWishlist
);
// Add to cart
router.put(
  "/add-cart",
  isAuth,
  body("color", "color is required").exists().notEmpty(),
  userCtrl.addToCart
);

// Create order cash on delivery
router.put(
  "/create-order",
  [body("shipingaddress", "Please enter your address").exists().notEmpty()],
  isAuth,
  userCtrl.createOrder
);

// Create order cash by visa
router.post("/create-checkout-session", isAuth, userCtrl.createCheckoutSession);

// DELETE user account by owner
router.post("/delete-user", isAuth, userCtrl.deleteUser);
// DELETE user account by id by admin
router.delete(
  "/delete-byadmin/:userId",
  isAuth,
  isAdmin,
  userCtrl.deleteUserByAdmin
);
// DELETE user cart
router.delete("/clear-cart", isAuth, userCtrl.clearUserCart);

module.exports = router;
