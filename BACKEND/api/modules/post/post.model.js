const { Schema, model, Types } = require('mongoose')

const postSchema = Schema({
    cation: {
        type: String,
        lowercase: true
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
})

const Post = model('post', postSchema)
module.exports = { Post }

// cation 
// image | video - "content"
// comment = an other antity 