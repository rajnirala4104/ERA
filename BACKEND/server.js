require('dotenv').config()
const { createServer } = require('http')
const color = require('color')
const { app } = require('./api/app')
const { PORT } = process.env

const server = createServer(app).listen(PORT, () => {
    console.log("\x1b[33m", `server is running on ${PORT}\ngo to http://127.0.0.1:${PORT}/api/v1/`);
})