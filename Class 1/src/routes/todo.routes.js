const express = require('express')
const { checkAuth } = require('../middlewares/check-auth.middleware')
const { createTodo } = require('../controllers/todo.controller')

const route = express.Router()

route.post('/create-todo', checkAuth, createTodo)

module.exports = { route }