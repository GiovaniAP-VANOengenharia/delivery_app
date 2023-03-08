const saleService = require('../services/sale.service');
const productService = require('../services/product.service');

const response = (sale, cart, status, method) => ({
  hasToken: false,
  method,
  status,
  message: 'Order created',
  result: {
    id: sale.id,
    userId: sale.userId,
    sellerId: sale.sellerId,
    totalPrice: sale.totalPrice,
    deliveryAddress: sale.deliveryAddress,
    deliveryNumber: sale.deliveryNumber,
    status: sale.status,
    saleDate: sale.saleDate,
    cart,
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
    status: 'Pendente',
    saleDate: Date.now(),
  });

  await Promise.all(cart
    .map(async (product) => saleService
    .createSaleProduct({
      productId: product.id,
      saleId: newSale.id,
      quantity: product.quantity,
    })));

  return res.status(201).json(response(newSale, cart, 201, 'POST'));
};

const getAllSales = async (_req, res) => {
  const sales = await saleService.getAllSales();

  const cart = await Promise.all(sales
    .map(async (sale) => saleService
    .getSalesProductsById(sale.id)));

  const xablau = [];

  for (let i = 0; i < sales.length; i += 1) {
    xablau.push(response(sales[i], cart[i], 200, 'GET'));
  }

  return res.status(200).json(xablau);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const order = await saleService.getSaleById(id);
  
  const cart = await saleService.getSalesProductsById(id);
  
  const productsCart = await Promise.all(cart
    .map(async (product) => productService
    .getProductById(product.productId)));
    
  const xablau = [];
  
  for (let i = 0; i < productsCart.length; i += 1) {
    xablau.push({
      id: cart[i].productId,
      name: productsCart[i].name,
      price: productsCart[i].price,
      quantity: cart[i].quantity,
    });
  }

  return res.status(200).json(response(order, xablau, 200, 'GET'));
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};