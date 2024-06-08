const jwt = require('jsonwebtoken')
const { createUser, findUserByEmail, saveToken, getTokenByUid, deleteTokensByUid, updateUserByEmail } = require('../services/user.service')
const { createHash, compareHash } = require('../utils/hash.util')
const { config } = require('../configs/server.config')

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = await findUserByEmail(email)
        if (user) return res.send("Email already exist")

        const hashedPassword = await createHash(password)

        const payload = {
            username,
            email,
            password: hashedPassword
        }
        const newUser = await createUser(payload)
        if (!newUser) {
            res.send('something went wrong!')
        }
        return res.send("signup successfully")

    } catch (error) {
        console.log(error)
        res.send('something went wrong!')
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await findUserByEmail(email)
        if (!user) return res.status(500).json({ success: false, message: 'Invalid Credentials!', data: null })

        if (!user.isActive) {
            return res.status(500).json({ success: false, message: 'Plzz Verify Your OTP first', data: null })
        }

        const isUserAlreadyLoggedin = await getTokenByUid(user.id)
        if (isUserAlreadyLoggedin?.length > 0) return res.status(500).json({ success: false, message: 'already logged in', data: null })

        const passwordCompare = await compareHash(password, user.password)
        if (!passwordCompare) return res.status(500).json({ success: false, message: 'Invalid Credentials!', data: null })

        const token = jwt.sign({ email: user.email, username: user.username }, config.secretKey, { expiresIn: '7d' })
        const generateToken = await saveToken({ token, user: user.id })

        return res.status(200).json({ success: true, message: 'success', data: { token: generateToken.token } })
    } catch (error) {
        console.log(error);
        res.send('Something went wrong!')
    }
}

const logOut = async (req, res) => {
    try {
        const { uid } = req.body
        const LogOutUser = await deleteTokensByUid(uid)

        if (LogOutUser.deletedCount === 0) {
            return res.status(500).json({ success: false, message: 'already logged Out', data: null })
        }

        res.status(200).json({ success: true, message: 'Logged Out Successfully', data: null })
    } catch (error) {
        res.status(500).json({ success: false, message: 'already logged in', data: null })
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await findUserByEmail(email)
        if (!user) return res.send('unprocessible request')

        if (user.otp !== otp) return res.send('Invalid OTP')

        const verified = await updateUserByEmail(user.email)
        return res.send('OTP verified')

    } catch (error) {
        return res.send('Something went wrong')
    }
}

module.exports = {
    signup,
    login,
    logOut,
    verifyOTP
}