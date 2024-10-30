const { posts, addPost, updatePost } = require("../models/post");

const getPosts = (req, res) => {
  res.status(200).json(posts);
};

const getPostById = (req, res) => {
  const post = posts.find((post) => post.id === req.params.id);
  if (post) return res.status(200).json(post);
  return res.status(404).json({ message: "Post not found" });
};

const createPost = (req, res) => {
  const { title, content, author } = req.body;
  const post = addPost(title, content, author);
  res.status(201).json(post);
};

const editPost = (req, res) => {
  const updatedPost = updatePost(req.params.id, req.body);
  if (updatedPost) return res.status(200).json(updatedPost);
  return res.status(404).json({ message: "Post not found" });
};

const deletePost = (req, res) => {
  const index = posts.findIndex((post) => post.id === req.params.id);
  if (index !== -1) {
    posts.splice(index, 1);
    return res.status(200).json({ message: "Post deleted successfully" });
  }
  return res.status(404).json({ message: "Post not found" });
};

module.exports = { getPosts, getPostById, createPost, editPost, deletePost };
