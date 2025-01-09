const express = require("express");
const authController = require("../controllers/authController.js");
const singleUpload = require('./../middlewares/multer.js');
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated.js");

router.route("/signup").post(singleUpload,authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);
router.route("/admin-login").post(authController.adminLogin)
module.exports = router;