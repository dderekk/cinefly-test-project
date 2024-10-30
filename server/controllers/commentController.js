const { comments, addComment } = require("../models/comment");

const getCommentsByPostId = (req, res) => {
  const postComments = comments.filter(
    (comment) => comment.postId === req.params.postId
  );
  res.status(200).json(postComments);
};

const createComment = (req, res) => {
  const { postId } = req.params;
  const { content, author } = req.body;
  const comment = addComment(postId, content, author);
  res.status(201).json(comment);
};

module.exports = { getCommentsByPostId, createComment };
