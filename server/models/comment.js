const { v4: uuidv4 } = require('uuid');

let comments = [];

const addComment = (postId, content, author) => {
  const comment = { id: uuidv4(), postId, content, author };
  comments.push(comment);
  return comment;
};

module.exports = { comments, addComment };
