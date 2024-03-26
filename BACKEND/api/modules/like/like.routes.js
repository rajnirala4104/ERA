const { Router } = require('express');
const { likeControllersObject } = require('./like.controllers');
const { protect } = require('../../middelware/authUser')

const likeRouter = Router();

likeRouter.get('/:postId', protect, likeControllersObject.getAllLikesOfAPerticualarPost);
likeRouter.get('/remove/:likeId', protect, likeControllersObject.removeLike)
likeRouter.post('/create', protect, likeControllersObject.createLike)

module.exports = { likeRouter }