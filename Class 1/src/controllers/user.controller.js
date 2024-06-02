const home = async (req, res) => {
    res.send('home page!')
}
const signup = async (req, res) => {
    res.send('signup page!')
}
const login = async (req, res) => {
    res.send('login page!')
}

module.exports = {
    home,
    signup,
    login
}