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

const getAll = async () => {
  const sales = await SalesModel.getAll();
  return sales;
};

const findById = async (id) => {
  const sale = await SalesModel.findById(id);
  if (!sale || !sale.length) {
    return {
      error: {
        code: 'notFound',
        message: 'Sale not found',
      },
    };
  }

  return sale;
};

const deleteSale = async (id) => {
  const saleExists = await SalesModel.findById(id);
  if (!saleExists || !saleExists.length) {
    return {
      error: {
        code: 'notFound',
        message: 'Sale not found',
      },
    };
  }
  await SalesModel.deleteSale(id);
  return true;
};

module.exports = {
  createSale,
  getAll,
  findById,
  deleteSale,
};