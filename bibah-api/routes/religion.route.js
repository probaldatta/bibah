const express = require('express');
const religionController = require('../controllers/religion.controller');
const router = express.Router();

router.post('/add', religionController.addReligion);
router.get('/list', religionController.listReligions);
router.get('/:id', religionController.getReligionById);
router.put('/update/:id', religionController.updateReligion);
router.delete('/delete/:id', religionController.deleteReligion);



module.exports = router;