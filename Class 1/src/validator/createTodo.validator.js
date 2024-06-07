const { body } = require('express-validator');

const createTodoValidator = [
    body("color").isHexColor().withMessage("Invalid color!")
]

module.exports = {
    createTodoValidator
}