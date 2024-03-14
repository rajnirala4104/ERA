const { Router } = require('express')
const { postControllers } = require('./post.controllers')
const { protect } = require('../../middelware/authUser')

const postRouter = Router()

postRouter.get('/', protect, postControllers.getAllPost)
postRouter.get('/:id', protect, postControllers.getSinglePost)
postRouter.post('/create', protect, postControllers.createPost)
postRouter.put('/update/:id', protect, postControllers.updatePost)
postRouter.delete('/delete', protect, postControllers.deletePost)


module.exports = { postRouter }