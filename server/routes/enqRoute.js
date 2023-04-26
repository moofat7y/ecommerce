const router = require("express").Router();
const enquiryCtrl = require("../controller/enqCtrl");
const { body } = require("express-validator");
const { isAuth, isAdmin } = require("../middlewares/isAuth");

// Create new enquiry
router.put("/", isAuth, enquiryCtrl.createEnquiry);

// Update enquiry
router.patch(
  "/:enquiryId",
  body(["status"], "Status is required").exists().notEmpty(),
  isAuth,
  isAdmin,
  enquiryCtrl.updateEnquiry
);

// Get all enquirys
router.get("/", isAuth, isAdmin, enquiryCtrl.getAllEnquiry);
// Get enquiry
router.get("/:enquiryId", isAuth, isAdmin, enquiryCtrl.getEnquiry);

// Delete enquiry
router.delete("/:enquiryId", isAuth, isAdmin, enquiryCtrl.deleteEnquiry);

module.exports = router;
