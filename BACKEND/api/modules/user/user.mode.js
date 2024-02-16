const { Schema, model } = require('mongoose')

const userSchema = Schema({
    name: { type: String, required: true, lowercase: true },
    email: {
        type: String,
        required: [true, "Please Fill all the Fields."],
        unique: true,
    },
    password: { type: String, required: true },
    // userName: { type: String, required: true, lowercase: true },
    bio: { type: String, required: false, lowercase: true },
    profilePic: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
}, { timestamps: true });

const User = model('User', userSchema)

module.exports = { User }


//user full name
//uniqe name (user_name)
// bio
// profile Pic
