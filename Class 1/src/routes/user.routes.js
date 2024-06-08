const express = require('express')
const { login, signup, logOut, verifyOTP } = require('../controllers/user.controller')

const route = express.Router()

route.post('/signup', signup);
route.post('/login', login);
route.post('/logout', logOut);
route.post('/verify-otp', verifyOTP);

module.exports = { route }