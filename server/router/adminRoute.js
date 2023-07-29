const express = require('express');
const { addUser } = require('../controller/adminController');
const router = express.Router()

//defining admin routes
router.post('/addUser', addUser)

module.exports = router;