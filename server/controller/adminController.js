const { tryCatch } = require("../utils/tryCatch")
const { userModel } = require('../model/user.model')
const bcrypt = require('bcrypt')
const saltArgument = 10;
const addUser = tryCatch(async (req, res) => {
    console.log(req.body);
    const { username, firstname, lastname, password, email, mobile, roles } = req.body;
    const user = await userModel.findOne({ username })
    if (user) {
        throw new Error("user already exists")
    } else {
        const encryptedPassword = await bcrypt.hash(password, saltArgument)
        const user = new userModel({
            username,
            firstname,
            lastname,
            password: encryptedPassword,
            email,
            mobile,
            roles
        })
        const userSaved = await user.save()
        if (!userSaved) {
            throw new Error("user not saved")
        }
        res.status(200).json({ message: "success" })
    }

})


module.exports = {
    addUser,
}