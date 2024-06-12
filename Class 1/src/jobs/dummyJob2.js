const crone = require('node-cron')

const dummyJob2 = crone.schedule('* * * * *', () => {
    console.log("Hi from Crone Job 2");
})

module.exports = dummyJob2