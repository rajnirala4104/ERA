const { Schema, model, Types } = require("mongoose");

// like schema
const likeSchema = Schema({
    user: {
        type: Types.ObjectId,
        ref: "User"
    },
    post: {
        type: Types.ObjectId,
        ref: "Post"
    }
}, { timestamps: true });

// like model
const Like = model('Like', likeSchema);
module.exports = { Like };

