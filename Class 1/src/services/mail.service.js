// const nodemailer = require('nodemailer')

// const transport = nodemailer.createTestAccount({
//     service: "Gmail",
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: true,
//     auth: {
//         user: "nomanshamim2004@gmail.com",
//         pass: 'kniiikiji'
//     }
// })

// const sendEmail = async (data) => {
//     try {
//         const response = await transport.sendMail({
//             from: "nomanshamim2004@gmail.com",
//             ...data
//         })
//         return response
//     } catch (error) {
//         throw error
//     }
// }

// module.exports = {
//     sendEmail
// }