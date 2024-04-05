const { Schema, model } = require("mongoose");
const { hash, genSalt, compare } = require("bcryptjs");

// user schema
const userSchema = Schema(
   {
      name: { type: String, required: true, lowercase: true },
      email: {
         type: String,
         required: [true, "Please Fill all the Fields."],
         unique: true,
      },
      password: { type: String, required: true },
      // userName: { type: String, required: true, lowercase: true },
      bio: {
         type: String,
         lowercase: true,
         default: "----bio---",
      },
      profilePic: {
         type: String,
         default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
   },
   { timestamps: true }
);

// checking the passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
   return await compare(enteredPassword, this.password);
};

// hashing the password
userSchema.pre("save", async function (next) {
   try {
      if (this.isModified("password")) {
         const salt = await genSalt(10);
         this.password = await hash(this.password, salt);
      }
      return next();
   } catch (error) {
      return next(error);
   }
});

// user model
const User = model("User", userSchema);

//exporting
module.exports = { User };

//user full name
//uniqe name (user_name)
// bio
// profile Pic
