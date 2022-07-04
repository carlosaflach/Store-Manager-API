const SalesService = require('../services/salesService');

const createSale = async (req, res, next) => {
  const newSale = await SalesService.createSale(req.body);
  if (newSale.error) return next(newSale.error);

  return res.status(201).json(newSale);
};

const getAll = async (req, res, _next) => {
  const sales = await SalesService.getAll();

  return res.status(200).json(sales);
};

const findById = async (req, res, next) => {
  const { id } = req.params;
  const sale = await SalesService.findById(Number(id));
  if (sale.error) return next(sale.error);

  return res.status(200).json(sale);
};

module.exports = { 
  createSale,
  getAll,
  findById,
};