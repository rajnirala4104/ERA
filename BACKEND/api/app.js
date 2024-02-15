const express = require('express')
const app = express()
const asyncHandler = require('express-async-handler')
const { StatusCodes } = require('http-status-codes')
const { v1Router } = require('./routes/v1Routes')
const connectDatabase = require('./config/connectDB')
connectDatabase()

app.get('/health', asyncHandler(async (req, res) => res.status(StatusCodes.OK)))
app.use('/api/v1', v1Router)

module.exports = { app }