const express = require('express');
// const multer = require('multer');
// const upload = multer();
const router = express.Router();

const saveController = require('../controllers/saveController.js');
const pendingController = require('../controllers/updateController.js');

router.post('/save',saveController.saveComplaint);
router.post('/info',saveController.getInfo);

router.post('/imageComplaint', saveController.imageComplaint);

router.post('/',(req,res,next) => {
    res.send("<h1> Post / req </h1>");
})

module.exports = router;