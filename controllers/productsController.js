const ProductService = require('../services/productsService');

const getAll = async (req, res, _next) => {
    const { code, data } = await ProductService.getAll();
    res.status(code).json(data);
};

const findById = async (req, res, _next) => {
    const { id } = req.params;
    const { code, data } = await ProductService.findById(id);
    if (!data) return res.status(404).json({ message: 'Product not found' });
    res.status(code).json(data);
};

module.exports = {
  getAll,
  findById,
};