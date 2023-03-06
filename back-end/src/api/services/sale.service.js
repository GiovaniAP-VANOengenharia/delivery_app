const { Sale, SaleProducts } = require('../../database/models');

const createSale = async (sale) => {
  const newSale = await Sale.create(sale);
  return newSale;
};

const createSaleProduct = async (product) => {
  const result = await SaleProducts.create(product);
  return result;
};

module.exports = {
  createSaleProduct,
  createSale,
};