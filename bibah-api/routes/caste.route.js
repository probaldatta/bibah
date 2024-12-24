const express = require('express');
const router = express.Router();
const casteController = require('../controllers/caste.controller');

router.post('/add', casteController.addCaste);
router.get('/list', casteController.listCastes);
router.get('/delete/:id', casteController.deleteCaste);
router.post('/update/:id', casteController.updateCaste);


module.exports = router;