const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        let bearerToken = req.header("Authorization");
        if (!bearerToken) {
            res.status(403).send("Access Denied");
        }
        const token = bearerToken.split(' ')[1]; // split token from bearer
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { verifyToken };