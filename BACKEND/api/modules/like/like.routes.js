const { Router } = require('express');
const { likeControllersObject } = require('./like.controllers');
const { protect } = require('../../middelware/authUser')

const likeRouter = Router();

likeRouter.get('/:postId', protect, likeControllersObject.getAllLikesOfAPerticualarPost);
likeControllersObject.post('/', protect, likeControllersObject.createLike)


module.exports = { likeRouter }