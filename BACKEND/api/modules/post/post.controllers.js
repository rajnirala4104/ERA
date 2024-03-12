const { StatusCodes } = require("http-status-codes")
const { Post } = require("./post.model")
const { erroHandler } = require("../../middelware/error")
const { User } = require("../user/user.model")

const postControllers = {
    getAllPost: async (req, res) => {
        try {
            const response = await Post.find({})
            console.log(response.data)
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error,
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                data: null
            })
        }
    },
    createPost: async (req, res) => {
        try {
            const { userId, caption, content, comment } = req.body()

            if (!caption || !content) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "bad data given",
                    data: null
                })
            }

            const userExist = await User.find({ _id: userId })

            if (userExist) {
                const postCreateQuery = await Post.create({ userId, caption, content, comment });
                if (postCreateQuery) {
                    return res.status(StatusCodes.CREATED).json({
                        messasge: "created the post successfuly",
                        data: postCreateQuery
                    })
                }

            }
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "we can't create post right now",
                error: error,
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                data: null
            })
        }

    }
}

module.exports = { postControllers }
