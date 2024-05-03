const { Router } = require('express')
const { userControllers } = require('./user.controllers');
const { protect } = require('../../middelware/authUser');

// user router
const userRouter = Router()

//endpoints
userRouter.post('/signup', userControllers.userRegistration); // ------/api/v1/user/signup
userRouter.post('/login', userControllers.login); // -------- /api/v1/user/login
userRouter.get('/', protect, userControllers.searchUser);
userRouter.get('/:userId', protect, userControllers.getAllTheInformationAboutAPerticularUser)
userRouter.put('/update/:id', userControllers.updatedUserInfo);
userRouter.put('/password', userControllers.updatePassword);

module.exports = { userRouter }
