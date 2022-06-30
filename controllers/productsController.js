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

module.exports = {
  getAll,
  findById,
};