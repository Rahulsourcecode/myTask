const errorHandler = (error, req, res, next) => {
    return res.status(400).json({ message: "catch error" })
}

module.exports = errorHandler;