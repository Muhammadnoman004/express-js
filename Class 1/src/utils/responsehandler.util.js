const sendSuccessResponse = (res, data, message) => {
    res.status(200).json({
        status: 'success',
        data: data,
        message: message
    })
}

const sendErrorResponse = (res, error, message) => {
    res.status(500).json({
        status: 'error',
        data: error,
        message: message
    })
}

module.exports = {
    sendSuccessResponse,
    sendErrorResponse
}