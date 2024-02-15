const notFoundErr = (req, res, next) => {
    const error = new Error(`not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const erroHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

module.exports = { notFoundErr, erroHandler };