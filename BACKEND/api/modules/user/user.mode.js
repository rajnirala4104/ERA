const { Schema, model } = require('mongoose')
const { hash, genSalt, compare } = require('bcryptjs')

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


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (next) {
    try {
        if (this.isModified("password")) {
            const salt = await genSalt(10);
            this.password = await hash(this.password, salt);
        }
        return next();
    } catch (error) {
        return next(error)
    }
})

const User = model('User', userSchema)

module.exports = { User }


//user full name
//uniqe name (user_name)
// bio
// profile Pic
