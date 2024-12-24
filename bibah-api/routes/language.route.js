const express = require('express');
const languageController = require('../controllers/language.controller');
const router = express.Router();

router.post('/add', languageController.addLanguage);
router.get('/list', languageController.listLanguages);
router.get('/:id', languageController.getLanguageById);
router.put('/update/:id', languageController.updateLanguage);
router.delete('/delete/:id', languageController.deleteLanguage);



module.exports = router;