const { Router } = require('express')
const { postControllers } = require('./post.controllers')

const postRouter = Router()

postRouter.get('/', postControllers.getAllPost)
postRouter.post('/create', async (req, res) => { })
postRouter.put('/update', async (req, res) => { })
postRouter.delete('/delete', async (req, res) => { })


module.exports = { postRouter }