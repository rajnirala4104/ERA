const { Router } = require('express')
const { userControllers } = require('./user.controllers')
// const { protect } = require('../../middelware/authUser')

// user router
const userRouter = Router()

//endpoints and controller
userRouter.post('/signup', userControllers.userRegistration)
userRouter.post('/login', userControllers.login)
// userRouter.get('?search=', async (req, res) => { })
userRouter.put('/update/:id', userControllers.updatedUserInfo)

module.exports = { userRouter }
