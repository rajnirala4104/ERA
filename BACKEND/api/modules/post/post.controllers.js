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
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                error: error,
                data: null
            })
        }
    }),
    updatePost: expressAsyncHandler(async (req, res) => {
        try {
            const { caption } = req.body;
            const { id } = req.params;
            if (!(await Post.find({ _id: id }))) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "this post not found in our database",
                    status: StatusCodes.NOT_FOUND,
                    data: null
                })
            }

            const updateQuery = await Post.updateOne({ _id: id }, { caption: caption })

            return res.status(StatusCodes.OK).json({
                message: "updated successfuly",
                status: StatusCodes.OK,
                data: updateQuery
            })

        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "we can't update post for now",
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                error: error,
                data: null
            })
        }
    })
}

module.exports = { postControllers }
