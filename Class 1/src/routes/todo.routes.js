const express = require('express')
// const { checkAuth } = require('../middlewares/check-auth.middleware')
const { createTodo, getTodoItem } = require('../controllers/todo.controller')
const { createTodoValidator } = require('../validator/createTodo.validator')

const route = express.Router()

route.post('/create-todo', createTodoValidator, createTodo)
route.get('/get-todo-item/:todoID', getTodoItem)

module.exports = { route }