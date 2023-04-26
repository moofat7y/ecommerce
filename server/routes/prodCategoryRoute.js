const router = require("express").Router();
const categoryCtrl = require("../controller/prodCategoryCtrl");
const { body } = require("express-validator");
const { isAuth, isAdmin } = require("../middlewares/isAuth");
const Category = require("../models/prodCategoryModel");
// Create new category
router.put(
  "/",
  [
    body("title")
      .exists()
      .notEmpty()
      .custom(async (value, { req }) => {
        const category = await Category.findOne({ title: value });
        if (category) {
          return Promise.reject("This title exist before");
        }
      }),
  ],
  isAuth,
  isAdmin,
  categoryCtrl.createCategory
);

// Update categroy
router.patch(
  "/:catId",
  body("title", "Title is required").exists().notEmpty(),
  isAuth,
  isAdmin,
  categoryCtrl.updateCategory
);

// Get all categories
router.get("/", categoryCtrl.getAllCategory);
// Get category
router.get("/:catId", categoryCtrl.getCategory);

// Delete categgory
router.delete("/:catId", isAuth, isAdmin, categoryCtrl.deleteCategory);

module.exports = router;
