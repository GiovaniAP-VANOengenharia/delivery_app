const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/user.route');
<<<<<<< HEAD
=======
const { productRouter } = require('./routes/product.route');
const cors = require('cors')
>>>>>>> 840791f1862e9ef9d1973813c718f825c5256762

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', userRouter);
app.use('/products', productRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
