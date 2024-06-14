const { body } = require('express-validator')

const signUpRouteValidator = [
    body('username').isString().withMessage('username should not be an integer'),
    body('email').trim().isEmail().withMessage('Invalid email'),
    body('password').isString().isLength({ min: 6, max: 12 }).withMessage('Password length should be 8 to 12 characters')
]

module.exports = {
    signUpRouteValidator
}
