const express = require('express');
const { addUser, addRole, getRoles } = require('../controller/adminController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router()


//routes of admin
router.post("/addRoles", verifyToken, addRole)
router.post('/addUser', verifyToken, addUser)
router.get('/getRoles', verifyToken, getRoles)
module.exports = router;