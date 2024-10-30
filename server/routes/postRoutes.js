const express = require('express');
const { getPosts, getPostById, createPost, editPost, deletePost } = require('../controllers/postController');
const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', editPost);
router.delete('/:id', deletePost);

module.exports = router;
