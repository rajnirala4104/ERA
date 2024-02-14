const { model, Schema, Types } = require('mongoose')

const commentSchema = Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true,
    },

}, { tiemstamp: true })

const Comment = model('Comment', commentSchema)
module.exports = { Comment }