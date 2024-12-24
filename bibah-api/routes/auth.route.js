const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();
const authenticateUser = require('../middleware/auth.middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refreshToken', authController.refreshToken);
router.get('/user-info', authenticateUser, authController.getUserInfo);


module.exports = router;
