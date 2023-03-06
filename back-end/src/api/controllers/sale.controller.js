const saleService = require('../services/sale.service');

const response = (sale, saleProducts, status, method) => ({
  hasToken: false,
  method,
  status,
  message: 'Order created',
  result: {
    id: sale.id,
    userId: sale.userId,
    sallerId: sale.sellerId,
    totalPrice: sale.totalPrice,
    deliveryAddress: sale.deliveryAddress,
    deliveryNumber: sale.deliveryNumber,
    status: sale.status,
    saleDate: sale.saleDate,
    cart: saleProducts,
  },
});

const createSale = async (req, res) => {
  const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, cart } = req.body;

  const newSale = await saleService.createSale({
    userId: Number(userId),
    sellerId: Number(sellerId),
    totalPrice: Number(totalPrice),
    deliveryAddress,
    deliveryNumber,
    status: 'pendente',
    saleDate: Date.now(),
  });

  const salesProducts = await Promise.all(cart
    .map(async (product) => saleService
    .createSaleProduct({
      productId: product.id,
      saleId: newSale.id,
      quantity: product.quantity,
    })));

  return res.status(201).json(response(newSale, salesProducts, 201, 'POST'));
};

module.exports = {
  createSale,
};