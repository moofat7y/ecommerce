const router = require("express").Router();
const { isAuth, isAdmin } = require("../middlewares/isAuth");
const productCtrl = require("../controller/productCtrl");
const { body } = require("express-validator");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewares/uploadImages");

// Create new product
router.put("/", isAuth, isAdmin, productCtrl.createProduct);
// Upload images to product
router.put(
  "/upload-image",
  isAuth,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  productCtrl.uploadImages
);
// Rate product
router.put(
  "/rate",
  [
    body("prodId", "Please fill all required faileds")
      .exists()
      .notEmpty()
      .trim(),
    body("stars")
      .exists()
      .notEmpty()
      .custom(async (value, { req }) => {
        if (value < 0 || value > 5) {
          return Promise.reject("Invalid rating value");
        }
      }),
  ],
  isAuth,
  productCtrl.rateProduct
);

// Get all products
router.get("/", productCtrl.getAllProducts);
// Search to get products
router.get("/search", productCtrl.productSearch);
// Get product by id
router.get("/:prodId", productCtrl.getProduct);

// Update product
router.patch("/:prodId", isAuth, isAdmin, productCtrl.updateProduct);

// Delete product image
router.post("/delete-image", isAuth, isAdmin, productCtrl.deleteProductImage);
// Delete product by id
router.delete("/:prodId", isAuth, isAdmin, productCtrl.deleteProduct);

module.exports = router;
