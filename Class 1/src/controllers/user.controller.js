const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { createUser, findUserByEmail, saveToken, getTokenByUid, deleteTokensByUid, updateUserByEmail } = require('../services/user.service')
const { createHash, compareHash } = require('../utils/hash.util')
const { config } = require('../configs/server.config')
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responsehandler.util')

const signup = async (req, res) => {
    try {

        const error = validationResult(req)
        if (!error.isEmpty()) {
            return sendErrorResponse(res, error.array(), 'Validation error')
        }

        const { username, email, password } = req.body
        const user = await findUserByEmail(email)
        if (user) return sendErrorResponse(res, null, 'Email already exist')

        const hashedPassword = await createHash(password)

        const payload = {
            username,
            email,
            password: hashedPassword
        }
        const newUser = await createUser(payload)
        if (!newUser) {
            return sendErrorResponse(res, null, 'something went wrong!')
        }
        return sendSuccessResponse(res, null, "signup successfully")

    } catch (error) {
        console.log(error)
        sendErrorResponse(res, null, 'something went wrong!')
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await findUserByEmail(email)
        if (!user) return sendErrorResponse(res, null, 'Invalid Credentials!')

        if (!user.isActive) {
            return sendErrorResponse(res, null, 'Plzz Verify Your OTP first')
        }

        const isUserAlreadyLoggedin = await getTokenByUid(user.id)
        if (isUserAlreadyLoggedin?.length > 0) return sendErrorResponse(res, null, 'already logged in')

        const passwordCompare = await compareHash(password, user.password)
        if (!passwordCompare) return sendErrorResponse(res, null, 'Invalid Credentials!')

        const token = jwt.sign({ email: user.email, username: user.username }, config.secretKey, { expiresIn: '7d' })
        const generateToken = await saveToken({ token, user: user.id })

        return sendSuccessResponse(res, { token: generateToken.token }, 'Login Successfully')
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, null, 'Something went wrong!')
    }
}

const logOut = async (req, res) => {
    try {
        const { uid } = req.body
        const LogOutUser = await deleteTokensByUid(uid)

        if (LogOutUser.deletedCount === 0) {
            return sendErrorResponse(res, null, 'Already logged Out')
        }

        return sendSuccessResponse(res, null, 'Log Out Successfully')
    } catch (error) {
        sendErrorResponse(res, null, 'Already logged in')
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await findUserByEmail(email)
        if (!user) return res.send('unprocessible request')

        if (user.otp !== otp) return sendErrorResponse(res, null, 'Invalid OTP')


        const verified = await updateUserByEmail(user.email)
        return sendSuccessResponse(res, null, 'OTP Verified')

    } catch (error) {
        return sendErrorResponse(res, null, 'Something went wrong!')
    }
}

module.exports = {
    signup,
    login,
    logOut,
    verifyOTP
}