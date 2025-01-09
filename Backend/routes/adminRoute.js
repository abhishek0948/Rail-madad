const express = require('express');
const router = express.Router();
const updateController = require('../controllers/updateController');

router.post('/solved',updateController.tosolved);
router.post('/pending',updateController.topending);

module.exports = router;