const express = require('express');
const { loginController, addUser } = require('../controller/generalController');
const router = express.Router()


//common routes
router.post("/login", loginController)

module.exports = router;