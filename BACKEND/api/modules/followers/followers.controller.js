const expressAsyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { User } = require("../user/user.model");
const { Followers } = require("./followers.model");

const followersControllersObject = {

    // a controller or a function to get all the followers of a perticular user
    gettingAllTheFollwersOfAPerticularUser: expressAsyncHandler(async (req, res) => { }),

    // a function to get all the followings of a perticular user
    gettingAllTheFollowingsOfAPerticularUser: expressAsyncHandler(async (req, res) => { }),
    // function to follow a user
    createFollower: expressAsyncHandler(async (req, res) => {
        try {

            //getting just followedUserId from request's body
            const { followedUserId } = req.body;
            //getting logged user id
            const loggedUser = req.user._id;
            // getting followed user from the database
            const followedUserDoesExist = await User.find({ _id: followedUserId });

            //checking that followed user is exist or not
            if (!followedUserDoesExist) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "followed user doesn't exist",
                    status: StatusCodes.NOT_FOUND,
                    data: followedUserDoesExist
                })
            }

            const allFollowerObjects = await Followers.find();
            for (let i = 0; i < allFollowerObjects.length; i++) {
                const singleFollowerObject = allFollowerObjects[i];

                if (singleFollowerObject.user.toString() === loggedUser.toString() || singleFollowerObject.followedUserId.toString() === followedUserId.toString()) {
                    return res.status(StatusCodes.FORBIDDEN).json({
                        message: "follower is already exist",
                        status: StatusCodes.FORBIDDEN,
                        data: singleFollowerObject
                    })
                }
            }

            // follow object 
            const followObject = { user: loggedUser, followedUserId: followedUserId }

            //mongoose CREATE query to 
            await Followers.create(followObject);
            return res.status(StatusCodes.CREATED).json({
                message: "follower created successfully",
                status: StatusCodes.CREATED,
                data: followObject
            })

        } catch (error) {
            //error
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            throw new Error(error.message)
        }
    }),
    // funciton to unfollo a user
    removeFollower: expressAsyncHandler(async (req, res) => { }),
    // search functionality
    searchFolower: expressAsyncHandler(async (req, res) => { }),

}

module.exports = { followersControllersObject }