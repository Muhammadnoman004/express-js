const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9999).toString()
}

module.exports = {
    generateOTP
}