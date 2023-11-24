const express = require("express");
const { verifyToken } = require("../middleware/auth");

const {
  getFeedPosts,
  getUserPosts,
  likePost,
  addComment,
  getComments,
} = require("../controllers/posts");

const router = express.Router();

// Read posts
router.get("/", verifyToken, getFeedPosts);

router.get("/:userId/posts", verifyToken, getUserPosts);

// Add comment
router.post("/:postId/comment", verifyToken, addComment);


// Get comment
router.get("/:postId/comment", verifyToken, getComments);

// update
router.patch("/:id/like", verifyToken, likePost);

module.exports = router;
