const CronManager = require('../jobs')
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responsehandler.util')

const startJob = async (req, res) => {
    try {
        const { jobName } = req.body

        const Job = await CronManager.get(jobName)
        if (!Job) return sendErrorResponse(res, null, `Job not found with name ${jobName}`)

        Job.start()
        sendSuccessResponse(res, null, 'Job Start')

    } catch (error) {
        sendErrorResponse(res, null, 'Something went wrong')
    }
}

const stopJob = async (req, res) => {
    try {
        const { jobName } = req.body

        const Job = await CronManager.get(jobName)
        if (!Job) return sendErrorResponse(res, null, `Job not found with name ${jobName}`)

        Job.stop()
        sendSuccessResponse(res, null, 'Job Stop')
    } catch (error) {
        sendErrorResponse(res, null, 'Something went wrong')
    }
}

module.exports = {
    startJob,
    stopJob
}