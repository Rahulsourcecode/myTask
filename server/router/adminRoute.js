const express = require('express');
const { addUser, addRole } = require('../controller/adminController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router()

//defining admin routes
router.post('/addUser', addUser)

router.post("/addRoles",verifyToken, addRole)

module.exports = router;