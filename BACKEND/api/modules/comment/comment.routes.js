const { Router } = require('express')
const { protect } = require('../../middelware/authUser')
const { commentControllers } = require('./comment.controllers')

const commentRouter = Router()
commentRouter.get('/', protect, commentControllers.getAllTheComments);
commentRouter.get('/:postId', protect, commentControllers.getAllTheCommentsOfSinglePost);
commentRouter.post('/', protect, commentControllers.createComment);
commentRouter.delete('/:id', protect, commentControllers.deleteComment);

module.exports = { commentRouter }