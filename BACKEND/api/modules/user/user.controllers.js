const expressAsyncHandler = require("express-async-handler");
const { User } = require("./user.mode");

const userControllers = {
    registieredUser: expressAsyncHandler(async (req, res) => {
        const { name, email, password, pic } = req.body;

        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please Enter all the Feilds");
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error("User is alredy exists");
        }

        const user = await User.create({
            name,
            email,
            password,
            pic,
        });
        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error("Oops!! User not Found");
        }
    }),
    login: expressAsyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password })
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                pic: user.pic,
                token: generateToken(user._id),
            });
        } else {
            res.status(401);
            throw new Error("Invalid Email or Password");
        }
    })
}


module.exports = { userControllers }