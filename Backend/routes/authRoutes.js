const express = require("express");
const router = express.Router();
const googleLogin = require('../controller/googleLogin');
const {
    login,
    signUp,
    logout,
    loginStatus,
    refreshTokenGenerator
  } = require('../controller/authController');
const verifyToken = require("../middleware/authMiddleware");


router.post('/google',googleLogin);
router.post('/login', login);
router.post('/logout', verifyToken, logout);
router.post('/loginStatus', verifyToken, loginStatus);
router.post('/refresh', refreshTokenGenerator);
router.post('/signup', signUp);

module.exports = router;