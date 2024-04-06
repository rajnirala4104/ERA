const { Types, model } = require("mongoose");
const { Schema } = require("mongoose");

// schema
const followersSchema = Schema({

    // user who is following
    user: {
        type: Types.ObjectId,
        ref: "User"
    },

    // user being followed
    followingUserId: {
        type: Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true })

// model
const Followers = model("Followers", followersSchema);
module.exports = { Followers }; 