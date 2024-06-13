const express = require('express')
const { startJob, stopJob } = require('../controllers/cron.controller')

const route = express.Router()

route.post('/start-job', startJob)
route.post('/stop-job', stopJob)

module.exports = { route }