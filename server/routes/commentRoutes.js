const express = require('express');
const { getCommentsByPostId, createComment } = require('../controllers/commentController');
const router = express.Router();

router.get('/:postId', getCommentsByPostId);
router.post('/:postId', createComment);

module.exports = router;
