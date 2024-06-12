const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { config } = require('./src/configs/server.config');
const { corsConfig } = require('./src/configs/cors.config');
const { route: userRoute } = require('./src/routes/user.routes');
const { route: todoRoute } = require('./src/routes/todo.routes');
const { DB_RETRY_LIMIT, DB_RETRY_TIMEOUT } = require('./src/constants/constants');
const dummyJob1 = require('./src/jobs/dummyJob1');
const dummyJob2 = require('./src/jobs/dummyJob2');

let connectionRetry = 0
const connectDB = async () => {
    try {

        console.log('Establishing DB Connection...');
        await mongoose.connect(config.dbUri)
        console.log('DB Connected');

    } catch (error) {

        if (connectionRetry < DB_RETRY_LIMIT) {
            connectionRetry++
            console.log(`Reconnnecting to DB ${connectionRetry}/${DB_RETRY_LIMIT}`);
            await new Promise(resolve => setTimeout(resolve, DB_RETRY_TIMEOUT))
            await connectDB()

        } else {
            process.exit()
        }
    }
}

const app = express();
const PORT = config.appPort;

(async () => {
    try {
        await connectDB()

        app.use(cors(corsConfig))
        app.use(express.json())

        app.use('/user', userRoute)
        app.use('/todo', todoRoute)

        dummyJob1.start()
        dummyJob2.start()

        app.get('*', (req, res) => {
            res.send('Invalid Routes!')
        })

        app.listen(PORT, () => {
            console.log(`My Server Listening on PORT ${PORT}`);
        })
    } catch (error) {
        console.error("error ==>", error)
    }
})()
