const mongoose = require('mongoose')

const userScehma = mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    roles: {
        type: Array,
    }
})

const userModel = mongoose.model('user', userScehma);

module.exports = { userModel }