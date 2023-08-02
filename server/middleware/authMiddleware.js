const jwt = require('jsonwebtoken');

//authentication middleware for verifying token
const verifyToken = (req, res, next) => {

    const token = req.cookies?.token
    if (!token) {
        return res.status(404).json({ message: 'No token found' });
    }
    jwt.verify(token, process.env.secretKey, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired. Please log in again' });
            }
            return res.status(400).json({ message: 'Invalid Token' });
        }

        next();
    });
};

module.exports = {
    verifyToken,
};