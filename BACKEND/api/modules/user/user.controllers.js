const expressAsyncHandler = require("express-async-handler");
const { User } = require("./user.model");
const { StatusCodes } = require("http-status-codes");
const { generateToken } = require("../../config/generateToken");
const { genSalt, hash } = require("bcryptjs");
const { Followers } = require("../followers/followers.model");
const { shuffleArray } = require("../../utils");
const { uploadOnCloudinary } = require("../../utils/cloudinary");

// controllers object
const userControllers = {
   userRegistration: expressAsyncHandler(async (req, res) => {
      try {
         const { name, email, password } = req.body;

         // checking the values are vailid or not
         if (!name || !email || !password) {
            return res.status(StatusCodes.NOT_FOUND).json({
               message: "Please Enter all the Feilds",
               status: StatusCodes.NOT_FOUND,
               data: null,
            });
         }

         // Find use by email
         const userExists = await User.findOne({ email });

         // checking user is already exist
         if (userExists) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "User is already exist",
               status: StatusCodes.BAD_REQUEST,
               data: null,
            });
         }

         // ------------------ upload profilePic on cloudinary -------------
         const profilePicLocalPath = req.file.path;
         let profilePicCloudinaryResponse;
         if (profilePicLocalPath)
            profilePicCloudinaryResponse = await uploadOnCloudinary(
               profilePicLocalPath
            );
         // ---------------------------- end -------------------

         // add in our database
         const user = await User.create({
            name,
            email,
            password,
            profilePic: profilePicCloudinaryResponse.url,
         });

         if (user) {
            return res.status(StatusCodes.OK).json(user);
         } else {
            res.status(StatusCodes.NOT_FOUND);
            throw new Error("something went wrong");
         }
      } catch (error) {
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "INTERNAL_SERVER_ERROR",
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: null,
         });
      }
   }),

   login: expressAsyncHandler(async (req, res) => {
      try {
         const { email, password } = req.body;

         // Find user by email
         const user = await User.findOne({ email });
         if (!user) {
            res.status(StatusCodes.NOT_FOUND);
            throw new Error("Invalid Email");
         }

         // Compare passwords
         const isPasswordMatch = await user.matchPassword(password);
         if (!isPasswordMatch) {
            res.status(StatusCodes.NOT_FOUND);
            throw new Error("Invalid Password");
         }

         // Passwords match, generate token and send response
         return res.status(StatusCodes.OK).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
            bio: user.bio,
            token: generateToken(user._id),
         });
      } catch (error) {
         return res.status(StatusCodes.NOT_FOUND).json({
            message: error.message,
            status: StatusCodes.NOT_FOUND,
            error: error.message,
            data: null,
         });
      }
   }),

   updatedUserInfo: expressAsyncHandler(async (req, res) => {
      try {
         const { id } = req.params;
         const { email, name, profilePic, bio } = req.body;

         const doesExist = await User.findOne({ _id: id });

         if (!doesExist) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "user is not in our database",
               data: null,
            });
         }

         // ------------------ upload profilePic on cloudinary -------------
         // ---------------------------- end -------------------------------

         const updateData = await User.findOneAndUpdate(
            { _id: id },
            {
               $set: {
                  name: name,
                  email: email,
                  profilePic: profilePic,
                  bio: bio,
               },
            }
         );
         return res.status(StatusCodes.OK).json({
            message: "data is updated successfully",
            data: updateData,
         });
      } catch (error) {
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "somethint went wrong",
            error: error,
            data: null,
         });
      }
   }),

   updatePassword: expressAsyncHandler(async (req, res) => {
      try {
         const { email, password } = req.body;

         const doesExist = await User.findOne({ email: email });
         if (!doesExist) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "user is not in our database",
               status: StatusCodes.BAD_REQUEST,
               data: null,
            });
         }

         const salt = await genSalt(10);
         const newPassword = await hash(password, salt);

         await User.findOneAndUpdate(
            { email: email },
            { $set: { password: newPassword } }
         );

         return res.status(StatusCodes.OK).json({
            message: "password is updated successfully",
            status: StatusCodes.OK,
            data: doesExist,
         });
      } catch (error) {
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "INTERNAL SERVER ERROR",
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: null,
         });
      }
   }),
   searchUser: expressAsyncHandler(async (req, res) => {
      try {
         const keyword = req.query.search
            ? {
                 $or: [
                    { name: { $regex: req.query.search, $options: "i" } },
                    { email: { $regex: req.query.search, $options: "i" } },
                 ],
              }
            : {};
         const users = await User.find(keyword)
            .find({ _id: { $ne: req.user._id } })
            .select("-password");
         res.send(users);
      } catch (error) {
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "INTERNAL SERVER ERROR",
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: null,
         });
      }
   }),
   getAllTheInformationAboutAPerticularUser: expressAsyncHandler(
      async (req, res) => {
         try {
            const { userId } = req.params;
            const response = await User.find({ _id: userId });

            return res.status(StatusCodes.OK).json({
               message: "single user information",
               status: StatusCodes.OK,
               data: response,
            });
         } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            throw new Error(error.message);
         }
      }
   ),
   getAllUser: expressAsyncHandler(async (req, res) => {
      try {
         const data = await User.find({});
         const loggedUserId = req.user._id;
         const finalData = data.filter(
            (el) => el._id.toString() !== loggedUserId.toString()
         );

         return res.status(StatusCodes.OK).json({
            message: "here all the users",
            status: StatusCodes.OK,
            data: finalData,
         });
      } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR);
         throw new Error(error.message);
      }
   }),
};

module.exports = { userControllers };
