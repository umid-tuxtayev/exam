const jwt = require('jsonwebtoken');

module.exports = {
    createAccessToken(payload) {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
    },

    createRefreshToken(payload) {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    },

    verifyAccessToken(token) {
        try {
            return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        } catch (error) {
            return null
        }
    },

    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        } catch (error) {
            return null
        }
    },
}