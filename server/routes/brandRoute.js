const router = require("express").Router();
const brandCtrl = require("../controller/brandCtrl");
const { body } = require("express-validator");
const { isAuth, isAdmin } = require("../middlewares/isAuth");

// Create new brand
router.put("/", isAuth, isAdmin, brandCtrl.createBrand);

// Update brand
router.patch(
  "/:brandId",
  body("title", "Title is required").exists().notEmpty(),
  isAuth,
  isAdmin,
  brandCtrl.updateBrand
);

// Get all brands
router.get("/", brandCtrl.getAllBrand);
// Get brand
router.get("/:brandId", brandCtrl.getBrand);

// Delete brand
router.delete("/:brandId", isAuth, isAdmin, brandCtrl.deleteBrand);

module.exports = router;
