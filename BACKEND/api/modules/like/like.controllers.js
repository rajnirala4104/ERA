const expressAsyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const { Like } = require('./like.model');

const likeControllersObject = {
    getAllLikesOfAPerticualarPost: expressAsyncHandler(async (req, res) => {

    }),

    createLike: expressAsyncHandler(async (req, res) => {
        try {



        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            throw new Error(error.message)
        }
    }),
    removeLike: expressAsyncHandler(async (req, res) => {
        try {

            const { likeId } = req.params
            const likeObject = await Like.find({ _id: likeId });
            if (!likeObject) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "like doesn't exist",
                    staus: StatusCodes.NOT_FOUND,
                    data: null
                })
            }

            await Like.delete({ _id: likeId })
            return res.status(StatusCodes.OK).json({
                message: "removed successfully",
                data: likeObject
            })

        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            throw new Error(error.message)
        }
    })

}
module.exports = { likeControllersObject };