const ProductModel = require('../models/productsModel');

const getAll = async () => {
  const products = await ProductModel.getAll();

  if (!products) return false;

  return { code: 200, data: products };
};

const findById = async (id) => {
  const product = await ProductModel.findById(id);
  if (!product) return false;

  return { code: 200, data: product };
};

module.exports = {
  getAll,
  findById,
};