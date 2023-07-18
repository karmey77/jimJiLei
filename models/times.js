const mongoose = require('mongoose')
const { float } = require('webidl-conversions')
const Schema = mongoose.Schema

const timesSchema = new Schema({
    kissTimes: {
        type: Number,
        default: 0
    },
    userId: {  // 加入關聯設定
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    }
})

module.exports = mongoose.model('Times', timesSchema)
