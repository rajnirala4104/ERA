const expressAsyncHandler = require("express-async-handler");
const { User } = require("./user.mode");
const { StatusCodes } = require('http-status-codes')
const { generateToken } = require('../../config/generateToken')

const userControllers = {
    userRegistration: expressAsyncHandler(async (req, res) => {
        try {
            const { name, email, password, profilePic, bio } = req.body;

            if (!name || !email || !password || !bio) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Please Enter all the Feilds",
                    data: null
                })
            }

            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "User is already exists",
                    status: StatusCodes.BAD_REQUEST,
                    data: null
                })
            }

            const user = await User.create({
                name, email, password, profilePic, bio
            });
            if (user) {
                return res.status(StatusCodes.OK).json({
                    _id: user._id, name: user.name, email: user.email, profilePic: user.profilePic, bio: user.bio, token: generateToken(user._id),
                });
            } else {
                res.status(StatusCodes.NOT_FOUND);
                throw new Error("Oops!! User not Found");
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
            res.status(401);
            throw new Error("Invalid Email or Password");
        }

        // Compare passwords
        const isPasswordMatch = await user.matchPassword(password);
        console.log(isPasswordMatch)
        if (!isPasswordMatch) {
            res.status(401);
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