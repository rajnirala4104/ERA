const { Router } = require('express');
const { likeControllersObject } = require('./like.controllers');
const { protect } = require('../../middelware/authUser')

const likeRouter = Router();

likeRouter.get('/:postId', protect, likeControllersObject.getAllLikesOfAPerticualarPost);
likeRouter.post('/:postId', protect, likeControllersObject.createLike)
likeRouter.post('/:likeId', protect, likeControllersObject.removeLike)

module.exports = { likeRouter }