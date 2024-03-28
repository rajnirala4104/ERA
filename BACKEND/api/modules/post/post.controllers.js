const { StatusCodes } = require("http-status-codes");
const { Post } = require("./post.model");
const expressAsyncHandler = require("express-async-handler");
const { shuffleArray } = require("../../utils/shuffleArray");

// post controller object
const postControllers = {
   // getting all post data function
   getAllPost: expressAsyncHandler(async (req, res) => {
      try {
         const response = await Post.find(); //mongoose .find query for getting all the data

         return res.status(StatusCodes.OK).json({
            message: "here all the post data",
            data: shuffleArray(response), //shuffleArray function to shuffle the response array
         });
      } catch (error) {
         // error
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error,
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: null,
         });
      }
   }),

   //getting single post data
   getSinglePost: expressAsyncHandler(async (req, res) => {
      try {
         const { id } = req.params; //getting post id from request
         const singlePost = await Post.find({ _id: id }); //mongoose .find query

         // if post is not found
         if (!singlePost || singlePost.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
               message: "this post doesn't exist in our database",
               status: StatusCodes.NOT_FOUND,
               data: singlePost,
            });
         }

         return res.status(StatusCodes.OK).json({
            message: "Single Post",
            status: StatusCodes.OK,
            data: singlePost,
         });
      } catch (error) {
         //eroor
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "We can't give you a post information",
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            error: error,
            data: null,
         });
      }
   }),

   // create a new post function or controller
   createPost: expressAsyncHandler(async (req, res) => {
      try {
         const { caption, content } = req.body; //getting all the schema requirements as request

         if (!caption || !content) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "bad data given",
               data: null,
            });
         }

         // a new post object
         const postObj = {
            user: req.user._id,
            caption: caption,
            content: content,
         };

         const postCreateQuery = await Post.create(postObj); //mongoose create query

         if (postCreateQuery) {
            return res.status(StatusCodes.CREATED).json({
               messasge: "created the post successfuly",
               data: postCreateQuery,
            });
         }
      } catch (error) {
         //error
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "we can't create post right now",
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            error: error,
            data: null,
         });
      }
   }),

   // update post funciton or controller
   updatePost: expressAsyncHandler(async (req, res) => {
      try {
         const { caption } = req.body; //geeting schema requirments
         const { id } = req.params; //getting id from req.params

         const post = await Post.find({ _id: id }); //mongoose .find query

         // if post is not exist in the database
         if (!post) {
            return res.status(StatusCodes.NOT_FOUND).json({
               message: "this post not found in our database",
               status: StatusCodes.NOT_FOUND,
               data: null,
            });
         }

         if (post[0].user !== req.user._id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "you can't update is post",
               status: StatusCodes.UNAUTHORIZED,
               data: null,
            });
         }

         await Post.updateOne({ _id: id }, { caption: caption }); //monoose udpate query
         return res.status(StatusCodes.OK).json({
            message: "updated successfuly",
            status: StatusCodes.OK,
            data: post,
         });
      } catch (error) {
         // error
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "we can't update post for now",
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            error: error,
            data: null,
         });
      }
   }),

   //delete post function or controller
   deletePost: expressAsyncHandler(async (req, res) => {
      try {
         const { id } = req.params; //getting post id
         await Post.deletOne({ _id: id }); // mongoose delete query
         return res.status(StatusCodes.OK).json({
            messgage: "deleted success fully",
            status: StatusCodes.OK,
            data: await Post.find({ _id: id }), //post`
         });
      } catch (error) {
         //errror
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "we can't delete post for now",
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            error: error,
            data: null,
         });
      }
   }),
};

module.exports = { postControllers }; //exporting the post controllers object
