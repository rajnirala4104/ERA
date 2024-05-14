const { Router } = require('express');
const { StatusCodes } = require('http-status-codes');
const { protect } = require('../../middelware/authUser');
const { thoughPostControllers } = require('./thoughtPost.controller');
const thoughtPost = Router();

thoughtPost.get('/health', async (req, res) => res.status(StatusCodes.OK).json({
    message: "thought post router is working..",
    status: StatusCodes.OK
}));
thoughtPost.get('/', protect, thoughPostControllers.getAllTherThouhtPosts)
thoughtPost.get('/allPosts', protect, thoughPostControllers.getAllThePostsOfAPerticulerUser)
thoughtPost.get('/:thoughtPostId', protect, thoughPostControllers.getSingleThoughtPostData);
thoughtPost.post('/create', protect, thoughPostControllers.createThoughtPost);
thoughtPost.put('/update/:thoughtPostId', protect, thoughPostControllers.updateTheThoughtPost);
thoughtPost.delete('/delete/:thoughtPostId', protect, thoughPostControllers.deleteThoughtPost);

module.exports = { thoughtPost }
