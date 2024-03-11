const { StatusCodes } = require("http-status-codes")
const { Post } = require("./post.model")
const { erroHandler } = require("../../middelware/error")

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
        const { caption, content, comment } = req.body()

        if (!caption || !content) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "bad data given",
                data: null
            })
        }

    }
}

module.exports = { postControllers }
