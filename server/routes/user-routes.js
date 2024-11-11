const express = require("express");
const { signup, login } = require("../controllers/User-Controller");
const VerifyToken = require("../middlewares/VerifyToken");
const { getUser } = require("../controllers/DataUser-controllers");
const router = express.Router();

router.post('/signup', signup)

router.post('/login', login)

router.get('/users', VerifyToken , getUser)

router.post('/logout', VerifyToken , getUser)

module.exports = router;