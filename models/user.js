const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { float } = require('webidl-conversions')
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    account: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)