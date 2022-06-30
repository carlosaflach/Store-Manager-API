const SalesService = require('../services/salesService');

const createSale = async (req, res, next) => {
  const newSale = await SalesService.createSale(req.body);
  if (newSale.error) return next(newSale.error);

  return res.status(201).json(newSale);
};

module.exports = { 
  createSale,
};