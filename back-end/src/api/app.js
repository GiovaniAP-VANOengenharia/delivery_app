const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/user.route');
const { productRouter } = require('./routes/product.route');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/images', express.static('images'));
app.use('/', userRouter);
app.use('/products', productRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
