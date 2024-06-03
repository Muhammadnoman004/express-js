const db = require('../models/index')
const { user: User } = db

const createUser = async (payload) => {
    try {
        const NewUser = new User({ ...payload })
        const user = await NewUser.save()
        return user
    } catch (error) {
        throw error
    }
}

module.exports = {
    createUser
}