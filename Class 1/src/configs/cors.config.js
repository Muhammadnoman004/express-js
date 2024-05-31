const whitelist = ['http://localhost:5000', 'http://localhost:4000'];

const corsConfig = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin ) {
            callback(null, true)
        }
        else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

module.exports = {
    corsConfig
}