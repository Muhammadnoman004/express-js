const cron = require('node-cron')

const dummyJob1 = cron.schedule('* * * * *', () => {
    console.log("Hi from Crone Job 1");
})

module.exports = dummyJob1