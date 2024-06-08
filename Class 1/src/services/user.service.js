const db = require('../models/index')
const { user: User, token: Token } = db

const createUser = async (payload) => {
    try {
        const NewUser = new User({ ...payload })
        const user = await NewUser.save()
        return user
    } catch (error) {
        throw error
    }
}

const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email })
        return user
    } catch (error) {
        throw error
    }
}

const saveToken = async (payload) => {
    try {
        const newToken = new Token({ ...payload })
        const token = await newToken.save()
        return token
    } catch (error) {
        throw error
    }
}

const getTokenByUid = async (uid) => {
    try {
        const response = await Token.find({ user: uid })
        return response
    } catch (error) {
        throw error
    }
}

const deleteTokensByUid = async (uid) => {
    try {
        const response = await Token.deleteMany({ user: uid })
        return response
    } catch (error) {
        throw error
    }
}

const updateUserByEmail = async (email) => {
    try {
        const response = await User.updateOne(
            { email: email }, // filter User email
            { isActive: true } // data to update user 
        )
        return response
    } catch (error) {
        throw error
    }
}

module.exports = {
    createUser,
    findUserByEmail,
    saveToken,
    getTokenByUid,
    deleteTokensByUid,
    updateUserByEmail
}