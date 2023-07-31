const mongoose = require('mongoose')


const roleSchema = mongoose.Schema({
    role: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        required: true
    },
    permissions: {
        type: Array,
        requred: true
    }
})


const roleModel = mongoose.model('role', roleSchema)

module.exports = { roleModel }