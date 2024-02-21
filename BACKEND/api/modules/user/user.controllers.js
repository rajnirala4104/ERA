const expressAsyncHandler = require("express-async-handler");
const { User } = require("./user.mode");
const { StatusCodes } = require('http-status-codes')
const { generateToken } = require('../../config/generateToken')

// controllers object
const userControllers = {
    userRegistration: expressAsyncHandler(async (req, res) => {
        try {
            const { name, email, password, profilePic, bio } = req.body;

            // checking the values vailid or not
            if (!name || !email || !password || !bio) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Please Enter all the Feilds",
                    data: null
                })
            }

            // Find use by email
            const userExists = await User.findOne({ email });
            // checking user is already exist
            if (userExists) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "User is already exists",
                    status: StatusCodes.BAD_REQUEST,
                    data: null
                })
            }

            // add in our database
            const user = await User.create({
                name, email, password, profilePic, bio
            });
            if (user) {
                return res.status(StatusCodes.OK).json({
                    _id: user._id, name: user.name, email: user.email, profilePic: user.profilePic, bio: user.bio, token: generateToken(user._id),
                });
            } else {
                res.status(StatusCodes.NOT_FOUND);
                throw new Error("Oops!! something went wrong");
            }

        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error,
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                data: null
            })
        }
    }),
    login: expressAsyncHandler(async (req, res) => {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            res.status(StatusCodes.NOT_FOUND);
            throw new Error("Invalid Email or Password");
        }

        // Compare passwords
        const isPasswordMatch = await user.matchPassword(password);
        console.log(isPasswordMatch)
        if (!isPasswordMatch) {
            res.status(StatusCodes.NOT_FOUND);
            throw new Error("Invalid Email or Password");
        }

        // Passwords match, generate token and send response
        return res.status(StatusCodes.OK).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    })
}


module.exports = { userControllers }