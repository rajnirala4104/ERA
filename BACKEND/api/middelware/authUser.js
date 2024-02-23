require("dotenv").config();
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../modules/user/user.model");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (e) {
            res.status(401);
            throw new Error("Not authorized, token, failed");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, not Token");
    }
});

module.exports = { protect };