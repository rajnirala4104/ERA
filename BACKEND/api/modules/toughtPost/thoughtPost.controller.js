const expressAsyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { ThoughtPost } = require("./thoughtPost.model");
const thoughPostControllers = {
    getAllTherThouhtPosts: expressAsyncHandler(async (req, res) => { }),

    getSingleThoughtPostData: expressAsyncHandler(async (req, res) => { }),

    createThoughtPost: expressAsyncHandler(async (req, res) => {
        try {
            const { thought } = req.body;
            const loggedUser = req.user._id;

            if (!thought) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "invalid data give",
                    status: StatusCodes.CONFLICT,
                    data: null
                })
            }

            const newThoughtObject = {
                user: loggedUser,
                thought: thought
            }

            await ThoughtPost.create(newThoughtObject);
            return res.status(StatusCodes.CREATED).json({
                message: "Thought Post Created Successfully",
                status: StatusCodes.CREATED,
                data: newThoughtObject
            })

        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            throw new Error(error.message)
        }
    }),

    updateTheThoughtPost: expressAsyncHandler(async (req, res) => { }),

    deleteThoughtPost: expressAsyncHandler(async (req, res) => { })
}

module.exports = { thoughPostControllers }