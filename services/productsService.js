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
  const productExists = await ProductModel.findById(id);
  
  if (!productExists) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }

  const updatedProduct = await ProductModel.update(id, name);

  return updatedProduct;
};

const deleteProduct = async (id) => {
  const productExists = await ProductModel.findById(id);
  if (!productExists) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }
  await ProductModel.deleteProduct(id);
  return true;
};

const search = async (searchTerm) => {
  const product = await ProductModel.search(searchTerm);

  return product;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteProduct,
  search,
};