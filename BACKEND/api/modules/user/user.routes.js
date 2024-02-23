const { Router } = require('express')
const { userControllers } = require('./user.controllers');
const { protect } = require('../../middelware/authUser');
// const { protect } = require('../../middelware/authUser')

// user router
const userRouter = Router()

//endpoints and controller
userRouter.post('/signup', userControllers.userRegistration);
userRouter.post('/login', userControllers.login);
userRouter.get('/', protect, userControllers.searchUser);
userRouter.put('/update/:id', userControllers.updatedUserInfo);
userRouter.put('/password', userControllers.updatePassword);

module.exports = { userRouter }
