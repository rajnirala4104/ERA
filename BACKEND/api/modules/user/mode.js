const { Schema, model } = require('mongoose')

const userSchema = Schema({
    fullName: { type: String, required: true, lowercase: true },
    userName: { type: String, required: true, lowercase: true },
    bio: { type: String, require: false, lowercase: true },
    follwers: { type: Number, default: 0 },
    follwings: { type: Number, default: 0 },
    profilePic: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
}, { timestamps: true });

const User = model('User', userSchema)


//user full name
//uniqe name (user_name)
// bio
// profile Pic
// follwers and following which initial value will be 0,0
module.exports = { User }