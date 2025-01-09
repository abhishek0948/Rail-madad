const express = require('express');
const router = express.Router();

const saveController = require('../controllers/saveController.js');
const pendingController = require('../controllers/updateController.js');

router.post('/save',saveController.saveComplaint);
router.post('/info',saveController.getInfo);

router.post('/',(req,res,next) => {
    res.send("<h1> Post / req </h1>");
})

module.exports = router;