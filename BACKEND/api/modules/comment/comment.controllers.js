import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { Post } from "../post/post.model";
import { Comment } from "./comment.model";

export const commentControllers = {
    getAllTheComments: expressAsyncHandler(async (req, res) => { }),

    getAllTheCommentsOfSinglePost: expressAsyncHandler(async (req, res) => { }),

    createComment: expressAsyncHandler(async (req, res) => {
        try {

            const { post, content } = req.body;
            const userId = req.user._id;

            const postExist = await Post.find({ _id: post })
            if (!postExist) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "post doesn't exist",
                    status: StatusCodes.BAD_REQUEST,
                    data: null

                })
            }

            const newCommentObject = {
                post: post,
                user: userId,
                content: content
            }

            await Comment.create(newCommentObject)
            return res.status(StatusCodes.OK).json({
                message: "comment created successfully",
                status: StatusCodes.OK,
                data: newCommentObject
            })

        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "we can't create comment for now",
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                error: error,
                data: null
            })
        }
    }),

    deleteComment: expressAsyncHandler(async (req, res) => {

    })
}