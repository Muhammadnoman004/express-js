const express = require('express')
const { login, signup, logOut } = require('../controllers/user.controller')

const route = express.Router()

route.post('/signup', signup);
route.post('/login', login);
route.post('/logout', logOut);

module.exports = { route }