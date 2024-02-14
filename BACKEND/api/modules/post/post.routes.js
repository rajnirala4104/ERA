const { Router } = require('express')
const { StatusCodes } = require('http-status-codes')

const postRouter = Router()

postRouter.get('/', async (req, res) => res.status(StatusCodes.OK).json({
    message: "post route is working...",
}))

module.exports = { postRouter }