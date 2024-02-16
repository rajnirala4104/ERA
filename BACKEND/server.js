require('dotenv').config()
const { createServer } = require('http')
const { app } = require('./api/app')
const { PORT } = process.env
const colors = require('colors')

const server = createServer(app).listen(PORT, () => {
    console.log(`server is running on ${PORT}\ngo to http://127.0.0.1:${PORT}/api/v1/`.yellow.bold);
})