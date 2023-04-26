const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/isAuth");
const stripeCtrl = require("../controller/stripeCtrl");
router.post(
  "/create-checkout-session",
  isAuth,
  stripeCtrl.createCheckoutSession
);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeCtrl.stripeHook
);

module.exports = router;
