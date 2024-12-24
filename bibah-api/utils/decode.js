const jwt = require('jsonwebtoken');

const decodeToken = (token) => {
    if (!token) {
        throw new Error('Token is required');
    }
    try {
        token = token.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return decoded; 
    } catch (err) {
        throw new Error('invalid token');
    }
};

module.exports = decodeToken;
