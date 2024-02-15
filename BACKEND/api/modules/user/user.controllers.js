const expressAsyncHandler = require("express-async-handler");
const { User } = require("./user.mode");
const { StatusCodes } = require('http-status-codes')

const userControllers = {
    registieredUser: expressAsyncHandler(async (req, res) => {
        console.log(req.body)
        try {
            console.log("owwowowowow")
            const { name, email, password, profilePic, bio } = req.body;
            if (!name || !email || !password) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "bad request",
                    status: StatusCodes.BAD_REQUEST,
                    data: null
                })
            }

            const userExist = await User.findOne({ email });
            if (userExist) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "User already exist",
                    status: StatusCodes.BAD_REQUEST,
                    data: null
                })
            }

            const user = await User.create({ name, email, password, bio, profilePic });
            if (user) {
                console.log("donedonedonedonedonedoendoendonedonedonedone")
                res.status(StatusCodes.OK).json({
                    _id: user._id, name: user.name, email: user.email, profilePic: user.profilePic, token: generateToken(user._id),
                });
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Oops!! something went wrong",
                    status: StatusCodes.CONFLICT,
                    data: null
                })

            }
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "INTERNAL SERVER ERROR",
                data: null
            })
        }
    }),
    login: expressAsyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password })
        if (user) {
            res.json({
                _id: user._id, name: user.name, email: user.email, password: user.password, pic: user.pic, token: generateToken(user._id),
            });
        } else {
            res.status(401);
            throw new Error("Invalid Email or Password");
        }
    })
}


module.exports = { userControllers }