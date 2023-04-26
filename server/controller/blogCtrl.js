const Blog = require("../models/blogModel");
const { validationResult } = require("express-validator");
const fs = require("fs");
const { uploadImg, deleteImgFromCloud } = require("../utils/cloudinary");

// Create new blog
exports.createBlog = async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Update blog
exports.updateBlog = async (req, res, next) => {
  const { blogId } = req.params;
  const { title, description, category } = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { title, description, category },
      { new: true }
    );
    res.status(201).json(blog);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get single blog by id
exports.getBlog = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $inc: { numViews: 1 } },
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get all products
exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Delete product
exports.deleteProduct = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    await Blog.findByIdAndDelete(blogId);
    res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Like blog
exports.likeBlog = async (req, res, next) => {
  const { blogId } = req.params;
  const loginUserId = req.user._id;
  try {
    let blog = await Blog.findById(blogId);
    if (!blog) {
      const error = new Error("This blog not found");
      error.statusCode = 404;
      throw error;
    }
    const isLiked = blog.isLiked;
    const isDisliked = blog.isDisliked;

    if (isDisliked) {
      blog = await Blog.findByIdAndUpdate(
        blogId,
        { $pull: { disLikes: loginUserId }, isDisliked: false },
        { new: true }
      );
    }
    if (isLiked) {
      blog = await Blog.findByIdAndUpdate(
        blogId,
        { $pull: { likes: loginUserId }, isLiked: false },
        { new: true }
      );
    } else {
      blog = await Blog.findByIdAndUpdate(
        blogId,
        { $push: { likes: loginUserId }, isLiked: true },
        { new: true }
      );
    }

    res.status(201).json(blog);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Dislike post
exports.disLikeBlog = async (req, res, next) => {
  const { blogId } = req.params;
  const loginUserId = req.user._id;
  try {
    let blog = await Blog.findById(blogId);
    if (!blog) {
      const error = new Error("This blog not found");
      error.statusCode = 404;
      throw error;
    }
    const isLiked = blog.isLiked;
    const isDisliked = blog.isDisliked;

    if (isLiked) {
      blog = await Blog.findByIdAndUpdate(
        blogId,
        { $pull: { likes: loginUserId }, isLiked: false },
        { new: true }
      );
    }
    if (isDisliked) {
      blog = await Blog.findByIdAndUpdate(
        blogId,
        { $pull: { disLikes: loginUserId }, isDisliked: false },
        { new: true }
      );
    } else {
      blog = await Blog.findByIdAndUpdate(
        blogId,
        { $push: { disLikes: loginUserId }, isDisliked: true },
        { new: true }
      );
    }

    res.status(201).json(blog);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Upload images
exports.uploadImages = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    // await uploadImg(req.files[0].path);

    const uploader = (path) => uploadImg(path, "blogs");
    const urls = [];
    const files = req.files;

    const oldBlog = await Blog.findById(blogId);

    // Delete existing images from cloud
    if (oldBlog.images.length > 0) {
      oldBlog.images.forEach(async (img) => {
        await deleteImgFromCloud(img.public_id);
      });
    }

    // Upload images to cloud
    for (const file of files) {
      const newPath = await uploader(file.path);
      urls.push(newPath);
      fs.unlinkSync(file.path);
    }
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { images: [...urls] },
      { new: true }
    );
    res.status(201).json(blog);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
