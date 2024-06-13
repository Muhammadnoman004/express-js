const cron = require('node-cron')

const dummyJob2 = cron.schedule('* * * * *', () => {
    console.log("Hi from Crone Job 2");
})

module.exports = dummyJob2