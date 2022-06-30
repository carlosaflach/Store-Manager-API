const SalesModel = require('../models/salesModel');
// const ProducstModel = require('../models/productsModel');

const createSale = async (array) => {
  const newSale = await SalesModel.createSale(array);
  return newSale;
};

module.exports = {
  createSale,
};