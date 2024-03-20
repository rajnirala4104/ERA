const { Schema, model, Types } = require('mongoose')

const postSchema = Schema({
    user: {
        type: Types.ObjectId,
        ref: "User"
    },
    caption: {
        type: String,
        lowercase: true,
        required: false
    },
    content: {
        type: String,
        required: true,
        default: 'https://cdn.onlinewebfonts.com/svg/img_98811.png'
    },
    comment: {
        type: Types.ObjectId,
        ref: "Comment",
    }
},
    { timestamps: true }
)

const Post = model('Post', postSchema)
module.exports = { Post }
