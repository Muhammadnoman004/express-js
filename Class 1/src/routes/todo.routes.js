const express = require('express')
// const { checkAuth } = require('../middlewares/check-auth.middleware')
const { createTodo, getTodoItem, createTodoitem, deleteTodoItem } = require('../controllers/todo.controller')
const { createTodoValidator } = require('../validator/createTodo.validator')

const route = express.Router()

route.post('/create-todo', createTodoValidator, createTodo)
route.get('/get-todo-item/:todoID', getTodoItem)
route.post('/deletetodo', deleteTodoItem)
route.post('/list-item/:todoID/create', createTodoitem)

module.exports = { route }