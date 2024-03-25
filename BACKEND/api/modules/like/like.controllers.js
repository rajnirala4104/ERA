const expressAsyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const { Like } = require('./like.model');
const { Post } = require('../post/post.model')

// like controller object
const likeControllersObject = {
    // function or controller to get the likes of a perticular post
    getAllLikesOfAPerticualarPost: expressAsyncHandler(async (req, res) => {

    }),

    //function of controller to create a new like 
    createLike: expressAsyncHandler(async (req, res) => {
        try {

            // getting post id from as parameter
            const { postId } = req.params
            // getting logedin user id from req.user
            const logedInUserId = req.user._id

            //  if post doesn't exist in the database
            if (!(await Post.find())) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "post doesn't exist",
                    status: StatusCodes.NOT_FOUND,
                    data: null
                })
            }

            // like object 
            let newLikeObject = {
                user: logedInUserId,
                post: postId
            }

            // mongoose create query
            await Like.create(newLikeObject);
            return res.status(StatusCodes.CREATED).json({
                message: "like created successfully",
                status: StatusCodes.CREATED,
                data: newLikeObject
            })


        } catch (error) {
            // error
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            throw new Error(error.message)
        }
    }),

    // function or controller to remove like from the database
    removeLike: expressAsyncHandler(async (req, res) => {
        try {

            //getting like Id from req.params
            const { likeId } = req.params

            // getting like object from the database
            const likeObject = await Like.find({ _id: likeId });

            //if like doesn't exist in the database
            if (!likeObject) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "like doesn't exist",
                    staus: StatusCodes.NOT_FOUND,
                    data: null
                })
            }

            //mongoose delete query
            await Like.delete({ _id: likeId })
            return res.status(StatusCodes.OK).json({
                message: "removed successfully",
                data: likeObject
            })

        } catch (error) {
            //error
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            throw new Error(error.message)
        }
    })

}
module.exports = { likeControllersObject };