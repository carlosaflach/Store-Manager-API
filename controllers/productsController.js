const ProductService = require('../services/productsService');

const getAll = async (req, res, next) => {
  try {
    const { code, data } = await ProductService.getAll();
    res.status(code).json(data);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code, data } = await ProductService.findById(id);
    if (!data) return res.status(404).json({ message: 'Product not found' });
    res.status(code).json(data);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

module.exports = {
  getAll,
  findById,
};