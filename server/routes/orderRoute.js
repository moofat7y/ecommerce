const router = require("express").Router();
const { isAdmin, isAuth } = require("../middlewares/isAuth");
const orderCtrl = require("../controller/orderCtrl");
const { body } = require("express-validator");
// GET all orders in db
router.get("/", isAuth, isAdmin, orderCtrl.getOrders);
// GET dashboard details
router.get("/dashboard", orderCtrl.getDashboardDetails);
// GET count of orders in each month
router.get("/month", orderCtrl.getOrdersByMonth);
// GET order by id
router.get("/:orderId", isAuth, isAdmin, orderCtrl.getOrderById);
// Update order status
router.patch(
  "/:orderId",
  body("status", "Please enter a valid status").exists().notEmpty().trim(),
  isAuth,
  isAdmin,
  orderCtrl.updateOrderStatus
);

// Delete order
router.delete("/:orderId", isAuth, isAdmin, orderCtrl.deleteOrder);
module.exports = router;
