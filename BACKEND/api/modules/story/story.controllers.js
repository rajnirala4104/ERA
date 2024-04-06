const expressAsyncHandler = require("express-async-handler");

const storyControllersObject = {
    gettingAllStories: expressAsyncHandler(async (req, res) => { }),
    createStory: expressAsyncHandler(async (req, res) => { }),
    deleteStory: expressAsyncHandler(async (req, res) => { })
}

module.exports = { storyControllersObject }