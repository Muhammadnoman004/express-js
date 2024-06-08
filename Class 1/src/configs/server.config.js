require('dotenv').config()

const config = {
    appPort: process.env.SERVER_APP_PORT,
    dbUri: process.env.MONGO_URI,
    secretKey: process.env.SECRET_KET,
    userEmail: process.env.SECRET_USER_EMAIL,
    userPass: process.env.SECRET_MAIL_PASS
}

module.exports = {
    config
}