const { model, Schema, Types } = require('mongoose')
const thoughtPostSchema = Schema({
    user: {
        type: Types.ObjectId,
        ref: "User"
    },
    thought: {
        type: String,
        require: true,
        lowercase: true,
    }
}, { timespamts: true })

const ThoughtPost = model('ThoughtPost', thoughtPostSchema)
module.exports = { ThoughtPost }