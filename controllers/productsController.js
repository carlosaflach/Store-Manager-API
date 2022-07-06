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

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedProduct = await ProductService.update(Number(id), name);
  if (updatedProduct.error) return next(updatedProduct.error);

  return res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  
  const isDeleted = await ProductService.deleteProduct(Number(id));
  if (isDeleted.error) return next(isDeleted.error);

  return res.status(204).end();
};

const search = async (req, res, _next) => {
  const { q } = req.query;
  const product = await ProductService.search(q);

  return res.status(200).json(product);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteProduct,
  search,
};