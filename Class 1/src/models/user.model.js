const mongoose = require('mongoose')
const { generateOTP } = require('../utils/randomString.util')
const { sendEmail } = require('../services/mail.service')

const { Schema } = mongoose

const UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

UserSchema.pre('save', function (next) {
    if (!this.otp) {
        this.otp = generateOTP()
        sendEmail({
            to: this.email,
            subject: 'Your OTP',
            taxt: `Your OTP is ${this.otp}`
        })
            .then(res => console.log(`Success sending email to ${this.email} and OTP is ${this.otp}`))
            .catch(err => console.log(`Error sending email to ${this.email}`))
    }
    next()
})

const UserModel = mongoose.model('User', UserSchema)


module.exports = UserModel