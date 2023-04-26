const router = require("express").Router();
const coponCtrl = require("../controller/coponCtrl");
const { body } = require("express-validator");
const { isAdmin, isAuth } = require("../middlewares/isAuth");

// Create new copon
router.put("/", isAuth, isAdmin, coponCtrl.createCopon);

// Get all copons
router.get("/", isAuth, isAdmin, coponCtrl.getAllCopons);

// Update copon
router.patch(
  "/:coponId",
  [
    body(["name", "discount", "expire"], "Fill all required fields")
      .exists()
      .notEmpty(),
  ],
  isAuth,
  isAuth,
  coponCtrl.updateCopon
);

// Delete copon
router.delete("/:coponId", isAuth, isAdmin, coponCtrl.deleteCopon);
module.exports = router;
