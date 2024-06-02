const express = require('express');
const cors = require('cors');
const { config } = require('./src/configs/server.config');
const { corsConfig } = require('./src/configs/cors.config');
const { signup, login, home } = require('./src/controllers/user.controller');

const app = express();
const PORT = config.appPort;

app.use(cors(corsConfig))

app.get('/', home)
app.get('/signup', signup)
app.get('/login', login)

app.listen(PORT, () => {
    console.log(`My Server Listening on PORT ${PORT}`);
})
