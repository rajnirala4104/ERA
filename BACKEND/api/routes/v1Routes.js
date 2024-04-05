const { Router } = require('express')
const { userRouter } = require('../modules/user/user.routes')
const { postRouter } = require('../modules/post/post.routes')
const { commentRouter } = require('../modules/comment/comment.routes')
const { likeRouter } = require('../modules/like/like.routes')
const { storyRouter } = require('../modules/story/story.routes')
const { followerRouter } = require('../modules/followers/followers.routes')

const v1Router = Router()
v1Router.use('/user', userRouter)
v1Router.use('/post', postRouter)
v1Router.use('/comment', commentRouter)
v1Router.use('/like', likeRouter)
v1Router.use('/story', storyRouter)
v1Router.use('/follower', followerRouter)

module.exports = { v1Router }