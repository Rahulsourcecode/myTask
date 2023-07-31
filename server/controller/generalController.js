const { userModel } = require("../model/user.model")
const { tryCatch } = require("../utils/tryCatch")
const bcrypt = require('bcrypt')
require('dotenv').config()
var jwt = require('jsonwebtoken');

const loginController = tryCatch(async (req, res) => {
    console.log(1)
    const { username, password } = req.body;
    const user = await userModel.findOne({ username: username })
    if (!user) {
        res.status(400).json({ message: "user not found" })
    }
    const passwordVerified = await bcrypt.compare(password, user.password)
    if (!passwordVerified) {
        res.status(400).json({ message: "invalid password" })

    }
    const token = jwt.sign({ id: user.username }, process.env.secretKey, {
        expiresIn: "1h",
    });
    
    res.status(200).cookie("token", token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 60 * 60), 
        httpOnly: true,
        SameSite:'None',
        secure: true, 
      }).json({
        message: "Successfully Logged in",
        user: user, token
      })
   
})


module.exports = {
    loginController,
}