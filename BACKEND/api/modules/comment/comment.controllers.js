const { StatusCodes } = require("http-status-codes");
const { Post } = require("../post/post.model");
const { Comment } = require("./comment.model");
const expressAsyncHandler = require("express-async-handler");

// comment controllers
const commentControllers = {
   //getting all the comments
   getAllTheComments: expressAsyncHandler(async (req, res) => {
      try {
         const response = await Comment.find(); //mongoose .find function
         return res.status(StatusCodes.OK).json({
            message: "here all the comments",
            status: StatusCodes.OK,
            data: response,
         });
      } catch (error) {
         //error
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "we can't show you all comments for now",
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            error: error,
            data: null,
         });
      }
   }),

   //getting all the comments of a perticular post
   getAllTheCommentsOfSinglePost: expressAsyncHandler(async (req, res) => {
      try {
         const { postId } = req.params; //getting post id
         const allComments = await Comment.find(); //mongoose .find query

         const post = await Post.find({ _id: postId }); //mongoose find query

         let comments = []; //an empty array

         // for loop for accessing all the comments
         for (let i = 0; i < allComments.length; i++) {
            //a single comment object
            const singleCommentObject = allComments[i];
            //checking the post id in a comment object
            if ((singleCommentObject.post = post[0]._id)) {
               comments.push(singleCommentObject); //pushing if there is post id in comment object
            }
         }

         return res.status(StatusCodes.OK).json({
            message: "all comments of a prticular post",
            status: StatusCodes.OK,
            data: comments,
         });
      } catch (error) {
         //error
         res.status(StatusCodes.INTERNAL_SERVER_ERROR);
         throw new Error(error.message);
      }
   }),

   //create comment function or controller
   createComment: expressAsyncHandler(async (req, res) => {
      try {
         // getting schema requirments from req.body
         const { post, content } = req.body;
         const userId = req.user._id; // getting user id who loged in from request

         const postExist = await Post.find({ _id: post }); //mongoose find query

         // if post doesn't exist
         if (!postExist) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "post doesn't exist",
               status: StatusCodes.BAD_REQUEST,
               data: null,
            });
         }

         //new comment object
         const newCommentObject = {
            post: post,
            user: userId,
            content: content,
         };

         await Comment.create(newCommentObject); //mongoose create query
         return res.status(StatusCodes.OK).json({
            message: "comment created successfully",
            status: StatusCodes.OK,
            data: newCommentObject,
         });
      } catch (error) {
         // error
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "we can't create comment for now",
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            error: error,
            data: null,
         });
      }
   }),

   // update comment function of controller
   updateComment: expressAsyncHandler(async (req, res) => {
      try {
         //getting comment id and content from body
         const { commentId, content } = req.body;
         //getting a single comment from the database using mongoose .fing() query
         const commentObjectFromDatabase = await Comment.find({
            _id: commentId,
         });
         // if comment is not exist in the database
         if (!commentControllers || commentControllers.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
               message: "comment doesn't exist",
               status: StatusCodes.NOT_FOUND,
               data: commentObjectFromDatabase,
            });
         }

         //if comment's contents are same
         if (commentObjectFromDatabase[0].content === content) {
            return res.status(StatusCodes.CONFLICT).json({
               message: "content are same",
               status: StatusCodes.CONFLICT,
               data: commentObjectFromDatabase,
            });
         }

         // updating comment by using mongoose .findOneAndUpdate() query
         await Comment.findOneAndUpdate(
            { _id: commentId },
            { content: content }
         );

         return res.status(StatusCodes.CREATED).json({
            message: "comment updated successfully",
            status: StatusCodes.CREATED,
            content: content,
         });
      } catch (error) {
         // error
         res.status(StatusCodes.INTERNAL_SERVER_ERROR);
         throw new Error(error.message);
      }
   }),

   // delete comment function or controller
   deleteComment: expressAsyncHandler(async (req, res) => {
      try {
         const { id } = req.params; //getting comment id
         const commentDoesExist = await Comment.find({ _id: id }); // mongoose find query

         //if comment doesn't exist in the database
         if (!commentDoesExist) {
            return res.status(StatusCodes.NOT_FOUND).json({
               message: "comment not found",
               status: StatusCodes.NOT_FOUND,
               data: null,
            });
         }

         await Comment.delete({ _id: id }); // mongoose delter query
         return res.status(StatusCodes.OK).json({
            message: "comment deleted successfully",
            status: StatusCodes.OK,
            data: commentDoesExist,
         });
      } catch (error) {
         // error
         return res.status(StaticRange.INTERNAL_SERVER_ERROR).json({
            message: "we can't delete comment",
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            error: error,
            data: null,
         });
      }
   }),
};

// exporting comment controllers object
module.exports = { commentControllers };
