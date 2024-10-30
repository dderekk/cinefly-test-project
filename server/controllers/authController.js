const users = require('../models/user');
const { v4: uuidv4 } = require('uuid');

const login = (req, res) => {
  const { username } = req.body;
  const user = users.find(user => user.username === username);
  if (user) {
    return res.status(200).json({ user });
  }
  return res.status(401).json({ message: 'User not found' });
};

const signUp = (req, res) => {
  const { username } = req.body;
  const user = users.find(user => user.username === username);
  if (user) {
    return res.status(409).json({ message: 'User already exists'});
  }
  const newUser = {username: username, id: uuidv4(), role: 'editor'};
  users.push(newUser);
  return res.status(200).json({ user: newUser });
};

module.exports = { login, signUp };
