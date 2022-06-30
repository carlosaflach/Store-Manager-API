const ProductService = require('../services/productsService');

const getAll = async (req, res, _next) => {
    const products = await ProductService.getAll();
    res.status(200).json(products);
};

const findById = async (req, res, next) => {
    const { id } = req.params;
    const product = await ProductService.findById(id);
    if (product.error) return next(product.error);
    res.status(200).json(product);
};

const create = async (req, res, next) => {
  const { name } = req.body;
  const newProduct = await ProductService.create(name);

  if (newProduct.error) return next(newProduct.error);
  res.status(201).json(newProduct);
};

module.exports = {
  getAll,
  findById,
  create,
};