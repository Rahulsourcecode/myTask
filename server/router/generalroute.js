const express = require('express');
const { loginController, addUser } = require('../controller/generalController');
const router = express.Router()

router.post("/login", loginController)

module.exports = router;