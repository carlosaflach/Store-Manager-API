const SalesModel = require('../models/salesModel');
const ProducstModel = require('../models/productsModel');

const createSale = async (array) => {
  const productExists = await Promise.all(array.map((s) => ProducstModel.findById(s.productId)));
  const check = productExists.some((p) => p === undefined);
  if (check) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }
  const newSale = await SalesModel.createSale(array);
  return newSale;
};

module.exports = {
  createSale,
};