const express = require('express');
const cors = require('cors');
const { config } = require('./src/configs/server.config');
const { corsConfig } = require('./src/configs/cors.config');

const app = express();
const PORT = config.appPort;

app.use(cors(corsConfig))

app.get('/', (req, res) => {
    return res.send("<h1>Home Page!</h1>");
})
app.get('/products', (req, res) => {
    return res.send(["Noman", "Huzaifa", "Jamsheed"]);
})

app.listen(PORT, () => {
    console.log(`My Server Listening on PORT ${PORT}`);
})
