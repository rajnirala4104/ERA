const { Router } = require('express')
const { StatusCodes } = require('http-status-codes')

const commentRouter = Router()
commentRouter.get('/', async (req, res) => res.status(StatusCodes.OK).json({
    message: "comment router is working.."
}))

module.exports = { commentRouter }