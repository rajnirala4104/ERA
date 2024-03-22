const { model, Schema, Types } = require('mongoose')

// comment schema
const commentSchema = Schema({
    post: {
        type: Types.ObjectId,
        ref: "Post"
    },
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true,
    },

}, { timestamp: true })

// comment model
const Comment = model('Comment', commentSchema)
module.exports = { Comment } //exporting the coment model