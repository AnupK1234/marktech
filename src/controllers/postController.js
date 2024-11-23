const Post = require("../models/Post");
const Comment = require("../models/Comment");

const createPost = async (req, res) => {
  try {
    const { text, media } = req.body;
    const post = new Post({ text, media, user: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const { page, limit } = req.query;
  
    // Check if pagination parameters are provided
    if (page && limit) {
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);

      // Validate the query parameters
      if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
        return res.status(400).json({ error: "Invalid page or limit parameters" });
      }

      const posts = await Post.find()
        .populate("user", "name email")
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

      // Count total documents for pagination metadata
      const totalPosts = await Post.countDocuments();
      const totalPages = Math.ceil(totalPosts / limitNum);

      return res.json({
        currentPage: pageNum,
        totalPages,
        totalPosts,
        posts,
      });
    }

    // If no pagination parameters, return all posts
    const allPosts = await Post.find().populate("user", "name email");
    res.json(allPosts);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const addComment = async (req, res) => {
  try {
    const { postId, text } = req.body;
    const comment = new Comment({ text, post: postId, user: req.user.id });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createPost, addComment, getPosts };
