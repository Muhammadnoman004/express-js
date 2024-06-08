const nodemailer = require('nodemailer')
const { config } = require('../configs/server.config')

const transport = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
        user: config.userEmail,
        pass: config.userPass
    }
})

const sendEmail = async (data) => {
    try {
        const response = await transport.sendMail({
            from: "nomanshamim2004@gmail.com",
            ...data
        })
        return response
    } catch (error) {
        throw error
    }
}

module.exports = {
    sendEmail
}