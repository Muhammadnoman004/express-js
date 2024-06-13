const dummyJob1 = require('./dummyJob1')
const dummyJob2 = require('./dummyJob2')

const cronManager = new Map()

cronManager.set('dummyjob1', dummyJob1)
cronManager.set('dummyjob2', dummyJob2)

module.exports = cronManager