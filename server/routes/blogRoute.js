const { isAuth, isAdmin } = require("../middlewares/isAuth");
const router = require("express").Router();
const blogCtrl = require("../controller/blogCtrl");
const { body } = require("express-validator");
const { uploadPhoto, blogImgResize } = require("../middlewares/uploadImages");

// Create new blog
router.put("/", isAuth, isAdmin, blogCtrl.createBlog);
// Upload image to blog
router.put(
  "/upload/:blogId",
  isAuth,
  isAdmin,
  uploadPhoto.array("images", 2),
  blogImgResize,
  blogCtrl.uploadImages
);

// Update blog
router.patch(
  "/:blogId",
  body(["title", "description", "category"], "Please fill the fields")
    .exists()
    .notEmpty(),
  isAuth,
  isAdmin,
  blogCtrl.updateBlog
);

// Get all blogs
router.get("/", blogCtrl.getAllBlogs);
// Get single blog
router.get("/:blogId", blogCtrl.getBlog);

// Like blog
router.patch("/like/:blogId", isAuth, blogCtrl.likeBlog);
// Dislike blog
router.patch("/dislike/:blogId", isAuth, blogCtrl.disLikeBlog);

// Delete blog
router.delete("/:blogId", isAuth, isAdmin, blogCtrl.deleteProduct);

module.exports = router;
