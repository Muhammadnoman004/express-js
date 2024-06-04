const jwt = require('jsonwebtoken')
const { config } = require('../configs/server.config')

const checkAuth = (req, res, next) => {
    try {
        const token = req.header('Authorization')
        if (!token) {
            return res.status(401).json({ success: false, message: 'unauthorized', data: null })
        }
        const isValidToken = jwt.verify(token.slice(7), config.secretKey)
        next()
    } catch (error) {
        return res.status(401).json({ success: false, message: 'unauthorized', data: error })
    }
}

module.exports = {
    checkAuth
}