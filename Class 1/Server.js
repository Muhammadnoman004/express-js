const express = require('express');
const { config } = require('./src/configs/server.config')
const app = express();
const PORT = config.appPort;

app.get('/', (req, res) => {
    res.send("<h1>Home Page!</h1>");
})
app.get('/products', (req, res) => {
    res.send(["Noman", "Huzaifa", "Jamsheed"]);
})

app.listen(PORT, () => {
    console.log(`My Server Listening on PORT ${PORT}`);
})
