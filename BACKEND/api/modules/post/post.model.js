const { Schema, model, Types } = require('mongoose')

// post Schema
const postSchema = Schema({
    user: {
        type: Types.ObjectId,
        ref: "User"
    },
    caption: {
        type: String,
        lowercase: true,
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

// post model
const Post = model('Post', postSchema)
module.exports = { Post } //exporting the  model
