const { Router } = require('express')
const expressAsyncHandler = require('express-async-handler')
const { StatusCodes } = require('http-status-codes')

const userRouter = Router()
userRouter.get('/', expressAsyncHandler(async (req, res) => res.status(StatusCodes.OK).json({
    message: "welcome to the user Rotues"
})))
userRouter.get('/:userName', async (req, res) => { })
userRouter.post('/', async (req, res) => { })
userRouter.post('/login', async (req, res) => { })
userRouter.put('/:userName', async (req, res) => { })


module.exports = { userRouter }
