const { Sale, SalesProducts } = require('../../database/models');

const createSale = async (sale) => {
  const newSale = await Sale.create(sale);
  return newSale;
};

const createSaleProduct = async (product) => {
  const result = await SalesProducts.create(product);
  return result;
};

module.exports = {
  createSaleProduct,
  createSale,
};