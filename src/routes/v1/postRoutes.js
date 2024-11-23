const express = require("express");
const {
  createPost,
  getPosts,
  addComment,
} = require("../../controllers/postController");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/posts", authMiddleware, createPost);
router.get("/posts", getPosts);
router.post("/comments", authMiddleware, addComment);

module.exports = router;
