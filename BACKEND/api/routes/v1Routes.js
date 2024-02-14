const { Router } = require('express')
const { userRouter } = require('../modules/user/user.routes')
const { postRouter } = require('../modules/post/post.routes')
const { commentRouter } = require('../modules/comment/comment.routes')

const v1Router = Router()
v1Router.use('/user', userRouter)
v1Router.use('/post', postRouter)
v1Router.use('/comment', commentRouter)

module.exports = { v1Router }