const { Router } = require('express')
const expressAsyncHandler = require('express-async-handler')
const { StatusCodes } = require('http-status-codes')

const userRouter = Router()
userRouter.get('/', expressAsyncHandler(async (req, res) => res.status(StatusCodes.OK).json({
    message: "welcome to the user Rotues"
})))


module.exports = { userRouter }
