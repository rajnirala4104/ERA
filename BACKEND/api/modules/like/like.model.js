const { Schema, model, Types } = require("mongoose");

const likeSchema = Schema({
    user: {
        type: Types.ObjectId,
        ref: "User"
    },
    post: {
        type: Types.ObjectId,
        ref: "Post"
    }
}, { timestamp: true });

const Like = model('Like', likeSchema);
module.exports = { Like };

