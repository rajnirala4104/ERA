const express = require("express");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { v1Router } = require("./routes/v1Routes");
const connectDatabase = require("./config/connectDB");
const { erroHandler, notFoundErr } = require("./middleware/error");
const cors = require("cors");
connectDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get(
   "/health",
   asyncHandler(async (req, res) => res.status(StatusCodes.OK))
);
app.use("/api/v1", v1Router);

app.use(erroHandler);
app.use(notFoundErr);

module.exports = { app };
