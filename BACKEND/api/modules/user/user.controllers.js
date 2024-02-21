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
        const user = await User.findOne({ email, password })
        const decryptPassword = await user.matchPassword(password)
        console.log(decryptPassword)

        if (user && decryptPassword) {

            return res.status(StatusCodes.OK).json({
                _id: user._id, name: user.name, email: user.email, password: user.password, pic: user.pic, token: generateToken(user._id),
            });
        } else {
            res.status(401);
            throw new Error("Invalid Email or Password");
        }
    })
}


module.exports = { userControllers }