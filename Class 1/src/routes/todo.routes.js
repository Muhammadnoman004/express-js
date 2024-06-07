const express = require('express')
const { checkAuth } = require('../middlewares/check-auth.middleware')
const { createTodo } = require('../controllers/todo.controller')
const { createTodoValidator } = require('../validator/createTodo.validator')

const route = express.Router()

route.post('/create-todo', checkAuth, createTodoValidator, createTodo)

module.exports = { route }