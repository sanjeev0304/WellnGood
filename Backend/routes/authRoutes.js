const express = require("express");
const router = express.Router();
const googleLogin = require('../controller/googleLogin');

router.post('/google',googleLogin);


module.exports = router;