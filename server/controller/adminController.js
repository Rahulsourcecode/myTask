const { tryCatch } = require("../utils/tryCatch")
const { userModel } = require('../model/user.model')
const bcrypt = require('bcrypt');
const { roleModel } = require("../model/role.model");
const saltArgument = 10;
const addUser = tryCatch(async (req, res) => {
    console.log(req.body);
    const { username, firstname, lastname, password, email, mobile, roles } = req.body;
    const user = await userModel.findOne({ username })
    if (user) {
        res.status(400).json({ message: "user already exists" })
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
            res.status(400).json({ message: "registration failed" })
        }
        res.status(200).json({ message: "success" })
    }

})

const addRole = tryCatch(async (req, res) => {
    const { role, description, permisssions } = req.body
    console.log(req.body);
    const roleexist = await roleModel.findOne({ role: role })
    if (roleexist) {
        return res.status(400).json({ message: "role already exists" })
    }
    const values = new roleModel({
        role,
        description,
        permisssions
    })
    console.log(values);
    const savedValues = await values.save()
    console.log(savedValues);
    if (!savedValues) {
        // throw new Error("unable to add role")
        return res.status(404).json({ message: "unable to add role" })
    }
    return res.status(200).json({ message: "success" })
})

module.exports = {
    addUser,
    addRole
}