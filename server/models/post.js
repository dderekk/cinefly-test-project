const { v4: uuidv4 } = require('uuid');

let posts = [];

const addPost = (title, content, author) => {
  const post = { id: uuidv4(), title, content, author, comments: [] };
  posts.push(post);
  return post;
};

const updatePost = (id, updatedData) => {
  const index = posts.findIndex(post => post.id === id);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updatedData };
    return posts[index];
  }
  return null;
};

module.exports = { posts, addPost, updatePost };
