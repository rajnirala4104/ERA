import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { Post } from "../post/post.model";
import { Comment } from "./comment.model";

export const commentControllers = {
    getAllTheComments: expressAsyncHandler(async (req, res) => {
        try {
            const response = await Comment.find()
            return res.status(StatusCodes.OK).json({
                message: "here all the comments",
                status: StatusCodes.OK,
                data: response
            })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "we can't show you all comments for now",
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                error: error,
                data: null
            })
        }
    }),

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
        try {
            const { id } = req.params
            const commentDoesExist = await Comment.find({ _id: id });
            if (!commentDoesExist) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "comment not found",
                    status: StatusCodes.NOT_FOUND,
                    data: null
                })
            }

            await Comment.delete({ _id: id });
            return res.status(StatusCodes.OK).json({
                message: "comment deleted successfully",
                status: StatusCodes.OK,
                data: commentDoesExist
            })

        } catch (error) {
            return res.status(StaticRange.INTERNAL_SERVER_ERROR).json({
                message: "we can't delete comment",
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                error: error,
                data: null
            })
        }
    })
}