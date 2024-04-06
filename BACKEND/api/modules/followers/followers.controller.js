const expressAsyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

const followersControllersObject = {

    // a controller or a function to get all the followers of a perticular user
    gettingAllTheFollwersOfAPerticularUser: expressAsyncHandler(async (req, res) => {
        try {

        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            throw new Error(error.message)
        }
    }),
    // a function to get all the followings of a perticular user
    gettingAllTheFollowingsOfAPerticularUser: expressAsyncHandler(async (req, res) => { }),
    // function to follow a user
    createFollower: expressAsyncHandler(async (req, res) => { }),
    // funciton to unfollo a user
    removeFollower: expressAsyncHandler(async (req, res) => { }),
    // search functionality
    searchFolower: expressAsyncHandler(async (req, res) => { }),

}

module.exports = { followersControllersObject }