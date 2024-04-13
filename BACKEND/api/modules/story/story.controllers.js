const expressAsyncHandler = require("express-async-handler");
const { Story } = require("./story.model");
const { StatusCodes } = require("http-status-codes");

const storyControllersObject = {
    // function to get all the sotries object from the database
    gettingAllStories: expressAsyncHandler(async (req, res) => {
        try {
            //getting all the sotries using mongoose .find() query
            const allStories = await Story.find()
                .populate('user', '-password');

            return res.status(StatusCodes.OK).json({
                message: "here is all stories",
                status: StatusCodes.OK,
                data: allStories
            })

        } catch (error) {
            // error
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            throw new Error(error.message)
        }
    }),
    // function to create a story
    createStory: expressAsyncHandler(async (req, res) => {
        try {
            // getting image and caption from the req.body or you can say from the user(logged user)
            const { imageUrl, caption } = req.body;
            // getting logged user id from req.user 
            const loggedUser = req.user._id;

            // story object for structure 
            const newStoryObject = {
                user: loggedUser,
                imageUrl: imageUrl,
                caption: caption
            }

            // mongoose .create() query
            await Story.create(newStoryObject);
            return res.status(StatusCodes.CREATED).json({
                message: "story create successfully",
                status: StatusCodes.CREATED,
                data: newStoryObject
            })
        } catch (error) {
            // error
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            throw new Error(error.message)
        }
    }),

    // function to delete story object from the database
    deleteStory: expressAsyncHandler(async (req, res) => {
        try {
            // getting storyId which will be deleted
            const { storyId } = req.body;
            // getting story object with the same storyId using mongoose .find({finlder})
            const storyExist = await Story.find({ _id: storyId });
            // checking that story is exist or not in the database
            if (!storyExist) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "story doesn't exist in our database",
                    status: StatusCodes.NOT_FOUND,
                    data: storyExist
                })
            }
            // mongoose .deleteOne({filter}) query
            await Story.deleteOne({ _id: storyId });
            return res.status(StatusCodes.CONFLICT)
        } catch (error) {
            // error
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            throw new Error(error.message);
        }
    })
}

module.exports = { storyControllersObject }