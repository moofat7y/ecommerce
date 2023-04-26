const router = require("express").Router();
const colorCtrl = require("../controller/colorCtrl");
const { body } = require("express-validator");
const { isAdmin, isAuth } = require("../middlewares/isAuth");

// Create new color
router.put("/", isAuth, isAdmin, colorCtrl.createColor);

// Get all colors
router.get("/", colorCtrl.getAllColors);

// Get color by id
router.get("/:colorId", colorCtrl.getColor);

// Update color
router.patch(
  "/:colorId",
  [body("title", "Fill all required fields").exists().notEmpty()],
  isAuth,
  isAuth,
  colorCtrl.updateColor
);

// Delete color
router.delete("/:colorId", isAuth, isAdmin, colorCtrl.deleteColor);
module.exports = router;
