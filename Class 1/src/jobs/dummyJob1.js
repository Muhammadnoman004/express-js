const crone = require('node-cron')

const dummyJob1 = crone.schedule('* * * * *', () => {
    console.log("Hi from Crone Job 1");
})

module.exports = dummyJob1