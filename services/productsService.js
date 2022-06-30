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

const create = async (name) => {
  const check = await ProductModel.checkIfExists(name);
  console.log('check', check);

  if (check.length > 0) {
    return {
      error: {
        code: 'alreadyExists',
        message: 'Product already exists',
      },
    };
  }

  const newProduct = await ProductModel.create(name);
  return newProduct;
};

module.exports = {
  getAll,
  findById,
  create,
};