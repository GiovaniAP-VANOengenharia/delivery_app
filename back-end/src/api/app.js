const express = require('express');
const { userRouter } = require('./routes/user.route');
const { productRouter } = require('./routes/product.route');

const app = express();
app.use(express.json());

app.use('/', userRouter);
app.use('/products', productRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
