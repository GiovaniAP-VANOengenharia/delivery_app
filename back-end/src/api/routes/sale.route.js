const { Router } = require('express');
const saleController = require('../controllers/sale.controller');
const { validateToken } = require('../middleware/login.validation');

saleRouter = Router();

saleRouter.post('/', validateToken, saleController.createSale);

module.exports = {
  saleRouter,
};
