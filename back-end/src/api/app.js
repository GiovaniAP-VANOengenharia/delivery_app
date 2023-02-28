const express = require('express');
const { userRouter } = require('./routes/user.route');
const cors = require('cors')


const app = express();
app.use(express.json());
app.use(cors())

app.use('/login', userRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
