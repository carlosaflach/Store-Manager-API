const ProductModel = require('../models/productsModel');

const getAll = async () => {
  const products = await ProductModel.getAll();

  if (!products) return false;

  return products;
};

const findById = async (id) => {
  const product = await ProductModel.findById(id);

  if (!product) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }

  return product;
};

module.exports = {
  getAll,
  findById,
};