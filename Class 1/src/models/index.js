const mongoose = require('mongoose')
const UserModel = require('./user.model')
const TokenModel = require('./token.model')
const TodoModel = require('./todo.model')
const TodoItemsModel = require('./todoItems.model')

const db = {}
db.mongoose = mongoose,
db.user = UserModel,
db.token = TokenModel,
db.todo = TodoModel,
db.todoItems = TodoItemsModel

module.exports = db