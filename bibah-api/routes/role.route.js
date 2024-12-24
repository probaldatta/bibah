const express = require('express');
const roleController = require('../controllers/role.controller');
const router = express.Router();

router.post('/add', roleController.addRole);

module.exports = router;