const mongoose = require('mongoose')
const UserModel = require('./user.model')

const db = {}
db.mongoose = mongoose,
db.user = UserModel

module.exports = db