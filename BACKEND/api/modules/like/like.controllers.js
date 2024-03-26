const expressAsyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const { Like } = require('./like.model');
const { Post } = require('../post/post.model')

// like controller object
const likeControllersObject = {
    // function or controller to get the likes of a perticular post
    getAllLikesOfAPerticualarPost: expressAsyncHandler(async (req, res) => {
        try {

            //getting post id from req.params
            const { postId } = req.params;

            // mongoose find query
            const allLikes = await Like.find()

            //mongoose find query to itrate post with condition 
            const post = await Post.find({ _id: postId })

            //empty array to store all likes of a perticular post
            const likesOfAPerticualerPost = [];

            for (let i = 0; i < allLikes.length; i++) {

                const singleLikeObject = allLikes[i];

                //checking param's post id and like's post id same of not
                if (singleLikeObject.post = post[0]._id) {
                    // if true: push or append the like object to empty like array
                    likesOfAPerticualerPost.push(singleLikeObject)
                }
            }

            //returning response
            return res.status(StatusCodes.OK).json({
                message: "all like of a perticual post",
                status: StatusCodes.OK,
                data: likesOfAPerticualerPost
            })


        } catch (error) {
            //error
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            throw new Error(error.message)
        }
    }),

    //function or controller to create a new like 
    createLike: expressAsyncHandler(async (req, res) => {
        try {

            // getting post id from user
            const { postId } = req.body
            // getting logedin user id from req.user
            const logedInUserId = req.user._id


            //  if post doesn't exist in the database
            if (!(await Post.find({ _id: postId }))) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "post doesn't exist",
                    status: StatusCodes.NOT_FOUND,
                    data: null
                })
            }

            //mongoose find query for a specific data
            const likeObject = await Like.find({ user: logedInUserId, post: postId })

            // checking if there is even one object with same user and same post id
            if (likeObject.length > 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "like is already exist",
                    status: StatusCodes.BAD_REQUEST,
                    data: likeObject
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
            await Like.deleteOne({ _id: likeId })
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