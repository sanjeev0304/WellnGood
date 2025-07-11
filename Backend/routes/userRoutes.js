const express = require("express");
const router = express.Router();
const userData = require('../controller/userData');
const verifyToken = require('../middleware/authMiddleware')

router.get('/data', verifyToken, userData); //status 401


module.exports = router;