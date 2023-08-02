const { roleModel } = require("../model/role.model");
const { userModel } = require("../model/user.model")
const { tryCatch } = require("../utils/tryCatch")
const bcrypt = require('bcrypt')
require('dotenv').config()
var jwt = require('jsonwebtoken');

const loginController = tryCatch(async (req, res) => {
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
    const data = await roleModel.find()
    const permissions = data?.filter(x => user.roles.includes(x.role)).map(x => x.permissions)
    const access = [].concat(...permissions)
    const uniqueValuesSet = new Set();
    const filteredData = access.reduce((acc, item) => {
        const key = Object.keys(item)[0];
        if (!uniqueValuesSet.has(key)) {
            uniqueValuesSet.add(key);
            acc.push(item[key]);
        }
        return acc;
    }, []);
    const roles = [].concat(...filteredData)
    res.status(200).cookie("token", token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 60 * 60),
        httpOnly: true,
        SameSite: 'None',
        secure: true,
    }).json({
        message: "Successfully Logged in",
        user, roles, token, access: [...uniqueValuesSet]
    })

})


module.exports = {
    loginController,
}