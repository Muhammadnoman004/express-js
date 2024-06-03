const bcrypt = require('bcrypt')
const saltRounds = 10;

const createHash = async (myPlaintextPassword) => {
    const hash = await bcrypt.hash(myPlaintextPassword, saltRounds)
    return hash
}

const compareHash = async (myPlaintextPassword, hashPassword) => {
    const iscompared = await bcrypt.compare(myPlaintextPassword, hashPassword)
    return iscompared
}

module.exports = {
    createHash,
    compareHash
}