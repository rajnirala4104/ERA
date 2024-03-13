const { Router } = require('express')
const { postControllers } = require('./post.controllers')
const { protect } = require('../../middelware/authUser')

const postRouter = Router()

postRouter.get('/', protect, postControllers.getAllPost)
postRouter.post('/create', protect, postControllers.createPost)
postRouter.put('/update/:id', protect, postControllers.updatePost)
postRouter.delete('/delete', async (req, res) => { })


module.exports = { postRouter }