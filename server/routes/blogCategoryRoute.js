const router = require("express").Router();
const categoryCtrl = require("../controller/blogCategoryCtrl");
const { body } = require("express-validator");
const { isAuth, isAdmin } = require("../middlewares/isAuth");

// Create new category
router.put("/", isAuth, isAdmin, categoryCtrl.createCategory);

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
