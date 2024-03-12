const { StatusCodes } = require("http-status-codes")
const { Post } = require("./post.model")
const expressAsyncHandler = require("express-async-handler")
const { shuffleArray } = require("../../utils/shuffleArray")

const postControllers = {
    getAllPost: expressAsyncHandler(async (req, res) => {
        try {
            const response = await Post.find()

            return res.status(StatusCodes.OK).json({
                message: "here all the post data",
                data: shuffleArray(response)
            })

        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error,
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                data: null
            })
        }
    }),
    createPost: expressAsyncHandler(async (req, res) => {
        try {
            const { caption, content, comment } = req.body

            if (!caption || !content) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "bad data given",
                    data: null
                })
            }

            const postObj = {
                user: req.user._id,
                caption: caption,
                content: content,
                comment: comment
            }

            const postCreateQuery = await Post.create(postObj)

            if (postCreateQuery) {
                return res.status(StatusCodes.CREATED).json({
                    messasge: "created the post successfuly",
                    data: postCreateQuery
                })
            }

        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "we can't create post right now",
                error: error,
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                data: null
            })
        }

    })
}

module.exports = { postControllers }
