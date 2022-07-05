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

const update = async (id, name) => {
  const productExists = await ProductModel.findById(Number(id));
  
  if (!productExists) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }

  const updatedProduct = await ProductModel.update(Number(id), name);

  return updatedProduct;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
};