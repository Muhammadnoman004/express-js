const express = require('express');
const cors = require('cors');
const { config } = require('./src/configs/server.config');
const { corsConfig } = require('./src/configs/cors.config');
const { route: userRoute } = require('./src/routes/user.routes');
const { route: todoRoute } = require('./src/routes/todo.routes');

const app = express();
const PORT = config.appPort;

app.use(cors(corsConfig))

app.use('/user', userRoute)
app.use('/todo', todoRoute)

app.get('*', (req, res) => {
    res.send('Invalid Routes!')
})


app.listen(PORT, () => {
    console.log(`My Server Listening on PORT ${PORT}`);
})
