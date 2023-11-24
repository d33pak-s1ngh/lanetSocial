const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      description,
      picturePath,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      userPicturePath: user.picturePath,
      likes: {},
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const {id: postId} = req.params;
    
    const post = await Post.findById(postId);
    
    if (post.likes.has(userId)) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    // await post.save();
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { message, userId } = req.body;
    
    const newComment = new Comment({
      userId,
      postId,
      message,
    });
    newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId });

    const usersToLoad = {};
    for (const { userId } of comments) {
      if (userId) {
        usersToLoad[userId] = true;
      }
    }

    const userIds = Object.keys(usersToLoad);
    const users = await Promise.all(userIds.map((uid) => User.findById(uid)));
    const filteredUsers = users.filter((user) => user); // Filter out undefined values

    console.log('users', filteredUsers);
    const commentsWithUser = comments.map(({userId, postId, message}) => {
      if (userId) {
        user = filteredUsers.find((user) => user._id.toString() === userId.toString());
        return {userId, postId, message, user};
      }
    });

    res.status(200).json(commentsWithUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFeedPosts, getUserPosts, createPost, likePost, addComment, getComments };
