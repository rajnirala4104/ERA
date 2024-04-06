const { Router } = require('express');
const { likeControllersObject } = require('./like.controllers');
const { protect } = require('../../middelware/authUser')

//like router
const likeRouter = Router();

// endpointd
likeRouter.get('/:postId', protect, likeControllersObject.getAllLikesOfAPerticualarPost);
likeRouter.get('/remove/:likeId', protect, likeControllersObject.removeLike)
likeRouter.post('/create', protect, likeControllersObject.createLike)

//exporting the router
module.exports = { likeRouter }