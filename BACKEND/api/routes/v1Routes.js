const { Router } = require('express')
const { userRouter } = require('../modules/user/routes')

const v1Router = Router()
v1Router.use('/user', userRouter)

module.exports = { v1Router }