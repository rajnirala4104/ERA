const expressAsyncHandler = require('express-async-handler')

const likeControllersObject = {
    getAllLikesOfAPerticualarPost: expressAsyncHandler(async (req, res) => { }),

    createLike: expressAsyncHandler(async (req, res) => { }),

}
module.exports = { likeControllersObject };