const { createUser } = require('../services/user.service')

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const payload = {
            username,
            email,
            password
        }
        const newUser = await createUser(payload)
        if (!newUser) {
            res.send('something went wrong!')
        }
        return res.send("success")

    } catch (error) {
        console.log(error)
        res.send('something went wrong!')
    }
}
const login = async (req, res) => {
    res.send('login page!')
}

module.exports = {
    signup,
    login
}