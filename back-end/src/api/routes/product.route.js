const { Router } = require('express');
const productController = require('../controllers/login.controller');

const productRouter = Router();

productRouter.get('/', productController.getAllProducts);

module.exports = {
  productRouter,
};