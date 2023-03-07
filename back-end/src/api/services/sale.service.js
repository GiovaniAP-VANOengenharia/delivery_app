const { Sale, SalesProducts } = require('../../database/models');

const createSale = async (sale) => {
  const newSale = await Sale.create(sale);
  return newSale;
};

const createSaleProduct = async (product) => {
  const result = await SalesProducts.create(product);
  return result;
};

const getAllSales = async () => {
  const sales = await Sale.findAll();
  return sales;
};

module.exports = {
  createSaleProduct,
  createSale,
  getAllSales,
};