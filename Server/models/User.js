const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 32
    },
    password: {
        type: String,
        required: true,
        max: 32,
        min: 7
    }
})

module.exports = mongoose.model('User', userSchema)