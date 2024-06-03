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

module.exports = {
    createUser,
    findUserByEmail,
    saveToken
}