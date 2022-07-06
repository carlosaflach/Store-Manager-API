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

const deleteSale = async (req, res, next) => {
  const { id } = req.params;
  const isDeleted = await SalesService.deleteSale(Number(id));

  if (isDeleted.error) return next(isDeleted.error);

  return res.status(204).end();
};

const updateSale = async (req, res, next) => {
  const { id } = req.params;
  const sale = [...req.body];
  const saleUpdated = await SalesService.updateSale(sale, id);
  if (saleUpdated.error) return next(saleUpdated.error);

  res.status(200).json(saleUpdated);
};

module.exports = { 
  createSale,
  getAll,
  findById,
  deleteSale,
  updateSale,
};