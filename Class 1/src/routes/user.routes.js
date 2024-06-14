const express = require('express')
const { login, signup, logOut, verifyOTP } = require('../controllers/user.controller');
const { signUpRouteValidator } = require('../validator/request.validator');

const route = express.Router()

route.post('/signup', signUpRouteValidator, signup);
route.post('/login', login);
route.post('/logout', logOut);
route.post('/verify-otp', verifyOTP);

module.exports = { route }