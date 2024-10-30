const express = require('express');
const { login, signUp } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post('/signUp', signUp);

module.exports = router;